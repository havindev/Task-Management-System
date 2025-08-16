import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import ErrorMessage from '../Common/ErrorMessage';
import { vercelAPI } from '../../api/vercelAPI';
import { MESSAGES, CONFIG } from '../../constants/messages';
import { migrateLocalStorageToAPI } from '../../utils/dataMigration';
import '../../style/TaskManagement.css';


// Simple debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Main task management component
export default function TaskManagement({ user }) {
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


  const debouncedSearchTerm = useDebounce(searchTerm, CONFIG.DEBOUNCE_DELAY);


  const taskList = useMemo(() => {
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

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await vercelAPI.getAllTasks(user.id);
      setTasks(data);
      
      // Auto-migration: if no tasks found, try migrating from localStorage
      if (data.length === 0) {
        const migrated = await migrateLocalStorageToAPI(vercelAPI, user.id);
        if (migrated) {
          // Reload tasks after migration
          const newData = await vercelAPI.getAllTasks(user.id);
          setTasks(newData);
        }
      }
    } catch (err) {
      // Handle error
      setError(err.message || 'Không thể tải danh sách tasks.');
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    if (user?.id) loadTasks();
  }, [user?.id, loadTasks]);


  const createTask = async taskData => {
    setIsFormLoading(true);
    try {
      const created = await vercelAPI.createTask(taskData, user.id);
      setTasks(prev => [created, ...prev]);
      setShowTaskForm(false);
      setEditingTask(null);
      taskListRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      throw new Error(err.message || 'Không thể tạo task. Vui lòng thử lại.');
    } finally {
      setIsFormLoading(false);
    }
  };


  const updateTask = async taskData => {
    if (!taskData.id) throw new Error('Thiếu id của task cần cập nhật');
    setIsFormLoading(true);
    try {
      const updated = await vercelAPI.updateTask(taskData.id, taskData);
      setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (err) {
      throw new Error(err.message || 'Không thể cập nhật task. Vui lòng thử lại.');
    } finally {
      setIsFormLoading(false);
    }
  };


  // Optimistic delete - remove from UI first
  const deleteTask = async taskId => {
    const snapshot = tasks;
    setTasks(prev => prev.filter(t => t.id !== taskId));
    try {
      await vercelAPI.deleteTask(taskId);
    } catch (err) {
      setTasks(snapshot);
      setError(err.message || 'Không thể xóa task. Vui lòng thử lại.');
      setTimeout(() => setError(null), CONFIG.ERROR_DISPLAY_DURATION);
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
            {taskList.length} / {tasks.length} tasks
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
            <label>{MESSAGES.TASKS.PRIORITY_LABEL}</label>
            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">{MESSAGES.TASKS.PRIORITY_ALL}</option>
              <option value="high">{MESSAGES.TASKS.PRIORITY_HIGH}</option>
              <option value="medium">{MESSAGES.TASKS.PRIORITY_MEDIUM}</option>
              <option value="low">{MESSAGES.TASKS.PRIORITY_LOW}</option>
            </select>
          </div>


          <div className="filter-group">
            <label>{MESSAGES.TASKS.SORT_BY_LABEL}</label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="createdAt">{MESSAGES.TASKS.SORT_CREATED}</option>
              <option value="updatedAt">{MESSAGES.TASKS.SORT_UPDATED}</option>
              <option value="dueDate">{MESSAGES.TASKS.SORT_DUE_DATE}</option>
              <option value="priority">{MESSAGES.TASKS.SORT_PRIORITY}</option>
              <option value="title">{MESSAGES.TASKS.SORT_TITLE}</option>
            </select>
          </div>

          <div className="filter-group">
            <label>{MESSAGES.TASKS.SORT_ORDER_LABEL}</label>
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="filter-select"
            >
              <option value="desc">{MESSAGES.TASKS.SORT_DESC}</option>
              <option value="asc">{MESSAGES.TASKS.SORT_ASC}</option>
            </select>
          </div>


          <button
            className="clear-filters-btn"
            onClick={clearFilters}
            title={MESSAGES.TASKS.CLEAR_FILTERS}
          >
            {MESSAGES.TASKS.CLEAR_FILTERS}
          </button>
        </div>
      </div>


      {tasks.length > 0 && (
        <div className="task-stats">
          <div className="stat-item">
            <span className="stat-label">{MESSAGES.TASKS.STATUS_TODO}:</span>
            <span className="stat-value todo">
              {tasks.filter(t => t.status === 'todo').length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">{MESSAGES.TASKS.STATUS_IN_PROGRESS}:</span>
            <span className="stat-value in-progress">
              {tasks.filter(t => t.status === 'in-progress').length}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">{MESSAGES.TASKS.STATUS_COMPLETED}:</span>
            <span className="stat-value completed">
              {tasks.filter(t => t.status === 'completed').length}
            </span>
          </div>
          <div className="stat-item progress-stat">
            <span className="stat-label">{MESSAGES.TASKS.PROGRESS_LABEL}</span>
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
          tasks={taskList}
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
