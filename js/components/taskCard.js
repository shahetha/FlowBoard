import { state } from "../state.js";
import { escHtml } from "../utils/helpers.js";
import { dueBadgeClass } from "../utils/date.js";

function getMember(id) {
  return state.members.find(m => m.id === id);
}

function getLabel(id) {
  return state.labels.find(l => l.id === id);
}

export function renderTaskCard(task) {
  const due = task.due_date ? dueBadgeClass(task.due_date) : null;
  const labels = (task.labels || []).map(getLabel).filter(Boolean);
  const assignees = (task.assignees || []).map(getMember).filter(Boolean);

  return `
    <div class="task-card" draggable="true" data-task-id="${task.id}">
      <div class="card-top">
        <div class="card-title">${escHtml(task.title)}</div>
        <button class="card-menu-btn task-open-btn" data-task-id="${task.id}">⋯</button>
      </div>

      ${task.description ? `<div class="card-desc">${escHtml(task.description)}</div>` : ""}

      ${labels.length ? `
        <div class="card-labels">
          ${labels.map(label => `
            <span class="label-chip" style="background:${label.bg};color:${label.color}">
              ${label.name}
            </span>
          `).join("")}
        </div>
      ` : ""}

      <div class="card-footer">
        <span class="priority-badge pri-${task.priority || "normal"}">${task.priority || "normal"}</span>
        ${due ? `<span class="due-badge ${due.cls}">📅 ${due.label}</span>` : ""}

        ${assignees.length ? `
          <div class="assignee-avatars">
            ${assignees.map(member => `
              <div class="avatar" style="background:${member.color}20;color:${member.color}" title="${member.name}">
                ${member.initials}
              </div>
            `).join("")}
          </div>
        ` : ""}
      </div>
    </div>
  `;
}