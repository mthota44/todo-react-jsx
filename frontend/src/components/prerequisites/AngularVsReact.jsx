import React from 'react';

const AngularVsReact = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <h1>Angular vs. React</h1>
            <p>Choosing between Angular and React is one of the most common debates when starting a web project. Let's break down the core differences in simple, understandable terms.</p>
            
            <section style={sectionStyle}>
                <h2>1. The Big Picture: Framework vs. Library</h2>
                <div style={comparisonStyle}>
                    <div>
                        <h3 style={{ color: '#dd0031' }}>Angular (The Fully Furnished House)</h3>
                        <p>Angular is a <strong>Framework</strong>. When you use Angular, you are buying a fully furnished house built by Google. It comes with everything already installed: plumbing (routing), electricity (state management), and appliances (form validation). Because everything is pre-decided out of the box, you just move in and are forced to elegantly follow their strict architectural rules.</p>
                    </div>
                    <div>
                        <h3 style={{ color: '#61dafb' }}>React (The Toolbox of Legos)</h3>
                        <p>React is a <strong>Library</strong>. When you use React (built by Meta), you are handed a massive box of high-quality Legos. React only cares about doing one thing really well: building the User Interface. If you need routing or form validation, you have to go out and hand-pick the specific Lego pieces (third-party libraries) you want to use to build your own custom house.</p>
                    </div>
                </div>
            </section>

            <section style={sectionStyle}>
                <h2>2. Core Technical Differences</h2>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Feature</th>
                            <th style={thStyle}>Angular</th>
                            <th style={thStyle}>React</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={tdStyle}><strong>Language & Setup</strong></td>
                            <td style={tdStyle}>Strictly requires <strong>TypeScript</strong>. HTML is written in separate template files, disconnected from the logic.</td>
                            <td style={tdStyle}>Uses <strong>JavaScript</strong> (or TypeScript). HTML is written directly inside the JS files (a syntax called <strong>JSX</strong>).</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}><strong>Data Binding</strong></td>
                            <td style={tdStyle}><strong>Two-Way Binding</strong>: If you change the code, the UI automatically updates. If the user types in the UI, the code magically updates automatically as well.</td>
                            <td style={tdStyle}><strong>One-Way Data Flow</strong>: Data only flows down. If a user types into the UI, you must explicitly write a function to update the data. This provides much more predictable control.</td>
                        </tr>
                        <tr>
                            <td style={tdStyle}><strong>Learning Curve</strong></td>
                            <td style={tdStyle}><strong>Steep</strong>: You have to learn many heavy, Angular-specific concepts (Modules, Services, Dependency Injection, RxJS observables).</td>
                            <td style={tdStyle}><strong>Moderate</strong>: Once you fundamentally understand vanilla JavaScript well, learning React components and Hooks is relatively fast and natural.</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section style={sectionStyle}>
                <h2>3. Use Cases: When to choose which?</h2>
                
                <div style={scenarioStyle}>
                    <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>🏗️ Choose Angular for scenarios where:</h3>
                    <ul style={{ margin: 0 }}>
                        <li style={{ marginBottom: '8px', lineHeight: '1.4' }}>You are building a massive, enterprise-grade application (like hospital administration or banking software).</li>
                        <li style={{ marginBottom: '8px', lineHeight: '1.4' }}>You have a huge team of developers and you need everyone to strictly follow a unified, standardized structure so nobody writes "rogue" code.</li>
                        <li style={{ marginBottom: '8px', lineHeight: '1.4' }}>You want an "all-in-one" solution where you don't have to spend days researching which routing or state library to manually install.</li>
                    </ul>
                </div>

                <div style={scenarioStyle}>
                    <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>🎨 Choose React for scenarios where:</h3>
                    <ul style={{ margin: 0 }}>
                        <li style={{ marginBottom: '8px', lineHeight: '1.4' }}>You are building a highly modern, dynamic, interactive User Interface (like social media platforms, e-commerce sites, or dynamic dashboards).</li>
                        <li style={{ marginBottom: '8px', lineHeight: '1.4' }}>You are a startup and want extreme flexibility to design the architecture exactly the way your team prefers.</li>
                        <li style={{ marginBottom: '8px', lineHeight: '1.4' }}>You want access to a massive open-source community ecosystem, or if you plan to eventually build mobile apps (you can easily transfer your React skills to <strong>React Native</strong>).</li>
                    </ul>
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
    borderLeft: '5px solid #000'
};

const comparisonStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '15px'
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px',
    backgroundColor: '#fff'
};

const thStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#eee'
};

const tdStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left'
};

const scenarioStyle = {
    backgroundColor: '#fff',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '15px'
};

export default AngularVsReact;
