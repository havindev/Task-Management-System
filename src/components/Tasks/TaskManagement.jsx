import React, { useState, useEffect, useRef, useMemo } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import ErrorMessage from '../Common/ErrorMessage';
import { taskAPI } from '../../api/taskAPI';
import '../../style/TaskManagement.css';


function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function TaskManagement({ user }) {
  console.log('🏗️ TaskManagement rendered with user:', user);
  
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isFormLoading, setIsFormLoading] = useState(false);


  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const taskListRef = useRef(null);


  const debouncedSearchTerm = useDebounce(searchTerm, 500);


  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;


    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(searchLower) ||
          task.description?.toLowerCase().includes(searchLower)
      );
    }


    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }


    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }


    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];


      if (sortBy === 'createdAt' || sortBy === 'updatedAt' || sortBy === 'dueDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }


      if (sortBy === 'priority') {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        aValue = priorityOrder[aValue] || 0;
        bValue = priorityOrder[bValue] || 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [tasks, debouncedSearchTerm, statusFilter, priorityFilter, sortBy, sortOrder]);


  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setSortBy('createdAt');
    setSortOrder('desc');
  };

  useEffect(() => {
    if (user?.id) loadTasks();

  }, [user?.id]);

  const loadTasks = async () => {
    console.log('📋 Loading tasks for user:', user.id);
    setIsLoading(true);
    setError(null);
    try {
      const data = await taskAPI.getAllTasks(user.id);
      console.log('✅ Tasks loaded:', data.length, 'tasks');
      setTasks(data);
    } catch (err) {
      console.error('❌ Error loading tasks:', err);
      setError(err.message || 'Không thể tải danh sách tasks.');
    } finally {
      setIsLoading(false);
    }
  };


  const createTask = async taskData => {
    setIsFormLoading(true);
    try {
      const created = await taskAPI.createTask(taskData, user.id);
      setTasks(prev => [created, ...prev]);
      setShowTaskForm(false);
      setEditingTask(null);
      taskListRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      throw new Error(err.message || 'Không thể tạo task. Vui lòng thử lại.');
    } finally {
      setIsFormLoading(false);
    }
  };


  const updateTask = async taskData => {
    if (!taskData.id) throw new Error('Thiếu id của task cần cập nhật');
    setIsFormLoading(true);
    try {
      const updated = await taskAPI.updateTask(taskData.id, taskData);
      setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (err) {
      console.error(err);
      throw new Error(err.message || 'Không thể cập nhật task. Vui lòng thử lại.');
    } finally {
      setIsFormLoading(false);
    }
  };


  const deleteTask = async taskId => {
    const snapshot = tasks;
    setTasks(prev => prev.filter(t => t.id !== taskId));
    try {
      await taskAPI.deleteTask(taskId);
    } catch (err) {
      console.error(err);
      setTasks(snapshot);
      setError(err.message || 'Không thể xóa task. Vui lòng thử lại.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleTaskSave = async data => {
    if (editingTask) await updateTask(data);
    else await createTask(data);
  };

  return (
    <div className="task-management">
      {error && (
        <ErrorMessage
          message={error}
          onRetry={loadTasks}
          onDismiss={() => setError(null)}
        />
      )}

      <div className="task-management-header">
        <div className="header-title">
          <h2>Xin chào {user.username}! 👋</h2>
          <p className="task-count">
            {filteredAndSortedTasks.length} / {tasks.length} tasks
            {debouncedSearchTerm && ` • Tìm kiếm: "${debouncedSearchTerm}"`}
          </p>
        </div>
        <button
          className="create-task-btn"
          onClick={() => {
            setEditingTask(null);
            setShowTaskForm(true);
          }}
        >
          ➕ Tạo Task Mới
        </button>
      </div>


      <div className="search-filter-container">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm tasks theo tiêu đề hoặc mô tả..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
                title="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>
        </div>


        <div className="filter-controls">

          <div className="filter-group">
            <label>Trạng thái:</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tất cả</option>
              <option value="todo">Todo</option>
              <option value="in-progress">Đang làm</option>
              <option value="completed">Hoàn thành</option>
            </select>
          </div>


          <div className="filter-group">
            <label>Độ ưu tiên:</label>
            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tất cả</option>
              <option value="high">Cao</option>
              <option value="medium">Trung bình</option>
              <option value="low">Thấp</option>
            </select>
          </div>


          <div className="filter-group">
            <label>Sắp xếp theo:</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="createdAt">Ngày tạo</option>
              <option value="updatedAt">Ngày cập nhật</option>
              <option value="dueDate">Hạn hoàn thành</option>
              <option value="priority">Độ ưu tiên</option>
              <option value="title">Tiêu đề</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Thứ tự:</label>
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="filter-select"
            >
              <option value="desc">Giảm dần</option>
              <option value="asc">Tăng dần</option>
            </select>
          </div>


          <button
            className="clear-filters-btn"
            onClick={clearFilters}
            title="Xóa tất cả bộ lọc"
          >
            🗑️ Xóa bộ lọc
          </button>
        </div>
      </div>


      {tasks.length > 0 && (
        <div className="task-stats">
          <div className="stat-item">
            <span className="stat-label">Todo:</span>
            <span className="stat-value todo">
              {tasks.filter(t => t.status === 'todo').length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Đang làm:</span>
            <span className="stat-value in-progress">
              {tasks.filter(t => t.status === 'in-progress').length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Hoàn thành:</span>
            <span className="stat-value completed">
              {tasks.filter(t => t.status === 'completed').length}
            </span>
          </div>
          <div className="stat-item progress-stat">
            <span className="stat-label">Tiến độ:</span>
            <span className="stat-value">
              {Math.round(
                (tasks.filter(t => t.status === 'completed').length / tasks.length) * 100
              )}%
            </span>
          </div>
        </div>
      )}

      <div ref={taskListRef}>
        <TaskList
          tasks={filteredAndSortedTasks}
          isLoading={isLoading}
          error={null}
          onEditTask={t => {
            setEditingTask(t);
            setShowTaskForm(true);
          }}
          onDeleteTask={deleteTask}
          onRetryLoad={loadTasks}
          searchTerm={debouncedSearchTerm}
        />
      </div>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSave={handleTaskSave}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          isLoading={isFormLoading}
        />
      )}
    </div>
  );
}
