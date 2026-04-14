import { state } from "../state.js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config.js";

export async function initSupabase() {
  if (SUPABASE_URL.includes("YOUR_PROJECT") || SUPABASE_ANON_KEY === "YOUR_ANON_KEY") {
    state.useSupabase = false;
    return false;
  }

  try {
    const { createClient } = window.supabase;
    state.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data: sessionData } = await state.supabase.auth.getSession();
    if (sessionData?.session?.user?.id) {
      state.guestId = sessionData.session.user.id;
      state.useSupabase = true;
      return true;
    }

    const { data, error } = await state.supabase.auth.signInAnonymously();
    if (error) throw error;

    state.guestId = data.user.id;
    state.useSupabase = true;
    return true;
  } catch (error) {
    console.error("Supabase init failed:", error);
    state.useSupabase = false;
    return false;
  }
}

export async function fetchTasksFromSupabase() {
  const { data, error } = await state.supabase
    .from("tasks")
    .select("*")
    .eq("user_id", state.guestId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function insertTaskToSupabase(task) {
  const { error } = await state.supabase.from("tasks").insert(task);
  if (error) throw error;
}

export async function updateTaskInSupabase(taskId, updates) {
  const { error } = await state.supabase.from("tasks").update(updates).eq("id", taskId);
  if (error) throw error;
}

export async function deleteTaskFromSupabase(taskId) {
  const { error } = await state.supabase.from("tasks").delete().eq("id", taskId);
  if (error) throw error;
}