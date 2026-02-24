import React, { useState } from 'react';
import Layout from '../components/Layout';
import { authService } from '../services/authService';
import './ProfilePage.css';

const ProfilePage = () => {
    const [user] = useState(() => authService.getCurrentUser());


    if (!user) return null;

    return (
        <Layout>
            <div className="profile-container">
                <div className="macos-card profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <h2>{user.name}</h2>
                        <p className="profile-role">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                    </div>

                    <div className="profile-details">
                        <div className="detail-item">
                            <label>Email Address</label>
                            <p>{user.email}</p>
                        </div>
                        <div className="detail-item">
                            <label>Account ID</label>
                            <p>#{user.id}</p>
                        </div>
                        <div className="detail-item">
                            <label>Member Since</label>
                            <p>{new Date(user.id).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <button className="macos-button edit-profile-btn">Edit Profile</button>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilePage;
