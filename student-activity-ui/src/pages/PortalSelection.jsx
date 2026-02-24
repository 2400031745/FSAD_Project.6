import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PortalSelection.css';

const PortalSelection = () => {
    const navigate = useNavigate();

    const handleSelect = (role) => {
        localStorage.setItem('selectedRole', role);
        navigate('/login');
    };

    return (
        <div className="portal-selection-container">
            <h2 className="selection-title">Choose Your Portal</h2>
            <div className="selection-cards">
                <div className="macos-card selection-card" onClick={() => handleSelect('student')}>
                    <div className="icon">🎓</div>
                    <h3>Student</h3>
                    <p>Register and track your activities.</p>
                </div>
                <div className="macos-card selection-card" onClick={() => handleSelect('teacher')}>
                    <div className="icon">👨‍🏫</div>
                    <h3>Teacher</h3>
                    <p>Review and approve student submissions.</p>
                </div>
            </div>
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default PortalSelection;
