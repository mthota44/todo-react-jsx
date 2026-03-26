import React from 'react';

const HowToStartReact = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <h1>How to Start a React Project</h1>
            <p>Setting up a React project requires understanding a few core tools. Here is an explanation of the modern ecosystem.</p>
            
            <section style={sectionStyle}>
                <h2>1. Node.js and NPM (Java Equivalent: JRE & Maven)</h2>
                <p><strong>Node.js</strong> is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript outside the browser.</p>
                <div style={javaComparisonStyle}>
                    ☕ <strong>Java Comparison:</strong> Node.js is similar to the <strong>JRE (Java Runtime Environment)</strong>. Just as JRE runs your compiled Java bytecode, Node.js runs your JavaScript code.
                </div>
                <p><strong>npm (Node Package Manager)</strong> is the default package manager for Node.js. It helps you install, share, and manage project dependencies (like React itself, and other libraries).</p>
                <div style={javaComparisonStyle}>
                    ☕ <strong>Java Comparison:</strong> <strong>npm</strong> is exactly like <strong>Maven</strong> or <strong>Gradle</strong>. 
                    <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                        <li><code>package.json</code> is like your <code>pom.xml</code> file, listing all project dependencies.</li>
                        <li>The <code>node_modules/</code> folder is like your <code>.m2/repository</code> directory where the dependencies are downloaded.</li>
                    </ul>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>2. NPX</h2>
                <p><strong>npx</strong> is a package runner tool that comes with npm (version 5.2+). It allows you to execute commands from Node packages without having to install them globally. For example, `npx create-react-app` downloads and runs the create-react-app tool in one step without cluttering your global environment.</p>
                <div style={javaComparisonStyle}>
                    ☕ <strong>Java Comparison:</strong> <strong>npx</strong> is somewhat like running a Maven archetype (e.g., <code>mvn archetype:generate</code>) or using the <strong>Spring Initializr</strong>. It runs a tool directly over the network to generate scaffolding without needing a manual download first.
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>3. Vite</h2>
                <p><strong>Vite</strong> is a modern, fast build tool and development server created by Evan You (creator of Vue.js). It provides significantly faster compilation and Hot Module Replacement (HMR) compared to older tools like Webpack or Create React App.</p>
                <p>Currently, Vite is the officially recommended way to create a new React single-page application.</p>
            </section>

            <section style={sectionStyle}>
                <h2>4. Creating Your First React App (using Vite)</h2>
                <p>Open your terminal and run the following command:</p>
                <pre style={preStyle}>
                    <code>npm create vite@latest my-react-app -- --template react</code>
                </pre>
                <p>After it finishes, navigate into the directory and install dependencies:</p>
                <pre style={preStyle}>
                    <code>cd my-react-app{'\n'}npm install</code>
                </pre>
                <p>Then, start the development server:</p>
                <pre style={preStyle}>
                    <code>npm run dev</code>
                </pre>
            </section>

            <section style={sectionStyle}>
                <h2>5. Installing a Specific Version of a Package</h2>
                <p>If you need to install a specific version of a library (e.g., React 17 instead of 18), you can use the <code>@</code> symbol followed by the version number:</p>
                <pre style={preStyle}>
                    <code>npm install react@17.0.2 react-dom@17.0.2</code>
                </pre>
                <p>Or if you want to use a specific version of Vite when creating your project:</p>
                <pre style={preStyle}>
                    <code>npm create vite@4.1.0 my-react-app -- --template react</code>
                </pre>
                <div style={javaComparisonStyle}>
                    ☕ <strong>Java Comparison:</strong> This is the equivalent of specifying the exact <code>&lt;version&gt;17.0.2&lt;/version&gt;</code> tag inside your <code>pom.xml</code> dependency block for Maven.
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
    borderLeft: '5px solid #007bff'
};

const preStyle = {
    backgroundColor: '#282c34',
    color: '#fff',
    padding: '10px',
    borderRadius: '5px',
    overflowX: 'auto'
};

const javaComparisonStyle = {
    backgroundColor: '#e6f2ff',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '10px',
    marginBottom: '10px',
    borderLeft: '4px solid #005bc5',
    fontSize: '0.95em',
    color: '#003366'
};

export default HowToStartReact;
