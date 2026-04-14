import { state } from "../state.js";
import { updateTask } from "../services/taskService.js";
import { rerender } from "../app.js";
import { toast } from "../components/toast.js";

export function bindDragHandlers() {
  document.querySelectorAll(".task-card").forEach(card => {
    card.addEventListener("dragstart", () => {
      state.dragTaskId = card.dataset.taskId;
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      state.dragTaskId = null;
      card.classList.remove("dragging");
    });
  });

  document.querySelectorAll("[data-drop-column]").forEach(dropZone => {
    dropZone.addEventListener("dragover", e => {
      e.preventDefault();
      dropZone.closest(".column")?.classList.add("drag-over");
    });

    dropZone.addEventListener("dragleave", () => {
      dropZone.closest(".column")?.classList.remove("drag-over");
    });

    dropZone.addEventListener("drop", async e => {
      e.preventDefault();
      dropZone.closest(".column")?.classList.remove("drag-over");

      if (!state.dragTaskId) return;

      const nextStatus = dropZone.dataset.dropColumn;
      const task = state.tasks.find(t => t.id === state.dragTaskId);
      if (!task || task.status === nextStatus) return;

      await updateTask(task.id, { status: nextStatus });
      toast("Task moved", "success");
      rerender();
    });
  });
}