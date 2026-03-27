import React from 'react';
import { Link } from 'react-router-dom';

const AngularVirtualDom = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '850px', lineHeight: '1.6' }}>
            <Link to="/doubts" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                &larr; Back to Doubts
            </Link>

            <h1 style={{ color: '#d32f2f', marginBottom: '10px' }}>Why did Angular ignore the Virtual DOM?</h1>
            <p style={{ fontSize: '18px', color: '#555', marginTop: 0 }}>
                It's a common misconception that React's <strong>Virtual DOM</strong> is the "final boss" of web performance. If it's so amazing, why didn't Google (who makes Angular) copy it? Because doing so would have actually been a step backward.
            </p>

            {/* 1. The Virtual DOM Problem */}
            <div style={{ backgroundColor: '#fdf3f4', borderLeft: '5px solid #d32f2f', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#b71c1c', marginTop: 0 }}>1. The Flaw of the Virtual DOM (Used by React)</h2>
                <p>When you update a piece of data in React, it triggers a massive chain reaction:</p>
                <ol>
                    <li>React rapidly creates a <strong>complete fake copy</strong> of your UI in the computer's memory (The Virtual Tree).</li>
                    <li>It runs a heavy "Diffing Algorithm" to compare this new fake copy against the old fake copy to find differences.</li>
                    <li>Finally, it patches those differences into the actual physical screen.</li>
                </ol>
                <p><strong>The Problem:</strong> This takes up a massive amount of RAM memory, because React is secretly holding <em>two entire UI structures</em> in the background. Google realized this was incredibly wasteful, especially for sprawling apps like Gmail running on cheap mobile phones.</p>
            </div>

            {/* 2. Incremental DOM & Ivy */}
            <div style={{ backgroundColor: '#e8f5e9', borderLeft: '5px solid #2e7d32', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#1b5e20', marginTop: 0 }}>2. Incremental DOM & The Ivy Engine (Angular's Fix)</h2>
                
                <h4 style={{ margin: '15px 0 5px 0' }}>What is the Ivy Engine?</h4>
                <p style={{ margin: 0 }}>Ivy is the name of angular's brutally efficient background compiler engine.</p>
                
                <h4 style={{ margin: '15px 0 5px 0' }}>What is the Incremental DOM?</h4>
                <p style={{ margin: 0 }}>Instead of drawing large, RAM-heavy fake trees to compare, Ivy structurally translates your code into strict, raw, line-by-line instructions. When data changes, Angular literally walks through the <em>real</em> DOM and targets exact mutations directly.</p>
                
                <h4 style={{ margin: '15px 0 5px 0' }}>Why did Google choose this?</h4>
                <p style={{ margin: 0 }}>It violently cuts down the memory foot-print since there are no "Virtual Trees" sitting around. Google specifically designed this so huge enterprise tools could run flawlessly on low-end hardware.</p>
            </div>

            {/* 3. Signals */}
            <div style={{ backgroundColor: '#e3f2fd', borderLeft: '5px solid #1976d2', padding: '20px', marginTop: '30px', borderRadius: '4px' }}>
                <h2 style={{ color: '#0d47a1', marginTop: 0 }}>3. "Signals" & Fine-Grained Reactivity (The Future)</h2>
                <p>The biggest flaw right now with React is that changing a single tiny variable forces the entire Component block (and often its children) to aggressively re-calculate from top to bottom just to figure out what happened.</p>
                
                <h4 style={{ margin: '15px 0 5px 0' }}>What are Signals? (Angular's newest weapon)</h4>
                <p style={{ margin: 0 }}>Signals completely obliterate the need to "re-render" components or "diff" trees. A Signal is a piece of data that intimately knows <em>exactly</em> where it is being used.</p>
                <p style={{ marginTop: '10px' }}>
                    If you change a <code>userCount</code> signal, Angular magically knows that this signal is only linked to exactly one single <code>&lt;span&gt;</code> tag. It reaches in and updates that exact specific span blindly, <strong>without</strong> ever re-executing the rest of your component's code. This is called "Fine-Grained Reactivity" and it completely destroys the speed limits of traditional Virtual DOM diffing.
                </p>
            </div>

            {/* 4. Comparison Table */}
            <h2 style={{ marginTop: '40px' }}>Technical Summary</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f1f1f1', borderBottom: '2px solid #ccc' }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Feature</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>React (Virtual DOM)</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Angular (Incremental DOM / Signals)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '12px', fontWeight: 'bold' }}>Concept</td>
                        <td style={{ padding: '12px' }}>Re-render entire component &Diff</td>
                        <td style={{ padding: '12px' }}>Detect precisely & Update directly</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ddd', backgroundColor: '#fafafa' }}>
                        <td style={{ padding: '12px', fontWeight: 'bold' }}>Memory Usage</td>
                        <td style={{ padding: '12px', color: '#d32f2f' }}>Higher (Stores fake virtual trees)</td>
                        <td style={{ padding: '12px', color: '#2e7d32' }}>Lower (Direct DOM instructions)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '12px', fontWeight: 'bold' }}>Performance Trick</td>
                        <td style={{ padding: '12px' }}>Requires manual memoization tricks</td>
                        <td style={{ padding: '12px' }}>Automatic via Signal dependencies</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AngularVirtualDom;
