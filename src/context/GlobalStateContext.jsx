import React, { createContext, useState } from 'react';

// ===========================================
// 1. CREATE THE CONTEXT ("The Cloud")
// ===========================================
// This is the global container for our state.
export const GlobalContext = createContext();

// ===========================================
// 2. CREATE THE PROVIDER ("The Broadcaster")
// ===========================================
// This component wraps the app (or part of it) and provides the data.
export const GlobalProvider = ({ children }) => {

    // This state is now "Global". Any component inside can access it.
    const [user, setUser] = useState({
        name: "Guest",
        isLoggedIn: false,
        role: "Visitor"
    });

    // Actions to modify the global state
    const login = (username) => {
        setUser({
            name: username,
            isLoggedIn: true,
            role: "Admin"
        });
    };

    const logout = () => {
        setUser({
            name: "Guest",
            isLoggedIn: false,
            role: "Visitor"
        });
    };

    return (
        // We pass both the Data (user) and the Actions (login/logout) to the cloud
        <GlobalContext.Provider value={{ user, login, logout }}>
            {children}
        </GlobalContext.Provider>
    );
};
