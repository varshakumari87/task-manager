import TaskCard from './TaskCard';

function TaskColumn({ title, tasks, onDelete, onStatusChange, onEdit }) {
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
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskColumn;