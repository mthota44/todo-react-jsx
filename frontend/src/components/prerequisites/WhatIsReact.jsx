import React from 'react';

const WhatIsReact = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <h1>What is React & Why it Exists</h1>
            
            <section style={sectionStyle}>
                <h2>1. What is React?</h2>
                <p><strong>React</strong> is an open-source, front-end JavaScript library for building user interfaces or UI components. It is maintained by Facebook (now Meta) and a community of individual developers and companies.</p>
                <p>Unlike full monolithic frameworks like Angular, React is mostly concerned with state management and rendering that state to the Document Object Model (DOM). In traditional architecture terms, it operates purely as the <strong>V (View)</strong> in the MVC (Model-View-Controller) structure.</p>
            </section>

            <section style={sectionStyle}>
                <h2>2. Why was React Created? (The Problem it Solved)</h2>
                <p>Before React, most dynamic web applications used tools like jQuery or Backbone.js to directly manipulate the browser's DOM. As Facebook's UI grew intensely complex, they faced massive issues:</p>
                <ul>
                    <li><strong>Direct DOM Manipulation was Slow:</strong> The real browser DOM is slow to read and write from. Frequent manual updates to the DOM caused severe performance bottlenecks.</li>
                    <li><strong>Cascading Updates:</strong> Data mutations were hard to track. Changing one element could unintentionally break another UI element. Facebook famously struggled with a nagging bug where the "unread messages" counter would constantly show out-of-sync phantom notifications.</li>
                    <li><strong>Spaghetti Code:</strong> Managing application state manually across the entire screen degenerated into an unmaintainable tangle of event listeners.</li>
                </ul>
                <p><strong>React's Core Solution:</strong> React introduced a declarative programming model alongside the <strong>Virtual DOM</strong>. Instead of directly touching the slow real DOM, you simply describe how the UI <em>should</em> look corresponding to the current state, and React rapidly computes the most efficient way to update the actual DOM on your behalf.</p>
            </section>

            <section style={sectionStyle}>
                <h2>3. The Evolution and History of React Versions</h2>
                <p>React radically changed the course of web development. Here is the timeline of how it evolved:</p>
                <ul>
                    <li><strong>2011 (The Proto-Birth):</strong> Created by Jordan Walke, a software engineer at Facebook. He originally prototyped it as "FaxJS". It was successfully tested directly on Facebook's newsfeed.</li>
                    <li><strong>2012 (Instagram):</strong> Following Facebook's acquisition of Instagram, the new Instagram team wanted to utilize Facebook's new technology. React was decoupled from Facebook's specific ecosystem to be shared internally.</li>
                    <li><strong>2013 (Open Source - React v0.3.0):</strong> React was officially open-sourced at JSConf US. The developer world initially mocked React because blending HTML logic directly into JavaScript files (via JSX) was considered an egregious violation of "separation of concerns" at the time.</li>
                    <li><strong>2015 (React Native):</strong> Facebook announced React Native, allowing developers to build purely native mobile apps for iOS and Android utilizing the exact same React programming paradigm.</li>
                    <li><strong>React v15 (2016):</strong> Better SVG support and fundamentally stabilized the library. React was rapidly solidifying its place as the dominant tool in the frontend domain.</li>
                    <li><strong>React v16 (2017) - "Fiber Engine":</strong> An absolute internal rewrite of the React rendering engine. "React Fiber" unlocked the ability to pause, abort, or reuse rendering work for buttery-smooth performance. It also introduced <strong>Error Boundaries</strong> and <strong>Portals</strong>.</li>
                    <li><strong>React v16.8 (2019) - "Hooks":</strong> Easily the most monumental paradigm shift in React history. It introduced <strong>React Hooks</strong> (<code>useState</code>, <code>useEffect</code>). This allowed developers to abandon cumbersome Class Components (and complicated "this" bindings) and cleanly manage state inside Functional Components.</li>
                    <li><strong>React v17 (2020) - "No New Features":</strong> A stepping-stone release designed entirely to make universally upgrading React easier in the future. It changed how React attaches event listeners to the DOM to allow multiple React versions to coexist on a given page.</li>
                    <li><strong>React v18 (2022) - "Concurrent Features":</strong> Introduced concurrency, effectively allowing React to prepare multiple variants of the UI simultaneously in the background. Added features like <code>useTransition</code>, <code>useDeferredValue</code>, Server-Side Suspense, and automatic state batching.</li>
                    <li><strong>React v19 (Currently/Future standardizing):</strong> Driving the industry toward full-stack component patterns. Features include native <strong>React Server Components</strong>, streamlined Actions, and enhanced hooks (like <code>use()</code>, <code>useActionState</code>) that tightly intertwine the frontend with secure server capabilities.</li>
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
    borderLeft: '5px solid #28a745'
};

export default WhatIsReact;
