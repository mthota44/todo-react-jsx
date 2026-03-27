import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StateBatching = () => {
    const [score, setScore] = useState(0);
    const [renderCount, setRenderCount] = useState(0);

    // 1. THE WRONG WAY
    const incrementWrong = () => {
        // Snapshot locked at current score
        setScore(score + 1); 
        setScore(score + 1); 
        setScore(score + 1); 
        
        // Track how many times the screen actually re-rendered
        setRenderCount(prev => prev + 1);
    };

    // 2. THE CORRECT WAY
    const incrementCorrect = () => {
        // Queues up background updates
        setScore(prev => prev + 1); 
        setScore(prev => prev + 1); 
        setScore(prev => prev + 1); 

        // Track how many times the screen actually re-rendered
        setRenderCount(prev => prev + 1);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '900px', lineHeight: '1.6' }}>
            <Link to="/basics" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                &larr; Back to Basics
            </Link>

            <h1 style={{ color: '#d32f2f', marginBottom: '10px' }}>State Snapshots & Batching</h1>
            <p style={{ fontSize: '18px', color: '#555', marginTop: 0 }}>
                React uses two strict rules called <strong>Snapshots</strong> and <strong>Batching</strong> to violently optimize performance. If you don't understand them, your app will have invisible bugs.
            </p>

            {/* 1. Snapshots */}
            <div style={{ backgroundColor: '#fff3e0', borderLeft: '5px solid #ff9800', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#e65100', marginTop: 0 }}>1. The "Snapshot" Rule</h2>
                <p>In React, State variables are <em>not</em> live variables that change mid-function like normal Javascript. Every time React draws your screen, it takes a strict, unchangeable <strong>"Snapshot"</strong> of your state at that exact millisecond.</p>
                
                <h4 style={{ margin: '15px 0 5px 0' }}>📸 The Photo Analogy:</h4>
                <p style={{ margin: 0 }}>Imagine taking a physical photograph of a football scoreboard showing <code>0</code>. If you look at the photo for 10 seconds, and the real team scores a goal behind you, the physical photo in your hand <em>still says 0</em>. It's locked. To see the new score, you must actively take a brand new photo.</p>
                
                <h4 style={{ margin: '15px 0 5px 0' }}>The Code Trap:</h4>
                <pre style={{ backgroundColor: '#282c34', color: '#fff', padding: '15px', borderRadius: '4px', fontSize: '13px', overflowX: 'auto', marginTop: 0 }}>
{`const handleClick = () => {
  setScore(score + 1); // Looks at photo (0). Says "Set to 1"
  setScore(score + 1); // Still looking at old photo (0). Says "Set to 1"
  setScore(score + 1); // Still looking at old photo (0). Says "Set to 1"
};`}</pre>
                <p style={{ margin: '10px 0 0 0' }}>Because React locked your variable to that initial snapshot, all three lines identically evaluate to <code>0 + 1</code>. The final result is just 1.</p>
            </div>

            {/* 2. Batching */}
            <div style={{ backgroundColor: '#e8f5e9', borderLeft: '5px solid #2e7d32', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#1b5e20', marginTop: 0 }}>2. The "Batching" Rule</h2>
                <p>Batching is React's aggressive attempt to be radically efficient. If you actively demand 5 different state changes inside one single function, React will bravely entirely ignore repainting the screen 5 times. It waits for the function to completely finish, groups them all together, and draws the screen exactly <strong>once</strong>.</p>
                
                <h4 style={{ margin: '15px 0 5px 0' }}>🍔 The Waiter Analogy:</h4>
                <p style={{ margin: 0 }}>Imagine a waiter at an expensive restaurant (React). <br/>
                <strong>Without Batching:</strong> You say "I want a burger," and the waiter instantly furiously sprints to the kitchen. He heavily pants back. You excitedly say "I want fries!" and he sprints away again. It's slow and annoying.<br/>
                <strong>With Batching:</strong> The waiter patiently stands there with a notepad. He writes down "Burger, Fries, Coke", waits until you are done talking, and walks lazily to the kitchen exactly once to submit the final order.</p>
            </div>

            {/* 3. The Solution */}
            <div style={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid #1976d2', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#0d47a1', marginTop: 0 }}>3. Bypassing the Snapshot (The Updater Queue)</h2>
                <p>If you genuinely need to sequentially chain multiple updates together safely, you must completely abandon the old Snapshot and forcefully read from the background queue using the "prev" arrow function.</p>
                
                <pre style={{ backgroundColor: '#282c34', color: '#fff', padding: '15px', borderRadius: '4px', fontSize: '13px', overflowX: 'auto', margin: 0 }}>
{`setScore(prev => prev + 1); // Waits for background to return 1
setScore(prev => prev + 1); // Waits for background to return 2
setScore(prev => prev + 1); // Waits for background to return 3`}</pre>
            </div>

            {/* 4. Live Demo */}
            <h2 style={{ marginTop: '40px' }}>4. Live Console & Performance Demo</h2>
            <p>Click these buttons. Notice that no matter how many heavy calculations the red or green buttons logically do, the deeply optimized <strong>Screen Renders completely ignores them and only triggers ONE single time</strong> purely thanks to Batching!</p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
                <div style={{ flex: '1', minWidth: '250px', backgroundColor: '#333', color: '#fff', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
                    <h5 style={{ margin: 0, color: '#aaa', textTransform: 'uppercase' }}>Score</h5>
                    <h1 style={{ fontSize: '72px', margin: '10px 0', color: '#4fc3f7' }}>{score}</h1>
                    
                    <div style={{ marginTop: '20px', borderTop: '1px solid #555', paddingTop: '15px' }}>
                        <h5 style={{ margin: 0, color: '#aaa', textTransform: 'uppercase' }}>Total Screen Renders</h5>
                        <h2 style={{ margin: '5px 0 0 0', color: '#ffb74d' }}>{renderCount}</h2>
                    </div>
                </div>

                <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    
                    <div style={{ padding: '15px', border: '1px solid #ffcdd2', borderRadius: '8px', backgroundColor: '#ffebee' }}>
                        <h3 style={{ marginTop: 0, color: '#c62828' }}>❌ The Snapshot Trap</h3>
                        <p style={{ fontSize: '13px', color: '#555', marginBottom: '10px' }}>Fires <code>setScore(score + 1)</code> three times. Fails because it evaluates the old locked snapshot.</p>
                        <button 
                            onClick={incrementWrong}
                            style={{ width: '100%', padding: '12px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Trigger +3 (Wrong)
                        </button>
                    </div>

                    <div style={{ padding: '15px', border: '1px solid #c8e6c9', borderRadius: '8px', backgroundColor: '#e8f5e9' }}>
                        <h3 style={{ marginTop: 0, color: '#2e7d32' }}>✅ The Queue Bypass</h3>
                        <p style={{ fontSize: '13px', color: '#555', marginBottom: '10px' }}>Fires <code>setScore(prev =&gt; prev + 1)</code> three times. Succeeds because it skips the snapshot entirely.</p>
                        <button 
                            onClick={incrementCorrect}
                            style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Trigger +3 (Correct)
                        </button>
                    </div>

                    <button 
                        onClick={() => { setScore(0); setRenderCount(1); }}
                        style={{ padding: '12px', backgroundColor: '#9e9e9e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Reset Counters
                    </button>
                </div>
            </div>

        </div>
    );
};

export default StateBatching;
