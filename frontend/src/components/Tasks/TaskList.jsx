import React from 'react';
import TaskItem from './TaskItem';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import '../../style/TaskList.css';

export default function TaskList({
  tasks = [],
  isLoading = false,
  error = null,
  onEditTask,
  onDeleteTask,
  onRetryLoad,
  searchTerm = '',
}) {

  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === searchTerm.toLowerCase()) {
        return (
          <span key={index} className="search-highlight">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleRetryLoad = () => {
    if (onRetryLoad) {
      onRetryLoad();
    }
  };


  if (isLoading) {
    return (
      <div className="task-list-container">
        <div className="task-list-loading">
          <LoadingSpinner size="large" />
          <p className="loading-text">Đang tải danh sách tasks...</p>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="task-list-container">
        <ErrorMessage
          message={error}
          onRetry={onRetryLoad ? handleRetryLoad : undefined}
          onDismiss={() => {}}
        />
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="task-list-empty">
          <div className="empty-icon">🔍</div>
          <h3 className="empty-title">
            {searchTerm ? 'Không tìm thấy kết quả' : 'Chưa có task nào'}
          </h3>
          <p className="empty-description">
            {searchTerm
              ? `Không có task nào phù hợp với "${searchTerm}". Thử tìm kiếm với từ khóa khác.`
              : 'Bắt đầu tạo task đầu tiên để quản lý công việc của bạn!'
            }
          </p>
        </div>
      </div>
    );
  }



  return (
    <div className="task-list-container">
      <div className="task-list-content">
        <div className="task-grid">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              highlightText={highlightText}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
