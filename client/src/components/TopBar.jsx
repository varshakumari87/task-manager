function TopBar({ search, onSearchChange, onNewTask }) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <input
          className="top-bar-search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="top-bar-right">
        <button className="top-bar-new-btn" onClick={onNewTask}>
          + New Task
        </button>
        <div className="top-bar-user">
          <div className="avatar">VK</div>
          <span className="avatar-name">Varsha</span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
