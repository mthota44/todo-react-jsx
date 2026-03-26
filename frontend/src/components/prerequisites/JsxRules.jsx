import React from 'react';

const JsxRules = () => {
    
    // Demo variables to systematically show inside JSX
    const userName = "React Developer";
    const userAge = 25;
    const isOnline = true;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <h1>Understanding JSX & Its Rules</h1>
            
            <section style={sectionStyle}>
                <h2>What is JSX?</h2>
                <p><strong>JSX</strong> stands for JavaScript XML. It is a brilliant syntax extension for React that allows us to write HTML directly inside Javascript files.</p>
                <p>Instead of struggling with complicated and verbose <code>document.createElement('div')</code> logic purely in JS, JSX lets us visually describe what the User Interface should logically look like using familiar HTML tags. However, under the hood, React's build tools compile all this "HTML" back into pure JavaScript building objects.</p>
            </section>

            <section style={sectionStyle}>
                <h2>Rule #1: Must Return a Single Root Element</h2>
                <p>A React component can formally only return one primary wrapper tag. You cannot return two adjacent sibling elements flying around without wrapping them inside a parent.</p>
                
                <div style={codeComparisonStyle}>
                    <div style={wrongStyle}>
                        <strong>❌ WRONG:</strong>
                        <pre style={preStyle}><code>{`return (
    <h1>Hello World</h1>
    <p>This will cause an error!</p>
);`}</code></pre>
                    </div>
                    <div style={correctStyle}>
                        <strong>✅ CORRECT:</strong>
                        <pre style={preStyle}><code>{`return (
    <div>
        <h1>Hello World</h1>
        <p>This works perfectly!</p>
    </div>
);`}</code></pre>
                    </div>
                </div>
                <p><em>Tip: If you really don't want to add unnecessary empty <code>&lt;div&gt;</code> wrappers polluting your physical HTML structure, you can use a React Fragment wrapper: <code>&lt;&gt; ... &lt;/&gt;</code></em></p>
            </section>

            <section style={sectionStyle}>
                <h2>Rule #2: You Must Close ALL Tags Completely</h2>
                <p>In standard loose web HTML, some tags like <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>, or <code>&lt;br&gt;</code> don't rigorously require a closing slash. In strict JSX, <strong>every single tag must be explicitly closed</strong>.</p>
                <div style={codeComparisonStyle}>
                    <div style={wrongStyle}>
                        <strong>❌ WRONG:</strong>
                        <pre style={preStyle}><code>{`<input type="text">
<img src="logo.png">
<br>`}</code></pre>
                    </div>
                    <div style={correctStyle}>
                        <strong>✅ CORRECT:</strong>
                        <pre style={preStyle}><code>{`<input type="text" />
<img src="logo.png" />
<br />`}</code></pre>
                    </div>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>Rule #3: camelCase All HTML Attributes</h2>
                <p>Because JSX mathematically turns into JavaScript, keywords that are specifically reserved in standard JS cannot be used conventionally (like the "class" keyword). Additionally, multi-word HTML attributes transform into camelCase syntax.</p>
                <div style={codeComparisonStyle}>
                    <div style={wrongStyle}>
                        <strong>❌ WRONG HTML:</strong>
                        <pre style={preStyle}><code>{`<button class="btn" onclick="sayHi()">
    Click
</button>`}</code></pre>
                    </div>
                    <div style={correctStyle}>
                        <strong>✅ CORRECT JSX:</strong>
                        <pre style={preStyle}><code>{`<button className="btn" onClick={sayHi}>
    Click
</button>`}</code></pre>
                    </div>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>Practical Demo: Writing JavaScript INSIDE HTML</h2>
                <p>One of the absolute most powerful architectural features of JSX is that you can inject raw dynamic JavaScript directly into your HTML code anywhere by aggressively wrapping it in curly braces <code>{`{ }`}</code>.</p>
                
                <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '5px', border: '2px solid #ddd', margin: '20px 0' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>Demo Output:</h3>
                    {/* JSX Demonstration dynamically rendering data compiled from JavaScript */}
                    <p>Welcome back, <strong>{userName}</strong>!</p>
                    <p>Calculated Age Next Year: <strong>{userAge + 1}</strong></p>
                    <p>Status: <span style={{ color: isOnline ? 'green' : 'red', fontWeight: 'bold' }}>{isOnline ? 'Online' : 'Offline'}</span></p>
                </div>

                <div style={{ backgroundColor: '#282c34', color: '#fff', padding: '15px', borderRadius: '5px' }}>
                    <p style={{ margin: '0 0 10px 0', color: '#61dafb' }}><strong>The declarative JSX code producing the dynamic demo above:</strong></p>
                    <pre style={{ margin: 0, overflowX: 'auto', fontSize: '0.95em' }}>
<code>{`// 1. Hardcoded JavaScript testing variables
const userName = "React Developer";
const userAge = 25;
const isOnline = true;

return (
    <div>
        {/* We forcefully use { } to break out of HTML and inject JavaScript */}
        <p>Welcome back, <strong>{userName}</strong>!</p>
        
        {/* We can do on-the-fly math natively inside JSX */}
        <p>Calculated Age Next Year: <strong>{userAge + 1}</strong></p>
        
        {/* We can also use JS ternary operators for dynamic styling/text toggling */}
        <p>Status:
            <span style={{ color: isOnline ? 'green' : 'red' }}>
                {isOnline ? 'Online' : 'Offline'}
            </span>
        </p>
    </div>
);`}</code>
                    </pre>
                </div>
            </section>
        </div>
    );
};

const sectionStyle = {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    borderLeft: '5px solid #61dafb'
};

const codeComparisonStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
    fontSize: '0.95em'
};

export default JsxRules;
