import React from 'react';

const ReusingComponents = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <h1>Can I reuse a Component from one file inside another file?</h1>
            
            <section style={sectionStyle}>
                <h2>The Short Answer: Absolutely YES!</h2>
                <p>One of the foundational superpowers of React is <strong>Reusability</strong>. Because a React Component is quite literally just a JavaScript function that returns some HTML (JSX), you can "Lego-brick" it anywhere across your entire application!</p>
                <p>If you build a beautiful <code>&lt;ProfileCard /&gt;</code> component inside one file, there is no reason to ever natively copy-paste that code again. You can legitimately use it in 10 different pages just by handing it different <code>props</code> data.</p>
            </section>

            <section style={sectionStyle}>
                <h2>How to do it: The "Export & Import" Trick</h2>
                <p>To logically share a component between different files securely, you strictly need to follow two simple steps:</p>
                
                <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginTop: '15px' }}>
                    <h3 style={{ color: '#005bc5', margin: '0 0 10px 0' }}>Step 1: Save it logically in its own file and EXPORT it</h3>
                    <p>Instead of burying a reusable component like <code>ProfileCard</code> at the absolute bottom of a massive file (like <code>PropsDemo.jsx</code>), cleanly cut the code and paste it into a brand new file (e.g., <code>ProfileCard.jsx</code>). At the very bottom of that file, you must add the magic phrase <strong>export default</strong>.</p>
                    <pre style={preStyle}><code>{`// 📁 File: src/components/ProfileCard.jsx
import React from 'react';

// The reusable Lego piece
const ProfileCard = (props) => {
    return (
        <div className="card">
            <h3>{props.name}</h3>
            <p>Age: {props.age}</p>
        </div>
    );
};

// 🌟 Expose it to the rest of your app!
export default ProfileCard;`}</code></pre>
                </div>

                <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginTop: '20px' }}>
                    <h3 style={{ color: '#28a745', margin: '0 0 10px 0' }}>Step 2: IMPORT it physically anywhere you want!</h3>
                    <p>Now, if you want to explicitly use the <code>ProfileCard</code> inside <code>HooksMenu.jsx</code>, <code>App.jsx</code>, or anywhere else, you just import it at the literal top of that specific file. It immediately functions as a brand new custom HTML tag!</p>
                    <pre style={preStyle}><code>{`// 📁 File: src/components/HooksMenu.jsx

// 🌟 Go grab the Lego piece from the other file
import ProfileCard from './ProfileCard';

const HooksMenu = () => {
    return (
        <div>
            <h1>Hooks Menu Page</h1>
            
            {/* You can reuse it infinitely with different props! */}
            <ProfileCard name="Alice" age={28} />
            <ProfileCard name="Bob" age={35} />
            <ProfileCard name="Charlie" age={42} />
        </div>
    );
};`}</code></pre>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>Why is this architectural pattern so important?</h2>
                <ul>
                    <li style={{ marginBottom: '8px' }}><strong>Saves massive amounts of time:</strong> Build a custom button or card once, realistically use it everywhere confidently.</li>
                    <li style={{ marginBottom: '8px' }}><strong>Consistency:</strong> If you decide to dynamically change the background color of your <code>ProfileCard</code>, you only change the code in <strong>one single file</strong>, and it magically updates across your entire website!</li>
                    <li style={{ marginBottom: '8px' }}><strong>Clean Modular Code:</strong> By brutally moving small, neat components into their own dedicated files, your main operational pages (like <code>App.jsx</code>) stay aggressively clean, short, and very easy to read.</li>
                </ul>
            </section>
        </div>
    );
};

const sectionStyle = {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    borderLeft: '5px solid #007bff'
};

const preStyle = {
    backgroundColor: '#282c34',
    color: '#fff',
    padding: '15px',
    borderRadius: '5px',
    overflowX: 'auto',
    fontSize: '0.95em',
    marginTop: '10px'
};

export default ReusingComponents;
