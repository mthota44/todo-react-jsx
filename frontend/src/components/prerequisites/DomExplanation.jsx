import React, { useState } from 'react';

const DomExplanation = () => {
    
    // Virtual DOM Demo State
    const [vdomBoxState, setVdomBoxState] = useState({
        colorUpdated: false,
        elementAdded: false
    });

    const handleVirtualDOMUpdate = () => {
        setVdomBoxState({ colorUpdated: true, elementAdded: true });
    };

    const handleVirtualDOMReset = () => {
        setVdomBoxState({ colorUpdated: false, elementAdded: false });
    };
    
    // Using vanilla JavaScript to interact directly with the DOM
    const handleVanillaDOMUpdate = () => {
        // Pure DOM manipulation
        const box = document.getElementById('demo-box');
        if (box) {
            box.style.backgroundColor = '#005bc5';
            box.style.color = 'white';
            box.innerText = 'Color Changed via direct DOM Manipulation!';
            
            // Add a new element dynamically
            const newElement = document.createElement('p');
            newElement.innerText = '-> I was dynamically created using document.createElement()';
            newElement.style.marginTop = '15px';
            newElement.style.fontWeight = 'bold';
            box.appendChild(newElement);
        }
    };

    const handleReset = () => {
        const box = document.getElementById('demo-box');
        if (box) {
            box.style.backgroundColor = '#e0e0e0';
            box.style.color = 'black';
            box.innerHTML = 'I am a simple DOM Element.<br/>Click the button above to change me!';
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <h1>What is the DOM? (Document Object Model)</h1>
            
            <section style={sectionStyle}>
                <h2>1. The Simple Explanation</h2>
                <p>Imagine reading a recipe from a cookbook. The printed letters on the page are like the <strong>HTML</strong> of a website. It's just text.</p>
                <p>When your web browser (like Chrome or Safari) reads that HTML code, it uses the instructions to bake the actual physical cake. That final, living, interactive "cake" on your screen is the <strong>DOM</strong>.</p>
                <p>The DOM takes all your HTML tags (like <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;div&gt;</code>) and translates them into objects stored in the browser's memory. Because they are now objects, programming languages like JavaScript can easily talk to them to change their color, move them around, or delete them instantly while the user is using the page.</p>
            </section>

            <section style={sectionStyle}>
                <h2>2. The Tree Structure</h2>
                <p>The browser organizes the DOM as an upside-down "tree" structure (similar to folders on your computer):</p>
                <ul style={{ fontFamily: 'monospace', backgroundColor: '#fff', padding: '15px', borderRadius: '5px', border: '1px solid #ddd' }}>
                    <li>Document
                        <ul>
                            <li>&lt;html&gt;
                                <ul>
                                    <li>&lt;head&gt; (title, meta data)</li>
                                    <li>&lt;body&gt;
                                        <ul>
                                            <li>&lt;h1&gt; (Main Heading)</li>
                                            <li>&lt;div&gt;
                                                <ul>
                                                    <li>&lt;p&gt; (A paragraph of text)</li>
                                                    <li>&lt;button&gt; (Click me)</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <p>If JavaScript wants to change the text of the paragraph, it asks the Document object to find the <code>&lt;p&gt;</code> tag and update it.</p>
            </section>

            <section style={sectionStyle}>
                <h2>3. Practical Demo: Direct DOM Manipulation</h2>
                <p>Before React existed, developers had to do everything by directly talking to the DOM. Click the button below to see how raw JavaScript directly changes the physical properties of the colored box.</p>
                
                <div style={{ marginBottom: '15px' }}>
                    <button onClick={handleVanillaDOMUpdate} style={btnStyle}>Interact with DOM (Vanilla JS)</button>
                    <button onClick={handleReset} style={{...btnStyle, backgroundColor: '#dc3545', marginLeft: '10px'}}>Reset Box</button>
                </div>

                {/* The element we will manipulate using raw DOM APIs */}
                <div 
                    id="demo-box" 
                    style={{
                        padding: '20px', 
                        backgroundColor: '#e0e0e0', 
                        border: '2px solid #333',
                        borderRadius: '5px',
                        minHeight: '100px',
                        transition: 'all 0.3s'
                    }}
                >
                    I am a simple DOM Element.<br/>
                    Click the button above to change me!
                </div>

                <div style={{ marginTop: '20px', backgroundColor: '#282c34', color: '#fff', padding: '15px', borderRadius: '5px' }}>
                    <p style={{ margin: '0 0 10px 0', color: '#61dafb' }}><strong>Here is the barebones JavaScript code executing behind that button:</strong></p>
                    <pre style={{ margin: 0, overflowX: 'auto', fontSize: '0.95em' }}>
<code>{`// 1. Find the element in the DOM tree
const box = document.getElementById('demo-box');

// 2. Modify its existing properties
box.style.backgroundColor = '#005bc5';
box.style.color = 'white';
box.innerText = 'Color Changed via direct DOM Manipulation!';

// 3. Create a brand new HTML element entirely from scratch
const newElement = document.createElement('p');
newElement.innerText = '-> I was dynamically created using document.createElement()';

// 4. Attach the new element into the DOM tree
box.appendChild(newElement);`}</code>
                    </pre>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>4. Why did this lead to React?</h2>
                <p>As you can see in the demo code above, we had to very specifically tell the browser exactly <em>how</em> to change everything step-by-step (e.g., <code>box.style.color = 'white'</code>). This is called <strong>Imperative Programming</strong>.</p>
                <p>In a tiny app, this isn't bad. But imagine a massive site like Facebook. You would have thousands of these manual JavaScript instructions aggressively finding elements and mutating them. Maintaining this turns into a nightmare, and the browser becomes extremely sluggish because touching the DOM directly is computationally expensive.</p>
                <p><strong>React swoops in to solve this</strong> by managing the DOM for you. With React, you never manually update colors or create elements like we did above. You simply provide React with a snapshot of what the UI <em>should</em> look like based on your data, and React automatically and efficiently updates the real DOM behind the scenes.</p>
            </section>

            <section style={sectionStyle}>
                <h2>5. What is the Virtual DOM?</h2>
                <p>Instead of interacting with the "real" DOM directly, React creates a lightweight, in-memory copy of it called the <strong>Virtual DOM</strong>.</p>
                <p>Think of the Virtual DOM as a <em>blueprint</em>. If you want to change a wall in your house, you don't instantly grab a sledgehammer and start tearing things down. Instead, you change the blueprint first, compare the new blueprint with the old one, find the exact differences, and then <em>only</em> demolish the specific part of the wall that needs changing.</p>
                <p>React operates perfectly on this philosophy:</p>
                <ol>
                    <li style={{ marginBottom: '5px' }}>When your data changes, React quickly builds an entirely new Virtual DOM tree inside its memory.</li>
                    <li style={{ marginBottom: '5px' }}>It actively compares this new Virtual DOM against the old Virtual DOM (a fast process called <strong>Diffing</strong>).</li>
                    <li style={{ marginBottom: '5px' }}>It figures out exactly what changed, and then updates <em>only</em> those specific pieces in the real browser DOM (a process called <strong>Reconciliation</strong>).</li>
                </ol>
            </section>

            <section style={sectionStyle}>
                <h2>6. Practical Demo: React Virtual DOM</h2>
                <p>In this demo, we simply change our React "state" data. React's Virtual DOM takes care of figuring out exactly how to update the box automatically. Note that we don't write any imperative instructions on <em>how</em> to change colors or append elements.</p>
                
                <div style={{ marginBottom: '15px' }}>
                    <button onClick={handleVirtualDOMUpdate} style={{...btnStyle, backgroundColor: '#28a745'}}>Update State (React Way)</button>
                    <button onClick={handleVirtualDOMReset} style={{...btnStyle, backgroundColor: '#dc3545', marginLeft: '10px'}}>Reset State</button>
                </div>

                <div 
                    style={{
                        padding: '20px', 
                        backgroundColor: vdomBoxState.colorUpdated ? '#28a745' : '#e0e0e0', 
                        color: vdomBoxState.colorUpdated ? 'white' : 'black',
                        border: '2px solid #333',
                        borderRadius: '5px',
                        minHeight: '100px',
                        transition: 'all 0.3s'
                    }}
                >
                    {vdomBoxState.colorUpdated ? 'Color Changed via React State Update!' : 'I am a React Component driven by state.'}
                    <br/> {!vdomBoxState.colorUpdated && 'Click the button above to change me!'}
                    
                    {vdomBoxState.elementAdded && (
                        <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
                            -&gt; I was dynamically rendered strictly because the state changed!
                        </p>
                    )}
                </div>

                <div style={{ marginTop: '20px', backgroundColor: '#282c34', color: '#fff', padding: '15px', borderRadius: '5px' }}>
                    <p style={{ margin: '0 0 10px 0', color: '#61dafb' }}><strong>Here is the declarative React code generating the above box:</strong></p>
                    <pre style={{ margin: 0, overflowX: 'auto', fontSize: '0.95em' }}>
<code>{`// 1. Declare the data structure (State)
const [vdomBoxState, setVdomBoxState] = useState({
    colorUpdated: false,
    elementAdded: false
});

// 2. We just update the underlying data (state), NOT the DOM elements directly
const handleVirtualDOMUpdate = () => {
    setVdomBoxState({ colorUpdated: true, elementAdded: true });
};

// 3. React reads the state and automatically resolves what the DOM should look like
return (
    <div style={{ backgroundColor: vdomBoxState.colorUpdated ? '#28a745' : '#e0e0e0' }}>
        
        {vdomBoxState.colorUpdated ? 'Color Changed!' : 'I am driven by state.'}
        
        {/* If true, React automatically injects this element during Reconciliation */}
        {vdomBoxState.elementAdded && (
            <p>-> I was dynamically rendered strictly because the state changed!</p>
        )}

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
    borderLeft: '5px solid #ff9800'
};

const btnStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

export default DomExplanation;
