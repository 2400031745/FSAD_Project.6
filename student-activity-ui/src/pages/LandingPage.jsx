import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/globals.css';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <div className="landing-content macos-card">
                <h1 className="hero-title">Elevate Your Extracurriculars</h1>
                <p className="hero-subtitle">Manage your student activities with a seamless, macOS-inspired experience.</p>
                <button
                    className="macos-button large-btn"
                    onClick={() => navigate('/portal-selection')}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
