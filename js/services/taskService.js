import { state } from "../state.js";
import { uuid } from "../utils/ids.js";
import { saveLocalData } from "./storageService.js";
import {
  insertTaskToSupabase,
  updateTaskInSupabase,
  deleteTaskFromSupabase
} from "./supabaseService.js";

export async function persistTask(task, isNew = false) {
  if (state.useSupabase) {
    if (isNew) {
      await insertTaskToSupabase(task);
    } else {
      const { id, ...updates } = task;
      await updateTaskInSupabase(id, updates);
    }
  } else {
    saveLocalData();
  }
}

export async function createTask(taskData) {
  const task = {
    id: uuid(),
    title: taskData.title,
    description: taskData.description || "",
    status: taskData.status || "todo",
    priority: taskData.priority || "normal",
    due_date: taskData.due_date || null,
    assignees: taskData.assignees || [],
    labels: taskData.labels || [],
    created_at: new Date().toISOString(),
    user_id: state.guestId
  };

  state.tasks.unshift(task);
  await persistTask(task, true);
  return task;
}

export async function updateTask(taskId, updates) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return null;

  Object.assign(task, updates);
  await persistTask(task, false);
  return task;
}

export async function removeTask(taskId) {
  state.tasks = state.tasks.filter(t => t.id !== taskId);
  state.comments = state.comments.filter(c => c.task_id !== taskId);
  state.activity = state.activity.filter(a => a.task_id !== taskId);

  if (state.useSupabase) {
    await deleteTaskFromSupabase(taskId);
  } else {
    saveLocalData();
  }
}