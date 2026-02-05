import React, { useState, useRef, useEffect } from 'react';

const UseRefDemo = () => {
    // ----------------------------------------------------
    // CASE 1: ACCESSING DOM ELEMENTS
    // ----------------------------------------------------
    const inputRef = useRef(null);

    const focusInput = () => {
        // Direct DOM manipulation
        inputRef.current.focus();
        // Edge Case: modifying styles directly bypassing React
        inputRef.current.style.backgroundColor = "lightyellow";
    };

    // ----------------------------------------------------
    // CASE 2: MUTABLE VALUES (No Re-render)
    // ----------------------------------------------------
    const [renderCount, setRenderCount] = useState(0);
    const countRef = useRef(0);

    const handleRefIncrement = () => {
        // Updates value but does NOT trigger re-render
        countRef.current = countRef.current + 1;
        console.log("Ref Current:", countRef.current);
    };

    const handleStateIncrement = () => {
        setRenderCount(renderCount + 1);
    };

    // ----------------------------------------------------
    // CASE 3: MANAGING INTERVALS (Edge Case)
    // ----------------------------------------------------
    // We need to store the Timer ID to clear it later, 
    // but storing it in state would cause unnecessary re-renders.
    const [timerval, setTimerVal] = useState(0);
    const timerIdRef = useRef(null);

    const startTimer = () => {
        if (timerIdRef.current) return;
        timerIdRef.current = setInterval(() => {
            setTimerVal((prev) => prev + 1);
        }, 100);
    };

    const stopTimer = () => {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
    };

    useEffect(() => {
        return () => stopTimer();
    }, []);

    // ----------------------------------------------------
    // RENDER SCENARIO (The "Don't Do This" Rule)
    // ----------------------------------------------------
    // BAD: ref.current = 5; // Never write ref during render
    // BAD: const x = ref.current; // Avoid reading ref during render if it affects output

    return (
        <div>
            <h1>useRef Edge Cases</h1>

            <hr />

            <h3>1. DOM Access (Bypassing React)</h3>
            <input ref={inputRef} type="text" placeholder="Click button to focus" />
            <button onClick={focusInput}>Focus DOM</button>

            <hr />

            <h3>2. Mutable Variable (Vs State)</h3>
            <p>State: {renderCount}</p>
            <p>Ref: {countRef.current} (Won't update UI until state changes)</p>
            <button onClick={handleRefIncrement}>Increment Ref (Hidden)</button>
            <button onClick={handleStateIncrement}>Increment State (Render)</button>

            <hr />

            <h3>3. Persisting Timer ID (Background Data)</h3>
            <p>Timer: {timerval}</p>
            <button onClick={startTimer}>Start Timer</button>
            <button onClick={stopTimer}>Stop Timer</button>
            <p><em>The interval ID is stored in a ref so it persists without causing re-renders itself.</em></p>

            <hr />
        </div>
    );
};

export default UseRefDemo;
