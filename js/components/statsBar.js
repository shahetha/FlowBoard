import { state } from "../state.js";

export function renderStatsBar() {
  const all = state.tasks;
  const todo = all.filter(t => t.status === "todo").length;
  const progress = all.filter(t => t.status === "in_progress").length;
  const review = all.filter(t => t.status === "in_review").length;
  const done = all.filter(t => t.status === "done").length;
  const pct = all.length ? Math.round((done / all.length) * 100) : 0;

  return `
    <div class="stats-bar">
      <div class="stat-chip"><span class="stat-dot" style="background:#3b82f6"></span>${todo} To Do</div>
      <div class="stat-chip"><span class="stat-dot" style="background:#f59e0b"></span>${progress} In Progress</div>
      <div class="stat-chip"><span class="stat-dot" style="background:#a855f7"></span>${review} In Review</div>
      <div class="stat-chip"><span class="stat-dot" style="background:#10b981"></span>${done} Done</div>
      <div class="stats-divider"></div>
      <div class="stat-chip">${all.length} Total</div>
      <div style="margin-left:auto;display:flex;align-items:center;gap:10px;font-size:12px;color:var(--text2)">
        <span>${pct}% complete</span>
        <div class="progress-bar" style="width:110px">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
      </div>
    </div>
  `;
}