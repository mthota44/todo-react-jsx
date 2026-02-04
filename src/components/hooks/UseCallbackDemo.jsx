import React, { useState, useCallback, useEffect } from 'react';

// CHILD COMPONENT
// We wrap it in React.memo so it ONLY re-renders if props change.
const List = React.memo(({ getItems }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getItems(5)); // Fetch 5 items
        console.log("Updating Items (Referential Change detected in getItems)");
    }, [getItems]);

    return (
        <ul>
            {items.map(item => <li key={item}>{item}</li>)}
        </ul>
    );
});

const UseCallbackDemo = () => {
    const [number, setNumber] = useState(1);
    const [dark, setDark] = useState(false);

    // ==========================================
    // DEMO: FUNCTION REFERENTIAL EQUALITY
    // ==========================================
    // Every time this component re-renders (e.g., toggling theme), 
    // the 'getItems' function is normally RE-CREATED.
    // Since it's a new object (function), the Child (List) thinks props changed
    // and re-runs its useEffect.

    // useCallback caches the FUNCTION INSTANCE itself.
    const getItems = useCallback((incrementor) => {
        return [number + incrementor, number + incrementor + 1, number + incrementor + 2];
    }, [number]);
    // ^ ONLY re-create function if 'number' changes. 
    // Toggling 'dark' will NOT re-create this function.

    const theme = {
        backgroundColor: dark ? '#333' : '#FFF',
        color: dark ? '#FFF' : '#333',
        padding: '20px'
    };

    return (
        <div style={theme}>
            <h1>useCallback Demo</h1>

            <hr />

            <h3>Preventing Unnecessary Child Re-renders</h3>
            <input
                type="number"
                value={number}
                onChange={e => setNumber(parseInt(e.target.value))}
            />
            <p>Number: {number}</p>

            <button onClick={() => setDark(prev => !prev)}>
                Toggle Theme (Triggers Parent Render)
            </button>

            <div style={{ marginTop: '20px', border: '1px solid #777', padding: '10px' }}>
                <h4>Child Component Content:</h4>
                <List getItems={getItems} />
            </div>

            <p>
                <em>
                    Open Console. <br />
                    1. Changing "Number" implies "Updating Items" logs (Correct, data changed). <br />
                    2. Toggling "Theme" implies NO LOGS should appear (Correct, function instance stayed same thanks to useCallback).
                </em>
            </p>
        </div>
    );
};

export default UseCallbackDemo;
