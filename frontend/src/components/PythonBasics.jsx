import React, { useState } from 'react';

const pythonQA = [
    {
        id: 1,
        question: "Why do we use ''.join(list_of_strings) instead of using a for loop with +=?",
        answer: `
      In Python, strings are **immutable**. This means every time you use \`+=\` to append to a string, Python has to:
      1. Allocate new memory for the combined string.
      2. Copy the old string contents.
      3. Copy the new string contents.
      
      If you do this in a loop of size *N*, it results in a time complexity of **O(N²)**.
      
      On the other hand, \`''.join(list)\` calculates the total size needed first, allocates memory **once**, and copies all strings into place. This is an **O(N)** operation, which is significantly faster and more memory-efficient for a large number of strings.
    `
    },
    {
        id: 2,
        question: "What is a 'Stop-the-World' event in Python's Garbage Collection?",
        answer: `
      Python primarily uses **Reference Counting** for memory management, which is instant. However, reference counting cannot handle **reference cycles** (e.g., Object A -> Object B -> Object A).
      
      To solve this, Python has a Generational Garbage Collector. Occasionally, this GC needs to scan memory to find and break these cycles. When it runs, it must **pause the entire application** to ensure the object graph doesn't change while it's being inspected. This pause is the **"Stop-the-World"** event.
      
      *Real-world tip*: In latency-critical applications (like high-frequency trading), you might disable automatic GC (\`gc.disable()\`) and run it manually (\`gc.collect()\`) during idle times to avoid unpredictable pauses.
    `
    },
    {
        id: 3,
        question: "Why is a file object an iterator, and what is 'Buffered I/O'?",
        answer: `
      When you write \`for line in file:\`, Python doesn't load the whole file into memory. Instead, the file object acts as an **iterator**, yielding one line at a time.
      
      This is backed by **Buffered I/O**. Python reads a large chunk of data (a "buffer") from the disk at once (because disk access is slow) and stores it in memory. As you ask for lines, Python gives them to you from this buffer. When the buffer is empty, it fetches another chunk.
      
      This minimizes expensive system calls and disk seeks, making file reading extremely efficient even for multi-gigabyte files.
    `
    },
    {
        id: 4,
        question: "Why is `is` different from `==`, and what is small integer caching?",
        answer: `
      \`==\` checks for **value equality** (do they look the same?), while \`is\` checks for **reference identity** (are they the exact same object in memory?).
      
      *Edge Case*: Python caches small integers (typically -5 to 256) and interns some short strings.
      \`\`\`python
      a = 256
      b = 256
      a is b  # True (Cached)
      
      x = 257
      y = 257
      x is y  # False (New objects created)
      \r\`\`\`
      Never use \`is\` preventing value comparisons, specifically with integers/strings outside the cached range.
    `
    },
    {
        id: 5,
        question: "Explain the 'Default Mutable Argument' trap.",
        answer: `
      Understanding how functions are defined is crucial. Default arguments are evaluated **only once** when the function is defined, not every time it's called.
      
      \`\`\`python
      def append_to(num, target=[]):
          target.append(num)
          return target
      
      print(append_to(1)) # [1]
      print(append_to(2)) # [1, 2] !!! Not [2]
      \`\`\`
      
      Since \`target\` refers to the *same* list object created at definition time, mutations persist.
      *Fix*: Use \`None\` as the default and assign the mutable object inside the function.
    `
    },
    {
        id: 6,
        question: "What is the Global Interpreter Lock (GIL) and how does it affect concurrency?",
        answer: `
      The **GIL** is a mutex that prevents multiple native threads from executing Python bytecodes at once. This means typically, **only one thread runs at a time**, even on multi-core processors.
      
      *Impact*: Python threads are great for **I/O-bound** tasks (waiting for network/disk) because the GIL is released while waiting. However, for **CPU-bound** tasks (number crunching), threading can actually slow down your program due to context switching overhead. Use \`multiprocessing\` to bypass the GIL for CPU-heavy work.
    `
    },
    {
        id: 7,
        question: "Why are Hash Collisions the 'Red Pill' of Python Dictionaries?",
        answer: `
      Dictionaries in Python are implemented as **Hash Maps**. They give us **O(1)** lookups because we can calculate exactly where an item is stored using its hash.

      **The Problem**: A "Hash Collision" happens when two *different* keys produce the *same* hash value (or index).
      
      **Python's Solution**: Unlike Java which uses Chaining (linked lists in buckets), Python uses **Open Addressing** with a probing strategy. If a slot is taken, it checks a pseudo-random sequence of other slots until it finds an empty one.
      
      **Why this matters**:
      1. **Keys must be Hashable**: A key's hash must never change during its lifetime. If it did, looking it up later would point to the wrong "address"! This is why mutable types like \`list\` cannot be keys.
      2. **Performance**: As the dictionary gets fuller (approx 2/3rds full), collisions increase, and Python automatically resizes the table to keep collisions low and speed high.
    `
    },
    {
        id: 8,
        question: "Why does the CPU cache love 'contiguous' memory?",
        answer: `
      **Spatial Locality**: CPUs don't read memory byte-by-byte; they fetch entire "cache lines" (typically 64 bytes) at a time.
      
      If your data is stored **contiguously** (side-by-side in RAM), fetching index \`i\` also sucks \`i+1, i+2...\` into the super-fast L1 cache for free.
      
      **Python Context**: 
      - A standard \`list\` stores **pointers** contiguously. The CPU can zoom through these pointers efficiently.
      - **The Catch**: The *actual objects* (Ints, Strings) are scattered randomly in the Heap. Jumping to them causes "Cache Misses."
      - **The Solution**: This is why **NumPy** arrays are 50x faster. They store raw data (e.g., C-type floats) contiguously in memory, allowing the CPU to process them without waiting for RAM and enabling SIMD (Single Instruction, Multiple Data) vectorization.
    `
    },
    {
        id: 9,
        question: "Why Tuples Win: Compactness & Cache Efficiency",
        answer: `
      **Compactness**: Because a Tuple doesn't have the "empty buffer slots" that a List has for future growth, the data is packed as tightly as possible. More data fits into a single **"Cache Line."**
      
      **No Indirection**: In a Tuple, the object itself is often more streamlined in memory.
      
      **Fixed Size**: The CPU doesn't have to worry about the structure resizing or moving while it's being processed.
      
      If you use a List, the CPU might grab a block of memory that is **40% "empty space"** (the extra buffer Python kept for \`.append()\`). With a Tuple, that block is **100% useful data**. This leads to fewer **"Cache Misses,"** which means your CPU spends less time waiting for the RAM to send more data.
    `
    }
];

import PythonPrograms from './PythonPrograms';

const PythonBasics = () => {
    const [view, setView] = useState('concepts'); // 'concepts' | 'programs'
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Python Mastery Hub</h1>
                <p style={styles.subtitle}>Advanced Concepts & Practical Programs</p>

                <div style={styles.viewToggle}>
                    <button
                        style={{ ...styles.toggleBtn, ...(view === 'concepts' ? styles.activeBtn : {}) }}
                        onClick={() => setView('concepts')}
                    >
                        Concepts
                    </button>
                    <button
                        style={{ ...styles.toggleBtn, ...(view === 'programs' ? styles.activeBtn : {}) }}
                        onClick={() => setView('programs')}
                    >
                        Top Programs
                    </button>
                </div>
            </header>

            {view === 'concepts' ? (
                <div style={styles.qaContainer}>
                    {pythonQA.map((item, index) => (
                        <div key={item.id} style={styles.card}>
                            <div
                                style={styles.questionHeader}
                                onClick={() => toggleAccordion(index)}
                            >
                                <h3 style={styles.questionText}>
                                    <span style={styles.icon}>{activeIndex === index ? '−' : '+'}</span>
                                    {item.question}
                                </h3>
                            </div>

                            <div style={{
                                ...styles.answerContainer,
                                maxHeight: activeIndex === index ? '1000px' : '0',
                                opacity: activeIndex === index ? 1 : 0,
                                padding: activeIndex === index ? '20px' : '0 20px',
                            }}>
                                <div style={styles.answerContent}>
                                    {item.answer.split('\n').map((line, i) => {
                                        // Simple parser for bold/code
                                        const parts = line.split(/(\*\*.*?\*\*|`.*?`)/).map((part, partIndex) => {
                                            if (part.startsWith('**') && part.endsWith('**')) {
                                                return <strong key={partIndex} style={{ color: '#61dafb' }}>{part.slice(2, -2)}</strong>;
                                            }
                                            if (part.startsWith('`') && part.endsWith('`')) {
                                                return <code key={partIndex} style={styles.inlineCode}>{part.slice(1, -1)}</code>;
                                            }
                                            return part;
                                        });
                                        return <p key={i} style={{ margin: '0.5em 0' }}>{parts}</p>;
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <PythonPrograms />
            )}
        </div>
    );
};

// Styles - Premium Glassmorphism Look
const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)',
        color: '#e0e0e0',
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        padding: '40px 20px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '50px',
    },
    title: {
        fontSize: '3rem',
        fontWeight: '700',
        background: 'linear-gradient(90deg, #ffd700, #ff8c00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '10px',
        letterSpacing: '1px',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#a0a0b0',
    },
    qaContainer: {
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    questionHeader: {
        padding: '24px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
        transition: 'background 0.3s ease',
    },
    questionText: {
        margin: 0,
        fontSize: '1.3rem',
        fontWeight: '500',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    icon: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#ffd700',
        fontSize: '1.5rem',
        lineHeight: '1',
    },
    answerContainer: {
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    answerContent: {
        fontSize: '1.05rem',
        lineHeight: '1.6',
        color: '#d1d1e0',
    },
    inlineCode: {
        background: 'rgba(0,0,0,0.3)',
        padding: '2px 6px',
        borderRadius: '4px',
        fontFamily: 'Consolas, monospace',
        color: '#ff79c6',
        fontSize: '0.95em',
    },
    viewToggle: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    toggleBtn: {
        background: 'transparent',
        border: '2px solid rgba(255,255,255,0.2)',
        color: 'rgba(255,255,255,0.6)',
        padding: '10px 25px',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
    },
    activeBtn: {
        color: '#fff',
        borderColor: '#ff8c00',
        background: 'rgba(255, 140, 0, 0.1)',
        boxShadow: '0 0 15px rgba(255, 140, 0, 0.3)',
    }
};

export default PythonBasics;
