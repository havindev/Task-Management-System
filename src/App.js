import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Auth/Navbar';
import LoginForm from './components/Auth/LoginForm';
import TaskManagement from './components/Tasks/TaskManagement';
import ErrorMessage from './components/Common/ErrorMessage';
import { authAPI } from './api/authAPI';
import './style/App.css';

function App() {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [globalError, setGlobalError] = useState(null);


  useEffect(() => {
    checkExistingAuth();
  }, []);


  const checkExistingAuth = async () => {
    console.log('🔍 Starting auth check...');
    setAuthLoading(true);

    try {
      const savedUser = localStorage.getItem('taskapp_user');
      const savedToken = localStorage.getItem('taskapp_token');
      console.log('💾 Saved auth data:', { hasUser: !!savedUser, hasToken: !!savedToken });

      if (savedUser && savedToken) {
        const userData = JSON.parse(savedUser);
        console.log('👤 User data:', userData);

        // Timeout after 3 seconds for faster loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        );

        const isValidSession = await Promise.race([
          verifySession(userData.id, savedToken),
          timeoutPromise
        ]);

        console.log('✅ Session valid:', isValidSession);

        if (isValidSession) {
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          console.log('❌ Session invalid, clearing auth');
          clearAuthData();
        }
      } else {
        console.log('🚫 No saved auth data');
      }
    } catch (error) {
      console.error('❗ Auth check error:', error);
      clearAuthData();
    } finally {
      console.log('✨ Auth check completed');
      setAuthLoading(false);
    }
  };


  const verifySession = async (userId, token) => {
    try {
      return await authAPI.verifySession(userId, token);
    } catch (error) {
      return false;
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem('taskapp_user');
    localStorage.removeItem('taskapp_token');
    setUser(null);
    setIsLoggedIn(false);
  };

  const handleLogin = async credentials => {
    try {
      const { user, token } = await authAPI.login(credentials);

      localStorage.setItem('taskapp_user', JSON.stringify(user));
      localStorage.setItem('taskapp_token', token);

      setUser(user);
      setIsLoggedIn(true);

      setGlobalError(null);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();

      clearAuthData();

      setGlobalError(null);
    } catch (error) {
      console.error('Logout error:', error);
      setGlobalError('Có lỗi khi đăng xuất. Vui lòng thử lại.');
    }
  };

  const handleGlobalError = error => {
    setGlobalError(error);

    setTimeout(() => setGlobalError(null), 5000);
  };

  void handleGlobalError;

  useEffect(() => {
    const handleOnline = () => {
      if (globalError && globalError.includes('mạng')) {
        setGlobalError(null);
      }
    };

    const handleOffline = () => {
      setGlobalError('Mất kết nối mạng. Vui lòng kiểm tra kết nối internet.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [globalError]);

  if (authLoading) {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <div className="app-logo">📝</div>
          <h1>Task Manager</h1>
          <div className="loading-spinner"></div>
          <p>Đang kiểm tra phiên đăng nhập...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="app">
        {globalError && (
          <div className="global-error">
            <ErrorMessage
              message={globalError}
              onDismiss={() => setGlobalError(null)}
            />
          </div>
        )}
        <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
        <main className="app-main">
          {isLoggedIn ? (
            <TaskManagement user={user} />
          ) : (
            <div className="login-container">
              <div className="login-welcome">
                <div className="welcome-logo">📝</div>
                <h1>Chào mừng đến với Task Manager</h1>
                <p>Quản lý công việc hiệu quả và dễ dàng</p>

                <div className="features-list">
                  <div className="feature-item">
                    <span className="feature-icon">✅</span>
                    <span>Tạo và quản lý tasks</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🎯</span>
                    <span>Ưu tiên và deadline</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📊</span>
                    <span>Theo dõi tiến độ</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🔍</span>
                    <span>Tìm kiếm và lọc</span>
                  </div>
                </div>
              </div>

              <LoginForm onLogin={handleLogin} />
            </div>
          )}
        </main>

        <footer className="app-footer">
          <p>&copy; Cảm ơn vì đã đến! :D</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
