import { renderHeader } from "../components/header.js";
import { renderStatsBar } from "../components/statsBar.js";
import { renderFilterBar } from "../components/filterBar.js";
import { renderBoard } from "../components/board.js";

export function renderApp() {
  const app = document.getElementById("app");
  app.innerHTML = `
    ${renderHeader()}
    ${renderStatsBar()}
    ${renderFilterBar()}
    ${renderBoard()}
  `;
}