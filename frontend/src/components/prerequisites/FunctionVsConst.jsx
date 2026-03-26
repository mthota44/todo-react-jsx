import React from 'react';

const FunctionVsConst = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <h1>function vs const (Arrow Functions) in React</h1>
            <p>As you explore React, you will often see components written in two entirely different syntax styles. Let's break down the difference and why one is overwhelmingly preferred.</p>

            <section style={sectionStyle}>
                <h2>1. The Two Component Styles</h2>
                <div style={codeComparisonStyle}>
                    <div style={legacyStyle}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#005bc5' }}>The Traditional "function" Style</h3>
                        <p>Uses the classic JavaScript keyword.</p>
                        <div style={codeBoxStyle}>
                            <pre style={preStyle}><code>{`function MyComponent() {
    return <h1>Hello World!</h1>;
}`}</code></pre>
                        </div>
                    </div>
                    <div style={modernStyle}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>The Modern "const" (Arrow) Style</h3>
                        <p>Uses ES6 Arrow Functions and constants.</p>
                        <div style={codeBoxStyle}>
                            <pre style={preStyle}><code>{`const MyComponent = () => {
    return <h1>Hello World!</h1>;
};`}</code></pre>
                        </div>
                    </div>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>2. Why does Modern React prefer <code>const</code> & Arrow Functions?</h2>
                <p>Both styles perfectly work to render HTML structure onto the screen. However, the React community definitively defaults to the <code>const = () =&gt;</code> syntax for several major architectural reasons:</p>

                <h3 style={headingStyle}>✅ Reason 1: Unintentional Overwriting (The Safety of <code>const</code>)</h3>
                <p>If you build a component using <code>function MyButton()</code>, it is technically possible for another rogue piece of code to accidentally assign <code>MyButton = "some string"</code> and crash your entire app. By explicitly using <code>const</code> (Constant), JavaScript fundamentally <strong>protects</strong> your component and strictly guarantees it can never be altered or overwritten.</p>

                <h3 style={headingStyle}>✅ Reason 2: The Notorious <code>"this"</code> Keyword Nightmare</h3>
                <p>In older Javascript rules, regular legacy functions proactively changed the hidden meaning of the <code>this</code> keyword depending entirely on <em>how</em> the function was executed. This historically caused thousands of notorious bugs in older React Code. Arrow Functions fix this mathematically by not creating their own <code>this</code> context, seamlessly avoiding the bug entirely.</p>

                <h3 style={headingStyle}>✅ Reason 3: Implicit Returns (Shorter, Cleaner Code)</h3>
                <p>If your component or helper function is extremely short, Arrow functions let you magically skip the <code>return</code> keyword and the curly braces entirely!</p>
                <div style={codeBoxStyle}>
                    <pre style={{...preStyle, marginTop: 0}}><code>{`// The normal way (3 lines long)
const Title = () => {
    return <h1>Hello!</h1>;
};

// 🌟 The Implicit Return way (1 clean line)!
const Title = () => <h1>Hello!</h1>;`}</code></pre>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>3. Practical Demo: Inline Callback Safety</h2>
                <p>The absolute most frequent place you will write Arrow functions in React is inside buttons and click events. Look at what happens when you need to pass data to functions.</p>
                
                <div style={demoBoxStyle}>
                    <h3 style={{ color: '#005bc5', margin: '0 0 10px 0' }}>Inline Event Execution</h3>
                    <p>Arrow functions act as an essential "shield" when you need to execute functions containing arguments inside the HTML. Without the arrow function shield, the code executes violently the exact second the page opens instead of waiting politely for the user's click.</p>
                    
                    <div style={codeBoxStyle}>
                        <pre style={{...preStyle, marginTop: 0}}><code>{`// ❌ WRONG: This executes instantly and violently as soon as the page loads!
<button onClick={ deleteUser(id) }> Delete User </button>

// ✅ CORRECT: The arrow function properly WAITS for the physical click!
<button onClick={ () => deleteUser(id) }> Delete User </button>`}</code></pre>
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- STYLES ---

const sectionStyle = {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    borderLeft: '5px solid #20c997'
};

const headingStyle = {
    color: '#005bc5',
    borderBottom: '1px solid #ddd',
    paddingBottom: '5px',
    marginTop: '25px',
    fontSize: '1.2em'
};

const demoBoxStyle = {
    backgroundColor: '#fff',
    border: '2px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '15px'
};

const codeBoxStyle = {
    backgroundColor: '#282c34',
    padding: '15px',
    borderRadius: '5px',
    marginTop: '15px'
};

const codeComparisonStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '15px',
    marginBottom: '15px'
};

const legacyStyle = {
    backgroundColor: '#e6f2ff',
    border: '1px solid #b3d7ff',
    padding: '15px',
    borderRadius: '5px'
};

const modernStyle = {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    padding: '15px',
    borderRadius: '5px'
};

const preStyle = {
    backgroundColor: 'transparent',
    color: '#fff',
    margin: 0,
    fontSize: '0.95em',
    lineHeight: '1.4',
    overflowX: 'auto'
};

export default FunctionVsConst;
