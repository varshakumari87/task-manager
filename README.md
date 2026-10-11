# Task Manager

A full-stack MERN task manager with a rose-themed dashboard and a Kanban board
(To Do, In Progress, Done).

## Features
- Create, edit and delete tasks (title, description, priority, due date)
- Move tasks between To Do, In Progress and Done
- Dashboard with stat cards, progress bar and upcoming deadlines
- Overdue detection (a task is overdue only after the end of its due date)
- Search by title and filter by priority
- Data stored in MongoDB Atlas

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Tasks view
![Tasks view](screenshots/tasks.png)

## Technologies Used
- MongoDB Atlas with Mongoose
- Express.js
- React (Vite) with Axios
- Node.js

## Setup and Installation

**1. Clone the repository**

```bash
git clone https://github.com/varshakumari87/task-manager.git
cd task-manager
```

**2. Install server dependencies**

```bash
cd server
npm install
```

**3. Create `server/.env`** (see `server/.env.example`) and add your own MongoDB Atlas connection string:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

**4. Install client dependencies**

```bash
cd ../client
npm install
```

## How to Run

Terminal 1 (server):

```bash
cd server
npm run dev
```

Terminal 2 (client):

```bash
cd client
npm run dev
```

Open the link Vite prints (usually http://localhost:5173).

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | /api/tasks | List tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## AI Tool Used
Kiro

## AI Development Experience
I built the core app (Express API, MongoDB, and the first React version) first,
then used Kiro to add and improve features. I reviewed and tested each change in
the browser and committed it separately.

1. **Overdue highlighting:** I asked Kiro to show overdue tasks with a red border
   and an "Overdue" label. It added an `isOverdue` check in `TaskCard.jsx` and new
   CSS. The red border did not show at first because `App.jsx` was missing
   `import './App.css'`, so I added the import.
2. **Dashboard redesign:** I used Kiro's Quick Spec mode to build a rose-themed
   dashboard. It created `Sidebar.jsx`, `StatCard.jsx` and `DeadlinePanel.jsx`, and
   added a Dashboard/Tasks view switch using React state.
3. **Top bar and layout:** I asked Kiro to add a `TopBar.jsx` (search box,
   "+ New Task" button, avatar) and make the stat cards fill the full row with
   a CSS grid.
4. **Bug fix, due-today tasks marked Overdue:** When I tested a task due today,
   it was wrongly shown as Overdue, because the date picker stores midnight and
   the code compared it with the current time. I asked Kiro to create one shared
   `isOverdue` helper that checks against the end of the due date, and to use it
   in the card, the deadline panel and the stat count.
5. **Bug fix, search on the Dashboard:** Kiro said the top-bar search worked on
   both views, but when I tested it, the Dashboard board ignored it. I changed
   the Dashboard board to use `visibleTasks`, so the search now works there too.