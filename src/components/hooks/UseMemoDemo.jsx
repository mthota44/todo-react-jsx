import React, { useState, useMemo, useEffect } from 'react';

// ARBITRARY EXPENSIVE FUNCTION
const heavyCalculation = (num) => {
    console.log("...Calculating Heavy...");
    for (let i = 0; i < 1000000000; i++) { } // Artificial delay
    return num * 2;
};

const UseMemoDemo = () => {
    const [number, setNumber] = useState(0);
    const [dark, setDark] = useState(false);

    // ==========================================
    // DEMO 1: MEMOIZING VALUES (Performance)
    // ==========================================
    // Without useMemo, 'heavyCalculation' runs on EVERY render (e.g., when toggling theme),
    // making the app feel laggy.
    const doubleNumber = useMemo(() => {
        return heavyCalculation(number);
    }, [number]);

    // ==========================================
    // EDGE CASE: REFERENTIAL EQUALITY
    // ==========================================
    // In Javascript, { val: 1 } !== { val: 1 }
    // If we don't useMemo, this object is re-created with a NEW reference on every render.
    const themeStyles = useMemo(() => {
        return {
            backgroundColor: dark ? '#333' : '#FFF',
            color: dark ? '#FFF' : '#333'
        };
    }, [dark]);

    // This useEffect proves referential equality.
    // If we removed useMemo above, this would log on EVERY render even if 'dark' didn't change!
    useEffect(() => {
        console.log("Theme Object Reference Changed!");
    }, [themeStyles]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>useMemo Demo</h1>

            <hr />

            <h3>1. Expensive Calculation</h3>
            <input
                type="number"
                value={number}
                onChange={e => setNumber(parseInt(e.target.value))}
            />
            <p>Double: {doubleNumber}</p>
            <p><em>Check console logs. Toggling theme below should NOT trigger "Calculating Heavy" if useMemo is working.</em></p>

            <hr />

            <h3>2. Edge Case: Object References</h3>
            <div style={themeStyles}>
                <p>The theme style object is memoized.</p>
                <button onClick={() => setDark(prev => !prev)}>
                    Toggle Theme ({dark ? "Dark" : "Light"})
                </button>
            </div>
            <p><em>Check console. "Theme Object Reference Changed" should ONLY log when you actually toggle the theme, not when you type in the number input.</em></p>

        </div>
    );
};

export default UseMemoDemo;
