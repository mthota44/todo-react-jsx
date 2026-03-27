import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FunctionalUpdatePrev = () => {
    // 1. The MUTATION Demo (Fails to batch properly)
    const [score, setScore] = useState(0);

    const incrementWrong = () => {
        // ❌ WRONG: React groups these and only uses the physical visible "score" at this current moment.
        setScore(score + 1);
        setScore(score + 1);
        setScore(score + 1);
    };

    const incrementCorrect = () => {
        // ✅ CORRECT: React queues these and passes the actual raw invisible updated value to "prev" every time.
        setScore(prev => prev + 1);
        setScore(prev => prev + 1);
        setScore(prev => prev + 1);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '850px', lineHeight: '1.6' }}>
            <Link to="/doubts" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                &larr; Back to Doubts
            </Link>

            <h1 style={{ color: '#d32f2f', marginBottom: '10px' }}>Why does calling setCount 3 times only add +1?</h1>
            <p style={{ fontSize: '18px', color: '#555', marginTop: 0 }}>
                This is a classic problem with React. When you furiously call a state function multiple times sequentially, it often seems to completely ignore all but the absolute last one. This is due directly to two React concepts: <strong>Snapshots</strong> and <strong>Batching</strong>.
            </p>

            {/* 1. The Snapshot Problem */}
            <div style={{ backgroundColor: '#fff3e0', borderLeft: '5px solid #ff9800', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#e65100', marginTop: 0 }}>1. The "Snapshot" (Why it fails)</h2>
                <p>When you click a button, React takes a literal "Snapshot" of your variables at that exact millisecond. If your <code>score</code> is physically showing <code>0</code> on the screen right now, React literally locks the word <code>score</code> solidly into the number <code>0</code> for the entire duration of your button click.</p>
                
                <h4 style={{ margin: '15px 0 5px 0', color: '#d32f2f' }}>❌ The Broken Code:</h4>
                <pre style={{ backgroundColor: '#282c34', color: '#fff', padding: '15px', borderRadius: '4px', fontSize: '13px', overflowX: 'auto', marginTop: 0 }}>
{`// Your code says this:
setScore(score + 1);
setScore(score + 1);
setScore(score + 1);

// But because React locked 'score' to '0', the computer secretly sees this:
setScore( 0 + 1 );
setScore( 0 + 1 );
setScore( 0 + 1 );`}</pre>
                <p style={{ margin: 0 }}>Because of "Batching", React groups all 3 lines together simultaneously. It effectively processes <code>setScore(1)</code> three times... and your score only goes up by exactly 1!</p>
            </div>

            {/* 2. The "prev" Solution */}
            <div style={{ backgroundColor: '#e8f5e9', borderLeft: '5px solid #2e7d32', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#1b5e20', marginTop: 0 }}>2. The "prev" Queue (The Secret Fix)</h2>
                <p>To safely bypass the locked Snapshot, you must explicitly use an Arrow Function (called a Functional Update). By doing <code>prev =&gt;</code>, you forcefully demand React: <em>"Hey! Stop looking at the old Snapshot! Systematically look at the invisible internal background memory instead!"</em></p>
                
                <h4 style={{ margin: '15px 0 5px 0', color: '#2e7d32' }}>✅ The Unbroken Code:</h4>
                <pre style={{ backgroundColor: '#282c34', color: '#fff', padding: '15px', borderRadius: '4px', fontSize: '13px', overflowX: 'auto', marginTop: 0 }}>
{`// When using 'prev', React naturally forms a sequence queue:

setScore(prev => prev + 1); // React says: "0 + 1. The background value is now 1."
setScore(prev => prev + 1); // React says: "Bring me the 1. Now 1 + 1 = 2."
setScore(prev => prev + 1); // React says: "Bring me the 2. Now 2 + 1 = 3."`}</pre>
                <p style={{ margin: 0 }}>React officially recognizes the dynamically changing background value instead of maliciously looking at the stale locked snapshot from earlier!</p>
            </div>

            {/* 3. The Live Demo */}
            <h2 style={{ marginTop: '40px' }}>3. The Proof (Live Demo)</h2>
            <p>Click these buttons sequentially to rigidly test out the broken Snapshot vs the fixed Queue.</p>
            
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                 <h1 style={{ fontSize: '64px', margin: 0, color: '#333' }}>{score}</h1>
                 <p style={{ color: '#777', marginTop: '5px' }}>Current Score Limit</p>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                
                {/* ❌ WRONG */}
                <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '2px solid red', borderRadius: '8px', backgroundColor: '#ffebee' }}>
                    <h3 style={{ color: '#d32f2f', marginTop: 0 }}>❌ 1. Snapshot Trap (+3 lines)</h3>
                    <p style={{ fontSize: '13px', color: '#555' }}>Uses <code>score + 1</code> natively.</p>
                    
                    <button 
                        onClick={incrementWrong}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Try to Add +3
                    </button>
                    <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '10px', color: '#d32f2f' }}><strong>Result:</strong> It aggressively fails and only adds +1.</p>
                </div>

                {/* ✅ CORRECT */}
                <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '2px solid green', borderRadius: '8px', backgroundColor: '#e8f5e9' }}>
                    <h3 style={{ color: '#2e7d32', marginTop: 0 }}>✅ 2. Functional Queue (+3 lines)</h3>
                    <p style={{ fontSize: '13px', color: '#555' }}>Uses <code>prev =&gt; prev + 1</code> accurately.</p>
                    
                    <button 
                        onClick={incrementCorrect}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Try to Add +3
                    </button>
                    <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '10px', color: '#2e7d32' }}><strong>Result:</strong> It successfully queues and reliably adds +3.</p>
                </div>
            </div>

            <button 
                onClick={() => setScore(0)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '20px' }}
            >
                Reset Score back to 0
            </button>
        </div>
    );
};

export default FunctionalUpdatePrev;
