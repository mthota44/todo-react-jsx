import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ReactRenderingBehindScenes = () => {
    const [clicks, setClicks] = useState(0);
    const renderLogsRef = useRef([]);
    const [logs, setLogs] = useState([]);

    // This code physically runs during the strict "RENDER PHASE" (Building the Virtual DOM in the kitchen)
    // We do NOT update state here directly to safely avoid infinite loops!
    renderLogsRef.current.push(`[PHASE 1 - RENDER]: Component Function Called! Calculating Virtual DOM... (Clicks: ${clicks})`);

    // The useEffect hook strictly runs AFTER the "COMMIT PHASE" finishes updating the physical screen
    useEffect(() => {
        const commitMessage = `[PHASE 2 - COMMIT]: The Browser Screen was physically Updated! (Clicks: ${clicks})`;
        renderLogsRef.current.push(commitMessage);
        
        // We sync our physical refs to state purely so the user can see the logs on screen
        setLogs([...renderLogsRef.current]);
        // eslint-disable-next-line
    }, [clicks]);

    const handleClearLogs = () => {
        renderLogsRef.current = [];
        setLogs([]);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '850px', lineHeight: '1.6' }}>
            <Link to="/doubts" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                &larr; Back to Doubts
            </Link>

            <h1 style={{ color: '#d32f2f', marginBottom: '10px' }}>What actually lies behind a "React Render"?</h1>
            <p style={{ fontSize: '18px', color: '#555', marginTop: 0 }}>
                Most beginners believe that "Rendering" literally means updating the physical screen. That is a massive misconception! In React, <strong>Rendering</strong> is completely invisible. React strictly separates its work into three highly distinct background phases.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
                
                {/* 1. The Trigger */}
                <div style={{ backgroundColor: '#fff3e0', borderLeft: '5px solid #ff9800', padding: '15px 20px', borderRadius: '4px' }}>
                    <h2 style={{ color: '#e65100', marginTop: 0, marginBottom: '5px' }}>1. The Trigger Phase (Placing the Order)</h2>
                    <p style={{ margin: 0 }}>A React render must purposefully be triggered by something. This exclusively happens in two incredibly specific scenarios:</p>
                    <ul style={{ margin: '10px 0 0 0' }}>
                        <li>The absolutely initial mounting of the app.</li>
                        <li>A <code>useState</code> or <code>Props</code> formally changing inside a component.</li>
                    </ul>
                    <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}><strong>Restaurant Analogy:</strong> You sit down and formally tell the waiter you intensely want a Burger (Changing State/Props).</p>
                </div>

                {/* 2. The Render Phase */}
                <div style={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid #1976d2', padding: '15px 20px', borderRadius: '4px' }}>
                    <h2 style={{ color: '#0d47a1', marginTop: 0, marginBottom: '5px' }}>2. The Render Phase (The Kitchen Execution)</h2>
                    <p style={{ margin: 0 }}>This is the most misunderstood phase! Here, React violently calls your Component Function from top to bottom. It aggressively builds a brand new <strong>Virtual DOM Tree</strong> in the background memory. Next, React fiercely compares (Diffs) this new tree specifically against the old tree to logically figure out precisely what fundamentally changed.<br/><br/><strong>CRITICAL:</strong> It absolutely does NOT touch the physical browser screen here yet! It's purely invisible underlying math.</p>
                    
                    <div style={{ backgroundColor: '#fff', border: '1px solid #bbdefb', padding: '15px', borderRadius: '4px', marginTop: '15px', color: '#1565c0', fontSize: '14px', lineHeight: '1.6' }}>
                        <strong style={{ color: '#0d47a1', fontSize: '15px' }}>Wait, if the Virtual DOM is just in RAM, isn't the Real DOM also essentially in RAM? Why is JS so slow at handling the Real DOM directly?</strong><br/><br/>
                        This is the absolute core of the issue! It's true that both exist in RAM, but they are fundamentally completely different architectural beasts:<br/>
                        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                            <li style={{ marginBottom: '8px' }}><strong>The Virtual DOM:</strong> is simply a plain, 'stupid', lightweight structure of basic Javascript objects. Modifying it is literally identical to typing <code>obj.color = 'red'</code>. It triggers absolutely zero physical work under the hood.</li>
                            <li><strong>The Real DOM:</strong> is heavily and violently tied to the actual browser's underlying C++ Graphical Rendering Engine! The absolute millisecond you touch a Real DOM node, it violently triggers a catastrophic chain reaction. It systematically forces the browser to painstakingly recalculate massive CSS trees (CSSOM), brutally mathematically recalculate layout coordinates/margin pixels across the entire document (Reflow), and finally physically shoot electricity into drawing actual monitor pixels (Repaint).</li>
                        </ul>
                        The Real DOM isn't sluggish because of RAM... it's drastically slow because rigidly touching it legally demands the Browser aggressively redraw the physical computer screen! The Virtual DOM is completely disconnected from the graphics engine, making it infinitely faster to calculate on.
                    </div>

                    <p style={{ marginTop: '15px', fontSize: '14px', color: '#666', marginBottom: 0 }}><strong>Restaurant Analogy:</strong> The frantic Waiter mathematically calculates the exact difference between your current empty table and the new Burger you legally ordered. He rigidly prepares the Burger entirely invisibly inside the back Kitchen.</p>
                </div>

                {/* 3. The Commit Phase */}
                <div style={{ backgroundColor: '#e8f5e9', borderLeft: '5px solid #2e7d32', padding: '15px 20px', borderRadius: '4px' }}>
                    <h2 style={{ color: '#1b5e20', marginTop: 0, marginBottom: '5px' }}>3. The Commit Phase (Updating the Physical Screen)</h2>
                    <p style={{ margin: 0 }}>Once React mathematically knows dynamically exactly what explicitly needs to change, it systematically executes the "Commit". This is the specific isolated moment React actually reaches physically out to the Browser DOM and rapidly updates the exact specific UI pixels.</p>
                    <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}><strong>Restaurant Analogy:</strong> The Waiter finally physically walks the newly finished Burger precisely out from the Kitchen and heavily places it specifically onto your exact table.</p>
                </div>
            </div>

            {/* 4. Live Proof Demo */}
            <h2 style={{ marginTop: '40px' }}>4. The Live Proof Console</h2>
            <p>Click the button strictly multiple times. Watch how React rigorously prints the "Render (Kitchen)" log completely first, perfectly confirming it calculates the math behind the scenes before formally executing the "Commit (Screen)" physically seconds later!</p>
            
            <div style={{ padding: '20px', backgroundColor: '#282c34', color: '#fff', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #444', paddingBottom: '15px', marginBottom: '15px' }}>
                    <button 
                        onClick={() => setClicks(c => c + 1)}
                        style={{ padding: '10px 20px', backgroundColor: '#61dafb', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
                    >
                        Trigger a State Change ({clicks})
                    </button>
                    <button 
                        onClick={handleClearLogs}
                        style={{ padding: '8px 15px', backgroundColor: '#444', color: '#fff', border: '1px solid #666', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Clear Console
                    </button>
                </div>

                <div style={{ maxHeight: '300px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8' }}>
                    {logs.map((log, index) => {
                        const isRender = log.includes('PHASE 1');
                        return (
                            <div key={index} style={{ color: isRender ? '#ffb74d' : '#81c784', padding: '5px 0', borderBottom: '1px solid #333' }}>
                                <strong>{index + 1}.</strong> {log}
                            </div>
                        );
                    })}
                    {logs.length === 0 && <span style={{ color: '#888' }}>Waiting for you to deliberately trigger a state change...</span>}
                </div>
            </div>
            
            <div style={{ backgroundColor: '#f1f1f1', margin: '20px 0', padding: '20px', borderRadius: '4px', borderLeft: '5px solid #607d8b' }}>
                <p style={{ margin: 0 }}><strong>Where does useEffect fit purely into this?</strong><br/>
                If you systematically look at your custom code, a <code>useEffect</code> hook is scientifically explicitly designed to patiently hold off running until specifically strictly <em>AFTER</em> the "Commit Phase" is fundamentally finished updating the physical screen! That is exactly why it is scientifically perfectly safe to place strict physical DOM manipulations deliberately inside <code>useEffect</code>!</p>
            </div>
        </div>
    );
};

export default ReactRenderingBehindScenes;
