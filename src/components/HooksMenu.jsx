import React from 'react';
import { Link } from 'react-router-dom';

const HooksMenu = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>React Hooks</h1>
            <p>Select a hook to see practical examples and concepts:</p>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/hooks/usestate" style={linkStyle}>
                        👉 <strong>useState</strong> (State Management)
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/hooks/useeffect" style={linkStyle}>
                        👉 <strong>useEffect</strong> (Side Effects & Lifecycle)
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/hooks/useref" style={linkStyle}>
                        👉 <strong>useRef</strong> (DOM Access & Mutable Vars)
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/hooks/usecontext" style={linkStyle}>
                        👉 <strong>useContext</strong> (Global State)
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/hooks/usereducer" style={linkStyle}>
                        👉 <strong>useReducer</strong> (Complex State)
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/hooks/usememo" style={linkStyle}>
                        👉 <strong>useMemo & useCallback</strong> (Performance)
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

export default HooksMenu;
