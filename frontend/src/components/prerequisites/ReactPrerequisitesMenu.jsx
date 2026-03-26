import React from 'react';
import { Link } from 'react-router-dom';

const ReactPrerequisitesMenu = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Prerequisites for React</h1>
            <p>Essential concepts and setups before diving into React.</p>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/prerequisites/what-is-react" style={linkStyle}>
                        👉 <strong>What is React & why it exists</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/prerequisites/dom" style={linkStyle}>
                        👉 <strong>Understanding the DOM</strong> (Practical Demo)
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/prerequisites/how-to-start" style={linkStyle}>
                        👉 <strong>How to start React</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/prerequisites/angular-vs-react" style={linkStyle}>
                        👉 <strong>Angular Vs React</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/prerequisites/project-structure" style={linkStyle}>
                        👉 <strong>React Project Structure</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/prerequisites/jsx-rules" style={linkStyle}>
                        👉 <strong>JSX Rules & Demo</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/prerequisites/functional-components" style={linkStyle}>
                        👉 <strong>Functional Components</strong> (No classes!)
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/prerequisites/js-concepts" style={linkStyle}>
                        👉 <strong>Required JavaScript Concepts</strong>
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/prerequisites/function-vs-const" style={linkStyle}>
                        👉 <strong>function vs const (Arrow Functions)</strong>
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

export default ReactPrerequisitesMenu;
