import React from 'react';

const ProjectStructure = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <h1>React Project Structure</h1>
            <p>When you create a new React project using modern tools like Vite, you are automatically given a standardized file system. Let's break down exactly what each folder and file does.</p>
            
            <section style={sectionStyle}>
                <h2>1. The Typical Folder Blueprint</h2>
                <div style={{ backgroundColor: '#282c34', color: '#abb2bf', padding: '15px', borderRadius: '5px', fontFamily: 'monospace', marginBottom: '20px', fontSize: '1.1em' }}>
                    <div>📁 my-react-app/</div>
                    <div style={{ paddingLeft: '20px' }}>📁 node_modules/</div>
                    <div style={{ paddingLeft: '20px' }}>📁 public/</div>
                    <div style={{ paddingLeft: '40px' }}>📄 vite.svg <i>(or favicon.ico)</i></div>
                    <div style={{ paddingLeft: '20px' }}>📁 src/</div>
                    <div style={{ paddingLeft: '40px' }}>📁 assets/</div>
                    <div style={{ paddingLeft: '40px' }}>📁 components/</div>
                    <div style={{ paddingLeft: '40px' }}>📄 App.css</div>
                    <div style={{ paddingLeft: '40px', color: '#61dafb', fontWeight: 'bold' }}>📄 App.jsx</div>
                    <div style={{ paddingLeft: '40px' }}>📄 index.css</div>
                    <div style={{ paddingLeft: '40px', color: '#61dafb', fontWeight: 'bold' }}>📄 main.jsx</div>
                    <div style={{ paddingLeft: '20px' }}>📄 .gitignore</div>
                    <div style={{ paddingLeft: '20px', color: '#e5c07b', fontWeight: 'bold' }}>📄 index.html</div>
                    <div style={{ paddingLeft: '20px', color: '#e5c07b', fontWeight: 'bold' }}>📄 package.json</div>
                    <div style={{ paddingLeft: '20px' }}>📄 package-lock.json</div>
                    <div style={{ paddingLeft: '20px' }}>📄 vite.config.js</div>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>2. Core System Files</h2>
                
                <h3 style={fileHeadingStyle}>📄 package.json</h3>
                <p>Think of this as the "ID Card" and "Instruction Manual" of your project. It keeps track of critical metadata:</p>
                <ul>
                    <li>The name and version of your application.</li>
                    <li><strong>Dependencies:</strong> A definitive list of all the third-party libraries your project needs to function properly (like React, React Router, Axios etc.).</li>
                    <li><strong>Scripts:</strong> Shortcuts to trigger complex terminal commands. For example, when you type <code>npm run dev</code> in your terminal, it looks at the "dev" script inside this file to boot up the server.</li>
                </ul>

                <h3 style={fileHeadingStyle}>📁 node_modules/</h3>
                <p>This folder acts as the warehouse where the actual code for all your <code>package.json</code> dependencies is physically stored. It is notoriously massive and should <strong>never</strong> be uploaded to GitHub (which is why it is blocked by your <code>.gitignore</code> file). When a teammate downloads your project, they just run <code>npm install</code>, which reads the <code>package.json</code> and instantly downloads a fresh copy of the <code>node_modules</code> folder.</p>

                <h3 style={fileHeadingStyle}>📄 index.html</h3>
                <p>This is the <strong>only</strong> HTML file in your entire React project! It acts as the single starting window. Inside it, you will find a solitary empty tag: <code>&lt;div id="root"&gt;&lt;/div&gt;</code>. React takes all the JavaScript you write and surgically injects the entire living application directly into this one empty HTML div.</p>
            </section>

            <section style={sectionStyle}>
                <h2>3. The Source Code (<code>src/</code> folder)</h2>
                <p>You will spend 99% of your development time inside the <code>src/</code> folder. This is where all your custom components, CSS styles, and structural logic are born.</p>

                <h3 style={fileHeadingStyle}>📄 main.jsx <em>(or index.js)</em></h3>
                <p>This is the absolute entry point—the very first Javascript file that is executed. Its sole responsibility is to kickstart React. It does three simple things:</p>
                <ol>
                    <li>It targets that empty <code>&lt;div id="root"&gt;</code> over in the <code>index.html</code>.</li>
                    <li>It imports your master <code>App</code> component.</li>
                    <li>It hands the <code>App</code> component over to React to render securely into that root element.</li>
                </ol>

                <h3 style={fileHeadingStyle}>📄 App.jsx</h3>
                <p>This is your primary root component. It functions as the outermost shell of your application. In a standard setup, <code>App.jsx</code> is primarily used to set up the website's Router (managing web links and URLs) and acts as the structural container that imports all the secondary components.</p>

                <h3 style={fileHeadingStyle}>📁 components/</h3>
                <p>As your app grows, it becomes impossible to write everything inside <code>App.jsx</code>. To maintain clean architecture, you build your website using small, reusable Lego pieces (components) such as <code>Navbar.jsx</code>, <code>ShoppingBox.jsx</code>, or <code>DomExplanation.jsx</code>, and save them in this folder so they can be imported continuously throughout your application.</p>
            </section>
        </div>
    );
};

const sectionStyle = {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    borderLeft: '5px solid #17a2b8'
};

const fileHeadingStyle = {
    color: '#005bc5',
    borderBottom: '1px solid #ddd',
    paddingBottom: '5px',
    marginTop: '25px'
};

export default ProjectStructure;
