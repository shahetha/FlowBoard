import { state } from "../state.js";
import { COLUMNS } from "../config.js";
import { escHtml } from "../utils/helpers.js";
import { timeAgo } from "../utils/date.js";

export function renderTaskDetailModal(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return "";

  const comments = state.comments.filter(c => c.task_id === taskId);
  const activity = state.activity.filter(a => a.task_id === taskId);

  return `
    <div class="overlay" id="modalOverlay">
      <div class="modal modal-lg">
        <div class="modal-header">
          <div class="modal-title">Task Detail</div>
          <button class="modal-close" id="closeModalBtn">×</button>
        </div>

        <div class="detail-grid">
          <div class="detail-main">
            <input class="task-title-input" id="detailTitleInput" value="${escHtml(task.title)}" />

            <div class="status-tabs">
              ${COLUMNS.map(c => `
                <button class="status-tab ${task.status === c.id ? `active-${c.id}` : ""}" data-status-tab="${c.id}">
                  ${c.label}
                </button>
              `).join("")}
            </div>

            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-textarea" id="detailDescriptionInput">${escHtml(task.description || "")}</textarea>
            </div>

            <div class="comments-section">
              <h3 style="margin-bottom:12px">Comments</h3>
              ${comments.map(comment => `
                <div class="comment">
                  <div style="font-size:12px;color:var(--text2)">${escHtml(comment.text)}</div>
                  <div style="font-size:11px;color:var(--text3);margin-top:4px">${timeAgo(comment.created_at)}</div>
                </div>
              `).join("") || `<div style="font-size:12px;color:var(--text3)">No comments yet.</div>`}
            </div>

            <div class="comments-section">
              <h3 style="margin-bottom:12px">Activity</h3>
              ${activity.map(item => `
                <div style="margin-bottom:10px">
                  <div style="font-size:12px;color:var(--text2)">${item.text}</div>
                  <div style="font-size:11px;color:var(--text3);margin-top:4px">${timeAgo(item.created_at)}</div>
                </div>
              `).join("") || `<div style="font-size:12px;color:var(--text3)">No activity yet.</div>`}
            </div>
          </div>

          <div class="detail-side">
            <div class="form-group">
              <div class="side-label">Priority</div>
              <select class="form-select" id="detailPriorityInput">
                <option value="low" ${task.priority === "low" ? "selected" : ""}>Low</option>
                <option value="normal" ${task.priority === "normal" ? "selected" : ""}>Normal</option>
                <option value="high" ${task.priority === "high" ? "selected" : ""}>High</option>
              </select>
            </div>

            <div class="form-group">
              <div class="side-label">Due Date</div>
              <input class="form-input" id="detailDueDateInput" type="date" value="${task.due_date || ""}" />
            </div>

            <div class="form-group">
              <button class="btn btn-danger" id="deleteTaskBtn">Delete Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}