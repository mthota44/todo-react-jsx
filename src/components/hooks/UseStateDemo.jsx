import React, { useState } from 'react';

/* 
  =====================================================================
  HOOK: useState (Detailed Demo)
  =====================================================================
  
  What is useState?
  - It allows functional components to have their own local state.
  - Returns an array with two elements: [currentValue, updateFunction].
  
  Rule of Hooks:
  - Only call hooks at the top level (not inside loops/conditions).
  - Only call hooks from React functional components.
*/

const UseStateDemo = () => {
    // ----------------------------------------------------
    // 1. BASIC COUNTER (Primitive State) & FUNCTIONAL UPDATES
    // ----------------------------------------------------

    // Concept: Initialize custom state. 
    // count is the value, setCount is the function to change it.
    const [count, setCount] = useState(0);

    const increment = () => {
        // Standard update
        setCount(count + 1);
    };

    const incrementSafe = () => {
        // Concept: Functional Update / Previous State
        // When new state depends on the old state, ALWAYS use the function form.
        // This guarantees you are working with the latest state updates.
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1); // This would actually add 2 because of the queue
    };

    // ----------------------------------------------------
    // 2. LAZY INITIALIZATION
    // ----------------------------------------------------

    // Concept: Expensive Calculation for Initial State
    // If the initial state requires a heavy calculation, pass a FUNCTION to useState.
    // It will only run on the VERY FIRST render.
    const [expensiveValue, setExpensiveValue] = useState(() => {
        console.log("Expensive calculation running..."); // You will see this only once in console
        return 100 * 100; // Returns 10000
    });

    // ----------------------------------------------------
    // 3. OBJECT STATE (Merges are NOT automatic)
    // ----------------------------------------------------

    const [user, setUser] = useState({
        name: "John",
        age: 30,
        role: "Developer"
    });

    const updateName = () => {
        // EDGE CASE: If you just do setUser({ name: "Doe" }), you LOSE 'age' and 'role'.
        // Concept: Spread Operator (...)
        // You must manually copy the old properties using ...user
        setUser(prevUser => ({
            ...prevUser, // Copy existing properties
            name: "Jane" // Override the one you want to change
        }));
    };

    // ----------------------------------------------------
    // 4. ARRAY STATE
    // ----------------------------------------------------

    const [items, setItems] = useState([]);

    const addItem = () => {
        const newItem = `Item ${items.length + 1}`;
        // EDGE CASE: Do not use items.push(). State must be immutable.
        // Create a NEW array with old items + new item.
        setItems([...items, newItem]);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>useState Hook Demo</h1>
            <p>Check the code comments for deep explanations.</p>

            {/* DEMO 1: Basic & Functional Updates */}
            <div style={sectionStyle}>
                <h3>1. Counter (Primitive & Functional Updates)</h3>
                <p>Count: {count}</p>
                <button onClick={increment}>Increment (Unsafe for multiple updates)</button>
                <button onClick={incrementSafe} style={{ marginLeft: '10px' }}>Increment +2 (Safe/Functional)</button>
            </div>

            {/* DEMO 2: Lazy Init */}
            <div style={sectionStyle}>
                <h3>2. Lazy Initialization</h3>
                <p>Value: {expensiveValue} (Calculated once on mount)</p>
                <button onClick={() => setExpensiveValue(expensiveValue + 1)}>Increment Value</button>
            </div>

            {/* DEMO 3: Object State */}
            <div style={sectionStyle}>
                <h3>3. Object State (Handling Complex Data)</h3>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <button onClick={updateName}>Change Name to Jane (Preserves other fields)</button>
            </div>

            {/* DEMO 4: Array State */}
            <div style={sectionStyle}>
                <h3>4. Array State (Lists)</h3>
                <button onClick={addItem}>Add Item</button>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const sectionStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    background: '#f9f9f9'
};

export default UseStateDemo;
