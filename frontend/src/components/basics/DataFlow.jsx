import React, { useState } from 'react';

/**
 * -----------------------------------------------------------------------
 * 3. ONE-WAY DATA FLOW & 4. STATE VS PROPS
 * -----------------------------------------------------------------------
 * 
 * MENTAL MODEL:
 * - Data flows DOWN like a waterfall (Parent -> Child).
 * - "Props" are the water reaching the child (Read-only).
 * - "State" is the source of the water (Mutable by owner).
 * 
 * RULES:
 * 1. A Child CANNOT modify Props directly. They are IMMUTABLE.
 * 2. If a Child wants to change data, it must ask the Parent via a Function Prop (Callback).
 * 3. State belongs to the component that defined it.
 */

// CHILD COMPONENT
const ChildDisplay = ({ message, onMessageUpdate }) => {
    // 1. Props are read-only
    // message = "New Value"; // This would throw a TypeError or fail silently in build

    return (
        <div style={{ border: '2px solid #007bff', margin: '10px', padding: '10px', borderRadius: '8px' }}>
            <h4>I am the Child</h4>

            <p><strong>Incoming Prop:</strong> "{message}"</p>

            {/* ERROR DEMO: Try to change prop (Conceptual) */}
            <button
                onClick={() => {
                    console.error("ERROR: Cannot assign to read only property 'message' of object");
                    alert("Error: Props are read-only! Child cannot change them directly.");
                }}
                style={{ backgroundColor: '#ffcccb', marginRight: '5px' }}
            >
                Try to Change Prop Directly
            </button>

            {/* CORRECT WAY: Call parent's function */}
            <button
                onClick={() => onMessageUpdate("Message updated by Child!")}
                style={{ backgroundColor: '#ccffcc' }}
            >
                Ask Parent to Change
            </button>
        </div>
    );
};

// PARENT COMPONENT
const DataFlow = () => {
    // State lives here - Only Parent can change this directly via setParentMessage
    const [parentMessage, setParentMessage] = useState("Hello from Parent");

    const handleUpdate = (newValue) => {
        console.log("Parent received request to update:", newValue);
        setParentMessage(newValue);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h3>3 & 4. Data Flow & State vs Props</h3>

            <div style={{ border: '2px solid #333', padding: '20px' }}>
                <h4>I am the Parent</h4>
                <p><strong>My State:</strong> "{parentMessage}"</p>

                <button onClick={() => setParentMessage("Parent Changed State!")}>
                    Change State Locally
                </button>

                {/* Passing Data DOWN */}
                <ChildDisplay
                    message={parentMessage}
                    onMessageUpdate={handleUpdate}
                />
            </div>
        </div>
    );
};

export default DataFlow;
