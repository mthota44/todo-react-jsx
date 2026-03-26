import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const WhyNotLet = () => {
    // 1. The Normal Variable (let)
    let normalCount = 0;

    const handleLetClick = () => {
        normalCount = normalCount + 1;
        // The value changes in the computer memory, but the screen doesn't refresh!
        console.log("Normal Count is now in memory:", normalCount);
    };

    // 2. The React State
    const [stateCount, setStateCount] = useState(0);

    const handleStateClick = () => {
        // This tells React: "Change the value AND refresh the screen to show it!"
        setStateCount(prev => prev + 1);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px' }}>
            <Link to="/doubts" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                &larr; Back to Doubts
            </Link>

            <h1 style={{ color: '#d32f2f' }}>Why can't I just use <code>let count = 0;</code>?</h1>
            
            <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                Because <strong>React stubbornly ignores normal variables</strong> when deciding whether to repaint the screen.
            </p>

            <div style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #ff9800', marginBottom: '30px' }}>
                <h3 style={{ marginTop: 0, color: '#e65100' }}>The Two Core Problems with <code>let</code>:</h3>
                <ol style={{ lineHeight: '1.6' }}>
                    <li><strong>No UI Updates:</strong> You physically update the variable in the background (like <code>count = 100</code>), but React stays completely deaf to it. The screen stays frozen on <code>0</code>.</li>
                    <li><strong>Clinical Amnesia:</strong> If any other piece of state legally forces the page to refresh, React aggressively destroys your normal <code>let</code> variables and violently resets them back to <code>0</code>. It has zero memory of anything that isn't a <code>useState</code>!</li>
                </ol>
            </div>

            <h2>Live Interactive Proof:</h2>
            <p>Open your Console Menu (F12) to see exactly what is happening under the hood.</p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
                
                {/* ❌ THE BROKEN WAY */}
                <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '2px solid red', borderRadius: '8px', backgroundColor: '#ffebee' }}>
                    <h3 style={{ color: '#d32f2f', marginTop: 0 }}>❌ The <code>let</code> Variable</h3>
                    <p style={{ fontSize: '14px', color: '#555' }}>Click the button. Notice the screen refuses to update, but the invisible Console log goes up!</p>
                    
                    <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '4px', textAlign: 'center', marginBottom: '15px', border: '1px solid #ffcccc' }}>
                        <h1 style={{ fontSize: '48px', margin: 0 }}>{normalCount}</h1>
                        <p style={{ margin: 0, color: '#888' }}>Screen freezes on 0</p>
                    </div>

                    <button 
                        onClick={handleLetClick}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        let count = count + 1;
                    </button>
                </div>

                {/* ✅ THE CORRECT WAY */}
                <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '2px solid green', borderRadius: '8px', backgroundColor: '#e8f5e9' }}>
                    <h3 style={{ color: '#2e7d32', marginTop: 0 }}>✅ The <code>useState</code></h3>
                    <p style={{ fontSize: '14px', color: '#555' }}>Click the button. React hears the State change and faithfully repaints the screen!</p>
                    
                    <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '4px', textAlign: 'center', marginBottom: '15px', border: '1px solid #c8e6c9' }}>
                        <h1 style={{ fontSize: '48px', margin: 0 }}>{stateCount}</h1>
                        <p style={{ margin: 0, color: '#888' }}>Screen successfully updates</p>
                    </div>

                    <button 
                        onClick={handleStateClick}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        setCount(prev =&gt; prev + 1);
                    </button>
                </div>

            </div>
        </div>
    );
};

export default WhyNotLet;
