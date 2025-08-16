import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Auth/Navbar';
import LoginForm from './components/Auth/LoginForm';
import TaskManagement from './components/Tasks/TaskManagement';
import ErrorMessage from './components/Common/ErrorMessage';
import DataInfo from './components/Common/DataInfo';
import { vercelAPI } from './api/vercelAPI';
import { MESSAGES } from './constants/messages';
import './style/App.css';

// Main App component - handles auth and routing
function App() {
  const [user,setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading,setAuthLoading] = useState(true);
  const [globalError, setGlobalError] = useState(null);

  // Check if user is already logged in
  const checkExistingAuth = useCallback(async () => {
    setAuthLoading(true);

    try {
      const savedUser = localStorage.getItem('taskapp_user');
      const savedToken = localStorage.getItem('taskapp_token');

      if (savedUser && savedToken) {
        const userData = JSON.parse(savedUser);

        // Timeout after 3 seconds for faster loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        );

        const isValidSession = await Promise.race([
          vercelAPI.verifySession(userData.id),
          timeoutPromise
        ]);

        if (isValidSession) {
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          clearAuthData();
        }
      }
    } catch (error) {
      clearAuthData();
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    checkExistingAuth();
  }, [checkExistingAuth]);



  const clearAuthData = () => {
    localStorage.removeItem('taskapp_user');
    localStorage.removeItem('taskapp_token');
    setUser(null);
    setIsLoggedIn(false);
  };

  const handleLogin = async credentials => {
    try {
      const { user, token } = await vercelAPI.login(credentials);

      // Store auth data
      localStorage.setItem('taskapp_user', JSON.stringify(user));
      localStorage.setItem('taskapp_token', token);

      setUser(user);
      setIsLoggedIn(true);

      setGlobalError(null);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await vercelAPI.logout();

      clearAuthData();

      setGlobalError(null);
    } catch (error) {
      setGlobalError('Có lỗi khi đăng xuất. Vui lòng thử lại.');
    }
  };



  useEffect(() => {
    const handleOnline = () => {
      if(globalError && globalError.includes('mạng')) {
        setGlobalError(null);
      }
    };

    const handleOffline = () => {
      setGlobalError('Mất kết nối mạng. Vui lòng kiểm tra kết nối internet.');
    };

    // Listen for network changes
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
        <DataInfo />
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
                <h1>{MESSAGES.WELCOME.TITLE}</h1>
                <p>{MESSAGES.WELCOME.SUBTITLE}</p>

                <div className="features-list">
                  <div className="feature-item">
                    <span className="feature-icon">✅</span>
                    <span>{MESSAGES.WELCOME.FEATURE_MANAGE}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🎯</span>
                    <span>{MESSAGES.WELCOME.FEATURE_PRIORITY}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📊</span>
                    <span>{MESSAGES.WELCOME.FEATURE_PROGRESS}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🔍</span>
                    <span>{MESSAGES.WELCOME.FEATURE_SEARCH}</span>
                  </div>
                </div>
              </div>

              <LoginForm onLogin={handleLogin} />
            </div>
          )}
        </main>

        <footer className="app-footer">
          <p>{MESSAGES.COMMON.FOOTER_TEXT}</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
