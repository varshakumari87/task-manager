import TaskCard from './TaskCard';

function TaskColumn({ title, tasks, onDelete, onStatusChange }) {
  return (
    <div className="column">
      <h2>
        {title} ({tasks.length})
      </h2>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default TaskColumn;