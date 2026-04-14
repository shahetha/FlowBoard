import { state } from "../state.js";
import { createTask, updateTask, removeTask } from "../services/taskService.js";
import { rerender } from "../app.js";
import { toast } from "../components/toast.js";

export function bindTaskHandlers() {
  const newTaskBtn = document.getElementById("newTaskBtn");
  if (newTaskBtn) {
    newTaskBtn.addEventListener("click", () => {
      state.openModal = "addTask";
      rerender();
    });
  }

  const teamBtn = document.getElementById("teamBtn");
  if (teamBtn) {
    teamBtn.addEventListener("click", () => {
      state.openModal = "team";
      rerender();
    });
  }

  const statsBtn = document.getElementById("statsBtn");
  if (statsBtn) {
    statsBtn.addEventListener("click", () => {
      state.openModal = "stats";
      rerender();
    });
  }

  document.querySelectorAll("[data-add-column]").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedColumnId = button.dataset.addColumn;
      state.openModal = "addTask";
      rerender();
    });
  });

  document.querySelectorAll(".task-open-btn").forEach(button => {
    button.addEventListener("click", e => {
      e.stopPropagation();
      state.selectedTaskId = button.dataset.taskId;
      state.openModal = "taskDetail";
      rerender();
    });
  });

  document.querySelectorAll(".task-card").forEach(card => {
    card.addEventListener("click", () => {
      state.selectedTaskId = card.dataset.taskId;
      state.openModal = "taskDetail";
      rerender();
    });
  });

  const closeModalBtn = document.getElementById("closeModalBtn");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      state.openModal = null;
      state.selectedTaskId = null;
      rerender();
    });
  }

  const cancelAddTaskBtn = document.getElementById("cancelAddTaskBtn");
  if (cancelAddTaskBtn) {
    cancelAddTaskBtn.addEventListener("click", () => {
      state.openModal = null;
      rerender();
    });
  }

  const submitAddTaskBtn = document.getElementById("submitAddTaskBtn");
  if (submitAddTaskBtn) {
    submitAddTaskBtn.addEventListener("click", async () => {
      const title = document.getElementById("taskTitleInput").value.trim();
      const description = document.getElementById("taskDescriptionInput").value.trim();
      const status = document.getElementById("taskStatusInput").value;
      const priority = document.getElementById("taskPriorityInput").value;
      const due_date = document.getElementById("taskDueDateInput").value || null;

      if (!title) {
        toast("Please enter a title", "error");
        return;
      }

      await createTask({ title, description, status, priority, due_date });
      state.openModal = null;
      toast("Task created", "success");
      rerender();
    });
  }

  const detailTitleInput = document.getElementById("detailTitleInput");
  const detailDescriptionInput = document.getElementById("detailDescriptionInput");
  const detailPriorityInput = document.getElementById("detailPriorityInput");
  const detailDueDateInput = document.getElementById("detailDueDateInput");
  const deleteTaskBtn = document.getElementById("deleteTaskBtn");

  if (detailTitleInput && state.selectedTaskId) {
    detailTitleInput.addEventListener("change", async e => {
      await updateTask(state.selectedTaskId, { title: e.target.value });
      rerender();
    });
  }

  if (detailDescriptionInput && state.selectedTaskId) {
    detailDescriptionInput.addEventListener("change", async e => {
      await updateTask(state.selectedTaskId, { description: e.target.value });
      rerender();
    });
  }

  if (detailPriorityInput && state.selectedTaskId) {
    detailPriorityInput.addEventListener("change", async e => {
      await updateTask(state.selectedTaskId, { priority: e.target.value });
      rerender();
    });
  }

  if (detailDueDateInput && state.selectedTaskId) {
    detailDueDateInput.addEventListener("change", async e => {
      await updateTask(state.selectedTaskId, { due_date: e.target.value || null });
      rerender();
    });
  }

  if (deleteTaskBtn && state.selectedTaskId) {
    deleteTaskBtn.addEventListener("click", async () => {
      await removeTask(state.selectedTaskId);
      state.openModal = null;
      state.selectedTaskId = null;
      toast("Task deleted", "success");
      rerender();
    });
  }

  document.querySelectorAll("[data-status-tab]").forEach(button => {
    button.addEventListener("click", async () => {
      if (!state.selectedTaskId) return;
      await updateTask(state.selectedTaskId, { status: button.dataset.statusTab });
      rerender();
    });
  });

  const modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", e => {
      if (e.target.id === "modalOverlay") {
        state.openModal = null;
        state.selectedTaskId = null;
        rerender();
      }
    });
  }
}