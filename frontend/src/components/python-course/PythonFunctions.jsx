import React, { useState } from 'react';

const functionConcepts = [
    {
        id: 'definition',
        title: 'Function Definition & Parameters',
        icon: '🛠️',
        content: `
Functions encapsulate logic so it can be reused. Python evaluates default arguments ONLY ONCE when the function is defined, which leads to a notorious trap if you use mutable defaults.
`,
        example: `\`\`\`python
# THE MUTABLE DEFAULT TRAP
def add_item(item, target_list=[]):
    target_list.append(item)
    return target_list

print(add_item("Apple"))  # ['Apple']
print(add_item("Banana")) # ['Apple', 'Banana'] wait, what?

# THE CORRECT WAY
def add_item_safe(item, target_list=None):
    if target_list is None:
        target_list = []
    target_list.append(item)
    return target_list
\`\`\`
`,
        doubt: "Why did `add_item` remember the 'Apple' when I called it the second time without a list?",
        solution: "In Python, default arguments are evaluated exactly ONCE: when the `def` statement is executed (at file load time). The function object holds a reference to that specific list in memory. Every time you call the function without providing a list, it mutates that exact same list! Always use `None` for mutable default arguments."
    },
    {
        id: 'args-kwargs',
        title: '*args and **kwargs',
        icon: '🌌',
        content: `
\`*args\` gathers positional arguments into a Tuple.
\`**kwargs\` gathers keyword arguments into a Dictionary.
You can use them to build highly flexible wrapper functions or APIs.
`,
        example: `\`\`\`python
def execute_query(query_string, *args, **kwargs):
    print("Query:", query_string)
    print("Positional values:", args)
    
    if kwargs.get('timeout'):
        print(f"Applying timeout of {kwargs['timeout']}s")

# Flexible API Call
execute_query("SELECT * FROM users WHERE age > ?", 18, 25, timeout=10, cache=True)
\`\`\`
`,
        doubt: "Do I have to name them 'args' and 'kwargs'?",
        solution: "No! The magic is in the asterisks `*` and `**`, not the words. You could write `def f(*items, **options)`, and it works identically. However, `*args` and `**kwargs` are standard Python conventions. If you name them something else, other developers reading your code might get confused."
    },
    {
        id: 'lambda',
        title: 'Lambda Functions',
        icon: '⚡',
        content: `
Lambdas are anonymous, single-expression functions. They are perfect for providing quick, inline logic to higher-order functions like \`sorted()\`, \`map()\`, or \`filter()\`.
`,
        example: `\`\`\`python
users = [
    {'name': 'Alice', 'role': 'admin', 'age': 30},
    {'name': 'Bob', 'role': 'user', 'age': 22},
    {'name': 'Charlie', 'role': 'admin', 'age': 28}
]

# Sort by age using a Lambda
users_sorted = sorted(users, key=lambda u: u['age'])

# Filter for admins
admins = list(filter(lambda u: u['role'] == 'admin', users))
\`\`\`
`,
        doubt: "Can I put a standard `if/else` block inside a lambda?",
        solution: "You cannot put an `if/else` *statement block* in a lambda, because lambdas can only contain a single expression. However, you CAN use an inline ternary expression: `lambda x: 'Even' if x % 2 == 0 else 'Odd'`. If your logic requires multiple lines, you should definitely use a normal `def` function for readability."
    },
    {
        id: 'recursion',
        title: 'Recursion Depth',
        icon: '🔁',
        content: `
Recursion allows a function to call itself. While elegant for tree traversal or divide-and-conquer algorithms, Python is not deeply optimized for it compared to functional languages.
`,
        example: `\`\`\`python
import sys

# Checking Python's recursion limit
print(sys.getrecursionlimit()) # Usually 1000

def recursive_crash(n):
    return recursive_crash(n + 1)

# recursive_crash(1) # Raises RecursionError!
\`\`\`
`,
        doubt: "Why does Python limit recursion to 1000? In C++, I can recurse much deeper!",
        solution: "Every time a function calls itself, Python adds a new 'frame' to the Call Stack in memory. If you recurse forever, you will consume all RAM and crash the entire OS (Stack Overflow). Python has a hard limit (usually 1000) to safely raise a `RecursionError` before your computer crashes. Unlike C++ or Haskell, Python does not support 'Tail Call Optimization' (TCO), so recursion is relatively expensive."
    }
];

const PythonFunctions = () => {
    const [activeId, setActiveId] = useState(functionConcepts[0].id);
    const activeConcept = functionConcepts.find(c => c.id === activeId);

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
                <h1 style={styles.title}>Functions Deep Dive</h1>
                <p style={styles.subtitle}>Master scopes, flexible parameters, and the secrets of functional python.</p>
            </div>

            <div style={styles.layout}>
                <div style={styles.sidebar}>
                    <h3 style={styles.sidebarTitle}>Modules</h3>
                    {functionConcepts.map(concept => (
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
    navItemActive: { background: '#faf5ff', color: '#9333ea', boxShadow: 'inset 4px 0 0 #9333ea' },
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

export default PythonFunctions;
