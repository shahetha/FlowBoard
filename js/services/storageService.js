import { state } from "../state.js";
import { seedTasks, seedComments, seedActivity, defaultMembers, defaultLabels } from "../data/seedData.js";
import { uuid } from "../utils/ids.js";

const STORAGE_KEY = "flowboard_store";
const GUEST_KEY = "flowboard_guest";

export function ensureGuestId() {
  let guestId = localStorage.getItem(GUEST_KEY);
  if (!guestId) {
    guestId = uuid();
    localStorage.setItem(GUEST_KEY, guestId);
  }
  state.guestId = guestId;
}

export function loadLocalData() {
  state.members = [...defaultMembers];
  state.labels = [...defaultLabels];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    state.tasks = [...seedTasks];
    state.comments = [...seedComments];
    state.activity = [...seedActivity];
    saveLocalData();
    return;
  }

  const parsed = JSON.parse(raw);
  state.tasks = parsed.tasks || [...seedTasks];
  state.comments = parsed.comments || [...seedComments];
  state.activity = parsed.activity || [...seedActivity];
}

export function saveLocalData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      tasks: state.tasks,
      comments: state.comments,
      activity: state.activity
    })
  );
}