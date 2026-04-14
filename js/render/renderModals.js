import { state } from "../state.js";
import { renderAddTaskModal } from "../modals/addTaskModal.js";
import { renderTaskDetailModal } from "../modals/taskDetailModal.js";
import { renderTeamModal } from "../modals/teamModal.js";
import { renderStatsModal } from "../modals/statsModal.js";

export function renderModal() {
  const modalRoot = document.getElementById("modalRoot");

  if (!state.openModal) {
    modalRoot.innerHTML = "";
    return;
  }

  if (state.openModal === "addTask") {
    modalRoot.innerHTML = renderAddTaskModal();
    return;
  }

  if (state.openModal === "taskDetail") {
    modalRoot.innerHTML = renderTaskDetailModal(state.selectedTaskId);
    return;
  }

  if (state.openModal === "team") {
    modalRoot.innerHTML = renderTeamModal();
    return;
  }

  if (state.openModal === "stats") {
    modalRoot.innerHTML = renderStatsModal();
    return;
  }

  modalRoot.innerHTML = "";
}