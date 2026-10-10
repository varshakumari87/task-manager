import { useEffect, useState } from 'react';
import FilterBar from './components/FilterBar';
import './App.css';
import { getTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import TaskForm from './components/TaskForm';
import TaskColumn from './components/TaskColumn';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import DeadlinePanel from './components/DeadlinePanel';

const COLUMNS = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await getTasks();
        setTasks(data);
      } catch (err) {
        setError('Could not load tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAdd = async (task) => {
    try {
      const { data } = await createTask(task);
      setTasks([data, ...tasks]);
      setError('');
    } catch (err) {
      setError('Could not add task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
      setError('');
    } catch (err) {
      setError('Could not delete task');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const { data } = await updateTask(id, { status });
      setTasks(tasks.map((t) => (t._id === id ? data : t)));
      setError('');
    } catch (err) {
      setError('Could not update task');
    }
  };

  const handleEdit = async (id, updates) => {
    try {
      const { data } = await updateTask(id, updates);
      setTasks(tasks.map((t) => (t._id === id ? data : t)));
      setError('');
    } catch (err) {
      setError('Could not edit task');
    }
  };

  const visibleTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority =
      priorityFilter === 'all' || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  // Derived counts
  const now = new Date();
  const totalCount = tasks.length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;
  const overdueCount = tasks.filter(
    (t) => t.status !== 'done' && t.dueDate && new Date(t.dueDate) < now
  ).length;
  const completionPct =
    totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main className="main-content">
        {activeView === 'dashboard' && (
          <>
            <div className="stat-row">
              <StatCard label="Total" count={totalCount} />
              <StatCard label="To Do" count={todoCount} />
              <StatCard label="In Progress" count={inProgressCount} />
              <StatCard label="Done" count={doneCount} />
              <StatCard label="Overdue" count={overdueCount} />
            </div>

            <div className="progress-section">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
              <span className="progress-label">{completionPct}% complete</span>
            </div>

            <DeadlinePanel tasks={tasks} />

            {error && (
              <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}
            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

            <div className="board">
              {COLUMNS.map((col) => (
                <TaskColumn
                  key={col.key}
                  title={col.label}
                  tasks={tasks.filter((t) => t.status === col.key)}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </>
        )}

        {activeView === 'tasks' && (
          <>
            <TaskForm onAdd={handleAdd} />
            <FilterBar
              search={search}
              onSearchChange={setSearch}
              priority={priorityFilter}
              onPriorityChange={setPriorityFilter}
            />
            {error && (
              <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}
            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
            <div className="board">
              {COLUMNS.map((col) => (
                <TaskColumn
                  key={col.key}
                  title={col.label}
                  tasks={visibleTasks.filter((t) => t.status === col.key)}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
