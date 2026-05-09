import React, { useState } from 'react';

const advancedConcepts = [
    {
        id: 'architecture',
        title: 'Python Architecture & GIL',
        icon: '🏗️',
        content: `
Python is executed by the **Python Virtual Machine (PVM)** after being compiled to bytecode.
The **Global Interpreter Lock (GIL)** is a mutex that allows only one thread to hold control of the Python interpreter, meaning Python cannot achieve true parallel execution for CPU-bound tasks.
`,
        example: `\`\`\`python
import threading
import time

def cpu_heavy_task():
    count = 0
    for i in range(10**7):
        count += 1

# Using 2 threads doesn't make it 2x faster because of the GIL!
start = time.time()
t1 = threading.Thread(target=cpu_heavy_task)
t2 = threading.Thread(target=cpu_heavy_task)

t1.start(); t2.start()
t1.join(); t2.join()
print(f"Time taken: {time.time() - start:.2f}s")
\`\`\`
`,
        doubt: "If the GIL makes multithreading slow, why doesn't Python just remove it?",
        solution: "Removing the GIL is notoriously difficult! Python relies heavily on C-extensions (like NumPy) which are not inherently thread-safe. The GIL makes integration with C libraries trivially easy. Furthermore, removing the GIL requires adding fine-grained locks to every object, which actually makes single-threaded Python (which is 99% of Python code) significantly slower. (Though PEP 703 aims to make the GIL optional in Python 3.13+!)."
    },
    {
        id: 'generators',
        title: 'Generators & Lazy Evaluation',
        icon: '🏭',
        content: `
Generators allow you to declare a function that behaves like an iterator. They use the \`yield\` keyword instead of \`return\`. 
Because they generate values "lazily" (on the fly), they are incredibly memory efficient for massive datasets.
`,
        example: `\`\`\`python
# Reads a massive 10GB file without crashing your RAM
def read_large_file(file_path):
    with open(file_path, 'r') as file:
        for line in file:
            yield line.strip()

# We only load ONE line into memory at a time.
for line in read_large_file('massive_logs.txt'):
    if "ERROR" in line:
        print(line)
\`\`\`
`,
        doubt: "I tried iterating over a generator twice, but the second loop did nothing. Why?",
        solution: "Generators are EXHAUSTIBLE. Once a generator yields its final value, it is 'empty'. Unlike a List which stores data permanently in memory, a generator calculates data on the fly and forgets it immediately. If you need to loop over the data again, you must call the generator function to create a brand new generator object."
    },
    {
        id: 'decorators',
        title: 'Closures & Decorators',
        icon: '🎁',
        content: `
A **Decorator** is a function that takes another function and extends its behavior without explicitly modifying it. They are widely used in frameworks like FastAPI (\`@app.get\`) or Django (\`@login_required\`).
`,
        example: `\`\`\`python
from functools import wraps

def require_auth(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        user = kwargs.get('user')
        if not user or not user.get('is_admin'):
            raise PermissionError("Access Denied!")
        return func(*args, **kwargs)
    return wrapper

@require_auth
def delete_database(user=None):
    print("Database deleted successfully.")

# delete_database(user={'is_admin': False}) # Raises Error!
delete_database(user={'is_admin': True})  # Works!
\`\`\`
`,
        doubt: "Why do we always import `wraps` from `functools` when making a decorator?",
        solution: "When you wrap a function, the outer `wrapper` function replaces the original function. If you don't use `@wraps`, the original function loses its `__name__` and `__doc__` (docstring). This ruins debugging and auto-generating documentation (like Swagger UI in FastAPI). `@wraps` copies that metadata over to the wrapper."
    },
    {
        id: 'context-managers',
        title: 'Context Managers (with)',
        icon: '🚪',
        content: `
Context Managers handle the setup and teardown of resources. Using the \`with\` statement ensures that resources (files, locks, connections) are cleanly released even if exceptions occur.
`,
        example: `\`\`\`python
import sqlite3

class DatabaseTransaction:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name)

    def __enter__(self):
        return self.conn.cursor()

    def __exit__(self, exc_type, exc_val, traceback):
        if exc_type is None:
            self.conn.commit() # Success! Commit changes.
        else:
            self.conn.rollback() # Error! Roll back.
            print(f"Error occurred: {exc_val}")
        self.conn.close()

with DatabaseTransaction('app.db') as cursor:
    cursor.execute("INSERT INTO users VALUES ('Alice')")
    # If this block fails, __exit__ will automatically rollback!
\`\`\`
`,
        doubt: "Can I write a context manager without creating a whole Class?",
        solution: "Yes! Python provides a brilliant decorator `from contextlib import contextmanager`. You can write a single generator function where the code before `yield` acts as `__enter__` and the code after `yield` acts as `__exit__`."
    },
    {
        id: 'modern-features',
        title: 'Modern Types & Dataclasses',
        icon: '✨',
        content: `
Modern Python (3.7+) has fully embraced **Type Hints** and **Dataclasses**. They make code highly readable, self-documenting, and easy for IDEs to parse.
`,
        example: `\`\`\`python
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class Product:
    id: int
    name: str
    price: float
    tags: List[str]
    description: Optional[str] = None

    def apply_discount(self, percent: float) -> None:
        self.price *= (1 - percent)

laptop = Product(1, "MacBook", 1200.00, ["electronics"])
print(laptop) # Auto-generated beautiful string!
\`\`\`
`,
        doubt: "Do Type Hints actually stop my code from running if I pass a string instead of an int?",
        solution: "No! Python ignores type hints at runtime (it remains dynamically typed). Type hints are strictly for static analysis tools (like `mypy`) and your IDE (like VS Code) to give you warnings before you run the code. If you want strict runtime validation, you should use the `Pydantic` library (which FastAPI relies on heavily)."
    }
];

const PythonAdvanced = () => {
    const [activeId, setActiveId] = useState(advancedConcepts[0].id);
    const activeConcept = advancedConcepts.find(c => c.id === activeId);

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
                <h1 style={styles.title}>Advanced Python Paragdims</h1>
                <p style={styles.subtitle}>Unlock the full power of Python with modern features, meta-programming, and internal mechanics.</p>
            </div>

            <div style={styles.layout}>
                <div style={styles.sidebar}>
                    <h3 style={styles.sidebarTitle}>Modules</h3>
                    {advancedConcepts.map(concept => (
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
    navItemActive: { background: '#eff6ff', color: '#2563eb', boxShadow: 'inset 4px 0 0 #2563eb' },
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

export default PythonAdvanced;
