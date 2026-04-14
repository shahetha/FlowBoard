import { state } from "./state.js";
import { renderApp } from "./render/renderApp.js";
import { renderModal } from "./render/renderModals.js";
import { bindFilterHandlers } from "./handlers/filterHandlers.js";
import { bindDragHandlers } from "./handlers/dragHandlers.js";
import { bindTaskHandlers } from "./handlers/taskHandlers.js";
import { ensureGuestId, loadLocalData } from "./services/storageService.js";
import { initSupabase, fetchTasksFromSupabase } from "./services/supabaseService.js";
import { defaultMembers, defaultLabels } from "./data/seedData.js";

export async function initApp() {
  state.members = [...defaultMembers];
  state.labels = [...defaultLabels];

  const supabaseReady = await initSupabase();

  if (supabaseReady) {
    try {
      state.tasks = await fetchTasksFromSupabase();
      state.comments = [];
      state.activity = [];
    } catch (error) {
      console.error(error);
      ensureGuestId();
      loadLocalData();
    }
  } else {
    ensureGuestId();
    loadLocalData();
  }

  rerender();
}

export function rerender() {
  renderApp();
  renderModal();
  bindFilterHandlers();
  bindDragHandlers();
  bindTaskHandlers();
}