import React, { useState, useEffect } from 'react';

/* 
  =====================================================================
  HOOK: useEffect (Side Effects)
  =====================================================================
  
  What is useEffect?
  - It handles "side effects" in functional components.
  - Side effects include: fetching data, timers, manual DOM updates, subscriptions.
  - It runs AFTER the render.
*/

const UseEffectDemo = () => {
    // ----------------------------------------------------
    // 1. DEPENDENCY ARRAY CONCEPT
    // ----------------------------------------------------
    const [count, setCount] = useState(0);
    const [data, setData] = useState(null);

    // Case A: No Dependency Array
    // Runs on EVERY render. (Dangerous if setting state inside!)
    useEffect(() => {
        console.log("Ran every render");
    });

    // Case B: Empty Dependency Array []
    // Runs ONLY ONCE (on Mount). Good for API calls.
    useEffect(() => {
        console.log("Ran only on Mount");
        // Simulate API Call
        setTimeout(() => {
            setData("Data Fetched!");
        }, 1000);
    }, []);

    // Case C: With Dependencies [count]
    // Runs on Mount + Whenever 'count' changes.
    useEffect(() => {
        console.log(`Count changed to: ${count}`);
    }, [count]);

    // ----------------------------------------------------
    // 2. CLEANUP FUNCTION
    // ----------------------------------------------------
    const [timerActive, setTimerActive] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let intervalId;
        if (timerActive) {
            intervalId = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }

        // CLEANUP FUNCTION
        // Returns a function that runs BEFORE the component unmounts 
        // OR before the effect re-runs.
        // Critical for preventing memory leaks (timers, event listeners).
        return () => {
            console.log("Cleaning up timer...");
            clearInterval(intervalId);
        };
    }, [timerActive]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>useEffect Hook Demo</h1>

            <div style={sectionStyle}>
                <h3>1. Dependencies (Open Console)</h3>
                <p>Check console logs to see when effects trigger.</p>
                <p><strong>Count:</strong> {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment Count</button>
                <p><strong>API Status:</strong> {data ? data : "Loading..."}</p>
            </div>

            <div style={sectionStyle}>
                <h3>2. Cleanup Function (Timer)</h3>
                <p><strong>Time:</strong> {time}s</p>
                <button onClick={() => setTimerActive(!timerActive)}>
                    {timerActive ? "Stop Timer" : "Start Timer"}
                </button>
                <p><em>(When you stop, the cleanup function runs clears the interval)</em></p>
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

export default UseEffectDemo;
