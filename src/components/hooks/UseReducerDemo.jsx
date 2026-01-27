import React, { useReducer } from 'react';

/* 
  =====================================================================
  HOOK: useReducer (Complex State Logic)
  =====================================================================
  
  What is useReducer?
  - Alternative to useState for complex state logic.
  - Good when the next state depends on the previous one in complex ways.
  - Follows Redux pattern: (state, action) => newState.
*/

// 1. DEFINE INITIAL STATE
const initialState = { count: 0, lastAction: 'None' };

// 2. DEFINE REDUCER FUNCTION
// Logic is centralized here, not in the event handlers.
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1, lastAction: 'Increment' };
        case 'decrement':
            return { count: state.count - 1, lastAction: 'Decrement' };
        case 'reset':
            return { count: 0, lastAction: 'Reset' };
        case 'set':
            return { count: action.payload, lastAction: 'Set Manual' };
        default:
            throw new Error();
    }
}

const UseReducerDemo = () => {
    // 3. USE THE HOOK
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>useReducer Hook Demo</h1>

            <div style={sectionStyle}>
                <h3>Complex Counter</h3>
                <p><strong>Count:</strong> {state.count}</p>
                <p><strong>Last Action:</strong> {state.lastAction}</p>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
                    <button onClick={() => dispatch({ type: 'increment' })}>+</button>
                    <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
                    <button onClick={() => dispatch({ type: 'set', payload: 100 })}>Set to 100</button>
                </div>
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

export default UseReducerDemo;
