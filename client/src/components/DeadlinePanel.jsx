function DeadlinePanel({ tasks }) {
  const now = new Date();

  const withDue = tasks
    .filter((t) => t.dueDate != null)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const isOverdue = (t) =>
    t.status !== 'done' && new Date(t.dueDate) < now;

  return (
    <div className="deadline-panel">
      <h3 className="panel-title">Upcoming Deadlines</h3>
      {withDue.length === 0 ? (
        <p className="panel-empty">No upcoming deadlines.</p>
      ) : (
        <ul className="deadline-list">
          {withDue.map((task) => (
            <li
              key={task._id}
              className={`deadline-item${isOverdue(task) ? ' overdue' : ''}`}
            >
              <span className="deadline-title">{task.title}</span>
              <span className="deadline-date">
                {new Date(task.dueDate).toLocaleDateString()}
                {isOverdue(task) && (
                  <span className="overdue-badge">Overdue</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeadlinePanel;
