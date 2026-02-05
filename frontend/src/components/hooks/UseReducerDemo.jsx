import React, { useReducer, useEffect } from 'react';

// ==========================================
// EXAMPLE 1: FORM STATE (Handling Multiple Fields)
// ==========================================
const formInitialState = {
    username: '',
    email: '',
    isValid: false
};

const formReducer = (state, action) => {
    switch (action.type) {
        case 'input_change':
            const newState = { ...state, [action.field]: action.value };
            // Edge Case Logic: Conditional state updates based on other fields
            newState.isValid = newState.username.length > 3 && newState.email.includes('@');
            return newState;
        case 'reset':
            return formInitialState;
        default:
            return state;
    }
}

// ==========================================
// EXAMPLE 2: DATA FETCHING (Loading/Success/Error Pattern)
// ==========================================
const fetchInitialState = {
    loading: false,
    data: null,
    error: null
};

const fetchReducer = (state, action) => {
    switch (action.type) {
        case 'request_start':
            return { ...state, loading: true, error: null };
        case 'request_success':
            return { ...state, loading: false, data: action.payload };
        case 'request_fail':
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

// ==========================================
// EXAMPLE 3: LAZY INITIALIZATION (Edge Case)
// ==========================================
// Use this if initial state calculation is expensive
const init = (initialCount) => {
    // Imagine this is a heavy calculation
    return { count: initialCount };
}

const lazyReducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'reset':
            // Resets to the lazy initial value
            return init(action.payload);
        // Edge Case: Bailing out of updates
        // If we return the EXACT same state object, React skips re-render.
        case 'no_change':
            return state;
        default:
            return state;
    }
}

const UseReducerDemo = () => {
    // ----------------------------------------------------
    // HOOK USAGE
    // ----------------------------------------------------
    const [formState, dispatchForm] = useReducer(formReducer, formInitialState);
    const [fetchState, dispatchFetch] = useReducer(fetchReducer, fetchInitialState);

    // Lazy usage: 3rd argument is the init function, 2nd is the argument passed to it
    const [lazyState, dispatchLazy] = useReducer(lazyReducer, 10, init);

    // ----------------------------------------------------
    // HELPERS
    // ----------------------------------------------------
    const handleSimulateFetch = () => {
        dispatchFetch({ type: 'request_start' });
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                dispatchFetch({ type: 'request_success', payload: "Fetched User Data: John Doe" });
            } else {
                dispatchFetch({ type: 'request_fail', error: "500 Server Error" });
            }
        }, 1500);
    };

    console.log("Component Rendered! (Check console to see when 'No Change' effectively skips render logic if optimized properly by React)");

    return (
        <div>
            <h1>useReducer Examples</h1>

            <hr />

            {/* EXAMPLE 1 */}
            <h3>1. Complex Form Management</h3>
            <p>Centralized logic for multiple fields validation.</p>
            <div>
                <input
                    type="text"
                    placeholder="Username (>3 chars)"
                    value={formState.username}
                    onChange={(e) => dispatchForm({ type: 'input_change', field: 'username', value: e.target.value })}
                />
                <br />
                <input
                    type="text"
                    placeholder="Email (must allow @)"
                    value={formState.email}
                    onChange={(e) => dispatchForm({ type: 'input_change', field: 'email', value: e.target.value })}
                />
            </div>
            <p>Form Valid? {formState.isValid ? "YES" : "NO"}</p>
            <button onClick={() => dispatchForm({ type: 'reset' })}>Reset Form</button>

            <hr />

            {/* EXAMPLE 2 */}
            <h3>2. Data Fetching Machine</h3>
            <p>Prevents impossible states (like being Loading and Error at the same time).</p>

            <button onClick={handleSimulateFetch} disabled={fetchState.loading}>
                {fetchState.loading ? "Loading..." : "Fetch Data"}
            </button>

            {fetchState.error && <p style={{ color: 'red' }}>Error: {fetchState.error}</p>}
            {fetchState.data && <p style={{ color: 'green' }}>Success: {fetchState.data}</p>}

            <hr />

            {/* EXAMPLE 3 */}
            <h3>3. Lazy Init & Bailout (Edge Cases)</h3>
            <p>Count: {lazyState.count}</p>
            <button onClick={() => dispatchLazy({ type: 'increment' })}>Increment</button>
            <button onClick={() => dispatchLazy({ type: 'reset', payload: 10 })}>Reset to 10 (Re-runs Lazy Init)</button>
            <button onClick={() => dispatchLazy({ type: 'no_change' })}>
                Dispatch 'No Change' (See Console - Should NOT Re-render)
            </button>

            <hr />
        </div>
    );
};

export default UseReducerDemo;
