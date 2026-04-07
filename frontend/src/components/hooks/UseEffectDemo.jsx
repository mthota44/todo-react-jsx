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

    runCount.current += 1;

    useEffect(() => {

        console.log("⚠️ [D. Trap] Effect ran unnecessarily.");
    }, [runCount]);

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
// PART 3: WEB DEV SIMPLIFIED (YOUTUBE REFERENCE)
// ============================================

// F. WDS Video Example 1: Fetching Data on State Change
const FetchResourceDemo = () => {
    const [resourceType, setResourceType] = useState('posts');
    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log(`🌐 [WDS] 1. Setting up effect & fetching ${resourceType}...`);

        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then(response => response.json())
            .then(json => setItems(json));

        // CLEANUP FUNCTION (Runs BEFORE the next effect runs)
        return () => {
            console.log(`🧹 [WDS] 2. CLEANUP running for [${resourceType}] before the next fetch!`);
        };
    }, [resourceType]);

    return (
        <div style={{ ...boxStyle, borderColor: '#007bff' }}>
            <h4 style={{ color: '#007bff', marginTop: 0, marginBottom: '10px' }}>F. Dynamic Data Fetching</h4>
            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                <button onClick={() => setResourceType('posts')}>Posts</button>
                <button onClick={() => setResourceType('users')}>Users</button>
                <button onClick={() => setResourceType('comments')}>Comments</button>
            </div>
            <strong>{resourceType.toUpperCase()}</strong>
            <div style={{ maxHeight: '100px', overflowY: 'auto', fontSize: '11px', background: '#f5f5f5', padding: '5px', marginTop: '5px', border: '1px solid #ddd' }}>
                {items.slice(0, 3).map((item, i) => <div key={i} style={{ marginBottom: '5px', borderBottom: '1px solid #ddd', paddingBottom: '3px' }}>{JSON.stringify(item).substring(0, 80)}...</div>)}
            </div>
            <small style={{ display: 'block', marginTop: '5px' }}>Check console to see the Cleanup run between clicks!</small>
        </div>
    );
};

// G. WDS Video Example 2: Window Resize Event Listener
const WindowResizeDemo = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        // Run on mount
        console.log("📏 [WDS] 1. ADDING window resize listener.");
        window.addEventListener('resize', handleResize);

        // Run on unmount (Cleanup)
        return () => {
            console.log("📏 [WDS] 2. REMOVING window resize listener (Cleanup).");
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Only run once on mount

    return (
        <div style={{ ...boxStyle, borderColor: '#007bff' }}>
            <h4 style={{ color: '#007bff', marginTop: 0, marginBottom: '10px' }}>G. Window Resize Listener</h4>
            <p style={{ margin: '5px 0' }}>Window Width: <strong>{windowWidth}px</strong></p>
            <small>Resize your browser to see this update dynamically.</small>
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
            <h1 style={{ marginBottom: '5px' }}>useEffect: Visual Lab</h1>
            <p style={{ marginTop: 0 }}>Press <strong>F12</strong> to view the Console Logs.</p>

            {/* Added: "What is useEffect?" Real-World Explanation */}
            <div style={descriptionStyle}>
                <h2 style={{ marginTop: 0, color: '#6f42c1' }}>What exactly is a "Side Effect"?</h2>
                <p><strong>Think of useEffect conceptually as an "After-Hours Worker".</strong></p>
                <p>In the real world, a chef's fundamental main job is rigidly cooking the food. But safely <em>after</em> the food physically goes out to the dining room, someone manually has to wash the heavy dishes, sweep the dirty floor, or secretly call the supplier to buy more tomatoes tomorrow. These necessary extra background tasks are "Side Effects".</p>
                <p>In strict React architecture, a component's only main job is mathematically calculating perfectly formatted HTML to cleanly show on the screen. However, you frequently need your component to seamlessly do "extra tasks" quietly in the unobserved background, such as:</p>
                <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                    <li>Calling an external database API physically to fetch live user data.</li>
                    <li>Starting a live visual countdown timer reliably.</li>
                    <li>Subscribing heavily to a live websocket chat server.</li>
                </ul>
                <p style={{ margin: 0 }}>The <code>useEffect()</code> hook explicitly tells the React Engine fundamentally: <em>"Hey React! Please finish fully drawing the HTML on the screen completely first. Then, once the screen is definitively visually ready, quietly run this exact extra background code securely for me!"</em></p>
            </div>

            <div style={containerStyle}>
                <div style={columnStyle}>
                    <h3 style={{ color: 'green' }}>✅ Correct Usage</h3>
                    <OnMountDemo />
                    <OnChangeDemo />
                    <div style={{ border: '1px dashed #ccc', padding: '10px', borderRadius: '8px' }}>
                        <button onClick={() => setShowTimer(!showTimer)} style={{ marginBottom: '10px' }}>
                            {showTimer ? "🛑 Destroy Component" : "▶️ Mount Component"}
                        </button>
                        {showTimer && <CleanupDemo />}
                    </div>
                </div>

                <div style={columnStyle}>
                    <h3 style={{ color: '#007bff' }}>📺 Reference Lab</h3>
                    <FetchResourceDemo />
                    <WindowResizeDemo />
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
const descriptionStyle = { backgroundColor: '#f3e5f5', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #6f42c1', marginBottom: '25px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', lineHeight: '1.5' };

export default UseEffectDemo;
