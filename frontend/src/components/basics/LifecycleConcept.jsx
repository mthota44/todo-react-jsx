import React, { useState, useEffect } from 'react';

/**
 * -----------------------------------------------------------------------
 * 5. COMPONENT LIFECYCLE
 * -----------------------------------------------------------------------
 * 
 * MENTAL MODEL:
 * Components are like living organisms:
 * 1. MOUNT (Birth): Added to the screen. Good place for initial fetch.
 * 2. UPDATE (Growth): Props or State change. Logic re-runs.
 * 3. UNMOUNT (Death): Removed from screen. Cleanup happens here (e.g. clear intervals).
 * 
 * The `useEffect` hook handles all these phases.
 */

const LifecycleChild = ({ triggerCount }) => {

    // MOUNT & UNMOUNT
    useEffect(() => {
        console.log("🟢 [Child] MOUNTED: I am born!");

        // CLEANUP (UNMOUNT)
        return () => {
            console.log("🔴 [Child] UNMOUNTED: Goodbye world...");
        };
    }, []); // Empty dependency array = Run once on Mount

    // UPDATE
    useEffect(() => {
        console.log("🔵 [Child] UPDATED: Prop 'triggerCount' changed to", triggerCount);
    }, [triggerCount]); // Runs whenever 'triggerCount' changes

    return (
        <div style={{ padding: '10px', border: '1px solid green', margin: '10px 0', backgroundColor: '#eaffea' }}>
            <strong>Lifecycle Child Component</strong>
            <p>Check the console logs as you interact!</p>
            <p>Count Prop: {triggerCount}</p>
        </div>
    );
};

const LifecycleConcept = () => {
    const [showChild, setShowChild] = useState(false);
    const [count, setCount] = useState(0);

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h3>5. Component Lifecycle</h3>

            <div style={{ marginBottom: '10px' }}>
                <button
                    onClick={() => setShowChild(!showChild)}
                    style={{ marginRight: '10px' }}
                >
                    {showChild ? "Unmount (Kill) Child" : "Mount (Birth) Child"}
                </button>

                <button
                    onClick={() => setCount(c => c + 1)}
                    disabled={!showChild}
                >
                    Update Prop (Trigger Re-render)
                </button>
            </div>

            {showChild && <LifecycleChild triggerCount={count} />}

            {!showChild && <p><em>Child is not in the DOM.</em></p>}
        </div>
    );
};

export default LifecycleConcept;
