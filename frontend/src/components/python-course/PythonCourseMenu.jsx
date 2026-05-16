import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PythonCourseMenu = () => {
    const navigate = useNavigate();

    const modules = [
        {
            title: 'Foundations & Core',
            items: [
                { name: 'Basics & Data Structures', path: '/python-course/basics', done: true, icon: '🧱' },
                { name: 'Functions Deep Dive', path: '/python-course/functions', done: true, icon: '🛠️' },
                { name: 'Modules & Environments', path: '/python-course/modules', done: true, icon: '📦' }
            ]
        },
        {
            title: 'Advanced Paradigms 🔥',
            items: [
                { name: 'Object-Oriented Programming', path: '/python-course/oop', icon: '🧊', desc: 'Classes, Inheritance, Dunder Methods & Polymorphism' },
                { name: 'Advanced Python', path: '/python-course/advanced', icon: '🚀', desc: 'Comprehensions, Generators, Decorators & Context Managers' },
                { name: 'FastAPI Deeply', path: '/python-course/fastapi', icon: '⚡', desc: 'Pydantic, Dependency Injection, SQLAlchemy' },
                { name: 'Async & Concurrency', path: '/python-course/async', icon: '⏱️', desc: 'AsyncIO, Threading, GIL & Event Loops' }
            ]
        },
        {
            title: 'Professional Practices',
            items: [
                { name: 'Testing (Pytest & Mocking)', icon: '🧪', desc: 'Unit testing, fixtures, and mocking APIs' },
                { name: 'Important Built-ins', icon: '🔧', desc: 'map, filter, reduce, zip, enumerate' }
            ]
        }
    ];

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.logoBadge}>🐍</div>
                <h1 style={styles.title}>Python Developer Masterclass</h1>
                <p style={styles.subtitle}>From core mechanics to advanced backend architecture. Master the language.</p>
            </header>

            <div style={styles.roadmapGrid}>
                {modules.map((mod, idx) => (
                    <div key={idx} style={styles.section}>
                        <h2 style={styles.sectionTitle}>{mod.title}</h2>
                        <div style={styles.cardContainer}>
                            {mod.items.map((item, i) => (
                                <div 
                                    key={i} 
                                    style={{
                                        ...styles.card, 
                                        ...(item.done ? styles.cardDone : {}),
                                        ...(item.path && !item.done ? styles.cardActive : {}),
                                        ...(!item.path && !item.done ? styles.cardUpcoming : {})
                                    }}
                                    onClick={() => item.path && navigate(item.path)}
                                >
                                    <div style={styles.cardHeader}>
                                        <div style={styles.iconWrapper}>
                                            <span style={styles.icon}>{item.done ? '✅' : (item.icon || '🔒')}</span>
                                        </div>
                                        <h3 style={styles.cardTitle}>{item.name}</h3>
                                    </div>
                                    {item.desc && <p style={styles.cardDesc}>{item.desc}</p>}
                                    {item.path && (
                                        <div style={styles.actionRow}>
                                            <span style={{
                                                ...styles.actionText,
                                                color: item.done ? '#059669' : '#4f46e5'
                                            }}>
                                                {item.done ? 'Review Module →' : 'Start Module →'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 50%, #f3e8ff 100%)',
        color: '#1e293b',
        fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
        padding: '60px 20px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '60px',
    },
    logoBadge: {
        fontSize: '4.5rem',
        marginBottom: '10px',
        animation: 'bounce 3s ease-in-out infinite',
        filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: '900',
        margin: '0 0 15px 0',
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-1px',
    },
    subtitle: {
        fontSize: '1.25rem',
        color: '#475569',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6',
        fontWeight: '500',
    },
    roadmapGrid: {
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px',
    },
    section: {
        // Transparent container for sections
    },
    sectionTitle: {
        fontSize: '1.8rem',
        marginBottom: '25px',
        color: '#0f172a',
        fontWeight: '800',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
    },
    card: {
        padding: '28px',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
    },
    cardDone: {
        borderLeft: '5px solid #10b981',
        background: 'linear-gradient(to right, #f0fdf4, #ffffff)',
    },
    cardActive: {
        borderLeft: '5px solid #6366f1',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
    },
    cardUpcoming: {
        background: '#f8fafc',
        opacity: 0.7,
        cursor: 'not-allowed',
        borderStyle: 'dashed',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '15px',
    },
    iconWrapper: {
        width: '45px',
        height: '45px',
        borderRadius: '12px',
        background: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
    },
    cardTitle: {
        margin: 0,
        fontSize: '1.3rem',
        fontWeight: '700',
        color: '#1e293b',
    },
    cardDesc: {
        margin: '0 0 20px 0',
        fontSize: '0.95rem',
        color: '#64748b',
        lineHeight: '1.5',
    },
    actionRow: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'flex-start',
        borderTop: '1px solid #f1f5f9',
        paddingTop: '15px',
    },
    actionText: {
        fontSize: '0.95rem',
        fontWeight: '700',
    }
};

// CSS Injection for hover effects and animations
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }
        .roadmap-card-hover:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(styleSheet);
}

export default PythonCourseMenu;
