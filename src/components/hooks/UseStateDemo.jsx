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
                {todos.map((t, i) => <li key={i}>{t}</li>)}
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
    // This function runs ONLY ONCE (on mount).
    // Use this if your initial value takes a long time to calculate.
    const [bigNum] = useState(() => {
        console.log("⚡ [LazyInit] Expensive Calculation Ran!");
        return 1000 * 1000;
    });

    return (
        <div style={{ ...boxStyle, borderColor: 'green' }}>
            <h4>6. Lazy Initialization</h4>
            <p>Value: {bigNum}</p>
            <small>Check Console. Log appears only once!</small>
        </div>
    );
};

// ============================================
// MAIN PARENT
// ============================================
const UseStateDemo = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>useState: Visual Lab</h1>

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

export default UseStateDemo;
