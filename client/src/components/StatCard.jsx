function StatCard({ label, count }) {
  return (
    <div className="stat-card">
      <span className="stat-count">{count}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default StatCard;
