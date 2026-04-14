export function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString();
  }
  
  export function hoursAgo(n) {
    const d = new Date();
    d.setHours(d.getHours() - n);
    return d.toISOString();
  }
  
  export function tomorrow() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }
  
  export function yesterday() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  }
  
  export function nextWeek() {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  }
  
  export function timeAgo(iso) {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }
  
  export function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso + (iso.includes("T") ? "" : "T00:00:00"));
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  
  export function dueBadgeClass(due) {
    if (!due) return null;
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const d = new Date(due + "T00:00:00");
    const diff = Math.round((d - today) / 86400000);
  
    if (diff < 0) return { cls: "due-overdue", label: "Overdue" };
    if (diff === 0) return { cls: "due-soon", label: "Today" };
    if (diff <= 2) return { cls: "due-soon", label: `${diff}d` };
  
    return { cls: "due-ok", label: formatDate(due) };
  }