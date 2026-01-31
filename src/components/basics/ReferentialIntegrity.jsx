import React, { useState } from 'react';

/**
 * -----------------------------------------------------------------------
 * 1. REFERENTIAL INTEGRITY (THE "WHY" BEHIND IMMUTABILITY)
 * -----------------------------------------------------------------------
 * 
 * MENTAL MODEL:
 * React is lazy. It uses "Shallow Comparison" to decide if it should re-render.
 * It checks: (oldState === newState)?
 * 
 * - If you MUTATE an object/array (e.g., array.push()), the memory reference 
 *   remains the SAME.
 * - React compares oldRef === newRef, sees "true", and DOES NOT RE-RENDER.
 * - This is a common bug where data changes but the UI doesn't update.
 * 
 * SOLUTION:
 * Always Create a NEW Reference.
 * - Use [...array] or {...object} to generate a new memory address.
 * - React sees oldRef !== newRef, and triggers the update.
 */

const ReferentialIntegrity = () => {
    const [list, setList] = useState(['Item 1', 'Item 2']);
    const [renderCount, setRenderCount] = useState(0);

    // Track renders (just for visualization)
    React.useEffect(() => {
        console.log("ReferentialIntegrity Component Rendered!");
        setRenderCount(c => c + 1);
    }, [list]); // Only run when list reference changes

    // BAD: Mutation
    const handleMutation = () => {
        // 1. We assume 'list' is a reference 0x123
        // 2. We modify the contents at 0x123
        list.push(`Mutated Item ${list.length + 1}`);

        // 3. We tell React "Here is state 0x123"
        setList(list);

        // 4. React compares: (0x123 === 0x123) -> TRUE.
        // 5. React says: "Nothing changed, I won't re-render."
        console.warn("Mutated list. Length is now:", list.length, "BUT React won't re-render.");
    };

    // GOOD: Immutable Update
    const handleImmutable = () => {
        // 1. We create a NEW array at 0x456
        const newList = [...list, `New Item ${list.length + 1}`];

        // 2. We tell React "Here is state 0x456"
        setList(newList);

        // 3. React compares: (0x123 === 0x456) -> FALSE.
        // 4. React re-renders!
        console.log("Immutable update. New reference created.");
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h3>1. Referential Integrity & React Rendering</h3>

            <p><strong>Render Count:</strong> {renderCount}</p>
            <p><strong>List Length (in State):</strong> {list.length}</p>

            <ul style={{ border: '1px solid #ccc', padding: '10px' }}>
                {list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>

            <div style={{ marginTop: '10px' }}>
                {/* Visual indicator of the failure involved in mutation */}
                <button onClick={handleMutation} style={{ marginRight: '10px', padding: '5px' }}>
                    Bad: list.push() (Check Console)
                </button>

                <button onClick={handleImmutable} style={{ padding: '5px' }}>
                    Good: [...list] (Triggers Render)
                </button>
            </div>

            <p style={{ marginTop: '20px', fontSize: '12px', color: '#555' }}>
                Note: Even if you click "Bad", the data <em>is</em> changing in memory.
                If you then click "Good", you'll see all accumulated "Bad" items appear
                because the re-render mistakenly reveals them (since they are in the same mutated array).
            </p>
        </div>
    );
};

export default ReferentialIntegrity;
