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
        <div style={{ padding: '20px', fontFamily: 'Arial', paddingBottom: '100px' }}>
            <h1 style={{ marginBottom: '5px' }}>useReducer: Visual Lab</h1>

            <div style={{ backgroundColor: '#fdf3f4', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #d32f2f', marginBottom: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', maxWidth: '900px' }}>
                <h2 style={{ marginTop: 0, color: '#b71c1c' }}>Wait... What actually IS "useReducer"?</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.5' }}><strong>Think of useReducer as a "Strict Bank Teller" handling your State.</strong></p>
                <p style={{ lineHeight: '1.5', margin: '0 0 15px 0' }}>Normally, when using <code>useState</code>, you have 100% direct access to change variables. This is like having a raw "Cash Jar" sitting on your table. You can grab cash or put cash in whenever you want. But if 10 different components are all messing with the jar simultaneously, things get chaotic and bug-prone easily.</p>
                <p style={{ lineHeight: '1.5', margin: '0 0 15px 0' }}><strong>useReducer</strong> fixes this by putting your state behind a bulletproof glass window with a strict Bank Teller (The completely isolated <strong>Reducer Function</strong>). You are NO LONGER legally allowed to arbitrarily touch or rewrite the state directly.</p>
                <p style={{ lineHeight: '1.5', margin: 0 }}>Instead, if you want something changed, you have to formally submit paperwork called an <strong>"Action"</strong> (e.g. <code>dispatch(&#123; type: 'deposit_money', amount: 50 &#125;)</code>) to the Teller. The Teller reads your paperwork, checks their strict corporate rulebook (Switch Statement), and safely calculates the total for you. It's harder to set up, but makes complex logic literally bulletproof!</p>
            </div>

            <hr style={{ border: 'none', borderTop: '2px dashed #eee', margin: '30px 0' }} />
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
