import React, { useState, useContext, createContext } from 'react';

/* 
  =====================================================================
  HOOK: useContext (Global State)
  =====================================================================
  
  What is useContext?
  - Allows you to share values (state) between components without 
    passing props down manually at every level ("prop drilling").
*/

// 1. CREATE CONTEXT
// Normally this is in a separate file (e.g., ThemeContext.js)
const ThemeContext = createContext();

// 2. PROVIDER COMPONENT
// This wraps the part of the app that needs access to the context.
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        // Value is what will be accessible to all consumers
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// 3. CONSUMER COMPONENT (Using the Hook)
const ThemedCard = () => {
    // USING THE HOOK
    const { theme, toggleTheme } = useContext(ThemeContext);

    const styles = {
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '20px',
        border: '1px solid #ccc',
        marginTop: '20px'
    };

    return (
        <div style={styles}>
            <h3>I am a Themed Component</h3>
            <p>Current Theme: <strong>{theme}</strong></p>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    );
};

// COMPONENT TO DISPLAY
const UseContextDemo = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>useContext Hook Demo</h1>
            <p>Imagine this component is deep in the tree. We avoid passing "theme" props through it.</p>

            <div style={sectionStyle}>
                <ThemeProvider>
                    {/* ThemedCard is inside the Provider, so it can access the context */}
                    <ThemedCard />
                </ThemeProvider>
            </div>
        </div>
    );
};

const sectionStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    background: '#f9f9f9'
};

export default UseContextDemo;
