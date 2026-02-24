import React, { useState } from 'react';
import Layout from '../components/Layout';
import { authService } from '../services/authService';
import { activityService } from '../services/activityService';
import './Dashboard.css';

const Dashboard = () => {
    const [user] = useState(() => authService.getCurrentUser());
    const [activities] = useState(() =>
        user?.role === 'teacher'
            ? activityService.getActivities()
            : activityService.getActivities(user?.id)
    );

    if (!user) return null;

    const isTeacher = user.role === 'teacher';

    return (
        <Layout>
            <div className="dashboard-header">
                <h1>Welcome back, {user.name}</h1>
                <p>
                    {isTeacher
                        ? "Monitor and approve student extracurricular activities."
                        : "Track and manage your activity submissions."}
                </p>
            </div>

            <div className="dashboard-grid">
                <div className="macos-card stat-card">
                    <h3>{isTeacher ? "Total Submissions" : "My Activities"}</h3>
                    <p className="stat-number">{activities.length}</p>
                </div>
                <div className="macos-card stat-card">
                    <h3>Pending</h3>
                    <p className="stat-number">{activities.filter(a => a.status === 'pending').length}</p>
                </div>
                <div className="macos-card stat-card">
                    <h3>Approved</h3>
                    <p className="stat-number">{activities.filter(a => a.status === 'approved').length}</p>
                </div>
            </div>

            <div className="macos-card recent-activities">
                <div className="card-header">
                    <h2>{isTeacher ? "Activities Needing Review" : "My Recent Activities"}</h2>
                    <button className="macos-button small">View All</button>
                </div>
                {activities.length === 0 ? (
                    <p className="empty-state">No activities found.</p>
                ) : (
                    <ul className="activity-list">
                        {(isTeacher
                            ? activities.filter(a => a.status === 'pending')
                            : activities
                        ).slice(0, 5).map(activity => (
                            <li key={activity.id} className="activity-item">
                                <div className="activity-info">
                                    <span className="activity-name">{activity.name}</span>
                                    <span className="activity-category">{activity.category}</span>
                                </div>
                                <span className={`status-badge ${activity.status}`}>
                                    {activity.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
