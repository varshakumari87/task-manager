import { useEffect, useState } from 'react';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from './api/taskApi';
import TaskForm from './components/TaskForm';
import TaskColumn from './components/TaskColumn';

const COLUMNS = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onAdd={handleAdd} />

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}

      <div className="board">
        {COLUMNS.map((col) => (
          <TaskColumn
            key={col.key}
            title={col.label}
            tasks={tasks.filter((t) => t.status === col.key)}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}

export default App;