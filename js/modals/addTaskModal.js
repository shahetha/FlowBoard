import { COLUMNS } from "../config.js";
import { state } from "../state.js";

export function renderAddTaskModal() {
  return `
    <div class="overlay" id="modalOverlay">
      <div class="modal modal-sm">
        <div class="modal-header">
          <div class="modal-title">New Task</div>
          <button class="modal-close" id="closeModalBtn">×</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Title *</label>
            <input class="form-input" id="taskTitleInput" placeholder="What needs to be done?" />
          </div>

          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-textarea" id="taskDescriptionInput" placeholder="Add more details..."></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select class="form-select" id="taskStatusInput">
                ${COLUMNS.map(
                  (c) => `
                  <option value="${c.id}" ${state.selectedColumnId === c.id ? "selected" : ""}>
                    ${c.label}
                  </option>
                `
                ).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Priority</label>
              <select class="form-select" id="taskPriorityInput">
                <option value="low">Low</option>
                <option value="normal" selected>Normal</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Due Date</label>
            <input class="form-input" type="date" id="taskDueDateInput" />
          </div>

          <div class="form-group">
            <label class="form-label">Assignees</label>
            <div class="assignee-grid">
              ${state.members
                .map(
                  (member) => `
                  <button
                    type="button"
                    class="assignee-option"
                    data-assignee-id="${member.id}"
                  >
                    <div class="avatar" style="background:${member.color}20;color:${member.color};margin:0;border:none;width:20px;height:20px;font-size:8px">
                      ${member.initials}
                    </div>
                    <span>${member.name}</span>
                  </button>
                `
                )
                .join("")}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Labels</label>
            <div class="labels-grid">
              ${state.labels
                .map(
                  (label) => `
                  <button
                    type="button"
                    class="label-option"
                    data-label-id="${label.id}"
                    style="color:${label.color}"
                  >
                    ${label.name}
                  </button>
                `
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-ghost" id="cancelAddTaskBtn">Cancel</button>
          <button class="btn btn-primary" id="submitAddTaskBtn">Create Task</button>
        </div>
      </div>
    </div>
  `;
}