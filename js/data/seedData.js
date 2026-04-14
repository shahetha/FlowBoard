import { uuid } from "../utils/ids.js";
import { daysAgo, hoursAgo, tomorrow, yesterday, nextWeek } from "../utils/date.js";

export const defaultMembers = [
  { id: "m1", name: "Roman Reigns", initials: "AC", color: "#7c6ef5", role: "Designer" },
  { id: "m2", name: "John Cena", initials: "BK", color: "#10b981", role: "Engineer" },
  { id: "m3", name: "Randy Ortan", initials: "SL", color: "#f59e0b", role: "PM" },
  { id: "m4", name: "Brock Lesner", initials: "MD", color: "#ef4444", role: "Engineer" }
];

export const defaultLabels = [
  { id: "l1", name: "Bug", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  { id: "l2", name: "Feature", color: "#7c6ef5", bg: "rgba(124,110,245,0.12)" },
  { id: "l3", name: "Design", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  { id: "l4", name: "Docs", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  { id: "l5", name: "Urgent", color: "#ef4444", bg: "rgba(239,68,68,0.20)" }
];

export const seedTasks = [
  {
    id: uuid(),
    title: "Design system color tokens",
    description: "Define and document all color tokens for the design system.",
    status: "done",
    priority: "high",
    due_date: null,
    assignees: ["m1"],
    labels: ["l3", "l4"],
    created_at: daysAgo(5)
  },
  {
    id: uuid(),
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment.",
    status: "done",
    priority: "normal",
    due_date: null,
    assignees: ["m2"],
    labels: ["l2"],
    created_at: daysAgo(4)
  },
  {
    id: uuid(),
    title: "User authentication flow",
    description: "Implement Supabase auth with guest accounts and RLS.",
    status: "in_review",
    priority: "high",
    due_date: tomorrow(),
    assignees: ["m2", "m4"],
    labels: ["l2", "l5"],
    created_at: daysAgo(3)
  },
  {
    id: uuid(),
    title: "Fix mobile nav overflow",
    description: "Navigation breaks on very narrow screens.",
    status: "in_review",
    priority: "high",
    due_date: yesterday(),
    assignees: ["m1"],
    labels: ["l1"],
    created_at: daysAgo(2)
  },
  {
    id: uuid(),
    title: "Dashboard analytics",
    description: "Build stats dashboard showing task velocity.",
    status: "in_progress",
    priority: "normal",
    due_date: nextWeek(),
    assignees: ["m3"],
    labels: ["l2", "l3"],
    created_at: daysAgo(2)
  },
  {
    id: uuid(),
    title: "Write API documentation",
    description: "Document all REST endpoints.",
    status: "todo",
    priority: "low",
    due_date: nextWeek(),
    assignees: ["m4"],
    labels: ["l4"],
    created_at: daysAgo(1)
  }
];

export const seedComments = [
  { id: uuid(), task_id: seedTasks[2].id, author_id: "m1", text: "Looks good. Check the policies once more.", created_at: hoursAgo(5) },
  { id: uuid(), task_id: seedTasks[2].id, author_id: "m2", text: "Updated. Ready for another review.", created_at: hoursAgo(2) }
];

export const seedActivity = [
  { id: uuid(), task_id: seedTasks[2].id, text: "moved from <strong>In Progress</strong> to <strong>In Review</strong>", actor_id: "m2", created_at: hoursAgo(3) },
  { id: uuid(), task_id: seedTasks[2].id, text: "assigned <strong>Mike Davis</strong>", actor_id: "m3", created_at: hoursAgo(6) }
];