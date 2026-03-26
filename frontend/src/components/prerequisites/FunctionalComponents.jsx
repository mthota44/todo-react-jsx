import React, { useState } from 'react';

const FunctionalComponents = () => {
    // Simple state for our interactive demo
    const [likes, setLikes] = useState(0);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <h1>What are Functional Components?</h1>
            
            <section style={sectionStyle}>
                <h2>1. The Big Shift: No More Class Components!</h2>
                <p>In the older days of React (prior to 2019), if you wanted a component to have its own dynamic memory data (State) or react to lifecycle events (like the page finishing loading), you <strong>had</strong> to write a bulky, complicated "Class Component".</p>
                <p>These legacy Class Components were notoriously confusing for developers. You had to constantly bind the confusing <code>this</code> keyword everywhere, memorize and manage heavy lifecycle methods like <code>componentDidUpdate</code>, and write a massive block of boilerplate code just to make a simple button change a number.</p>
                <p><strong>Today, Class Components are considered entirely legacy.</strong> React revolutionized itself by introducing "Hooks" in version 16.8. Thanks to Hooks (like <code>useState</code>), we now use pure <strong>Functional Components</strong> for absolutely everything. They are much cleaner, purely standard JavaScript functions that simply return JSX.</p>
            </section>

            <section style={sectionStyle}>
                <h2>2. Code Comparison: Why We Upgraded</h2>
                <div style={codeComparisonStyle}>
                    <div style={legacyStyle}>
                        <strong>❌ The Old Way (Class Component):</strong>
                        <pre style={preStyle}><code>{`class WelcomeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { likes: 0 };
        // Had to bind "this" manually everywhere!
        this.addLike = this.addLike.bind(this); 
    }

    addLike() {
        this.setState({ likes: this.state.likes + 1 });
    }

    render() {
        return (
            <div>
                <p>Likes: {this.state.likes}</p>
                <button onClick={this.addLike}>Like</button>
            </div>
        );
    }
}`}</code></pre>
                    </div>
                    <div style={modernStyle}>
                        <strong>✅ The Modern Way (Functional Component):</strong>
                        <pre style={preStyle}><code>{`// A normal, clean JavaScript function wrapper
const WelcomeBox = () => {
    // "Hooks" magically give functions memory!
    const [likes, setLikes] = useState(0);

    return (
        <div>
            <p>Likes: {likes}</p>
            <button onClick={() => setLikes(likes + 1)}>
                Like
            </button>
        </div>
    );
}`}</code></pre>
                    </div>
                </div>
                <p>As you can clearly see, Functional Components aggressively strip away all the complicated "Object-Oriented" Class setup. It is literally just a function that remembers its own state!</p>
            </section>

            <section style={sectionStyle}>
                <h2>3. Basic Rules of Functional Components</h2>
                <ol>
                    <li style={{ marginBottom: '10px' }}><strong>Must Start with a Capital Letter:</strong> React rigidly treats lowercase tags (like <code>&lt;div&gt;</code> or <code>&lt;button&gt;</code>) as regular built-in HTML tags. Custom components MUST be capitalized (like <code>&lt;WelcomeBox /&gt;</code>) so React knows to execute your logic.</li>
                    <li style={{ marginBottom: '10px' }}><strong>Accept Props as an Argument:</strong> Since they are just standard open JavaScript functions, they can be "passed" data gracefully through their first argument, typically called <code>props</code>.</li>
                    <li style={{ marginBottom: '10px' }}><strong>Return JSX:</strong> The fundamental job of the function is to evaluate its logic and then <code>return</code> the UI layout representing that specific component block.</li>
                </ol>
            </section>

            <section style={sectionStyle}>
                <h2>4. Practical Demo: The Functional Component in Action</h2>
                <p>Below is a live interactive version of the exact modern Functional Component we showed above. Try interacting with it to see the simple <code>useState</code> hook automatically rerender the component directly within this section:</p>
                
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', border: '2px solid #ddd', margin: '20px 0', textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#005bc5' }}>Functional Counter Component</h3>
                    
                    <div style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                        {likes} ❤️
                    </div>
                    
                    <button 
                        onClick={() => setLikes(likes + 1)} 
                        style={btnStyle}
                    >
                        Click to Like!
                    </button>
                    <button 
                        onClick={() => setLikes(0)} 
                        style={{...btnStyle, backgroundColor: '#dc3545', marginLeft: '10px'}}
                    >
                        Reset Function State
                    </button>
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
    borderLeft: '5px solid #28a745'
};

const codeComparisonStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '15px',
    marginBottom: '15px'
};

const legacyStyle = {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeeba',
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
    color: '#333',
    margin: 0,
    fontSize: '0.85em',
    lineHeight: '1.4'
};

const btnStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
};

export default FunctionalComponents;
