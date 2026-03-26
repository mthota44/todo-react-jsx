import React, { useState } from 'react';

/* 
  =====================================================================
  HOOK: useState (Beginner's Guide)
  =====================================================================
  
  What is useState?
  - It gives your component a "Memory". 
  - Without it, variables reset every time the function runs.
  - Syntax: const [value, setValue] = useState(initialValue);

  Key Rules:
  1. Never change 'value' directly (e.g., value = 5). Always use 'setValue(5)'.
  2. For Objects/Arrays, you must COPY the old data first (Immutability).
*/

// ============================================
// 1. PRIMITIVES (Numbers, Strings, Booleans)
// ============================================
const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div style={boxStyle}>
            <h4>1. Basic: Number</h4>
            <p>Count: <strong>{count}</strong></p>
            <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={() => setCount(count - 1)}>-</button>
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
        </div>
    );
};

// ============================================
// 2. TEXT INPUT (String Binding)
// ============================================
const TextInput = () => {
    const [text, setText] = useState("Hello");

    return (
        <div style={boxStyle}>
            <h4>2. Basic: String</h4>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ padding: '5px' }}
            />
            <p>You typed: <strong>{text}</strong></p>
        </div>
    );
};

// ============================================
// 3. OBJECTS (The "Spread" Operator)
// ============================================
const UserProfile = () => {
    // STATE: An Object
    const [user, setUser] = useState({
        name: "Alice",
        role: "Admin",
        active: true
    });

    const updateName = () => {
        // MISTAKE: setUser({ name: "Bob" }) -> This wipes out 'role' and 'active'!
        // CORRECT: Use '...user' to copy old fields first.
        setUser({
            ...user,       // 1. Copy everything
            name: "Bob"    // 2. Overwrite name
        });
    };

    return (
        <div style={{ ...boxStyle, borderColor: 'orange' }}>
            <h4>3. Object (Spread ...)</h4>
            <p>{JSON.stringify(user)}</p>
            <button onClick={updateName}>Change Name to Bob</button>
            <small style={{ display: 'block', marginTop: '5px' }}>
                (Notice Role & Active stay safe!)
            </small>
        </div>
    );
};

// ============================================
// 4. ARRAYS (Adding/removing items)
// ============================================
const TodoList = () => {
    const [todos, setTodos] = useState(["Milk", "Eggs"]);

    const addItem = () => {
        // NEVER do: todos.push("Bread")
        // ALWAYS create a NEW array:
        setTodos([...todos, "Bread"]);
    };

    return (
        <div style={{ ...boxStyle, borderColor: 'purple' }}>
            <h4>4. Array (Immutable)</h4>
            <button onClick={addItem}>+ Add Bread</button>
            <ul>
                {todos.map((t, i) => <li key={i}>key: {i} - value: {t}</li>)}
            </ul>
        </div>
    );
};

// ============================================
// 5. FUNCTIONAL UPDATES (The "Queue" Problem)
// ============================================
const BatchUpdate = () => {
    const [score, setScore] = useState(0);

    const incrementWrong = () => {
        // React batches these. It sees "0 + 1", "0 + 1", "0 + 1". Result = 1.
        setScore(score + 1);
        setScore(score + 1);
        setScore(score + 1);
    };

    const incrementCorrect = () => {
        // React queues these functions. 
        // 0 -> 1, then 1 -> 2, then 2 -> 3. Result = 3.
        setScore(prev => prev + 1);
        setScore(prev => prev + 1);
        setScore(prev => prev + 1);
    };

    return (
        <div style={{ ...boxStyle, borderColor: 'blue' }}>
            <h4>5. Functional Update</h4>
            <p>Score: <strong>{score}</strong></p>
            <button onClick={incrementWrong}>+3 (Wrong Way)</button>
            <button onClick={incrementCorrect}>+3 (Correct Way)</button>
            <button onClick={() => setScore(0)}>Reset</button>
        </div>
    );
};

// ============================================
// 6. LAZY INITIALIZATION (Performance)
// ============================================
const LazyInit = () => {
    // 🌟 Lazy Initialization:
    // By safely passing an arrow function () => heavyMath() inside useState,
    // React guarantees this code executes ONLY ONE TIME when the component first loads.
    const [bigNum] = useState(() => {
        console.log("⚡ [LazyInit] Massive Calculation Ran! (You will only see this once)");
        return "1,000,000"; // Pretend this took 5 seconds to heavily calculate
    });

    return (
        <div style={{ ...boxStyle, borderColor: 'green' }}>
            <h4 style={{ color: 'green', margin: '0 0 10px 0' }}>6. Lazy Initialization (Performance Tool)</h4>
            
            <strong>What is it?</strong>
            <p style={{ fontSize: '13px', lineHeight: '1.4', margin: '5px 0 10px 0' }}>Usually, you put a simple starting value directly inside useState: <code>useState(0)</code>. But what if you need to calculate 10,000 heavy math equations to figure out that starting value?</p>
            
            <strong>Why is it fundamentally helpful?</strong>
            <p style={{ fontSize: '13px', lineHeight: '1.4', margin: '5px 0 10px 0' }}>If you just do <code>useState( doMath() )</code>, React foolishly crunches that math every single time the user clicks any button on the page, totally freezing your app.</p>
            <p style={{ fontSize: '13px', lineHeight: '1.4', margin: '5px 0 15px 0' }}>By lazily wrapping it in a function like this: <code>useState( () =&gt; doMath() )</code>, React strictly runs the heavy math exactly <strong>once</strong> when the page opens. After that, it permanently ignores the math, completely stopping your app from freezing!</p>

            <div style={{ backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px', border: '1px solid #c8e6c9' }}>
                <p style={{ margin: '0 0 5px 0' }}>Lazy Calculated Value: <strong>{bigNum}</strong></p>
                <small style={{ color: '#555' }}>Open your Console Menu (F12). That heavy calculation log only ran once!</small>
            </div>
        </div>
    );
};

// ============================================
// MAIN PARENT
// ============================================
const UseStateDemo = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1 style={{ marginBottom: '5px' }}>useState: Visual Lab</h1>
            
            {/* Added: "What is State?" Real-World Explanation */}
            <div style={descriptionStyle}>
                <h2 style={{ marginTop: 0, color: '#005bc5' }}>What exactly is a "State"?</h2>
                <p><strong>Think of State visually as a Component's Short-Term Memory.</strong></p>
                <p>In the real world, if you are a busy cashier at a coffee shop, you must remember strictly in your head how many coffees someone ordered before you mentally ring them up. That temporary memory living inside your brain is your <strong>"State"</strong>.</p>
                <p>In React, normal standard variables (like <code>let coffees = 0</code>) suffer from clinical amnesia. Every single time React updates the screen visually (called a re-render), those normal variables are utterly wiped out and violently reset to 0.</p>
                <p>By using the <code>useState()</code> hook, we definitively tell React: <em>"Hey React, this variable is super important! Memorize it, don't ever forget it, and whenever I naturally change it, systematically repaint the screen for me without wiping my data!"</em></p>
            </div>

            <div style={containerStyle}>
                {/* BASICS */}
                <div style={columnStyle}>
                    <h3>Basics</h3>
                    <Counter />
                    <TextInput />
                    <UserProfile />
                </div>

                {/* ADVANCED */}
                <div style={columnStyle}>
                    <h3>Advanced</h3>
                    <TodoList />
                    <BatchUpdate />
                    <LazyInit />
                </div>
            </div>
        </div>
    );
};

// STYLES
const containerStyle = { display: 'flex', gap: '20px', flexWrap: 'wrap' };
const columnStyle = { flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '15px' };
const boxStyle = { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px #eee' };
const descriptionStyle = { backgroundColor: '#e6f2ff', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #005bc5', marginBottom: '25px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', lineHeight: '1.5' };

export default UseStateDemo;
