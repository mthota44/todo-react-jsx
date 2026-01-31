import React, { useState } from 'react';

/**
 * -----------------------------------------------------------------------
 * 2. DECLARATIVE VS IMPERATIVE
 * -----------------------------------------------------------------------
 * 
 * MENTAL MODEL:
 * 
 * IMPERATIVE (How):
 * - Focuses on STEPS to achieve a result.
 * - "Select the button. Check if it's red. If yes, make it blue. If no, make it red."
 * - Common in jQuery or vanilla JS DOM manipulation.
 * - Harder to manage as app grows (Spaghetti code).
 * 
 * DECLARATIVE (What):
 * - Focuses on the END RESUlT based on state.
 * - "The button's color is {isActive ? 'blue' : 'red'}."
 * - React handles the DOM updates to match your description.
 * - Predictable: State = UI.
 */

const DeclarativeVsImperative = () => {
    // DECLARATIVE STATE
    const [isActive, setIsActive] = useState(false);

    // IMPERATIVE HANDLER
    const runImperative = () => {
        // Manually manipulating the DOM (The "Old Way")
        const box = document.getElementById('imperative-box');
        if (!box) return;

        // We have to manually check current state or just toggle blindly
        if (box.style.backgroundColor === 'red') {
            box.style.backgroundColor = 'white';
            box.innerText = 'Imperative: OFF';
        } else {
            box.style.backgroundColor = 'red';
            box.innerText = 'Imperative: ON';
        }
        console.log("Imperative: Manually changed DOM style.");
    };

    // DECLARATIVE HANDLER
    const runDeclarative = () => {
        // We just update data. React takes care of the DOM.
        setIsActive(!isActive);
        console.log("Declarative: Updated state to", !isActive);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h3>2. Declarative vs Imperative</h3>

            {/* IMPERATIVE EXAMPLE */}
            <div style={{ marginBottom: '20px', border: '1px dashed grey', padding: '10px' }}>
                <h4>Imperative (Vanilla JS Style)</h4>
                <div
                    id="imperative-box"
                    style={{ width: '100%', height: '50px', border: '1px solid #333', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    Imperative: OFF
                </div>
                <button onClick={runImperative}>
                    Toggle Manually (DOM Manipulation)
                </button>
                <p><small>Note: State does not track this change!</small></p>
            </div>

            {/* DECLARATIVE EXAMPLE */}
            <div style={{ border: '1px solid blue', padding: '10px' }}>
                <h4>Declarative (React Style)</h4>
                <div
                    style={{
                        width: '100%',
                        height: '50px',
                        border: '1px solid #333',
                        marginBottom: '10px',
                        // HERE IS THE MAGIC: The UI is a function of state
                        backgroundColor: isActive ? 'blue' : 'white',
                        color: isActive ? 'white' : 'black',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    Declarative: {isActive ? 'ON' : 'OFF'}
                </div>
                <button onClick={runDeclarative}>
                    Toggle Information (Update State)
                </button>
            </div>
        </div>
    );
};

export default DeclarativeVsImperative;
