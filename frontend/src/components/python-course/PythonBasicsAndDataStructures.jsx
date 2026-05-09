import React, { useState } from 'react';

const foundationConcepts = [
    {
        id: 'variables',
        title: 'Memory & Variables',
        icon: '📦',
        content: `
Python variables do not act like "buckets" containing values (like in C or Java). Instead, they are **name tags** (references) pointing to objects stored somewhere in memory.
`,
        example: `\`\`\`python
# Small Integer Caching Example
a = 256
b = 256
print(a is b) # True! Both tags point to the same cached object in memory.

x = 257
y = 257
print(x is y) # False! 257 is too large, so two separate objects are created.
\`\`\`
`,
        doubt: "Why does `==` work fine for 257, but `is` returns False?",
        solution: "`==` checks for VALUE equality (do they look the same?). `is` checks for IDENTITY equality (are they literally the exact same object occupying the same spot in RAM?). Python pre-caches small integers (-5 to 256) to save memory, so `a` and `b` point to the same pre-existing 256 object. Always use `==` for numbers!"
    },
    {
        id: 'strings',
        title: 'Strings (Immutable)',
        icon: '🔤',
        content: `
Strings are sequences of characters. In Python, they are **immutable**. Once you create a string, you cannot change it in place. Any "modification" actually creates a brand new string.
`,
        example: `\`\`\`python
# BAD Practice (O(N^2) complexity)
result = ""
for word in ["Hello", " ", "World"]:
    result += word  # Allocates new memory and copies the string every single time!

# GOOD Practice (O(N) complexity)
words = ["Hello", " ", "World"]
result = "".join(words) # Calculates total memory needed ONCE, then populates it.
\`\`\`
`,
        doubt: "Why does `+=` work if strings are immutable? It looks like I'm changing it.",
        solution: "It's an illusion! When you do `text += 'a'`, Python is actually doing `text = text + 'a'`. It creates a completely new string in RAM and then moves the `text` name tag to point to the new string. The old string is then destroyed by the Garbage Collector."
    },
    {
        id: 'lists',
        title: 'Lists & Memory Layout',
        icon: '📋',
        content: `
Lists are ordered, mutable collections. Under the hood, a Python List is an array of **pointers** to objects, not the objects themselves. This is why a list can hold mixed types (Ints, Strings, Objects).
`,
        example: `\`\`\`python
my_list = [10, 20, 30]

# O(1) Fast Operations
my_list.append(40) # Fast: Just adds to the end
val = my_list[2]   # Fast: Array index lookup

# O(N) Slow Operations
my_list.insert(0, 5) # Slow: Has to shift ALL elements to the right by 1
my_list.pop(0)       # Slow: Has to shift ALL elements to the left by 1
\`\`\`
`,
        doubt: "If I have a list of 1 million items, why is `insert(0, item)` so slow?",
        solution: "Because Python lists are stored in contiguous memory blocks. When you insert at index 0, Python literally has to take the other 1 million items and copy them one spot to the right to make room at the front. If you need to frequently add/remove from both ends, use `collections.deque` instead, which is an optimized doubly-linked list!"
    },
    {
        id: 'dicts',
        title: 'Dictionaries & Hash Maps',
        icon: '🗂️',
        content: `
Dictionaries map Keys to Values. They are extremely fast (` + 'O(1)' + ` lookups) because they use a **Hash Map** under the hood.
`,
        example: `\`\`\`python
user = {"name": "Alice", "age": 25}

# Dictionary Comprehension
squares = {x: x**2 for x in range(5)}
print(squares) # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
\`\`\`
`,
        doubt: "Why can't I use a List as a Dictionary key?",
        solution: "Dictionary keys MUST be **Hashable** (immutable). The Hash Map calculates a mathematical hash of the key to know exactly where to store the value in memory. If you used a List as a key, and then mutated the list (e.g. appended an item), its mathematical hash would change, and the Dictionary would lose track of where the value was stored! This is why Tuples can be keys, but Lists cannot."
    }
];

const PythonBasicsAndDataStructures = () => {
    const [activeId, setActiveId] = useState(foundationConcepts[0].id);
    const activeConcept = foundationConcepts.find(c => c.id === activeId);

    const renderMarkdown = (text) => {
        return text.split('\n').map((line, i) => {
            if (line.trim() === '') return <br key={i} />;
            const parts = line.split(/(\*\*.*?\*\*|\`.*?\`)/).map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} style={styles.bold}>{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('\`') && part.endsWith('\`')) {
                    return <code key={index} style={styles.inlineCode}>{part.slice(1, -1)}</code>;
                }
                return part;
            });
            return <p key={i} style={styles.paragraph}>{parts}</p>;
        });
    };

    const extractCode = (text) => {
        const match = text.match(/\`\`\`python\n([\s\S]*?)\`\`\`/);
        return match ? match[1] : '';
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Basics & Data Structures</h1>
                <p style={styles.subtitle}>Deep dive into the memory architecture of Python's fundamental types.</p>
            </div>

            <div style={styles.layout}>
                <div style={styles.sidebar}>
                    <h3 style={styles.sidebarTitle}>Modules</h3>
                    {foundationConcepts.map(concept => (
                        <div 
                            key={concept.id}
                            style={{
                                ...styles.navItem,
                                ...(activeId === concept.id ? styles.navItemActive : {})
                            }}
                            onClick={() => setActiveId(concept.id)}
                        >
                            <span style={styles.navIcon}>{concept.icon}</span>
                            <span style={{...styles.navText, ...(activeId === concept.id ? styles.navTextActive : {})}}>{concept.title}</span>
                        </div>
                    ))}
                </div>

                <div style={styles.contentArea}>
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <span style={styles.titleIcon}>{activeConcept.icon}</span>
                            <h2 style={styles.contentTitle}>{activeConcept.title}</h2>
                        </div>
                        
                        <div style={styles.textContent}>
                            {renderMarkdown(activeConcept.content)}
                        </div>

                        {activeConcept.example && (
                            <div style={styles.codeSection}>
                                <div style={styles.codeHeader}>
                                    <div style={styles.macButtons}>
                                        <span style={{...styles.macDot, background: '#ef4444'}}></span>
                                        <span style={{...styles.macDot, background: '#eab308'}}></span>
                                        <span style={{...styles.macDot, background: '#22c55e'}}></span>
                                    </div>
                                    <span style={styles.langLabel}>python</span>
                                </div>
                                <pre style={styles.pre}>
                                    <code style={styles.code}>
                                        {extractCode(activeConcept.example)}
                                    </code>
                                </pre>
                            </div>
                        )}

                        {activeConcept.doubt && (
                            <div style={styles.doubtSection}>
                                <div style={styles.doubtBubble}>
                                    <div style={styles.avatarUser}>🤔</div>
                                    <div style={styles.doubtContent}>
                                        <strong>Common Doubt:</strong>
                                        <p style={{margin: '5px 0 0 0'}}>{activeConcept.doubt}</p>
                                    </div>
                                </div>
                                <div style={styles.solutionBubble}>
                                    <div style={styles.avatarExpert}>💡</div>
                                    <div style={styles.solutionContent}>
                                        <strong>Expert Solution:</strong>
                                        <p style={{margin: '5px 0 0 0', lineHeight: '1.6'}}>{activeConcept.solution}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { minHeight: '100vh', background: '#f8fafc', color: '#334155', fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif', padding: '50px 20px' },
    header: { textAlign: 'center', marginBottom: '50px' },
    title: { fontSize: '3rem', fontWeight: '800', color: '#0f172a', margin: '0 0 15px 0', letterSpacing: '-1px' },
    subtitle: { fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' },
    layout: { display: 'flex', maxWidth: '1200px', margin: '0 auto', gap: '40px', alignItems: 'flex-start' },
    
    sidebar: { flex: '0 0 320px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', position: 'sticky', top: '30px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
    sidebarTitle: { margin: '0 0 15px 10px', fontSize: '0.9rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', fontWeight: '700' },
    navItem: { display: 'flex', alignItems: 'center', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', marginBottom: '8px', transition: 'all 0.2s ease', color: '#475569' },
    navItemActive: { background: '#f0fdf4', color: '#16a34a', boxShadow: 'inset 4px 0 0 #16a34a' },
    navIcon: { fontSize: '1.4rem', marginRight: '15px' },
    navText: { fontSize: '1.05rem', fontWeight: '500' },
    navTextActive: { fontWeight: '700' },

    contentArea: { flex: '1' },
    card: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' },
    cardHeader: { display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px', marginBottom: '25px' },
    titleIcon: { fontSize: '2.5rem', background: '#f1f5f9', padding: '10px', borderRadius: '12px' },
    contentTitle: { fontSize: '2.2rem', margin: '0', color: '#0f172a', fontWeight: '800', letterSpacing: '-0.5px' },
    
    textContent: { fontSize: '1.15rem', lineHeight: '1.7', color: '#334155', marginBottom: '35px' },
    bold: { color: '#0f172a', fontWeight: '700' },
    paragraph: { margin: '0 0 15px 0' },
    inlineCode: { background: '#f1f5f9', color: '#db2777', padding: '0.2em 0.5em', borderRadius: '6px', fontSize: '0.9em', fontFamily: 'monospace', fontWeight: '600' },

    codeSection: { background: '#1e293b', borderRadius: '12px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' },
    codeHeader: { background: '#0f172a', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    macButtons: { display: 'flex', gap: '8px' },
    macDot: { width: '12px', height: '12px', borderRadius: '50%' },
    langLabel: { color: '#94a3b8', fontSize: '0.85rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '1px' },
    pre: { margin: 0, padding: '25px', overflowX: 'auto' },
    code: { fontFamily: '"Fira Code", "JetBrains Mono", Consolas, monospace', fontSize: '0.95rem', color: '#e2e8f0', lineHeight: '1.6' },

    doubtSection: { background: '#f8fafc', borderRadius: '16px', padding: '30px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '20px' },
    doubtBubble: { display: 'flex', gap: '20px', alignItems: 'flex-start' },
    avatarUser: { fontSize: '2rem', background: '#e0e7ff', padding: '10px', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    doubtContent: { background: '#ffffff', padding: '20px', borderRadius: '16px', borderTopLeftRadius: '0', border: '1px solid #e2e8f0', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    
    solutionBubble: { display: 'flex', gap: '20px', alignItems: 'flex-start', marginTop: '10px' },
    avatarExpert: { fontSize: '2rem', background: '#dcfce7', padding: '10px', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    solutionContent: { background: '#f0fdf4', padding: '20px', borderRadius: '16px', borderTopLeftRadius: '0', border: '1px solid #bbf7d0', flex: 1, color: '#166534', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
};

export default PythonBasicsAndDataStructures;
