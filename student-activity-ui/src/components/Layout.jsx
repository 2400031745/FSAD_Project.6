import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="layout-container">
            <header className="mac-header">
                <button className="menu-btn" onClick={toggleSidebar}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <h1 className="logo-text">Globe.AI</h1>
                <div className="header-actions">
                    {/* Add user profile / notifications here if needed */}
                </div>
            </header>

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
