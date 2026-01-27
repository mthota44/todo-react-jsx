import React from 'react';
import { Link } from 'react-router-dom';

const FormsMenu = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>React Forms & Validation</h1>
            <p>Select a specific form implementation to learn more:</p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/forms/auth" style={cardStyle}>
                    <h3>🔐 Auth Forms</h3>
                    <p>Controlled Login/Signup with Validation.</p>
                </Link>

                <Link to="/forms/nested" style={cardStyle}>
                    <h3>📂 Nested Forms</h3>
                    <p>Handling complex object state (e.g., Address).</p>
                </Link>

                <Link to="/forms/uncontrolled" style={cardStyle}>
                    <h3>⚡ Uncontrolled</h3>
                    <p>Using <code>useRef</code> for performance (No re-renders).</p>
                </Link>
            </div>
        </div>
    );
};

const cardStyle = {
    textDecoration: 'none',
    color: '#333',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    width: '200px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s'
};

export default FormsMenu;
