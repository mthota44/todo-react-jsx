import React from 'react';
import { Link } from 'react-router-dom';

const DoubtsMenu = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Common React Doubts & Questions</h1>
            <p>A collection of frequently asked questions and exceptionally tricky React concepts explained simply.</p>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/doubts/modify-parent-props" style={linkStyle}>
                        👉 <strong>1. Can a Child modify Parent props? Why?</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/doubts/reusing-components" style={linkStyle}>
                        👉 <strong>2. Can I reuse a Component from one file inside another file?</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/doubts/why-not-let" style={linkStyle}>
                        👉 <strong>3. Why can't we just use a simple <code>let count = 0</code> instead of State?</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/doubts/angular-virtual-dom" style={linkStyle}>
                        👉 <strong>4. Why didn't Angular switch to the Virtual DOM?</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/doubts/the-box-immutability" style={linkStyle}>
                        👉 <strong>5. Array Immutability: What is "The Box"? (Why does .push() fail?)</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/doubts/functional-update-prev" style={linkStyle}>
                        👉 <strong>6. Why does calling setCount 3 times quickly only add +1? (The 'prev' trick)</strong>
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
    maxWidth: '500px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export default DoubtsMenu;
