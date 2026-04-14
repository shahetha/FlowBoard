import { renderTaskCard } from "./taskCard.js";

export function renderColumn(column, tasks) {
  return `
    <div class="column" data-column-id="${column.id}">
      <div class="col-header">
        <div class="col-dot" style="background:${column.color}"></div>
        <div class="col-title">${column.label}</div>
        <div class="col-count">${tasks.length}</div>
      </div>

      <div class="col-body" data-drop-column="${column.id}">
        ${tasks.length === 0 ? `<div class="empty-col">No tasks here</div>` : ""}
        ${tasks.map(renderTaskCard).join("")}
      </div>

      <button class="add-in-col" data-add-column="${column.id}">
        + Add task
      </button>
    </div>
  `;
}