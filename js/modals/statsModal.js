import { state } from "../state.js";
import { COLUMNS } from "../config.js";

export function renderStatsModal() {
  const total = state.tasks.length;
  const done = state.tasks.filter(t => t.status === "done").length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  return `
    <div class="overlay" id="modalOverlay">
      <div class="modal modal-sm">
        <div class="modal-header">
          <div class="modal-title">Board Stats</div>
          <button class="modal-close" id="closeModalBtn">×</button>
        </div>

        <div class="modal-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
            <div class="stat-chip">Total: ${total}</div>
            <div class="stat-chip">Completed: ${done}</div>
          </div>

          <div style="margin-bottom:16px">
            <div style="font-size:12px;color:var(--text2);margin-bottom:8px">${percent}% complete</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${percent}%"></div>
            </div>
          </div>

          ${COLUMNS.map(c => {
            const count = state.tasks.filter(t => t.status === c.id).length;
            return `
              <div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 0;border-bottom:1px solid var(--border)">
                <span>${c.label}</span>
                <span>${count}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;
}