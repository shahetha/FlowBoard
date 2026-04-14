import { state } from "../state.js";

export function renderHeader() {
  return `
    <div class="header">
      <div class="logo">
        <div class="logo-icon">⬡</div>
        <div class="logo-text">Flow<span>Board</span></div>
      </div>

      <div class="search-box">
        <span>⌕</span>
        <input
          id="searchInput"
          type="text"
          placeholder="Search tasks..."
          value="${state.search}"
        />
      </div>

      <div class="header-right">
        <button class="btn btn-ghost" id="teamBtn">👥 Team</button>
        <button class="btn btn-ghost" id="statsBtn">📊 Stats</button>
        <button class="btn btn-primary" id="newTaskBtn">+ New Task</button>
      </div>
    </div>
  `;
}