import { state } from "../state.js";

export function renderTeamModal() {
  return `
    <div class="overlay" id="modalOverlay">
      <div class="modal modal-sm">
        <div class="modal-header">
          <div class="modal-title">Team Members</div>
          <button class="modal-close" id="closeModalBtn">×</button>
        </div>

        <div class="modal-body">
          ${state.members.map(member => `
            <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
              <div class="avatar" style="background:${member.color}20;color:${member.color};margin:0;border:none">
                ${member.initials}
              </div>
              <div>
                <div style="font-size:13px;font-weight:600">${member.name}</div>
                <div style="font-size:11px;color:var(--text3)">${member.role}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}