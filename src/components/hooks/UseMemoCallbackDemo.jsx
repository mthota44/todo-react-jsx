import React, { useState, useMemo, useCallback } from 'react';

/* 
  =====================================================================
  HOOKS: useMemo & useCallback (Performance)
  =====================================================================
  
  What is useMemo?
  - Caches the RESULT of a calculation.
  - Re-calculates only when dependencies change.
  
  What is useCallback?
  - Caches the FUNCTION DEFINITION itself.
  - Prevents function recreation on every render (useful for child props).
*/

// Child component to demonstrate re-renders
// React.memo makes it ONLY re-render if props change.
const ChildBtn = React.memo(({ onClick, label }) => {
    console.log(`Rendering Button: ${label}`);
    return <button onClick={onClick} style={{ margin: '5px' }}>{label}</button>;
});

const UseMemoCallbackDemo = () => {
    const [count, setCount] = useState(0);
    const [dark, setDark] = useState(false);

    // ----------------------------------------------------
    // useMemo DEMO (Expensive Calculation)
    // ----------------------------------------------------
    const slowFunction = (num) => {
        console.log('Calling Slow Function...');
        for (let i = 0; i < 100000000; i++) { } // Artificial Delay
        return num * 2;
    };

    // WITHOUT useMemo: This would run on EVERY render (even when toggling theme)
    // const doubleNumber = slowFunction(count); 

    // WITH useMemo: Runs only when 'count' changes.
    const doubleNumber = useMemo(() => {
        return slowFunction(count);
    }, [count]);


    // ----------------------------------------------------
    // useCallback DEMO (Function Reference Stability)
    // ----------------------------------------------------

    // WITHOUT useCallback: A NEW function is created every render.
    // This causes ChildBtn to re-render even if we just toggle theme.
    // const increment = () => setCount(c => c + 1);

    // WITH useCallback: The function stays the same unless dependencies change.
    const increment = useCallback(() => {
        setCount(c => c + 1);
    }, [setCount]);


    // Theme Styles
    const themeStyles = {
        backgroundColor: dark ? '#333' : '#FFF',
        color: dark ? '#FFF' : '#333',
        padding: '20px',
        marginTop: '20px',
        border: '1px solid #ccc'
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>useMemo & useCallback Demo</h1>
            <p>Open Console to see logs!</p>

            <button onClick={() => setDark(prev => !prev)}>Toggle Theme</button>

            <div style={themeStyles}>
                <h3>Expensive Calculation (useMemo)</h3>
                <p>Input: {count}</p>
                <p>Result (Doubled): {doubleNumber}</p>
                <p><em>Toggle theme &rarr; "Calling Slow Function" should NOT appear in logs.</em></p>

                <h3>Function Stability (useCallback)</h3>
                {/* Because 'increment' is cached, this child won't re-render when theme toggles */}
                <ChildBtn onClick={increment} label="Increment Count" />
            </div>
        </div>
    );
};

export default UseMemoCallbackDemo;
