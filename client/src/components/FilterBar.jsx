function FilterBar({ search, onSearchChange, priority, onPriorityChange }) {
  return (
    <div className="filter-bar">
      <input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select value={priority} onChange={(e) => onPriorityChange(e.target.value)}>
        <option value="all">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

export default FilterBar;