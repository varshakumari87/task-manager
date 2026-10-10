/**
 * Returns true when a task is overdue.
 *
 * A task is overdue only after the END of its due date (23:59:59.999),
 * so tasks due today are never considered overdue until tomorrow.
 *
 * @param {{ status: string, dueDate?: string | null }} task
 * @returns {boolean}
 */
export function isOverdue(task) {
  if (task.status === 'done' || !task.dueDate) return false;
  const end = new Date(task.dueDate);
  end.setHours(23, 59, 59, 999);
  return new Date() > end;
}
