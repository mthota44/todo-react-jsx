import React, { useState } from 'react';

const moduleConcepts = [
    {
        id: 'importing',
        title: 'Importing & Namespaces',
        icon: '📦',
        content: `
A module is simply a Python file containing definitions and statements. Using \`import\` brings those definitions into your current **Namespace**.
`,
        example: `\`\`\`python
# Approach 1: Import whole module (Safe)
import math
print(math.sqrt(16))

# Approach 2: Import specific function (Cleaner)
from datetime import datetime
print(datetime.now())

# Approach 3: Aliasing (Prevents naming conflicts)
import pandas as pd
\`\`\`
`,
        doubt: "Why is everyone always telling me not to use `from module import *`?",
        solution: "It causes Namespace Pollution! If you do `from math import *` and `from numpy import *`, they both have a `sqrt()` function. Which one gets called? You have no idea because the second import silently overwrites the first. Always import exactly what you need, or import the module and use dot notation (`math.sqrt`)."
    },
    {
        id: 'packages',
        title: 'Packages & __init__.py',
        icon: '📁',
        content: `
A **Package** is a directory that contains multiple Python modules. Structuring code into packages makes large projects manageable.
`,
        example: `\`\`\`python
# Directory Structure:
# my_app/
#   __init__.py
#   database.py
#   auth.py

# Inside __init__.py you can expose specific functions:
# from .auth import login_user

# In your main script:
from my_app import login_user
\`\`\`
`,
        doubt: "Do I actually need an `__init__.py` file? I deleted it and my code still ran.",
        solution: "In Python 3.3+, directories without `__init__.py` are treated as 'Namespace Packages', so imports might still work. However, you should ALMOST ALWAYS include an `__init__.py` (even if it's empty) in a standard package. It explicitly tells tools (like Pytest, Mypy, and IDEs) that the directory is a package, and it allows you to control what gets exported from the package."
    },
    {
        id: 'main-guard',
        title: 'The Main Guard',
        icon: '🛡️',
        content: `
When you run a Python script, Python sets a special internal variable \`__name__\` to \`"__main__"\`. But if the file is *imported*, \`__name__\` is set to the file's name.
`,
        example: `\`\`\`python
# utils.py
def calculate_tax(amount):
    return amount * 0.2

# We only want to run this test if we run utils.py DIRECTLY!
if __name__ == "__main__":
    print("Testing calculation:", calculate_tax(100))
\`\`\`
`,
        doubt: "I imported a file to use its function, but my terminal suddenly printed a bunch of random output and ran a script. Why?",
        solution: "Because the file you imported didn't use the Main Guard! When Python imports a file, it executes EVERY line of code in that file from top to bottom. If they have print statements, API calls, or logic floating outside of functions, that code executes immediately upon import. The `if __name__ == '__main__':` block shields executable script code from running during an import."
    },
    {
        id: 'pip-venv',
        title: 'pip & Virtual Environments',
        icon: '🌐',
        content: `
**pip** is the standard package manager for Python.
A **Virtual Environment (venv)** creates an isolated folder containing a specific Python executable and its own set of installed packages, preventing conflicts between different projects.
`,
        example: `\`\`\`bash
# 1. Create the environment (named 'venv')
python -m venv venv

# 2. Activate it (Windows)
venv\\Scripts\\activate
# Activate it (Mac/Linux)
source venv/bin/activate

# 3. Install a package into THIS environment
pip install fastapi

# 4. Save your dependencies so others can install them
pip freeze > requirements.txt
\`\`\`
`,
        doubt: "I ran `pip install requests`, it said 'Requirement already satisfied', but when I run my script I get `ModuleNotFoundError: No module named 'requests'`. Help!",
        solution: "You are dealing with the classic 'Multiple Pythons' problem! Your computer probably has multiple versions of Python installed (e.g., Python 3.9 and Python 3.11). The `pip` command you used belongs to one version, but you are running your script with the other version! Always ensure your Virtual Environment is ACTIVATED before you install packages AND before you run your script."
    }
];

const PythonModules = () => {
    const [activeId, setActiveId] = useState(moduleConcepts[0].id);
    const activeConcept = moduleConcepts.find(c => c.id === activeId);

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
        const match = text.match(/\`\`\`(python|bash)\n([\s\S]*?)\`\`\`/);
        if (!match) return { code: '', lang: '' };
        return { lang: match[1], code: match[2] };
    };

    const { code, lang } = extractCode(activeConcept.example || "");

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Modules & Environments</h1>
                <p style={styles.subtitle}>Organize your code, manage dependencies, and write production-ready packages.</p>
            </div>

            <div style={styles.layout}>
                <div style={styles.sidebar}>
                    <h3 style={styles.sidebarTitle}>Modules</h3>
                    {moduleConcepts.map(concept => (
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

                        {code && (
                            <div style={styles.codeSection}>
                                <div style={styles.codeHeader}>
                                    <div style={styles.macButtons}>
                                        <span style={{...styles.macDot, background: '#ef4444'}}></span>
                                        <span style={{...styles.macDot, background: '#eab308'}}></span>
                                        <span style={{...styles.macDot, background: '#22c55e'}}></span>
                                    </div>
                                    <span style={styles.langLabel}>{lang}</span>
                                </div>
                                <pre style={styles.pre}>
                                    <code style={styles.code}>
                                        {code}
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
    navItemActive: { background: '#fef2f2', color: '#dc2626', boxShadow: 'inset 4px 0 0 #dc2626' },
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

export default PythonModules;
