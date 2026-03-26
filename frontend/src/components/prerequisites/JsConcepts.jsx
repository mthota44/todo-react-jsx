import React, { useState } from 'react';

const JsConcepts = () => {

    // === DEMO STATE & DATA ===
    const [items] = useState(['Apple', 'Banana', 'Orange', 'Grapes', 'Mango']);
    
    // For Filter Demo
    const [searchQuery, setSearchQuery] = useState('');
    const filteredItems = items.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

    // For Reduce Demo (e.g., simulating a shopping cart total)
    const cartPrices = [5, 10, 20, 50];
    const totalCost = cartPrices.reduce((total, currentPrice) => total + currentPrice, 0);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <h1>Required JavaScript Concepts for React</h1>
            <p>React is ultimately just standard JavaScript! Before diving deep into React, there are a few modern JS tools you must fundamentally understand. Think of them as the essential tools in your toolbox.</p>

            <section style={sectionStyle}>
                <h2>1. The <code>map()</code> Function (Looping in React)</h2>
                <p>In standard Javascript, to display 5 items on the screen, you might write a bulky, complicated <code>for (let i = 0...)</code> loop. In React, we rigorously use the beautiful <code>.map()</code> array method. It safely loops over an array and "maps" (transforms) every single item directly into physical HTML!</p>
                <div style={demoBoxStyle}>
                    <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Live Map Demo:</h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'none' }}>
                        {/* THE EXACT DEMO CODE THE USER REQUESTED */}
                        {items.map((item, index) => (
                            <li key={index} style={{ marginBottom: '5px', padding: '5px', backgroundColor: '#e6f2ff', borderRadius: '4px' }}>
                                {index}<b>: </b>{item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={codeBoxStyle}>
                    <strong style={{ color: '#61dafb' }}>The Declarative React Code:</strong>
                    <pre style={preStyle}><code>{`{items.map((item, index) => (
    <li key={index}>
        {index}<b>:</b>{item}
    </li>
))}`}</code></pre>
                </div>
                <p style={{ fontSize: '0.9em', color: '#555', marginTop: '10px' }}><em>*Notice the mandatory <code>key={`{index}`}</code>? React needs a mathematically unique ID attached to every list item so its engine knows exactly which specific item to update if you delete or resort the items later.</em></p>
            </section>

            <section style={sectionStyle}>
                <h2>2. The <code>filter()</code> Function (Searching/Trimming Arrays)</h2>
                <p>The <code>.filter()</code> function acts as an aggressive gatekeeper. It goes through a primary array and only lets the items that successfully pass a specific specific "True/False" test into a brand new array.</p>
                <div style={demoBoxStyle}>
                    <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Live Filter Demo:</h3>
                    <input 
                        type="text" 
                        placeholder="Search for a fruit (e.g., 'app')..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ padding: '8px', width: '100%', marginBottom: '10px', borderRadius: '4px', border: '1px solid #005bc5' }}
                    />
                    <ul style={{ margin: 0, paddingLeft: '20px', listStyleType: 'none' }}>
                        {filteredItems.map((item, index) => (
                            <li key={index} style={{ marginBottom: '5px', padding: '5px', backgroundColor: '#d4edda', borderRadius: '4px' }}>
                                {item}
                            </li>
                        ))}
                    </ul>
                    {filteredItems.length === 0 && <p style={{ color: 'red', fontWeight: 'bold' }}>No fruits mathematically match your search entry.</p>}
                </div>
                <div style={codeBoxStyle}>
                    <strong style={{ color: '#61dafb' }}>The Declarative React Code:</strong>
                    <pre style={preStyle}><code>{`// 1. Keep only fruits that contain the search query phrase
const filteredItems = items.filter((item) => {
    return item.toLowerCase().includes(searchQuery.toLowerCase());
});

// 2. We then take the newly filtered array... and map() over it!
{filteredItems.map(item => <li key={item}>{item}</li>)}`}</code></pre>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>3. The <code>reduce()</code> Function (Calculating Totals)</h2>
                <p>The <code>.reduce()</code> function takes an entire massive array of items and literally "reduces" them down mathematically into a single final value (like summing up a shopping cart to get the exact total cost).</p>
                <div style={demoBoxStyle}>
                    <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Live Reduce Demo:</h3>
                    <p>Subtotal Prices in Shopping Cart: <strong>$5, $10, $20, $50</strong></p>
                    <p style={{ fontSize: '1.2em', color: '#28a745' }}>Total Cost Calculated safely by reduce: <strong>\${totalCost}</strong></p>
                </div>
                <div style={codeBoxStyle}>
                    <strong style={{ color: '#61dafb' }}>The Defensive Javascript Code:</strong>
                    <pre style={preStyle}><code>{`const cartPrices = [5, 10, 20, 50];

// Think of "total" strictly as a physical bucket, it starts empty at 0.
// "currentPrice" is each individual item value you systematically drop into the bucket.
const totalCost = cartPrices.reduce((total, currentPrice) => {
    return total + currentPrice;
}, 0);`}</code></pre>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>4. Honorable Mentions: Destructuring & Arrow Functions</h2>
                
                <div style={demoBoxStyle}>
                    <h3 style={{ color: '#005bc5', margin: '0 0 10px 0' }}>Destructuring (Extracting Objects Cleanly)</h3>
                    <p>Instead of manually typing <code>props.name</code> and <code>props.age</code> repeatedly, we cleanly "unpack" an object securely in one single line:</p>
                    <div style={codeBoxStyle}>
                        <pre style={{...preStyle, marginTop: 0}}><code>{`// The messy tedious way:
const name = props.name;
const age = props.age;

// 🌟 The clean Destructuring way (React Standard):
const { name, age } = props;`}</code></pre>
                    </div>
                </div>

                <div style={demoBoxStyle}>
                    <h3 style={{ color: '#005bc5', margin: '0 0 10px 0' }}>Arrow Functions (Shorter Syntax)</h3>
                    <p>Instead of manually typing the bulky <code>function</code> keyword everywhere, modern React architecture relies almost entirely on the cleaner arrow syntax <code>=&gt;</code>.</p>
                    <div style={codeBoxStyle}>
                        <pre style={{...preStyle, marginTop: 0}}><code>{`// The bulky legacy way:
function sayHello() {
    return "Hello";
}

// 🌟 The modern Arrow way (used heavily in Functional Components):
const sayHello = () => {
    return "Hello";
};`}</code></pre>
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
    borderLeft: '5px solid #6f42c1'
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
    color: '#fff',
    padding: '15px',
    borderRadius: '5px',
    marginTop: '15px'
};

const preStyle = {
    backgroundColor: 'transparent',
    color: '#fff',
    margin: '10px 0 0 0',
    fontSize: '0.95em',
    lineHeight: '1.4',
    overflowX: 'auto'
};

export default JsConcepts;
