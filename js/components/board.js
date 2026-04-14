import { COLUMNS } from "../config.js";
import { state } from "../state.js";
import { renderColumn } from "./column.js";

function getFilteredTasks() {
  return state.tasks.filter(task => {
    const q = state.search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      task.title.toLowerCase().includes(q) ||
      (task.description || "").toLowerCase().includes(q);

    const matchesPriority =
      state.filterPriority === "all" || task.priority === state.filterPriority;

    return matchesSearch && matchesPriority;
  });
}

export function renderBoard() {
  const filtered = getFilteredTasks();

  return `
    <div class="board-area">
      <div class="board">
        ${COLUMNS.map(column => {
          const columnTasks = filtered.filter(task => task.status === column.id);
          return renderColumn(column, columnTasks);
        }).join("")}
      </div>
    </div>
  `;
}