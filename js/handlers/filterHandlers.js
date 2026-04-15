import { state } from "../state.js";
import { rerender } from "../app.js";

export function bindFilterHandlers() {
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value;
      const cursorPos = e.target.selectionStart ?? value.length;

      state.search = value;
      rerender();

      requestAnimationFrame(() => {
        const newInput = document.getElementById("searchInput");
        if (!newInput) return;

        newInput.focus();
        newInput.setSelectionRange(cursorPos, cursorPos);
      });
    });
  }

  document.querySelectorAll("[data-priority]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filterPriority = button.dataset.priority;
      rerender();
    });
  });
}