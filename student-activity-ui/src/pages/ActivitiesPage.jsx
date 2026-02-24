import React, { useState } from 'react';
import Layout from '../components/Layout';
import { authService } from '../services/authService';
import { activityService } from '../services/activityService';
import './ActivitiesPage.css';

const ActivitiesPage = () => {
    const [user] = useState(() => authService.getCurrentUser());
    const [activities, setActivities] = useState(() =>
        user?.role === 'teacher'
            ? activityService.getActivities()
            : activityService.getActivities(user?.id)
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newActivity, setNewActivity] = useState({ name: '', category: '', date: '' });

    if (!user) return null;

    const isTeacher = user.role === 'teacher';

    const refreshActivities = () => {
        setActivities(isTeacher ? activityService.getActivities() : activityService.getActivities(user.id));
    };

    const handleAddActivity = (e) => {
        e.preventDefault();
        activityService.addActivity(newActivity, user.id);
        refreshActivities();
        setIsModalOpen(false);
        setNewActivity({ name: '', category: '', date: '' });
    };

    const handleDelete = (id) => {
        activityService.deleteActivity(id);
        refreshActivities();
    };

    const handleApprove = (id) => {
        activityService.approveActivity(id);
        refreshActivities();
    };

    const handleReject = (id) => {
        activityService.rejectActivity(id);
        refreshActivities();
    };

    return (
        <Layout>
            <div className="activities-header">
                <h1>{isTeacher ? "Activity Submissions" : "My Activities"}</h1>
                {!isTeacher && (
                    <button className="macos-button" onClick={() => setIsModalOpen(true)}>+ Add Activity</button>
                )}
            </div>

            <div className="macos-card activities-card">
                {activities.length === 0 ? (
                    <div className="empty-state">
                        <p>{isTeacher ? "No student submissions yet." : "You haven't added any activities yet."}</p>
                    </div>
                ) : (
                    <table className="activities-table">
                        <thead>
                            <tr>
                                <th>Activity Name</th>
                                <th>Category</th>
                                <th>Date</th>
                                {isTeacher && <th>Student ID</th>}
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map(activity => (
                                <tr key={activity.id}>
                                    <td className="font-semibold">{activity.name}</td>
                                    <td className="text-secondary">{activity.category}</td>
                                    <td>{activity.date}</td>
                                    {isTeacher && <td>#{activity.userId}</td>}
                                    <td>
                                        <span className={`status-badge ${activity.status}`}>
                                            {activity.status}
                                        </span>
                                    </td>
                                    <td>
                                        {isTeacher ? (
                                            <div className="action-buttons">
                                                {activity.status === 'pending' && (
                                                    <>
                                                        <button className="approve-btn" onClick={() => handleApprove(activity.id)}>Approve</button>
                                                        <button className="reject-btn" onClick={() => handleReject(activity.id)}>Reject</button>
                                                    </>
                                                )}
                                                <button className="delete-btn" onClick={() => handleDelete(activity.id)}>Delete</button>
                                            </div>
                                        ) : (
                                            <button className="delete-btn" onClick={() => handleDelete(activity.id)}>Delete</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="macos-card modal-content">
                        <h2>Add New Activity</h2>
                        <form onSubmit={handleAddActivity}>
                            <div className="form-group">
                                <label>Activity Name</label>
                                <input
                                    type="text"
                                    value={newActivity.name}
                                    onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    value={newActivity.category}
                                    onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={newActivity.date}
                                    onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="macos-button">Save Activity</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default ActivitiesPage;
