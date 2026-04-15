# FlowBoard – Software Development Assessment Submission

FlowBoard is a modern Kanban-style task management application built as part of a software development assessment. The project focuses on clean design, modular architecture, smooth user experience, and secure cloud-based task persistence using Supabase.

The application enables users to manage work visually across workflow stages using a drag-and-drop board inspired by tools such as Trello, Asana, and Linear.

---

# Project Objective

The goal of this submission was to demonstrate:

- Strong frontend fundamentals
- Clean UI / UX design
- Real-world project structure
- Database integration
- Authentication
- Secure multi-user data isolation
- Maintainable and scalable code organization

---

# Core Features

## Kanban Workflow Board

The board includes four workflow stages:

- To Do
- In Progress
- In Review
- Done

Users can visually track progress across each stage.

---

## Drag and Drop Task Movement

Tasks can be moved between columns using drag and drop.

When a task is dropped into a new column:

- task status updates
- changes persist to the database
- UI refreshes instantly

---

## Task Management

Users can create, view, edit, and delete tasks.

Each task supports:

- Title
- Description
- Priority
- Due Date
- Assignees
- Labels / Tags
- Created Timestamp
- Updated Timestamp

---

## Labels / Tags

Tasks support labels for better organization and categorization.

Labels can be assigned to tasks for visual grouping and workflow clarity.

---

## Persistent Cloud Storage

All task data is stored in Supabase PostgreSQL.

Benefits:

- tasks remain after refresh
- progress is saved
- real cloud database integration

---

## Guest User Access

The project uses Supabase Anonymous Authentication.

When users open the app:

- guest session is created automatically
- no signup is required
- board is ready instantly

---

## User Data Isolation

Each task belongs to the authenticated user.

Using Supabase Row Level Security (RLS), users can only:

- view their own tasks
- create their own tasks
- edit their own tasks
- delete their own tasks

This ensures secure data separation.

---

## Additional UI Features

The application also includes:

- Team Members modal
- Search functionality
- Priority filters
- Task statistics
- Responsive layout
- Toast notifications
- Loading state

---

# Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES Modules)

## Backend / Database

- Supabase
- PostgreSQL
- Supabase Authentication
- Row Level Security (RLS)

## Version Control / Deployment

- GitHub
- Cloudflare Pages / Netlify / Vercel

---

# Project Structure

```bash
FlowBoard/
│── index.html
│── README.md
│── schema.sql
│
├── js/
│   ├── app.js
│   ├── main.js
│   ├── config.js
│   ├── state.js
│   │
│   ├── components/
│   ├── handlers/
│   ├── modals/
│   ├── render/
│   ├── services/
│   ├── data/
│   └── utils/
│
└── styles/
    ├── base.css
    ├── board.css
    ├── cards.css
    ├── layout.css
    ├── modal.css
    └── responsive.css
```

---

# How to Run Locally

1. Clone the repository
2. Open the project in VS Code
3. Run with Live Server
4. Configure Supabase keys in `js/config.js`

# Author

Shahetha S