import React, { useState, useRef, useEffect } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import {
  validateLoginPayload,
  validateField,
  getFirstErrorKey,
} from '../../utils/validation';
import '../../style/LoginForm.css';

export default function LoginForm({ onLogin, isLoading = false }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const focusField = name => {
    if (name === 'username') usernameRef.current?.focus();
    if (name === 'password') passwordRef.current?.focus();
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError('');
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    const msg = validateField(name, value);
    if (msg) setErrors(prev => ({ ...prev, [name]: msg }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { isValid, errors: allErrors, data } = validateLoginPayload(formData);
    if (!isValid) {
      setErrors(allErrors);
      const first = getFirstErrorKey(allErrors);
      if (first) focusField(first);
      return;
    }

    try {
      await onLogin(data);
    } catch (error) {
      setSubmitError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
      usernameRef.current?.focus();
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Đăng nhập</h2>

        {submitError && (
          <ErrorMessage
            message={submitError}
            onRetry={() => setSubmitError('')}
            onDismiss={() => setSubmitError('')}
          />
        )}

        <div className="form-field">
          <label htmlFor="username" className="form-label">
            Username *
          </label>
          <input
            ref={usernameRef}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`form-input ${
              errors.username ? 'form-input--error' : ''
            }`}
            placeholder="Nhập username của bạn"
            disabled={isLoading}
          />
          {errors.username && (
            <span className="form-error">{errors.username}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password *
          </label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`form-input ${
              errors.password ? 'form-input--error' : ''
            }`}
            placeholder="Nhập password của bạn"
            disabled={isLoading}
          />
          {errors.password && (
            <span className="form-error">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinner size="small" />
              <span>Đang đăng nhập...</span>
            </>
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>
    </div>
  );
}
