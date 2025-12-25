import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>DKS.POWER</h2>
          <span className="sidebar-sub">Admin Dashboard</span>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><span role="img" aria-label="dashboard">🎧</span> Dashboard</li>
            <li><span role="img" aria-label="project">📄</span> PROJECT</li>
            <li><span role="img" aria-label="notification">🔔</span> NOTIFICATION</li>
            <li><span role="img" aria-label="setting">⚙️</span> SETTING</li>
            <li><span role="img" aria-label="logout">🚪</span> LOGOUT</li>
            <li><span role="img" aria-label="account">👤</span> ACCOUNT</li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="profile-info">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin" className="profile-pic" />
            <div>
              <div className="profile-name">JAD MIN NA ME</div>
              <div className="profile-role">Administrator</div>
            </div>
          </div>
          <div className="dashboard-actions">
            <span className="icon">💬</span>
            <span className="icon">🔔</span>
            <div className="search-box">
              <input type="text" placeholder="Search here..." />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </header>
        <section className="dashboard-content">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="dashboard-card">
            {/* Main dashboard content goes here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
