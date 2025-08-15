import React from 'react';
import '../../style/TaskItem.css';
export default function TaskItem({ task, onEdit, onDelete, highlightText, searchTerm }) {
  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa task "${task.title}"?`)) {
      onDelete(task.id);
    }
  };


  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };


  const isOverdue = dueDate => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today && task.status !== 'completed';
  };


  const getDaysUntilDue = dueDate => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusText = status => {
    const statusMap = {
      todo: 'Todo',
      'in-progress': 'Đang làm',
      completed: 'Hoàn thành',
    };
    return statusMap[status] || status;
  };


  const getPriorityText = priority => {
    const priorityMap = {
      low: 'Thấp',
      medium: 'Trung bình',
      high: 'Cao',
    };
    return priorityMap[priority] || priority;
  };

  const overdue = isOverdue(task.dueDate);
  const daysUntilDue = getDaysUntilDue(task.dueDate);

  return (
    <div className={`task-item task-item--${task.status} ${overdue ? 'task-item--overdue' : ''}`}>
      <div className="task-header">
        <div className={`task-status-indicator task-status-indicator--${task.status}`}></div>
        <span className={`task-priority-badge task-priority-badge--${task.priority}`}>
          {getPriorityText(task.priority)}
        </span>
      </div>

      <div className="task-content">
        <h4 className="task-title">
          {highlightText ? highlightText(task.title, searchTerm) : task.title}
        </h4>

        {task.description && (
          <p className="task-description">
            {highlightText ? highlightText(task.description, searchTerm) : task.description}
          </p>
        )}

        <div className="task-meta">
          <div className="task-date-info">
            <span className={`task-due-date ${
              overdue ? 'task-due-date--overdue' :
              daysUntilDue <= 3 && daysUntilDue > 0 ? 'task-due-date--warning' : ''
            }`}>
              📅 {formatDate(task.dueDate)}
              {overdue && ' (Quá hạn)'}
              {!overdue && daysUntilDue <= 3 && daysUntilDue > 0 && ` (${daysUntilDue} ngày)`}
            </span>
          </div>

          <span className={`task-status-text task-status-text--${task.status}`}>
            {getStatusText(task.status)}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="task-action-btn task-action-btn--edit"
          onClick={handleEdit}
          title="Chỉnh sửa task"
        >
          ✏️
        </button>

        <button
          className="task-action-btn task-action-btn--delete"
          onClick={handleDelete}
          title="Xóa task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
