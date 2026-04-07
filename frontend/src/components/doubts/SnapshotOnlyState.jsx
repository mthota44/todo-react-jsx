import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const SnapshotOnlyState = () => {
    // 1. A State Variable (Snapshotted)
    const [score, setScore] = useState(0);

    // 2. A Mutable Ref (Live / Not Snapshotted)
    const liveRef = useRef(0);

    const handleStateSnapshot = () => {
        // We update the state
        setScore(score + 1);
        
        // Because 'score' is a frozen snapshot for this current function execution,
        // it will STILL perfectly equal the old number immediately after!
        alert(`STATE (Snapshot) is frozen. You just ran setScore(score + 1), but the variable is still physically locked at: ${score}`);
    };

    const handleRefLive = () => {
        // We instantly mutate the Ref
        liveRef.current = liveRef.current + 1;
        
        // Because Refs completely ignore the snapshot rule, the variable changes immediately!
        alert(`REF (Live) completely ignored the snapshot. The variable instantly mutated to: ${liveRef.current}`);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '850px', lineHeight: '1.6' }}>
            <Link to="/doubts" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                &larr; Back to Doubts
            </Link>

            <h1 style={{ color: '#d32f2f', marginBottom: '10px' }}>Does React "Snapshot" everything? Or just State?</h1>
            <p style={{ fontSize: '18px', color: '#555', marginTop: 0 }}>
                React <strong>ONLY</strong> strictly enforces the "Snapshot" rule on highly specific things: <strong>State</strong> and <strong>Props</strong>. Everything else in Javascript completely ignores it and acts like normal LIVE variables!
            </p>

            {/* 1. What Gets Snapshotted? */}
            <div style={{ backgroundColor: '#fff3e0', borderLeft: '5px solid #ff9800', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#e65100', marginTop: 0 }}>1. What IS Snapshotted? (Frozen)</h2>
                <ul>
                    <li><strong>useState (State):</strong> Frozen to guarantee the UI is safely rendered based on a single consistent timeframe.</li>
                    <li><strong>Props:</strong> The exact data fiercely passed down from the Parent component is also completely frozen for the exact same safety reason.</li>
                </ul>
                <p style={{ margin: 0 }}>If you maliciously try to execute <code>console.log(stateValue)</code> immediately after running <code>setState(newValue)</code>, the console emphatically prints the <strong>old frozen snapshot</strong> instead of the new one.</p>
            </div>

            {/* 2. What Does Not Get Snapshotted? */}
            <div style={{ backgroundColor: '#e8f5e9', borderLeft: '5px solid #2e7d32', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#1b5e20', marginTop: 0 }}>2. What is LIVE? (Ignores snapshots completely)</h2>
                <p>There are completely legal tools deliberately designed to violently bypass the Snapshot freezing rule completely, acting instantly under the hood:</p>
                <ul>
                    <li><strong>useRef:</strong> This hook is a custom permanent "Live Box". It exists purely outside the React rendering snapshot timeline. Changing it massively mutates the data instantly without ever triggering a re-render.</li>
                    <li><strong>Raw Outer Variables:</strong> Simple variables like <code>let globalUser = null;</code> floating outside your React component completely evade being snapshotted simply because React doesn't manage them at all!</li>
                    <li><strong>Web APIs:</strong> Things like <code>window.innerWidth</code> are raw physical realities of the browser, wildly outside any frozen React snapshot.</li>
                </ul>
            </div>

            {/* 3. The Live Demo */}
            <h2 style={{ marginTop: '40px' }}>3. Interactive Proof Demo</h2>
            <p>Click these fiercely competitive buttons to prove practically how State gets frozen but Refs aggressively mutate mid-stride!</p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                
                {/* 🧊 FROZEN STATE DEMO */}
                <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '2px solid orange', borderRadius: '8px', backgroundColor: '#fff3e0' }}>
                    <h3 style={{ color: '#e65100', marginTop: 0 }}>🧊 useState (The Snapshot)</h3>
                    <p style={{ fontSize: '13px', color: '#555' }}>Watch the Alert strictly output the old Frozen value even after it attempts to update.</p>
                    
                    <button 
                        onClick={handleStateSnapshot}
                        style={{ width: '100%', padding: '12px', backgroundColor: '#ff9800', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Try to update State & Log it instantly
                    </button>
                    
                    <p style={{ textAlign: 'center', marginTop: '15px' }}>Current UI Rendered Score: <strong style={{ fontSize: '24px' }}>{score}</strong></p>
                </div>

                {/* 🔥 LIVE REF DEMO */}
                <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '2px solid green', borderRadius: '8px', backgroundColor: '#e8f5e9' }}>
                    <h3 style={{ color: '#2e7d32', marginTop: 0 }}>🔥 useRef (The Live Box)</h3>
                    <p style={{ fontSize: '13px', color: '#555' }}>Notice how the Alert happily grabs the completely mutated NEW value immediately.</p>
                    
                    <button 
                        onClick={handleRefLive}
                        style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Forcefully Mutate Ref & Log it instantly
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '15px' }}>Current UI Rendered Ref: <strong style={{ fontSize: '24px' }}>{liveRef.current}</strong></p>
                    
                    <div style={{ backgroundColor: '#c8e6c9', padding: '10px', borderRadius: '4px', marginTop: '15px', borderLeft: '3px solid #1b5e20', fontSize: '13px', color: '#1b5e20' }}>
                        <strong>Wait, why didn't the screen update?</strong><br/>
                        React ONLY triggers a "Re-Render" (repainting the screen) when <code>useState</code> changes! <code>useRef</code> is intentionally an "escape hatch". It stores data securely in the background strictly <em>without</em> aggressively forcing the screen to reload.
                    </div>
                </div>
            </div>

            <button 
                onClick={() => setScore(0)}
                style={{ width: '100%', padding: '15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '30px', fontSize: '16px' }}
            >
                Force a Component UI Render (Notice the Ref UI finally catches up!)
            </button>
        </div>
    );
};

export default SnapshotOnlyState;
