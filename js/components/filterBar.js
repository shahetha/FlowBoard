import { state } from "../state.js";

export function renderFilterBar() {
  return `
    <div class="filter-bar">
      <button class="filter-chip ${state.filterPriority === "all" ? "active" : ""}" data-priority="all">All Priority</button>
      <button class="filter-chip ${state.filterPriority === "high" ? "active" : ""}" data-priority="high">High</button>
      <button class="filter-chip ${state.filterPriority === "normal" ? "active" : ""}" data-priority="normal">Normal</button>
      <button class="filter-chip ${state.filterPriority === "low" ? "active" : ""}" data-priority="low">Low</button>
    </div>
  `;
}