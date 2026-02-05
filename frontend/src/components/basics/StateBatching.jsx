import React, { useState } from 'react';

/**
 * -----------------------------------------------------------------------
 * CONCEPT: STATE BATCHING & ASYNCHRONOUS UPDATES
 * -----------------------------------------------------------------------
 * 
 * MENTAL MODEL:
 * Think of setState not as a direct command ("Change X now!"), but as a 
 * "Request" sent to React ("Please update X when you have a moment").
 * 
 * 1. BATCHING:
 *    React groups multiple state updates into a single re-render for performance.
 *    It waits until the event handler finishes before actually updating the screen.
 * 
 * 2. THE "WRONG" WAY (Direct Value):
 *    setScore(score + 1);
 *    setScore(score + 1);
 *    setScore(score + 1);
 *    
 *    Why it fails: 
 *    - In the current render frame, 'score' is constant (e.g., 0).
 *    - You are essentially saying: setScore(0 + 1), setScore(0 + 1), setScore(0 + 1).
 *    - Result: Score becomes 1, not 3.
 * 
 * 3. THE "CORRECT" WAY (Functional Update):
 *    setScore(prev => prev + 1);
 *    
 *    How it works:
 *    - You pass a function (a "recipe").
 *    - React adds these to a queue.
 *    - It takes the pending state from the previous operation and passes it to the next.
 *    - 0 -> (prev+1) -> 1 -> (prev+1) -> 2 -> (prev+1) -> 3.
 * 
 * 4. STALE CLOSURE TRAP:
 *    console.log(score) right after setScore will print the OLD value.
 *    The update hasn't happened yet!
 */

const StateBatching = () => {
    const [score, setScore] = useState(0);

    // 1. THE WRONG WAY
    const incrementWrong = () => {
        // Assume score is 0 initially.
        // We want to add 3, but we use the current constant 'score' value.
        setScore(score + 1); // request: set to 0 + 1
        setScore(score + 1); // request: set to 0 + 1
        setScore(score + 1); // request: set to 0 + 1

        // STALE CLOSURE DEMO
        console.log("Wrong Handler - Current Score Variable:", score);
        // This will print 0 (or current start value), NOT the new value.
    };

    // 2. THE CORRECT WAY
    const incrementCorrect = () => {
        // We use the functional form.
        // React queues these functions.
        setScore(prev => prev + 1); // pending: 0 -> 1
        setScore(prev => prev + 1); // pending: 1 -> 2
        setScore(prev => prev + 1); // pending: 2 -> 3

        console.log("Correct Handler - Current Score Variable:", score);
        // Still prints old value! But the end result on screen will be correct.
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h3>State Batching & Async Updates</h3>

            <div style={{ border: '2px solid #333', padding: '20px', borderRadius: '10px', width: '300px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '40px', margin: '10px 0' }}>{score}</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    {/* BUTTON 1 */}
                    <button
                        onClick={incrementWrong}
                        style={{ padding: '10px', backgroundColor: '#ffcccb', border: '1px solid red', cursor: 'pointer' }}
                    >
                        ❌ Wrong: +1 (Called 3x)
                        <br />
                        <small>setScore(score + 1)</small>
                    </button>

                    {/* BUTTON 2 */}
                    <button
                        onClick={incrementCorrect}
                        style={{ padding: '10px', backgroundColor: '#ccffcc', border: '1px solid green', cursor: 'pointer' }}
                    >
                        ✅ Correct: +3 (Called 3x)
                        <br />
                        <small>setScore(prev =&gt; prev + 1)</small>
                    </button>

                    {/* RESET */}
                    <button onClick={() => setScore(0)} style={{ marginTop: '10px' }}>
                        Reset
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '10px' }}>
                <strong>Check Console!</strong> <br />
                Notice that console.log(score) inside the handler always prints the <em>old</em> value.
            </div>
        </div>
    );
};

export default StateBatching;
