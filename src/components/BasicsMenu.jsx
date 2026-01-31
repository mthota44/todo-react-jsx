import React from 'react';
import { Link } from 'react-router-dom';

const BasicsMenu = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>React Basics & Javascript Concepts</h1>
            <p>Fundamental concepts for React development.</p>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/basics/shallow-deep-copy" style={linkStyle}>
                        👉 <strong>1. Immutability (Shallow vs Deep)</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/basics/referential-integrity" style={linkStyle}>
                        👉 <strong>1. Referential Integrity</strong> (Why Copy?)
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/basics/declarative" style={linkStyle}>
                        👉 <strong>2. Declarative vs Imperative</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/basics/data-flow" style={linkStyle}>
                        👉 <strong>3 & 4. Data Flow & Props</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/basics/lifecycle" style={linkStyle}>
                        👉 <strong>5. Lifecycle</strong> (Mount/Update/Unmount)
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/basics/functional" style={linkStyle}>
                        👉 <strong>6. Functional Programming</strong> (Map/Filter)
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/basics/controlled" style={linkStyle}>
                        👉 <strong>7. Controlled Components</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/basics/batching" style={linkStyle}>
                        👉 <strong>8. State Batching (Async Updates)</strong>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '18px',
    border: '1px solid #eee',
    padding: '10px',
    display: 'block',
    borderRadius: '5px',
    maxWidth: '300px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export default BasicsMenu;
