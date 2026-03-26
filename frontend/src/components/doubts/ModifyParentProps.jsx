import React, { useState } from 'react';

// === THE PARENT COMPONENT ===
const ModifyParentProps = () => {
    // The Parent's own private memory (State)
    const [parentMoney, setParentMoney] = useState(100);

    // The Parent purposefully creates a function to change its OWN state
    const handleSpendMoney = (amount) => {
        setParentMoney(prev => prev - amount);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <h1>Can a Child Modify Parent Props?</h1>
            
            <section style={sectionStyle}>
                <h2>The Short Answer: NO.</h2>
                <p>A Child component <strong>cannot</strong> directly modify the props it receives from a Parent. Props are strictly <strong>Read-Only</strong> memory.</p>
                <p>This is because React rigorously enforces a concept called <strong>One-Way Data Flow</strong>. Data only falls down the tree like a predictable waterfall (from Parent to Child). If a Child could randomly reach up and silently alter the Parent's data directly behind its back, your application logic would become messy, unpredictable, and extremely difficult to debug.</p>
            </section>

            <section style={sectionStyle}>
                <h2>So, how do we solve this? (The "Trick")</h2>
                <p>If the Child needs to respectfully change something, it cannot hack the data directly. Instead, the Parent must pass down a <strong>callback function</strong> (think of it like giving the child a walkie-talkie) through the props.</p>
                <p>When the Child wants to change the data, it simply presses the button on the walkie-talkie to radio the Parent: <em>"Hey Parent! Please run your own function to update your own data!"</em></p>
                <ol>
                    <li>The Parent inherently holds the <code>State</code>.</li>
                    <li>The Parent gracefully creates a function specifically designed to update that <code>State</code>.</li>
                    <li>The Parent packages both the <code>State</code> and the <code>Function</code> down into the Child via props.</li>
                    <li>The Child clicks a button and triggers the <code>Function</code> (the walkie-talkie).</li>
                    <li>The Parent's data changes securely, and the fresh data automatically falls back down to the Child!</li>
                </ol>
            </section>

            <section style={sectionStyle}>
                <h2>What happens when Props change? (Re-rendering)</h2>
                <p>When the Parent successfully changes its own State using the trick above, it automatically creates a cascading effect down the tree. Because the Parent's data fundamentally changed, React instantly realizes: <em>"Wait, I just gave that old data to the Child. The Child is now completely out-of-date!"</em></p>
                <p>React automatically triggers a <strong>Re-render</strong>. It basically trashes the old visual representation of the Child and seamlessly redraws an entirely new version of the Child component, this time aggressively handing it the brand new, updated props. This is exactly why React is so powerful: it guarantees your User Interface always flawlessly matches your system data without you having to manually touch the DOM.</p>
            </section>

            <section style={sectionStyle}>
                <h2>Practical Demo: The Parent's Wallet</h2>
                <p>Below is a Parent component housing a wallet containing $100. It passes that money value down to the Child. Notice that the Child cannot magically steal or deduct the money itself; it has to use the "ask Nicely" function voluntarily provided by the Parent.</p>
                
                <div style={demoBoxStyle}>
                    <h3>👨‍👧 Parent Component (Wallet: \${parentMoney})</h3>
                    <p style={{ color: '#666', fontSize: '0.9em' }}>↓ Passing the <code>money</code> value and <code>handleSpendMoney</code> function down to the Child...</p>
                    
                    {/* Render the Child physically inside the Parent */}
                    <ChildComponent 
                        money={parentMoney} 
                        askParentToSpend={handleSpendMoney} 
                    />
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>The Code Breakdown</h2>
                <div style={codeComparisonStyle}>
                    <div style={wrongStyle}>
                        <strong>❌ WRONG (Child trying to hack props directly):</strong>
                        <pre style={preStyle}><code>{`const Child = (props) => {
    
    const stealMoney = () => {
        // ERROR! Props are completely Read-Only!
        // This will immediately crash your app:
        props.money = props.money - 10; 
    };

    return <button onClick={stealMoney}>Steal</button>;
};`}</code></pre>
                    </div>
                    <div style={correctStyle}>
                        <strong>✅ CORRECT (Child calling Parent's walkie-talkie):</strong>
                        <pre style={preStyle}><code>{`const Child = (props) => {
    
    const askNicely = () => {
        // SUCCESS! Executing the remote function 
        // the Parent safely passed down to us:
        props.askParentToSpend(10); 
    };

    return <button onClick={askNicely}>Ask for $10</button>;
};`}</code></pre>
                    </div>
                </div>
            </section>

        </div>
    );
};

// === THE CHILD COMPONENT ===
const ChildComponent = ({ money, askParentToSpend }) => {
    return (
        <div style={childBoxStyle}>
            <h4>👧 Child Component</h4>
            <p>I currently have access to: <strong style={{ fontSize: '1.2em' }}>\${money}</strong></p>
            
            <button 
                onClick={() => askParentToSpend(10)}
                style={btnStyle}
                disabled={money < 10}
            >
                {money >= 10 ? "Ask Parent to spend $10" : "Parent's wallet is completely empty!"}
            </button>
            <p style={{ fontSize: '0.85em', color: '#555', marginTop: '10px' }}>
                <em>*Clicking this exact button secretly calls the function passed down from the parent!*</em>
            </p>
        </div>
    );
};

// --- STYLES ---

const sectionStyle = {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    borderLeft: '5px solid #ff9800'
};

const demoBoxStyle = {
    backgroundColor: '#fff',
    border: '2px solid #005bc5',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px'
};

const childBoxStyle = {
    backgroundColor: '#e6f2ff',
    border: '2px dashed #005bc5',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '15px'
};

const btnStyle = {
    padding: '10px 15px',
    backgroundColor: '#005bc5',
    color: '#fff',
    border: 'none',
    opacity: props => props.disabled ? 0.6 : 1,
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const codeComparisonStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '15px',
    marginBottom: '15px'
};

const wrongStyle = {
    backgroundColor: '#ffe6e6',
    border: '1px solid #ffcccc',
    padding: '15px',
    borderRadius: '5px'
};

const correctStyle = {
    backgroundColor: '#e6ffe6',
    border: '1px solid #ccffcc',
    padding: '15px',
    borderRadius: '5px'
};

const preStyle = {
    backgroundColor: 'transparent',
    color: '#333',
    margin: 0,
    fontSize: '0.9em',
    lineHeight: '1.4'
};

export default ModifyParentProps;
