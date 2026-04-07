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

    // CASE 4 : Render Count
    const UseRefDemo = () => {
        const [name, setName] = useState('')
        const [count, setCount] = useState(0)
        const [countV2, setCountV2] = useState(0)

        const renderCount = useRef(0)
        const inputRef = useRef(null)
        renderCount.current = renderCount.current + 1
        useEffect(() => {
            console.log("use effect called")
            setCount(prevCount => prevCount + 1)
            setCountV2(prevCountV2 => prevCountV2 + 1)

            return () => {
                console.log("cleanup")
            }
        }, [name])


        const doFocus = () => {
            inputRef.current.focus()
            inputRef.current.style.backgroundColor = 'yellow'
        }

        return (
            <div>
                <h2>UseRef Demo</h2>
                <input ref={inputRef} type="text" value={name} onChange={e => setName(e.target.value)} />
                <p>My name is {name}</p>
                <p>Render Count: {renderCount.current}</p>
                <p>Render Count(UseState): {count} </p>
                <p>Render Count(UseState V2): {countV2} </p>
                <button onClick={doFocus}> focus </button>
            </div>
        )
    }
    // ----------------------------------------------------
    // RENDER SCENARIO (The "Don't Do This" Rule)
    // ----------------------------------------------------
    // BAD: ref.current = 5; // Never write ref during render
    // BAD: const x = ref.current; // Avoid reading ref during render if it affects output

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', paddingBottom: '100px' }}>
            <h1 style={{ marginBottom: '5px' }}>useRef: Visual Lab</h1>

            <div style={{ backgroundColor: '#fff8e1', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #ff9800', marginBottom: '25px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', lineHeight: '1.5', maxWidth: '850px' }}>
                <h2 style={{ marginTop: 0, color: '#e65100' }}>Wait... What actually IS "useRef"?</h2>
                <p style={{ fontSize: '16px' }}><strong>Think of useRef strictly as either a "Secret Sticky Note" or a "Laser Pointer".</strong></p>
                
                <h4 style={{ color: '#ef6c00', margin: '15px 0 5px 0', fontSize: '18px' }}>1. The "Secret Sticky Note" (Memory WITHOUT Re-Renders)</h4>
                <p style={{ margin: '0 0 10px 0' }}>When you update a normal <code style={{backgroundColor:'#fff', padding:'2px 4px', borderRadius:'3px'}}>useState</code> variable (like a public scoreboard), the React Engine immediately halts, fires off heavy alarms, and <strong>re-renders the entire screen</strong> to visually show everyone the new score.<br/> But what if you just firmly need a function to secretly "remember" a piece of deep technical data (like a background timer interval ID or a scroll position) but you strictly <strong>DO NOT</strong> want the precious screen to recalculate and twitch?</p>
                <p style={{ margin: 0 }}>You use <strong>useRef</strong>! It allows you to secretly write a note on a sticky note and shove it firmly in your pocket. The real data is safely preserved across lifecycles, but the screen will physically never re-render when you write to it.</p>
                
                <h4 style={{ color: '#ef6c00', margin: '20px 0 5px 0', fontSize: '18px' }}>2. The "Laser Pointer" (Physical DOM Bypassing)</h4>
                <p style={{ margin: 0 }}>React fundamentally hates you touching HTML. It handles all HTML heavily via its Virtual DOM math engine. However, sometimes you forcefully need to physically grab an exact vanilla HTML element (like forcing the keyboard cursor to focus on an input box, or measuring an image's pixel width). <strong>useRef</strong> acts as a literal Laser Pointer that explicitly targets an exact DOM node, legally bypassing the React Engine entirely.</p>
            </div>

            <hr style={{ border: 'none', borderTop: '2px dashed #eee', margin: '30px 0' }} />

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

            <h3>4. Render Count Example</h3>
            <UseRefDemo />
        </div>
    );
};

export default UseRefDemo;
