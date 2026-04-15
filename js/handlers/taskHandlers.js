import { state } from "../state.js";
import { createTask, updateTask, removeTask } from "../services/taskService.js";
import { rerender } from "../app.js";
import { toast } from "../components/toast.js";
import { uuid } from "../utils/ids.js";

let selectedAssignees = [];
let selectedLabels = [];

function addActivity(taskId, text) {
  state.activity.unshift({
    id: uuid(),
    task_id: taskId,
    text,
    actor_id: "system",
    created_at: new Date().toISOString(),
  });
}

export function bindTaskHandlers() {
  const resetAddTaskState = () => {
    selectedAssignees = [];
    selectedLabels = [];
  };

  const forceCloseModal = () => {
    resetAddTaskState();
    state.openModal = null;
    state.selectedTaskId = null;

    const modalRoot = document.getElementById("modalRoot");
    if (modalRoot) modalRoot.innerHTML = "";

    rerender();
  };

  const newTaskBtn = document.getElementById("newTaskBtn");
  if (newTaskBtn) {
    newTaskBtn.addEventListener("click", () => {
      state.selectedColumnId = "todo";
      state.openModal = "addTask";
      resetAddTaskState();
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

  document.querySelectorAll("[data-add-column]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedColumnId = button.dataset.addColumn;
      state.openModal = "addTask";
      resetAddTaskState();
      rerender();
    });
  });

  document.querySelectorAll(".task-open-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      state.selectedTaskId = button.dataset.taskId;
      state.openModal = "taskDetail";
      rerender();
    });
  });

  document.querySelectorAll(".task-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedTaskId = card.dataset.taskId;
      state.openModal = "taskDetail";
      rerender();
    });
  });

  document.querySelectorAll("[data-assignee-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const memberId = button.dataset.assigneeId;
      if (!memberId) return;

      if (selectedAssignees.includes(memberId)) {
        selectedAssignees = selectedAssignees.filter((id) => id !== memberId);
        button.classList.remove("selected");
      } else {
        selectedAssignees.push(memberId);
        button.classList.add("selected");
      }
    });
  });

  document.querySelectorAll("[data-label-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const labelId = button.dataset.labelId;
      if (!labelId) return;

      if (selectedLabels.includes(labelId)) {
        selectedLabels = selectedLabels.filter((id) => id !== labelId);
        button.classList.remove("selected");
      } else {
        selectedLabels.push(labelId);
        button.classList.add("selected");
      }
    });
  });

  document.querySelectorAll("[data-detail-assignee-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!state.selectedTaskId) return;

      const memberId = button.dataset.detailAssigneeId;
      const task = state.tasks.find((t) => t.id === state.selectedTaskId);
      if (!task || !memberId) return;

      let nextAssignees = [...(task.assignees || [])];

      if (nextAssignees.includes(memberId)) {
        nextAssignees = nextAssignees.filter((id) => id !== memberId);
      } else {
        nextAssignees.push(memberId);
      }

      try {
        await updateTask(state.selectedTaskId, { assignees: nextAssignees });
        addActivity(state.selectedTaskId, "updated assignees");
        rerender();
      } catch (error) {
        console.error("Update assignees failed:", error);
        toast(error?.message || "Failed to update assignees", "error");
      }
    });
  });

  document.querySelectorAll("[data-detail-label-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!state.selectedTaskId) return;

      const labelId = button.dataset.detailLabelId;
      const task = state.tasks.find((t) => t.id === state.selectedTaskId);
      if (!task || !labelId) return;

      let nextLabels = [...(task.labels || [])];

      if (nextLabels.includes(labelId)) {
        nextLabels = nextLabels.filter((id) => id !== labelId);
      } else {
        nextLabels.push(labelId);
      }

      try {
        await updateTask(state.selectedTaskId, { labels: nextLabels });
        addActivity(state.selectedTaskId, "updated labels");
        rerender();
      } catch (error) {
        console.error("Update labels failed:", error);
        toast(error?.message || "Failed to update labels", "error");
      }
    });
  });

  const closeModalBtn = document.getElementById("closeModalBtn");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      forceCloseModal();
    });
  }

  const cancelAddTaskBtn = document.getElementById("cancelAddTaskBtn");
  if (cancelAddTaskBtn) {
    cancelAddTaskBtn.addEventListener("click", () => {
      forceCloseModal();
    });
  }

  const submitAddTaskBtn = document.getElementById("submitAddTaskBtn");
  if (submitAddTaskBtn) {
    submitAddTaskBtn.addEventListener("click", async () => {
      const title = document.getElementById("taskTitleInput")?.value.trim() || "";
      const description =
        document.getElementById("taskDescriptionInput")?.value.trim() || "";
      const status =
        document.getElementById("taskStatusInput")?.value || "todo";
      const priority =
        document.getElementById("taskPriorityInput")?.value || "normal";
      const due_date =
        document.getElementById("taskDueDateInput")?.value || null;

      if (!title) {
        toast("Please enter a title", "error");
        return;
      }

      try {
        await createTask({
          title,
          description,
          status,
          priority,
          due_date,
          assignees: [...selectedAssignees],
          labels: [...selectedLabels],
        });

        forceCloseModal();
        toast("Task created", "success");
      } catch (error) {
        console.error("Create task failed:", error);
        toast(error?.message || "Failed to create task", "error");
      }
    });
  }

  const detailTitleInput = document.getElementById("detailTitleInput");
  const detailDescriptionInput = document.getElementById("detailDescriptionInput");
  const detailPriorityInput = document.getElementById("detailPriorityInput");
  const detailDueDateInput = document.getElementById("detailDueDateInput");
  const deleteTaskBtn = document.getElementById("deleteTaskBtn");

  if (detailTitleInput && state.selectedTaskId) {
    detailTitleInput.addEventListener("change", async (e) => {
      try {
        await updateTask(state.selectedTaskId, { title: e.target.value });
        addActivity(state.selectedTaskId, "updated title");
        rerender();
      } catch (error) {
        console.error("Update title failed:", error);
        toast(error?.message || "Failed to update title", "error");
      }
    });
  }

  if (detailDescriptionInput && state.selectedTaskId) {
    detailDescriptionInput.addEventListener("change", async (e) => {
      try {
        await updateTask(state.selectedTaskId, { description: e.target.value });
        addActivity(state.selectedTaskId, "updated description");
        rerender();
      } catch (error) {
        console.error("Update description failed:", error);
        toast(error?.message || "Failed to update description", "error");
      }
    });
  }

  if (detailPriorityInput && state.selectedTaskId) {
    detailPriorityInput.addEventListener("change", async (e) => {
      try {
        await updateTask(state.selectedTaskId, { priority: e.target.value });
        addActivity(state.selectedTaskId, "updated priority");
        rerender();
      } catch (error) {
        console.error("Update priority failed:", error);
        toast(error?.message || "Failed to update priority", "error");
      }
    });
  }

  if (detailDueDateInput && state.selectedTaskId) {
    detailDueDateInput.addEventListener("change", async (e) => {
      try {
        await updateTask(state.selectedTaskId, {
          due_date: e.target.value || null,
        });
        addActivity(state.selectedTaskId, "updated due date");
        rerender();
      } catch (error) {
        console.error("Update due date failed:", error);
        toast(error?.message || "Failed to update due date", "error");
      }
    });
  }

  if (deleteTaskBtn && state.selectedTaskId) {
    deleteTaskBtn.addEventListener("click", async () => {
      try {
        await removeTask(state.selectedTaskId);
        forceCloseModal();
        toast("Task deleted", "success");
      } catch (error) {
        console.error("Delete task failed:", error);
        toast(error?.message || "Failed to delete task", "error");
      }
    });
  }

  document.querySelectorAll("[data-status-tab]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!state.selectedTaskId) return;

      try {
        await updateTask(state.selectedTaskId, {
          status: button.dataset.statusTab,
        });
        addActivity(state.selectedTaskId, `moved to ${button.dataset.statusTab}`);
        rerender();
      } catch (error) {
        console.error("Update status failed:", error);
        toast(error?.message || "Failed to update status", "error");
      }
    });
  });

  const modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target.id === "modalOverlay") {
        forceCloseModal();
      }
    });
  }
}