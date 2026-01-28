import React, { useState, useEffect, useRef } from 'react';

/* 
  =====================================================================
  HOOK: useEffect (Beginner's Guide)
  =====================================================================
  
  What is useEffect?
  - It runs code AFTER the component renders.
  - Used for: API calls, Timers, Window Events.

  The Dependency Array [] is the most important part:
  - []        = Run ONCE (on mount).
  - [prop]    = Run when 'prop' changes.
  - No Array  = Run EVERY render (Slow!).
*/

// ============================================
// PART 1: NORMAL USE CASES
// ============================================

// A. RUN ON MOUNT
const OnMountDemo = () => {
    const [status, setStatus] = useState("Loading...");

    useEffect(() => {
        console.log("🟢 [A. OnMount] 1. Started fetching...");

        setTimeout(() => {
            setStatus("Data Loaded ✅");
            console.log("🟢 [A. OnMount] 2. Finished fetching.");
        }, 2000);
    }, []);

    return (
        <div style={boxStyle}>
            <h4>A. Run Once (Mount)</h4>
            <p>Status: <strong>{status}</strong></p>
            <small>Logs "🟢" in console.</small>
        </div>
    );
};

// B. RUN ON CHANGE
const OnChangeDemo = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count > 0) {
            console.log(`🟡 [B. OnChange] Count changed to: ${count}`);
        }
    }, [count]);

    return (
        <div style={boxStyle}>
            <h4>B. Run on Update</h4>
            <p>Count: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
            <br /><small>Logs "🟡" when you click.</small>
        </div>
    );
};

// C. CLEANUP
const CleanupDemo = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        console.log("🔵 [C. Cleanup] Timer Started.");

        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);

        // CLEANUP
        return () => {
            console.log("🔴 [C. Cleanup] UNMOUNTED. Timer Stopped.");
            clearInterval(interval);
        };
    }, []);

    return (
        <div style={boxStyle}>
            <h4>C. Cleanup (Timer)</h4>
            <p>Timer: {seconds}s</p>
            <small>Unmount to see "🔴" log.</small>
        </div>
    );
};


// ============================================
// PART 2: COMMON BUGS (Edge Cases)
// ============================================

// D. THE OBJECT TRAP
const ObjectTrap = () => {
    const [force, setForce] = useState(0);
    const runCount = useRef(0);
    const user = { id: 1 }; // New object every render!

    useEffect(() => {
        runCount.current += 1;
        console.log("⚠️ [D. Trap] Effect ran unnecessarily.");
    }, [user]);

    return (
        <div style={{ ...boxStyle, borderColor: 'orange' }}>
            <h4>D. The Object Trap</h4>
            <p>Runs: <strong>{runCount.current}</strong></p>
            <button onClick={() => setForce(n => n + 1)}>Re-render</button>
            <br /><small>Runs every click! (Bad performance)</small>
        </div>
    );
};

// E. STALE CLOSURE (The "Invisible Log" Fix)
const StaleClosure = () => {
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState("⏳ Wait 2s...");

    useEffect(() => {
        console.log("🐛 [E. Stale] 1. Timer Started (Captured Count = 0)");

        const timer = setTimeout(() => {
            // BUG: usage of 'count' here is STALE (Old value)
            console.log(`🐛 [E. Stale] 2. TIMER DONE. Captured Count is: ${count}`);
            setStatus("✅ Log Fired! (Check Console)");
        }, 2000);

        return () => clearTimeout(timer);
    }, []); // MISSING [count] dependency!

    return (
        <div style={{ ...boxStyle, borderColor: 'red' }}>
            <h4>E. Stale Closure Bug</h4>
            <p>Current Count: <strong>{count}</strong></p>
            <p>Status: {status}</p>
            <button onClick={() => setCount(c => c + 1)}>Increment Fast!</button>
            <p><small>Even if you click, log shows 0.</small></p>
        </div>
    );
};

// ============================================
// MAIN PARENT
// ============================================
const UseEffectDemo = () => {
    const [showTimer, setShowTimer] = useState(true);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>useEffect: Visual Lab</h1>
            <p>Press <strong>F12</strong> to view Console Logs.</p>

            <div style={containerStyle}>
                <div style={columnStyle}>
                    <h3 style={{ color: 'green' }}>✅ Correct Usage</h3>
                    <OnMountDemo />
                    <OnChangeDemo />
                    <div style={{ border: '1px dashed #ccc', padding: '10px' }}>
                        <button onClick={() => setShowTimer(!showTimer)}>
                            {showTimer ? "Turn Off Timer" : "Turn On Timer"}
                        </button>
                        {showTimer && <CleanupDemo />}
                    </div>
                </div>

                <div style={columnStyle}>
                    <h3 style={{ color: 'red' }}>❌ Common Bugs</h3>
                    <ObjectTrap />
                    <StaleClosure />
                </div>
            </div>
        </div>
    );
};

// STYLES
const containerStyle = { display: 'flex', gap: '20px', flexWrap: 'wrap' };
const columnStyle = { flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '15px' };
const boxStyle = { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px #eee' };

export default UseEffectDemo;
