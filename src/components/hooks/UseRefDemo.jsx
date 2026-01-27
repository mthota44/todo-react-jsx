import React, { useState, useRef } from 'react';

/* 
  =====================================================================
  HOOK: useRef (References)
  =====================================================================
  
  What is useRef?
  - Accessing DOM elements directly.
  - Storing mutable values that DO NOT trigger re-renders when changed.
*/

const UseRefDemo = () => {
    // ----------------------------------------------------
    // 1. ACCESSING DOM ELEMENTS
    // ----------------------------------------------------
    const inputRef = useRef(null);

    const focusInput = () => {
        // Accessing the DOM node directly
        inputRef.current.focus();
        inputRef.current.style.backgroundColor = "lightyellow";
    };

    // ----------------------------------------------------
    // 2. STORING MUTABLE VALUES (No Re-render)
    // ----------------------------------------------------
    const [renderCount, setRenderCount] = useState(0);
    const countRef = useRef(0);

    const handleRefIncrement = () => {
        countRef.current = countRef.current + 1;
        console.log(`Ref value is: ${countRef.current} (Render did not happen)`);
    };

    const handleStateIncrement = () => {
        setRenderCount(renderCount + 1);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>useRef Hook Demo</h1>

            <div style={sectionStyle}>
                <h3>1. DOM Access</h3>
                <input ref={inputRef} type="text" placeholder="I will be focused..." />
                <button onClick={focusInput} style={{ marginLeft: '10px' }}>
                    Focus Input
                </button>
            </div>

            <div style={sectionStyle}>
                <h3>2. Mutable Variable (No Re-render)</h3>
                <p><strong>State Value:</strong> {renderCount} (Triggers Rerender)</p>
                <p><strong>Ref Value:</strong> {countRef.current} (Does NOT Update View)</p>

                <button onClick={handleRefIncrement}>Increment Ref (Watch Console)</button>
                <button onClick={handleStateIncrement} style={{ marginLeft: '10px' }}>
                    Increment State (Updates View)
                </button>
                <p><em>Notice: Incrementing Ref updates the value instantly in memory/console, but the screen doesn't change until State is updated.</em></p>
            </div>
        </div>
    );
};

const sectionStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    background: '#f9f9f9'
};

export default UseRefDemo;
