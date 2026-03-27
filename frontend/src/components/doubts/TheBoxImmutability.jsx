import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TheBoxImmutability = () => {
    // 1. The MUTATION Demo (Fails to update UI)
    const [wrongItems, setWrongItems] = useState(["Milk", "Eggs"]);
    
    const handlePush = () => {
        // ❌ WRONG: Mutating the existing array (The old box)
        wrongItems.push("Bread"); 
        
        // Even if we call set, React checks the reference.
        // It's the exact same "Box" reference, so React IGNORES it and skips repainting!
        setWrongItems(wrongItems);
        
        console.log("❌ Current wrongItems Array in Memory:", wrongItems);
        alert("Pushed successfully! Check the console (F12) to see 'Bread' exists in memory.\n\nBut look at the screen... It completely failed to update!");
    };

    // 2. The IMMUTABLE Demo (Updates UI successfully)
    const [rightItems, setRightItems] = useState(["Milk", "Eggs"]);

    const handleSpread = () => {
        // ✅ CORRECT: Spreading creates a brand NEW array (A completely new box)
        // Since the memory reference is totally new, React knows it legally must update the screen.
        setRightItems([...rightItems, "Bread"]);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '850px', lineHeight: '1.6' }}>
            <Link to="/doubts" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                &larr; Back to Doubts
            </Link>

            <h1 style={{ color: '#d32f2f', marginBottom: '10px' }}>What does "create a NEW array" mean?</h1>
            <p style={{ fontSize: '16px', color: '#555', marginTop: 0 }}>
                Why can't I just use <code>array.push()</code>? This perfectly perfectly explains React's strict law of <strong>Immutability</strong>.
            </p>

            {/* 1. The Box Analogy */}
            <div style={{ backgroundColor: '#fff3e0', borderLeft: '5px solid #ff9800', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#e65100', marginTop: 0 }}>1. The "Box" (Memory Address)</h2>
                <p>Imagine your Array is a literal cardboard box named <code>todos</code>, and inside the box are pieces of paper ("Milk", "Eggs").</p>
                <ul>
                    <li><strong style={{ color: '#d32f2f' }}>Mutation (.push):</strong> You open that exact same existing cardboard box and lazily toss a new paper "Bread" inside. The box's physical location never changed.</li>
                    <li><strong style={{ color: '#2e7d32' }}>Immutability ([...spread]):</strong> You completely ignore the old box. You go buy a brand <strong>NEW empty cardboard box</strong>. You carefully copy the old papers into it, add "Bread" into it, and tell React <em>"Hey, look at this brand new box!"</em></li>
                </ul>
            </div>

            {/* 2. Why React Cares */}
            <div style={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid #1976d2', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#0d47a1', marginTop: 0 }}>2. Why is React so stubborn? (Performance)</h2>
                <p>React is intensely optimized to be as fast as possible. Instead of wasting time counting every single paper inside every box to see if something tiny changed... it just lazily looks at the outside of the box itself. It runs a lightning-fast "Shallow Comparison" (Reference Check):</p>
                
                <pre style={{ backgroundColor: '#282c34', color: '#fff', padding: '15px', borderRadius: '4px', fontSize: '13px', overflowX: 'auto' }}>
{`// React's Internal Logic:
if (newBox === oldBox) {
    // "Oh, it's the exact same physical box. Nothing changed. 
    // I refuse to waste energy refreshing the screen."
    return;
} else {
    // "Oh wow, a completely different box! I better update!"
    repaintScreen();
}`}</pre>
                <p style={{ margin: 0 }}>Because <code>.push()</code> does <strong>NOT</strong> change the box, React completely ignores you, and your screen breaks!</p>
            </div>

            {/* 3. The Live Demo */}
            <h2 style={{ marginTop: '40px' }}>3. The Proof (Live Demo)</h2>
            <p>Click these buttons and strictly watch what happens on the screen.</p>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
                
                {/* ❌ MUTATION */}
                <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '2px solid red', borderRadius: '8px', backgroundColor: '#ffebee' }}>
                    <h3 style={{ color: '#d32f2f', marginTop: 0 }}>❌ 1. Using .push() (Mutation)</h3>
                    <p style={{ fontSize: '13px', color: '#555' }}>Uses the exact same Memory Address (Box).</p>
                    
                    <button 
                        onClick={handlePush}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        wrongItems.push("Bread")
                    </button>
                    
                    <ul style={{ marginTop: '15px', paddingLeft: '20px' }}>
                        {wrongItems.map((item, index) => (
                            <li key={index}><strong>{item}</strong></li>
                        ))}
                    </ul>
                </div>

                {/* ✅ IMMUTABLE */}
                <div style={{ flex: '1', minWidth: '300px', padding: '20px', border: '2px solid green', borderRadius: '8px', backgroundColor: '#e8f5e9' }}>
                    <h3 style={{ color: '#2e7d32', marginTop: 0 }}>✅ 2. Using [...spread] (Immutable)</h3>
                    <p style={{ fontSize: '13px', color: '#555' }}>Creates a brand NEW Memory Address (Box).</p>
                    
                    <button 
                        onClick={handleSpread}
                        style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        [...rightItems, "Bread"]
                    </button>

                    <ul style={{ marginTop: '15px', paddingLeft: '20px' }}>
                        {rightItems.map((item, index) => (
                            <li key={index}><strong>{item}</strong></li>
                        ))}
                    </ul>
                </div>

            </div>

            {/* 4. Java Comparison */}
            <div style={{ backgroundColor: '#f5f5f5', borderLeft: '5px solid #607d8b', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h3 style={{ color: '#37474f', marginTop: 0 }}>☕ For Java Developers...</h3>
                <p style={{ margin: 0 }}>
                    If you know Java, this is perfectly identical to <code>StringBuilder</code> vs <code>String</code>. 
                    <br/><br/>
                    <code>.push()</code> acts exactly like <code>StringBuilder.append()</code> (Modifies the same physical object). 
                    React State, however, mandates you act exactly like a standard Java <code>String</code> (Immutable—you must physically create a whole new object to change it!).
                </p>
            </div>
        </div>
    );
};

export default TheBoxImmutability;
