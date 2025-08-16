import React from 'react';
import ThemeToggle from '../Common/ThemeToggle';
import '../../style/Navbar.css';
export default function Navbar({ isLoggedIn, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Task Manager</h1>
      </div>

      <div className="navbar-menu">
        <ThemeToggle />
        
        {isLoggedIn ? (
          <div className="navbar-user">
            <span className="welcome-text">
              Xin chào, {user?.username || 'User'}!
            </span>
            <button className="logout-btn" onClick={onLogout}>
              Đăng xuất
            </button>
          </div>
        ) : (
          <span className="navbar-guest">Vui lòng đăng nhập</span>
        )}
      </div>
    </nav>
  );
}


