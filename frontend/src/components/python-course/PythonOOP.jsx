import React, { useState } from 'react';

const oopConcepts = [
    {
        id: 'class-object',
        title: 'Classes & Objects',
        icon: '🏛️',
        content: `
A **Class** is a blueprint for creating objects. It defines a set of attributes that will characterize any object instantiated from it.
An **Object** is a specific instance of a class. When you create an object, you are using the blueprint to build something tangible in memory.
`,
        example: `\`\`\`python
class Developer:
    # Class Variable (shared by all instances)
    company = "TechCorp"

    # Constructor method
    def __init__(self, name, language):
        self.name = name          # Instance Variable
        self.language = language

# Creating Objects (Instantiating)
dev1 = Developer("Alice", "Python")
dev2 = Developer("Bob", "JavaScript")

print(f"{dev1.name} works at {dev1.company}") # Alice works at TechCorp
\`\`\`
`,
        doubt: "Why do we always have to write `self` inside class methods?",
        solution: "In Python, when you call `dev1.some_method()`, Python secretly translates it to `Developer.some_method(dev1)`. The `self` parameter is how the method receives the specific object it should operate on! Without `self`, the method wouldn't know if it's supposed to change Alice's data or Bob's data."
    },
    {
        id: 'inheritance',
        title: 'Inheritance & MRO',
        icon: '🧬',
        content: `
**Inheritance** allows a new class to absorb the attributes and methods of an existing parent class, promoting DRY (Don't Repeat Yourself) code.

Python natively supports **Multiple Inheritance**. When a class inherits from multiple parents, Python uses the **Method Resolution Order (MRO)** (specifically the C3 Linearization algorithm) to determine which parent's method to execute if there are naming conflicts.
`,
        example: `\`\`\`python
class Backend:
    def deploy(self): return "Deploying to AWS"

class Frontend:
    def build_ui(self): return "Building React UI"
    def deploy(self): return "Deploying to Vercel"

class FullStack(Backend, Frontend):
    pass

dev = FullStack()
print(dev.build_ui())  # "Building React UI"
print(dev.deploy())    # "Deploying to AWS" (Backend comes first in MRO)
print(FullStack.mro()) # [FullStack, Backend, Frontend, object]
\`\`\`
`,
        doubt: "Isn't Multiple Inheritance dangerous? Java banned it entirely!",
        solution: "It *can* be dangerous if not designed well (often leading to the 'Diamond Problem'). However, Python's MRO solves the Diamond Problem gracefully by creating a strict, predictable linear order of execution. If you ever get confused about which method runs, just print `ClassName.mro()`!"
    },
    {
        id: 'polymorphism',
        title: 'Polymorphism & Duck Typing',
        icon: '🎭',
        content: `
**Polymorphism** means "many forms". It allows you to call the same method on different objects, and each object responds in its own way.

Python employs **Duck Typing**: "If it walks like a duck and quacks like a duck, it must be a duck." You don't need objects to strictly inherit from a base class to use them interchangeably; they just need to implement the required methods.
`,
        example: `\`\`\`python
class Dog:
    def speak(self): return "Woof!"

class NotificationBot:
    def speak(self): return "Sending Slack Alert!"

# Polymorphic function
def trigger_sound(entity):
    # We don't check if entity is an Animal. 
    # We only care that it has a .speak() method.
    print(entity.speak())

trigger_sound(Dog())             # Woof!
trigger_sound(NotificationBot()) # Sending Slack Alert!
\`\`\`
`,
        doubt: "If we don't check types, won't our program crash if I pass a String into `trigger_sound`?",
        solution: "Yes, it will throw an `AttributeError` at runtime. Duck Typing trades compile-time safety for incredible flexibility and speed of development. To make it safer in modern Python, we use Type Hints (`def trigger_sound(entity: Protocol)`) or `hasattr(entity, 'speak')` checks."
    },
    {
        id: 'encapsulation',
        title: 'Encapsulation & Properties',
        icon: '🛡️',
        content: `
**Encapsulation** protects an object's internal state. Instead of directly modifying variables, you should use getters and setters.

Python doesn't have strict \`private\` keywords. Instead, we use:
- \`_variable\` (Single underscore): A gentleman's agreement meaning "protected, please don't touch".
- \`__variable\` (Double underscore): Triggers Name Mangling, making it harder to access from outside.

We use the \`@property\` decorator to create elegant getters/setters without breaking the API.
`,
        example: `\`\`\`python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance # Name mangled

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, amount):
        if amount < 0:
            raise ValueError("Balance cannot be negative!")
        self.__balance = amount

acc = BankAccount(100)
print(acc.balance) # 100 (Calls getter)
acc.balance = 200  # (Calls setter)
# acc.balance = -50 # Raises ValueError
\`\`\`
`,
        doubt: "Can I completely hide a variable from a hacker in Python using `__`?",
        solution: "No! Python's `__` is meant to prevent accidental overwriting by subclasses, not for strict security. A user can still access it by using the mangled name: `acc._BankAccount__balance`. Python assumes we are all consenting adults; it relies on conventions rather than strict enforcement."
    },
    {
        id: 'methods',
        title: 'Instance, Static & Class Methods',
        icon: '⚙️',
        content: `
Classes have three distinct types of methods:
1. **Instance Methods**: Take \`self\`. Used to modify/access object state.
2. **Class Methods**: Take \`cls\`. Decorated with \`@classmethod\`. Used to modify class state or create Alternative Constructors.
3. **Static Methods**: Take neither. Decorated with \`@staticmethod\`. Used for utility functions that belong in the class namespace but don't need access to class/instance data.
`,
        example: `\`\`\`python
from datetime import date

class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # Instance Method
    def get_info(self):
        return f"{self.name} is {self.age}"

    # Class Method (Alternative Constructor)
    @classmethod
    def from_birth_year(cls, name, birth_year):
        current_year = date.today().year
        return cls(name, current_year - birth_year)

    # Static Method
    @staticmethod
    def is_adult(age):
        return age >= 18

u = User.from_birth_year("Alice", 1995)
print(u.get_info())
print(User.is_adult(u.age))
\`\`\`
`,
        doubt: "Why use `@classmethod` as an Alternative Constructor instead of just doing logic in `__init__`?",
        solution: "If you put complex logic in `__init__` to handle different types of inputs (like parsing a string, calculating an age, or loading from JSON), your `__init__` becomes a massive, unreadable `if/elif` block. Class methods keep `__init__` clean and provide clear, named ways to instantiate objects."
    },
    {
        id: 'dunder',
        title: 'Magic / Dunder Methods',
        icon: '✨',
        content: `
"Double Underscore" (Dunder) methods hook your custom objects into Python's built-in syntax. By defining them, you can make your objects behave like native Python types!
`,
        example: `\`\`\`python
class Cart:
    def __init__(self):
        self.items = []

    def __add__(self, item):
        self.items.append(item)
        return self

    def __len__(self):
        return len(self.items)

    def __str__(self):
        return f"Cart with {len(self)} items"

my_cart = Cart()
my_cart + "Apple" + "Banana"  # Using __add__
print(len(my_cart))           # Using __len__ -> 2
print(my_cart)                # Using __str__ -> Cart with 2 items
\`\`\`
`,
        doubt: "What is the difference between `__str__` and `__repr__`?",
        solution: "`__str__` is for the END USER. It should return a readable, pretty string. `__repr__` is for the DEVELOPER. It should return a string that represents the object exactly as it was created (ideally, a string you could copy-paste into code to recreate the object). If you only write one, write `__repr__`, as Python falls back to it if `__str__` is missing."
    }
];

const PythonOOP = () => {
    const [activeId, setActiveId] = useState(oopConcepts[0].id);
    const activeConcept = oopConcepts.find(c => c.id === activeId);

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
                <h1 style={styles.title}>Object-Oriented Programming</h1>
                <p style={styles.subtitle}>Mastering classes, inheritance, and the pythonic way of OOP.</p>
            </div>

            <div style={styles.layout}>
                {/* Sidebar */}
                <div style={styles.sidebar}>
                    <h3 style={styles.sidebarTitle}>Modules</h3>
                    {oopConcepts.map(concept => (
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

                {/* Content Area */}
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

// Premium Light Theme Styles
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

export default PythonOOP;
