import React, { useState } from 'react';

/**
 * -----------------------------------------------------------------------
 * 7. CONTROLLED COMPONENTS
 * -----------------------------------------------------------------------
 * 
 * MENTAL MODEL:
 * - HTML Input elements naturally keep their own state (what you typed).
 * - React wants to be the "Single Source of Truth".
 * - A "Controlled Component" is where React STATE controls the input VALUE.
 * 
 * FLOW:
 * 1. User types 'A' -> Fires onChange.
 * 2. React calls setState('A').
 * 3. Component re-renders.
 * 4. Input value prop is set to 'A'.
 * 
 * ADVANTAGE:
 * - You can validate instantly (e.g., prevent numbers).
 * - You can disable submit if empty.
 * - You know the value at all times without hunting for the DOM node.
 */

const ControlledInputDemo = () => {
    const [val, setVal] = useState("");

    // Log "Single Source of Truth" idea
    const handleChange = (e) => {
        const newValue = e.target.value;
        console.log("Input Change Event:", newValue);

        // Example: Enforce Uppercase (Control the user input)
        // If we didn't control it, the user would see lowercase letters.
        setVal(newValue.toUpperCase());
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h3>7. Controlled Components</h3>

            <label style={{ display: 'block', marginBottom: '10px' }}>
                Type something (Auto-Uppercase):
            </label>

            <input
                type="text"
                value={val}
                onChange={handleChange}
                style={{ padding: '10px', fontSize: '16px', width: '300px' }}
                placeholder="I am controlled by React State"
            />

            <p style={{ marginTop: '10px' }}>
                <strong>State Value:</strong> "{val}"
            </p>

            <hr />

            <div style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
                <p><strong>Code:</strong></p>
                <code style={{ display: 'block', whitespace: 'pre' }}>
                    {`const [val, setVal] = useState("");

<input 
  value={val} 
  onChange={(e) => setVal(e.target.value.toUpperCase())} 
/>`}
                </code>
            </div>
        </div>
    );
};

export default ControlledInputDemo;
