import React, { useState } from 'react';

/**
 * -----------------------------------------------------------------------
 * CONCEPT: SHALLOW COPY vs DEEP COPY
 * -----------------------------------------------------------------------
 * 
 * 1. PRIMITIVES (Value Types):
 *    - Strings, Numbers, Booleans are immutable by default.
 *    - When you assign them to a new variable, it creates a true copy.
 *    - Example: let a = 10; let b = a; (Changing b won't affect a)
 * 
 * 2. REFERENCE TYPES (Objects & Arrays):
 *    - JS variables store a "reference" (memory address) to the object/array.
 *    - Just assigning (let arr2 = arr1) creates a reference to the SAME data.
 *    - Mutating one will mutate the other!
 * 
 * 3. SHALLOW COPY:
 *    - Creates a new top-level object/array.
 *    - But nested objects inside are still shared (referenced).
 *    - Methods: spread operator [...arr], {...obj}, Object.assign(), .slice()
 * 
 * 4. DEEP COPY:
 *    - Creates a completely independent clone of the object and all nested objects.
 *    - Changing the copy NEVER affects the original.
 *    - Methods: JSON.parse(JSON.stringify(obj)), structuredClone(obj), or libraries like Lodash.
 * 
 * -----------------------------------------------------------------------
 * WHY IMMUTABILITY IN REACT?
 * -----------------------------------------------------------------------
 * - React compares state by reference (shallow comparison).
 * - If you mutate an object directly, the reference stays the same.
 * - React WON'T re-render because it thinks nothing changed.
 * - You MUST create a copy (shallow or deep) to get a new reference triggers re-render.
 * 
 * -----------------------------------------------------------------------
 * COMPARISON: SHALLOW VS DEEP COPY
 * -----------------------------------------------------------------------
 * 
 * A. SHALLOW COPY ({...obj}, [...arr])
 *    - Advantages:
 *      1. FAST: Only copies top-level properties. Minimal performance cost.
 *      2. Standard in React: React updates mostly rely on shallow comparisons.
 *      3. Simple syntax: spread operator is clean and readable.
 *    - Disadvantages:
 *      1. Nested Mutation Risk: Deeply nested objects are still shared references.
 *      2. Incomplete Copy: Not suitable for complex state with multiple nesting levels if you need full isolation.
 *    - When to use:
 *      1. Most Redux/State updates (e.g., updating a user's name, toggling a boolean).
 *      2. When your state is flat (no nested objects).
 * 
 * B. DEEP COPY (JSON.parse(JSON.stringify()), structuredClone())
 *    - Advantages:
 *      1. Complete Isolation: Safest way to ensure NO side effects on original data.
 *      2. Works for deep nesting: Copies everything recursively.
 *    - Disadvantages:
 *      1. SLOW/Expensive: Parsing large objects can cause performance issues (lag).
 *      2. Data Loss (JSON method): Cannot copy Functions, Date objects, undefined, Infinity, etc.
 *         (Note: structuredClone() fixes some of these but still has limitations).
 *    - When to use:
 *      1. When you MUST modify a deeply nested property without affecting the original.
 *      2. Initializing complex forms where you need a detached draft copy.
 *      3. NOT recommended for frequent updates (e.g., typing in an input field).
 */

const ShallowDeepCopy = () => {
    // ------------------- DEMO STATE -------------------

    // Original Object State
    const [originalUser, setOriginalUser] = useState({
        name: 'John Doe',
        details: {
            city: 'New York',
            age: 25
        }
    });

    // We will keep track of a "Copy" just to visualize edits
    // In a real app, you usually replace the state with the copy.
    // Here we show them side-by-side to prove the point.
    const [statusLog, setStatusLog] = useState([]);

    const addLog = (msg) => setStatusLog(prev => [...prev, msg]);

    // ------------------- ACTIONS -------------------

    // 1. BAD MUTATION (Direct Assignment)
    // changing reference variable only
    const demonstrateDirectMutation = () => {
        const user = originalUser; // Reference pointing to SAME memory
        user.name = "Mutated John"; // Modifies original directly!

        // React might not even notice this change immediately because 
        // setOriginalUser wasn't called with a new reference.
        // We force a re-render or set state to existing obj to "try" to update
        setOriginalUser(user);
        addLog("Direct Mutation: user.name changed to 'Mutated John'. Original is also affected!");
    };

    // 2. SHALLOW COPY (Spread Operator)
    const demonstrateShallowCopy = () => {
        // Create new object, copy properties
        const shallowCopy = { ...originalUser };

        // Safe to change top-level properties
        shallowCopy.name = "Shallow Copy User";

        // BUT nested objects are still references!
        // This will mutate originalUser.details.city too!
        shallowCopy.details.city = "San Francisco";

        // Update state to see changes on screen (if any)
        // In a real app we'd do: setOriginalUser(shallowCopy);
        // Here we just log what happened
        setOriginalUser(shallowCopy);
        addLog("Shallow Copy: Top-level name change is safe. BUT 'city' changed in Original too!");
    };

    // 3. DEEP COPY (JSON Method)
    const demonstrateDeepCopy = () => {
        // 1. Convert to string (breaks references)
        // 2. Parse back to object (creates fresh objects)
        const deepCopy = JSON.parse(JSON.stringify(originalUser));

        deepCopy.name = "Deep Copy User";
        deepCopy.details.city = "Tokyo"; // Totally safe now

        // Check original - it should NOT have Tokyo
        setOriginalUser(prev => {
            // We won't update original here, we just want to show that
            // deepCopy is independent.
            // But to prove the point, let's just log or set a separate state?
            // Actually, let's update original with deepCopy to show it's a valid new state,
            // but the "point" is that *if* we kept the old one, it wouldn't have changed.

            // Better demo: We have 'originalUser' displayed.
            // We make a copy, modify copy.
            // If original updates on screen *before* we setState, that's mutation.
            // Since React State is immutable, let's try to 'corrupt' the state variable.
            return prev;
        });

        // Let's actually Just show the objects.
        console.log("Deep Copy modified:", deepCopy);
        console.log("Original right now:", originalUser);

        if (originalUser.details.city !== "Tokyo") {
            addLog("Deep Copy Success: Modified copy city to 'Tokyo'. Original city remained unchanged (until we explicitly set it).");
        }

        // Now update state to the new one
        setOriginalUser(deepCopy);
    };

    // Reset for demo
    const reset = () => {
        setOriginalUser({
            name: 'John Doe',
            details: {
                city: 'New York',
                age: 25
            }
        });
        setStatusLog([]);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h2>Shallow vs Deep Copy Demo</h2>

            {/* VISUALIZATION */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ border: '1px solid #ccc', padding: '10px', flex: 1 }}>
                    <h3>Current State (Original)</h3>
                    <pre>{JSON.stringify(originalUser, null, 2)}</pre>
                </div>

                <div style={{ border: '1px solid #333', padding: '10px', flex: 1, backgroundColor: '#f9f9f9' }}>
                    <h3>Logs</h3>
                    {statusLog.map((log, i) => (
                        <div key={i} style={{ borderBottom: '1px solid #ddd', marginBottom: '5px' }}>{log}</div>
                    ))}
                </div>
            </div>

            {/* CONTROLS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>

                <button onClick={demonstrateDirectMutation} style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#ffcccc' }}>
                    1. Direct Mutation (Incorrect)
                    <br />
                    <small>Modifies 'originalUser' directly without copy</small>
                </button>

                <button onClick={demonstrateShallowCopy} style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#ffffcc' }}>
                    2. Shallow Copy Comparison
                    <br />
                    <small>{`{...obj}`} - Nested props still linked</small>
                </button>

                <button onClick={demonstrateDeepCopy} style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#ccffcc' }}>
                    3. Deep Copy (Safe)
                    <br />
                    <small>JSON.parse(JSON.stringify()) - Independent</small>
                </button>

                <button onClick={reset} style={{ padding: '10px', marginTop: '20px' }}>
                    Reset Demo
                </button>
            </div>

            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#eee' }}>
                <strong>Explanation:</strong> Check code comments for full details! <br />
                <ul>
                    <li><strong>Shallow Copy:</strong> Fast, good for flat state. Careful with nested data.</li>
                    <li><strong>Deep Copy:</strong> Safe for nested data, but slower. Use only when needed.</li>
                </ul>
            </div>
        </div>
    );
};

export default ShallowDeepCopy;
