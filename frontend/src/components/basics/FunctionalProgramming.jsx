import React, { useState } from 'react';

/**
 * -----------------------------------------------------------------------
 * 6. FUNCTIONAL PROGRAMMING BASICS
 * -----------------------------------------------------------------------
 * 
 * REACT REOUIREMENTS:
 * React code relies heavily on "Functional" concepts, not Object-Oriented generic loops.
 * 
 * CORE CONCEPTS:
 * A. Map (.map()): Transforms an array (e.g., Data -> JSX). Always returns same length array.
 * B. Filter (.filter()): Selects subset of items. Returns new array.
 * C. Destructuring: extracting values from objects/arrays cleanly.
 */

const FunctionalProgramming = () => {
    // Original Data
    const users = [
        { id: 1, name: "Alice", role: "Admin", active: true },
        { id: 2, name: "Bob", role: "User", active: false },
        { id: 3, name: "Charlie", role: "User", active: true },
    ];

    const [filterActive, setFilterActive] = useState(false);

    // 1. FILTERING
    // "Declarative": We define the criteria, we don't write a for-loop with 'if'.
    const displayedUsers = filterActive
        ? users.filter(user => user.active === true)
        : users;

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h3>6. Functional Programming Basics</h3>

            <button
                onClick={() => setFilterActive(!filterActive)}
                style={{ marginBottom: '15px' }}
            >
                {filterActive ? "Show All Users" : "Show Active Only (.filter)"}
            </button>

            <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 2. MAPPING */}
                    {displayedUsers.map((user) => {
                        // 3. DESTRUCTURING
                        // Instead of user.name, user.role... we extract them.
                        const { id, name, role, active } = user;

                        return (
                            <tr key={id} style={{ backgroundColor: active ? '#fff' : '#eee', color: active ? '#000' : '#888' }}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{role}</td>
                                <td>{active ? "Active" : "Inactive"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
                <p><strong>Code Analysis:</strong></p>
                <code>
                    users.filter(u =&gt; u.active).map(({`{id, name}`}) =&gt; &lt;tr&gt;...&lt;/tr&gt;)
                </code>
            </div>
        </div>
    );
};

export default FunctionalProgramming;
