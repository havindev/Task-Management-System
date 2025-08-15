import React, { useState, useRef, useEffect, useCallback } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import {
  validateTaskPayload,
  validateField,
  getFirstErrorKey,
  trimStrings,
} from '../../utils/validation';
import '../../style/TaskForm.css';

export default function TaskForm({ task = null, onSave, onCancel, isLoading = false }) {
  const isEditMode = Boolean(task);

  const getInitialFormData = useCallback(
    () => ({
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || 'todo',
      priority: task?.priority || 'medium',
      dueDate: task?.dueDate || '',
    }),
    [task]
  );

  const [formData, setFormData] = useState(getInitialFormData);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const titleRef = useRef(null);
  const fieldRefs = {
    title: titleRef,
  };

  useEffect(() => {
    titleRef.current?.focus();
  }, []);


  useEffect(() => {
    setFormData(getInitialFormData());
    setErrors({});
    setSubmitError('');
  }, [getInitialFormData]);

  const focusField = name => {
    fieldRefs[name]?.current?.focus();
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError('');
  };

  const handleInputBlur = e => {
    const { name, value } = e.target;
    const msg = validateField(name, value);
    if (msg) setErrors(prev => ({ ...prev, [name]: msg }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { isValid, errors: allErrors, data } = validateTaskPayload(formData);
    if (!isValid) {
      setErrors(allErrors);
      const first = getFirstErrorKey(allErrors);
      if (first) focusField(first);
      return;
    }

    try {

      const payload = trimStrings({
        ...data,
        ...(task?.id ? { id: task.id } : {}),
      });
      await onSave(payload);
    } catch (error) {
      setSubmitError(
        error.message || 'Có lỗi xảy ra khi lưu task. Vui lòng thử lại.'
      );
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2 className="task-form-title">
          {isEditMode ? 'Chỉnh sửa Task' : 'Tạo Task Mới'}
        </h2>

        {submitError && (
          <ErrorMessage
            message={submitError}
            onRetry={() => setSubmitError('')}
            onDismiss={() => setSubmitError('')}
          />
        )}

        <div className="form-field">
          <label htmlFor="title" className="form-label">
            Tiêu đề *
          </label>
          <input
            ref={titleRef}
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`form-input ${errors.title ? 'form-input--error' : ''}`}
            placeholder="Nhập tiêu đề task..."
            maxLength="100"
            disabled={isLoading}
          />
          {errors.title && <span className="form-error">{errors.title}</span>}
          <span className="form-hint">{formData.title.length}/100 ký tự</span>
        </div>

        <div className="form-field">
          <label htmlFor="description" className="form-label">
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`form-textarea ${
              errors.description ? 'form-input--error' : ''
            }`}
            placeholder="Nhập mô tả chi tiết (tùy chọn)..."
            rows="4"
            maxLength="500"
            disabled={isLoading}
          />
          {errors.description && (
            <span className="form-error">{errors.description}</span>
          )}
          <span className="form-hint">
            {formData.description.length}/500 ký tự
          </span>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="status" className="form-label">
              Trạng thái *
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`form-select ${
                errors.status ? 'form-input--error' : ''
              }`}
              disabled={isLoading}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">Đang làm</option>
              <option value="completed">Hoàn thành</option>
            </select>
            {errors.status && (
              <span className="form-error">{errors.status}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="priority" className="form-label">
              Độ ưu tiên *
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`form-select ${
                errors.priority ? 'form-input--error' : ''
              }`}
              disabled={isLoading}
            >
              <option value="low">Thấp</option>
              <option value="medium">Trung bình</option>
              <option value="high">Cao</option>
            </select>
            {errors.priority && (
              <span className="form-error">{errors.priority}</span>
            )}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="dueDate" className="form-label">
            Ngày hạn *
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`form-input ${
              errors.dueDate ? 'form-input--error' : ''
            }`}
            min={getTodayDate()}
            disabled={isLoading}
          />
          {errors.dueDate && (
            <span className="form-error">{errors.dueDate}</span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Hủy
          </button>

          <button type="submit" className="save-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner size="small" />
                <span>Đang lưu...</span>
              </>
            ) : isEditMode ? (
              'Cập nhật'
            ) : (
              'Tạo Task'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
