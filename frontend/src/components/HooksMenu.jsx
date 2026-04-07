import React from 'react';
import { Link } from 'react-router-dom';

const HooksMenu = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>React Hooks</h1>
            
            <div style={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid #1976d2', padding: '15px 20px', borderRadius: '4px', marginBottom: '25px', maxWidth: '800px' }}>
                <h2 style={{ color: '#0d47a1', marginTop: 0, marginBottom: '10px' }}>Wait... What actually IS a "Hook"?</h2>
                <p style={{ margin: '0 0 10px 0', lineHeight: '1.5' }}>
                    In modern React, your UI is built using tiny, plain JavaScript Functions. But standard JavaScript functions have a huge problem: <strong>they have total amnesia.</strong> When a normal function finishes running, it immediately forgets everything and dies entirely.
                </p>
                <p style={{ margin: '0 0 10px 0', lineHeight: '1.5' }}>
                    A <strong>Hook</strong> is literally a specialized plug that allows your simple, amnesiac javascript function to legally "Hook Into" the massive React System Engine running permanently in the background.
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6', color: '#1565c0' }}>
                    <li><strong>Need memory?</strong> You use the <code style={{backgroundColor:'#fff', padding:'2px 4px', borderRadius:'3px'}}>useState()</code> hook to physically tap into React's Background RAM Vault.</li>
                    <li><strong>Need to know when the screen updates?</strong> You use the <code style={{backgroundColor:'#fff', padding:'2px 4px', borderRadius:'3px'}}>useEffect()</code> hook to wire directly into the Browser's Physical Graphics Engine.</li>
                </ul>
                <p style={{ marginTop: '15px', fontSize: '14px', color: '#666', fontStyle: 'italic', marginBottom: 0 }}>
                    <strong>The Real-World Analogy:</strong> Think of your Component as an isolated, empty house. It has no power. A Hook is literally an extension cord you plug into the wall to syphon Electricity (State) or Water (Effects) dynamically from the Main React City Grid!
                </p>
            </div>

            <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>Select a hook below to explore practical interactive examples:</p>

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
                        👉 <strong>useMemo</strong> (Memoized Values)
                    </Link>
                </li>
                <li style={{ margin: '10px 0' }}>
                    <Link to="/hooks/usecallback" style={linkStyle}>
                        👉 <strong>useCallback</strong> (Memoized Functions)
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
