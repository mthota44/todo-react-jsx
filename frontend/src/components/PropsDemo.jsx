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
    ); s
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
    return (
        <div style={{ border: '2px dashed red', padding: '15px', marginTop: '15px', backgroundColor: '#ffebee', borderRadius: '5px' }}>
            <h4 style={{ color: '#d32f2f', margin: '0 0 10px 0' }}>⚠️ The "Infinite Loop" Traps</h4>
            <p style={{ fontSize: '14px', marginBottom: '15px' }}>A very common beginner mistake is accidentally executing a state-changing function <strong>instantly</strong> upon rendering, rather than waiting for an event.</p>

            <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ffcccc', marginBottom: '10px', borderRadius: '4px' }}>
                <strong style={{ color: '#d32f2f', fontSize: '14px' }}>❌ Trap 1: Calling it directly in the component body</strong>
                <pre style={{ margin: '5px 0 0 0', backgroundColor: '#f8f9fa', padding: '10px', fontSize: '12px', overflowX: 'auto' }}><code>{`const BadChild = ({ func }) => {
    // 💥 DO NOT DO THIS!
    func(); 
    
    return <div>...</div>
}`}</code></pre>
                <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#555', lineHeight: '1.4' }}><strong>Why it crashes:</strong> React loads the Child component ➔ immediately runs <code>func()</code> ➔ updates Parent's state ➔ forces Child to reload ➔ runs <code>func()</code> again ➔ 💥 <strong>INFINITE LOOP!</strong> 💥</p>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ffcccc', borderRadius: '4px' }}>
                <strong style={{ color: '#d32f2f', fontSize: '14px' }}>❌ Trap 2: Adding parentheses inside onClick</strong>
                <pre style={{ margin: '5px 0 0 0', backgroundColor: '#f8f9fa', padding: '10px', fontSize: '12px', overflowX: 'auto' }}><code>{`// 💥 DO NOT DO THIS EITHER!
<button onClick={ func() }> Wrong </button>`}</code></pre>
                <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#555', lineHeight: '1.4' }}><strong>Why it crashes:</strong> Adding <code>()</code> mathematically commands JavaScript to <em>"Execute this immediately RIGHT NOW"</em>. It forcefully fires instantly on page load instead of politely waiting for your click! (This triggers the exact same Infinite Loop crash).</p>
            </div>
            
            <div style={{ backgroundColor: '#e8f5e9', padding: '10px', border: '1px solid #c8e6c9', marginTop: '15px', borderRadius: '4px' }}>
                <strong style={{ color: '#2e7d32', fontSize: '14px' }}>✅ THE FIX (Correct Ways):</strong>
                <pre style={{ margin: '5px 0 0 0', backgroundColor: '#f8f9fa', padding: '10px', fontSize: '12px', overflowX: 'auto' }}><code>{`// Option 1: Pass only the reference (leave off the parenthesis)
<button onClick={ func }> Safe </button>

// Option 2: Wrap it securely in an Arrow Function shield
<button onClick={ () => func() }> Safe </button>`}</code></pre>
            </div>
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

    return (
        <div style={{ border: '2px dashed red', padding: '15px', marginTop: '20px', backgroundColor: '#fff3e0', borderRadius: '5px' }}>
            <h3 style={{ color: '#d32f2f', marginTop: 0 }}>9. The "Too Many Re-renders" Crash</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.5' }}>It is extremely common for beginners to accidentally trigger an infinite loop when passing State Setters (like <code>setCount</code>) down to children. Here is exactly why it happens and how to fix it simply in plain English.</p>

            <div style={{ backgroundColor: '#fff', padding: '15px', border: '1px solid #ffcccc', marginBottom: '15px', borderRadius: '4px' }}>
                <strong style={{ color: '#d32f2f', fontSize: '15px' }}>❌ The Crash Code</strong>
                <pre style={{ margin: '10px 0', backgroundColor: '#f8f9fa', padding: '10px', fontSize: '13px', borderLeft: '3px solid #d32f2f' }}><code>{`const BadChild = ({ setCount }) => {
    // 💥 DO NOT DO THIS!
    setCount(6); 
    
    return <div>Hello</div>
}`}</code></pre>
                <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#444' }}>
                    <p style={{ margin: '0 0 5px 0' }}><strong>Here is the loop that breaks and crashes your browser:</strong></p>
                    <ol style={{ margin: 0, paddingLeft: '20px' }}>
                        <li>React looks at the Page and decides to render <code>BadChild</code> for the user.</li>
                        <li>While brutally reading <code>BadChild</code> line-by-line, it immediately hits <code>setCount(6)</code>.</li>
                        <li>React says <em>"Oh! You changed the data! I need to refresh the page!"</em>.</li>
                        <li>React forcefully refreshes the page and starts attempting to render <code>BadChild</code> again.</li>
                        <li>It hits <code>setCount(6)</code> again...</li>
                        <li>This infinitely loops until React throws a "Too many re-renders" safety crash.</li>
                    </ol>
                </div>
            </div>

            <div style={{ backgroundColor: '#e8f5e9', padding: '15px', border: '1px solid #c8e6c9', borderRadius: '4px' }}>
                <strong style={{ color: '#2e7d32', fontSize: '15px' }}>✅ The Simple Fix (Use Events!)</strong>
                <p style={{ fontSize: '13px', margin: '5px 0 10px 0', lineHeight: '1.5' }}>State-changing functions should almost <strong>always</strong> be attached to an Event (like a physical mouse click) so they wait patiently instead of running aggressively upon page load.</p>
                
                <pre style={{ margin: '0 0 15px 0', backgroundColor: '#f8f9fa', padding: '10px', fontSize: '13px', borderLeft: '3px solid #2e7d32' }}><code>{`const GoodChild = ({ setCount }) => {
    return (
        // ✅ The function politely waits for the user to click!
        <button onClick={() => setCount(prev => prev + 1)}>
            Click to Change Data
        </button>
    )
}`}</code></pre>
                
                <div style={{ padding: '15px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>Live Demo of GoodChild:</h4>
                    <p style={{ margin: '0 0 10px 0' }}>Current Parent Count: <strong style={{ fontSize: '18px' }}>{count}</strong></p>
                    {/* The Safe Child completely replacing all that confusing useEffect logic */}
                    <button 
                        onClick={() => setCount(prev => prev + 1)}
                        style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Click to Safely Increase Number
                    </button>
                    &nbsp;
                    <button 
                        onClick={() => setCount(0)}
                        style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Reset Data
                    </button>
                </div>
            </div>
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
            <h1 style={{ marginBottom: '5px' }}>Props: Visual Lab</h1>

            {/* Added: "What are Props?" Real-World Explanation */}
            <div style={{ backgroundColor: '#fff3e0', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #ff9800', marginBottom: '25px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', lineHeight: '1.5' }}>
                <h2 style={{ marginTop: 0, color: '#e65100' }}>What exactly are "Props"?</h2>
                <p><strong>Think of Props simply as "Settings" or "Instructions".</strong></p>
                <p>In the real world, if you predictably buy a brand new television, the physical TV inherently knows structurally <em>how</em> to visually display pictures. But you actively use the remote specifically to pass it explicit "Instructions" (like Volume: 50, Channel: 3). The basic TV safely receives these external instructions and simply visually reacts to them.</p>
                <p>In React, components are fiercely independent UI building blocks. <strong>Props</strong> (short for Properties) are fundamentally the custom "Settings" that a Parent component securely passes relentlessly down into its Child components to uniquely configure them precisely.</p>
                <p style={{ margin: 0 }}>This logically allows massively reusable components. You can structurally build one single generic <code>&lt;Button /&gt;</code> component, but then definitively drop it anywhere and pass it dynamically different props like: <code>&lt;Button color="red" text="Delete" /&gt;</code>!</p>
            </div>

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
