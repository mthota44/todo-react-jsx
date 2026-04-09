import React from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

/* Nested Component to show URL Parameter extraction */
const UserProfile = () => {
    // useParams magically extracts the ':id' variable from the browser's URL!
    let { id } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px', background: '#e3f2fd', border: '1px solid #1976d2', borderRadius: '5px' }}>
            <h3 style={{ color: '#0d47a1', marginTop: 0 }}>👤 User Profile Dashboard</h3>
            <p>You requested highly secure data for exactly: <strong>User ID {id}</strong></p>
            <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#666' }}>
                React mathematically extracted '<strong>{id}</strong>' directly from the URL string without the server knowing!
            </p>
            <button onClick={() => navigate('/routing')} style={{ padding: '8px 12px', cursor: 'pointer', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px' }}>
                ← Go Back
            </button>
        </div>
    );
};

const RoutingDemo = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6', paddingBottom: '100px' }}>
            <h1 style={{ color: '#673ab7', marginBottom: '5px' }}>React Router: The "Gatekeeper"</h1>

            {/* Educational Explanation Box */}
            <div style={{ backgroundColor: '#f3e5f5', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #9c27b0', marginBottom: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', maxWidth: '900px' }}>
                <h2 style={{ marginTop: 0, color: '#4a148c' }}>Wait... What is "Routing"?</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.5' }}><strong>Think of React Routing strictly as an "Illusionist" doing magic tricks.</strong></p>
                <p style={{ lineHeight: '1.5', margin: '0 0 15px 0' }}>
                    In legacy Web 1.0 (like a standard WordPress or Wikipedia page), every single time you explicitly click a link, your browser violently destroys the entire screen, talks to a server thousands of miles away, downloads a completely fresh HTML/CSS file, and brutally reloads the whole page from scratch. This causes a massive white screen flicker and is unacceptably slow.
                </p>
                <p style={{ lineHeight: '1.5', margin: '0 0 15px 0' }}>
                    React is radically different. It is a <strong>Single Page Application (SPA)</strong>. This means you literally only ever download ONE single HTML file (<code>index.html</code>) exactly once when you visit the site. When you click a link in React, your browser <strong>never formally reloads</strong>.
                </p>
                <p style={{ lineHeight: '1.5', margin: 0 }}>
                    Instead, <strong>React Router</strong> mathematically intercepts your click, forcefully changes the URL string text at the very top of your browser (to trick the user), and then instantly dynamically destroys and injects entirely new raw React Components on your screen extremely fast! The page absolutely never blinked or reloaded; it just brilliantly disguised itself instantly.
                </p>
            </div>

            <hr style={{ border: 'none', borderTop: '2px dashed #eee', margin: '30px 0' }} />

            <h2 style={{ color: '#333' }}>Live Interactive Demo</h2>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {/* Left Sidebar Menu */}
                <div style={{ width: '250px', padding: '20px', background: '#fafafa', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginTop: 0 }}>Navigation Menu</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                            {/* <Link> replaces <a> tags to legally prevent Browser Reloads! */}
                            <Link to="/routing" style={linkStyle}>🏠 Overview View</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Link to="/routing/user/77" style={linkStyle}>👤 Load User 77</Link>
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <Link to="/routing/user/992" style={linkStyle}>👤 Load User 992</Link>
                        </li>
                        <li style={{ marginBottom: '10px', marginTop: '30px' }}>
                            <Link to="/" style={{ ...linkStyle, backgroundColor: '#ffebee', color: '#c62828', borderColor: '#ef9a9a' }}>
                                🛑 Exit to Main App Home
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right Panel Main Content - Where Child Routes Render dynamically */}
                <div style={{ flex: 1, padding: '30px', border: '4px dashed #ccc', borderRadius: '8px', minHeight: '300px', backgroundColor: '#fff' }}>
                    
                    {/* The <Routes> tag mathematically listens to the URL and decides what to show here */}
                    <Routes>
                        <Route path="/" element={
                            <div>
                                <h3 style={{ marginTop: 0, color: '#388e3c' }}>Main Routing View Window</h3>
                                <p>This is the absolute default visual view for the <code>/routing</code> path.</p>
                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    Click the <strong>User 77</strong> or <strong>User 992</strong> links on the left menu right now.<br/> 
                                    Watch React absolutely magically intercept the URL change and dynamically physically inject the <code>&lt;UserProfile /&gt;</code> code into this exact dashed box effortlessly without the browser blinking or reloading the page!
                                </p> 
                            </div>
                        } />
                        {/* Dynamic URL parameters using :id */}
                        <Route path="user/:id" element={<UserProfile />} />
                    </Routes>
                    
                </div>
            </div>
        </div>
    );
};

const linkStyle = {
    display: 'block',
    padding: '10px',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    textDecoration: 'none',
    color: '#1976d2',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

export default RoutingDemo;
