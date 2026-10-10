function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Task Manager</h2>
      <nav>
        <button
          className={`nav-item${activeView === 'dashboard' ? ' active' : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-item${activeView === 'tasks' ? ' active' : ''}`}
          onClick={() => onNavigate('tasks')}
        >
          Tasks
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
