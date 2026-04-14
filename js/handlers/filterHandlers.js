import { state } from "../state.js";
import { rerender } from "../app.js";

export function bindFilterHandlers() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      state.search = e.target.value;
      rerender();
    });
  }

  document.querySelectorAll("[data-priority]").forEach(button => {
    button.addEventListener("click", () => {
      state.filterPriority = button.dataset.priority;
      rerender();
    });
  });
}