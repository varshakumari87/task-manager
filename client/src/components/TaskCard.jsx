import { useState } from 'react';
import { isOverdue } from '../utils/isOverdue';

const STATUSES = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
];

function TaskCard({ task, onDelete, onStatusChange, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [priority, setPriority] = useState(task.priority);

  const overdue = isOverdue(task);

  const handleSave = () => {
    if (!title.trim()) return;
    onEdit(task._id, { title, description, priority });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="card">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="card-actions">
          <button onClick={handleSave}>Save</button>
          <button className="delete-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`card${overdue ? ' overdue' : ''}`}>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <span className={`badge ${task.priority}`}>{task.priority}</span>
      {task.dueDate && (
        <p>
          Due: {new Date(task.dueDate).toLocaleDateString()}
          {overdue && <span className="overdue-label">Overdue</span>}
        </p>
      )}

      <div className="card-actions">
        {STATUSES.filter((s) => s.key !== task.status).map((s) => (
          <button key={s.key} onClick={() => onStatusChange(task._id, s.key)}>
            {s.label}
          </button>
        ))}
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
