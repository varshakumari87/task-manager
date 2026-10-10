const STATUSES = [
  { key: 'todo', label: 'To Do' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
];

function TaskCard({ task, onDelete, onStatusChange }) {
  return (
    <div className="card">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <span className={`badge ${task.priority}`}>{task.priority}</span>
      {task.dueDate && (
        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      )}

      <div className="card-actions">
        {STATUSES.filter((s) => s.key !== task.status).map((s) => (
          <button key={s.key} onClick={() => onStatusChange(task._id, s.key)}>
            {s.label}
          </button>
        ))}
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;