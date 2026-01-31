import React, { useState } from 'react';

/* 
  =====================================================================
  MODULE 2: PROPS (Detailed Demo)
  =====================================================================
  
  What are Props?
  - Props (short for "Properties") are inputs to components.
  - They allow data to flow from a Parent component down to a Child component.
  - They are read-only (immutable).
*/

// 1. BASIC PROPS (Primitives)
// This child receives simple data like Strings, Numbers, and Booleans.
const ProfileCard = (props) => {
    // Concept: Conditional Rendering using Boolean Props
    // If 'isOnline' is true, we show "Online", otherwise "Offline"
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>User Profile (Primitives)</h3>
            <p><strong>Name:</strong> {props.name} (String)</p>
            <p><strong>Age:</strong> {props.age} (Number)</p>
            <p><strong>Status:</strong> {props.isOnline ? "✅ Online" : "❌ Offline"} (Boolean)</p>
        </div>
    );
};

// 2. OBJECT & ARRAY PROPS
// We can pass complex data structures like Objects and Arrays.
const ProductList = (props) => {
    // Concept: Destructuring Props
    // Instead of using 'props.config', we extract it directly.
    const { config, items } = props;

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{config.title} (Object & Array)</h3>
            <p>Theme: {config.theme}</p>

            <h4>Items List:</h4>
            <ul>
                {/* Concept: Rendering Lists from Array Props */}
                {items.map((item, index) => (
                    <li key={index}>{index}<b>:</b>{item}</li>
                ))}
            </ul>
        </div>
    );
};

// 3. FUNCTION PROPS (Event Handling)
// Parent passes a function to the Child. The Child calls it to "send data back".
const ActionButton = (props) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>Interaction (Function Prop)</h3>
            <p>Click the button to talk to the Parent:</p>
            {/* When clicked, we call the function passed by the Parent */}
            <button onClick={props.onClickAction}>
                {props.btnLabel}
            </button>
        </div>
    );
};

// 4. CHILDREN PROP
// A special prop that lets you pass elements *inside* the opening and closing tags of a component.
const CardWrapper = (props) => {
    return (
        <div style={{
            backgroundColor: '#f0f0f0',
            padding: '20px',
            border: '2px dashed #999',
            margin: '10px 0'
        }}>
            <h3>I am a Wrapper Component (Children Prop)</h3>
            <p>Whatever you put inside me will appear below:</p>
            {/* 'props.children' renders whatever is inside <CardWrapper>...</CardWrapper> */}
            <div style={{ background: 'white', padding: '10px' }}>
                {props.children}
            </div>
        </div>
    );
};

// 5. STATE & PROPS (Dynamic Data)
// Concept: One-Way Data Flow (Downwards)
// When Parent's STATE changes, it re-renders and passes new PROPS to the child.
const StateChild = (props) => {

    // DEMO FUNCTION: Proving the Child is powerless
    const tryToChange = () => {
        alert("STOP! 🛑\n\nI am just a Child Component.\nI do not have the 'setCount' function.\n\nI only receive 'props.value' (" + props.value + ") to display it.\n\nONLY the Parent can change this value!");
    };

    return (
        <div style={{ border: '2px solid #2196F3', padding: '15px', marginTop: '15px', backgroundColor: '#e3f2fd' }}>
            <h4 style={{ color: '#1565C0', margin: '0 0 10px 0' }}>👶 Child Component (Display Only)</h4>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ margin: 0 }}>I received props:</p>
                    <h2 style={{ margin: '5px 0', fontSize: '24px' }}>Count: {props.value}</h2>
                </div>

                {/* DEMO FOR THE NOTE */}
                <button
                    onClick={tryToChange}
                    style={{ backgroundColor: '#1565C0', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                    Try to Change Number
                </button>
            </div>

            <p style={{ fontSize: '12px', color: '#333', marginTop: '10px', backgroundColor: 'rgba(255,255,255,0.5)', padding: '5px' }}>
                <em><strong>Note Demo:</strong> Click the button above to see why I cannot change this number directly. I am just a display.</em>
            </p>
        </div>
    );
};

const StateParent = () => {
    // 1. Parent owns the State (Source of Truth)
    const [count, setCount] = useState(0);

    return (
        <div style={{ border: '2px solid #E91E63', padding: '20px', margin: '20px 0', backgroundColor: '#fce4ec' }}>
            <h3 style={{ color: '#C2185B', margin: '0 0 15px 0' }}>👩‍👦 Parent Component</h3>
            <p>I hold the <strong>State</strong>. I can modify it.</p>

            {/* 2. Modifying State in Parent */}
            <button
                onClick={() => setCount(count + 1)}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#E91E63',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                Modify Parent State (+1)
            </button>

            {/* 3. Passing State down as Props */}
            <StateChild value={count} />
        </div>
    );
};


// 6. MODIFYING STATE FROM CHILD (Lifting State Up)
// Concept: Functional Props (Callbacks)
// To change state in a Parent from a Child, we pass a FUNCTION as a prop.
const InteractiveChild = (props) => {
    // ⚠️ EDGE CASE 1: Direct Mutation (Anti-Pattern)
    // props.count = 100; // ❌ ERROR: Props are Read-Only (Immutable).
    // Even if it worked, Parent wouldn't know to re-render.

    return (
        <div style={{ border: '2px solid orange', padding: '15px', marginTop: '10px' }}>
            <h4>👶 Interactive Child</h4>
            <p>Count from Parent: <strong>{props.count}</strong></p>

            {/* ✅ CORRECT WAY: Call the function passed by Parent */}
            <button onClick={props.increase}>
                Call Parent's Increase Function
            </button>
            &nbsp;
            <button onClick={props.reset}>
                Reset
            </button>
        </div>
    );
};

const BadChild = ({ func }) => {
    // ⚠️ EDGE CASE 2: Calling function immediately in Render
    // func(); 
    // ❌ CRITICAL ERROR/INFINITE LOOP: 
    // Calling state-setter during render triggers re-render -> runs this again -> loop.

    return (
        <div style={{ border: '2px dashed red', padding: '10px', marginTop: '10px', backgroundColor: '#ffebee' }}>
            <h4>⚠️ Edge Case: The "Infinite Loop" Trap</h4>
            <p>Check code comments to see why we don't call <code>func()</code> directly in the body.</p>

            {/* ⚠️ EDGE CASE 3: Calling immediately in Event Handler */}
            {/* <button onClick={func()}>Wrong</button> */}
            {/* ❌ ERROR: This calls 'func' on MOUNT/RENDER, not on click. */}
        </div>
    );
};

const ParentWithCallback = () => {
    const [count, setCount] = useState(0);

    // We create functions here to pass down
    const handleIncrease = () => {
        console.log("Parent: Child asked me to increase count.");
        setCount(prev => prev + 1);
    };

    const handleReset = () => setCount(0);

    return (
        <div style={{ border: '2px solid green', padding: '20px', margin: '20px 0' }}>
            <h3 style={{ color: 'green' }}>👨‍👧 Parent with Callback</h3>
            <p>Parent State: <strong>{count}</strong></p>

            <InteractiveChild
                count={count}
                increase={handleIncrease}
                reset={handleReset}
            />

            <BadChild func={handleIncrease} />
        </div>
    );
};

// 7. READ-ONLY PROPS DEMO
// Concept: Immutability
// Props are read-only. Attempting to change them throws an error in strict mode
// or fails silently in production.
const ReadOnlyComponent = (props) => {

    // Function that tries to break the rules
    const tryToMutate = () => {
        try {
            console.log("Attempting to mutate props...");
            // ❌ THIS WILL FAIL
            props.message = "I changed it!";
        } catch (error) {
            console.error("Mutation Failed:", error);
            alert(`Error: ${error.message}\n\nReason: Props are read-only!`);
        }
    };

    return (
        <div style={{ border: '2px solid purple', padding: '15px', marginTop: '20px', backgroundColor: '#f3e5f5' }}>
            <h3 style={{ color: 'purple' }}>🚫 Read-Only Props Demo</h3>
            <p>Parent says: <strong>"{props.message}"</strong></p>

            <button
                onClick={tryToMutate}
                style={{ backgroundColor: 'purple', color: 'white', padding: '8px', border: 'none', cursor: 'pointer' }}
            >
                Try to Mutate 'message' Prop
            </button>

            <p style={{ fontSize: '12px', marginTop: '10px' }}>
                Open Console (F12) to see the error when clicking above.
            </p>
        </div>
    );
};
// 8. DIRECT NUMBER MUTATION DEMO
// Addressing the note: "I cannot change this number directly"
const NumberMutationChild = (props) => {

    const tryToIncrementDirectly = () => {
        try {
            console.log("Attempting to do: props.value = props.value + 1");
            // ❌ DIRECT MUTATION OF NUMBER PROP
            props.value = props.value + 1;
        } catch (error) {
            console.error("Number Mutation Failed:", error);
            alert(`FAILED: ${error.message}\n\nYou cannot change 'props.value' directly.\nUse a callback function instead!`);
        }
    };

    return (
        <div style={{ border: '2px dashed red', padding: '15px', marginTop: '20px', backgroundColor: '#ffebee' }}>
            <h3 style={{ color: '#d32f2f' }}>🚫 Edge Case: Direct Number Mutation</h3>
            <p>Received Number: <strong>{props.value}</strong></p>

            <button
                onClick={tryToIncrementDirectly}
                style={{ backgroundColor: '#d32f2f', color: 'white', padding: '8px', border: 'none', cursor: 'pointer' }}
            >
                Try: props.value = props.value + 1
            </button>

            <p style={{ fontSize: '12px', marginTop: '10px' }}>
                This demonstrates exactly why the child cannot change the number directly.
            </p>
        </div>
    );
};
// 9. STATE SETTER EDGE CASES (The "Infinite Loop" Trap)
// Addressing the user's snippet:
// const ChildComponent = ({countSet}) => {
//   countSet(6); // ❌ CRASHES APP
// }

const StateSetterEdgeCases = () => {
    const [count, setCount] = useState(0);

    // 1. The Crash Scenario (Explained)
    // If we rendered <BadChild countSet={setCount} />, 
    // it would call setCount(6) -> Re-render Parent -> Render BadChild -> setCount(6) -> ...
    // Result: "Too many re-renders" Error.

    // 2. The Fix for "I want to set it on load"
    const SafeChildOnMount = ({ set }) => {
        // ✅ Correct: Wrap in useEffect
        React.useEffect(() => {
            console.log("SafeChild: Setting count to 100 on MOUNT.");
            set(100);
        }, []); // Empty array = Run Once

        return <div style={{ border: '1px solid green', padding: '5px' }}>I set count to 100 on mount (Safely).</div>;
    };

    // 3. The Fix for "I want to set on Event"
    const SafeChildOnEvent = ({ set }) => {
        // ✅ Correct: Wrap in Event Handler
        return (
            <div style={{ border: '1px solid blue', padding: '5px', marginTop: '5px' }}>
                <button onClick={() => set(prev => prev + 1)}>
                    Increment (Safe)
                </button>
            </div>
        );
    };

    return (
        <div style={{ border: '2px solid red', padding: '15px', marginTop: '20px', backgroundColor: '#fff3e0' }}>
            <h3 style={{ color: '#d32f2f' }}>9. State Setter Edge Cases</h3>
            <p>Current Count: <strong>{count}</strong></p>

            {/* SCENARIO 1: THE CRASH (Visual Explanation only) */}
            <div style={{ backgroundColor: '#ffebee', padding: '10px', border: '1px dashed red', marginBottom: '10px' }}>
                <strong>⚠️ Why your snippet crashes:</strong>
                <pre style={{ fontSize: '11px', backgroundColor: '#fff', padding: '5px' }}>
                    {`const Child = ({set}) => {
  set(6); // ❌ RUNS DURING RENDER
}
// 1. Render Child -> Calls set(6)
// 2. Parent State updates -> Re-renders Parent
// 3. Re-renders Child -> Calls set(6) again...
// ♾️ INFINITE LOOP`}
                </pre>
            </div>

            <p><strong>Safe Solutions:</strong></p>
            {/* Conditional render to avoid resetting logic fighting each other */}
            {count !== 100 && <SafeChildOnMount set={setCount} />}
            <SafeChildOnEvent set={setCount} />

            <button onClick={() => setCount(0)} style={{ marginTop: '10px' }}>Reset</button>
        </div>
    );
};
// ===================================
// PARENT COMPONENT (Main Page)
// ===================================
const PropsDemo = () => {

    // Data for Object/Array Demo
    const listConfig = { title: "My Shopping List", theme: "Dark" };
    const groceryItems = ["Apples", "Bananas", "Milk", "Bread"];

    // Function to handle child events
    const handleChildClick = () => {
        alert("Parent received the click event from the Child!");
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>All Types of Props Demo</h1>

            {/* 1. Passing Primitives */}
            <ProfileCard
                name="Alice"
                age={25}
                isOnline={true}
            />
            <ProfileCard
                name="Bob"
                age={30}
                isOnline={false}
            />

            {/* 2. Passing Objects and Arrays */}
            <ProductList
                config={listConfig}
                items={groceryItems}
            />

            {/* 3. Passing Functions */}
            <ActionButton
                btnLabel="Click Me!"
                onClickAction={handleChildClick}
            />

            {/* 4. Passing Children */}
            <CardWrapper>
                <p><strong>This is passed as a child!</strong></p>
                <p>It helps in creating reusable layouts.</p>
                <button>Internal Button</button>
            </CardWrapper>

            {/* 5. Props + State Interaction */}
            <StateParent />

            {/* 6. Modifying State from Child */}
            <ParentWithCallback />

            {/* 7. Read Only Props Demo */}
            <ReadOnlyComponent message="I am immutable!" />

            {/* 8. Direct Number Mutation Demo */}
            <NumberMutationChild value={999} />

            {/* 9. State Setter Edge Cases */}
            <StateSetterEdgeCases />

        </div>
    );
};

export default PropsDemo;
