export function toast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    const el = document.createElement("div");
    el.className = "stat-chip";
    el.style.boxShadow = "var(--shadow)";
    el.style.marginTop = "8px";
    el.style.borderLeft = `3px solid ${
      type === "error" ? "var(--red)" :
      type === "success" ? "var(--green)" :
      "var(--accent)"
    }`;
    el.textContent = message;
    container.appendChild(el);
  
    setTimeout(() => el.remove(), 3000);
  }