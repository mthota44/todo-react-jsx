import React, { useContext, useState } from 'react';

// Import All Contexts and Providers
import { GlobalProvider, GlobalContext } from '../../context/GlobalStateContext'; // Auth
import { LanguageProvider, LanguageContext } from '../../context/LanguageContext'; // I18n
import { CartProvider, CartContext } from '../../context/CartContext';             // Cart

/*
  =====================================================================
  COMPLEX SCENARIO: MULTIPLE CONTEXTS
  =====================================================================
  
  We will demonstrate 3 common "Cases" for useContext:
  1. USER AUTH (Identity)
  2. LOCALIZATION (Configuration)
  3. SHOPPING CART (Data Management)
*/

// ==========================================
// YOUTUBE REFERENCE: THEME CONTEXT (WDS)
// ==========================================
export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(true);

    const toggleTheme = () => {
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    };

    return (
        <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const FunctionContextComponent = () => {
    const { darkTheme, toggleTheme } = useContext(ThemeContext);
    
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#CCC',
        color: darkTheme ? '#CCC' : '#333',
        padding: '2rem',
        margin: '1rem 0',
        borderRadius: '8px',
        textAlign: 'center',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
    };

    return (
        <div style={{ ...styles.card, border: '2px solid #007bff' }}>
            <h3 style={{ color: '#007bff', marginTop: 0 }}>📺 YouTube Ref Lab</h3>
            <p style={{ fontSize: '12px', margin: '0 0 10px 0', color: '#666' }}>WDS Global Theme Context</p>
            <button onClick={toggleTheme} style={{ width: '100%' }}>Toggle Theme</button>
            <div style={themeStyles}>
                Function Theme Component
            </div>
            <small style={{ display: 'block', lineHeight: '1.4', color: '#555' }}>
                This card uses <code>useContext</code> to literally grab the Dark/Light theme variable directly from the Radio Tower (Provider) completely bypassing props!
            </small>
        </div>
    );
};

// ==========================================
// CASE 1: Localization Component
// ==========================================
const LanguageSelector = () => {
    const { language, switchLanguage, t } = useContext(LanguageContext);

    return (
        <div style={styles.card}>
            <h3>Case 1: Localization</h3>
            <p><strong>Current Lang:</strong> {language.toUpperCase()}</p>
            <p>"{t.greeting}"</p>
            <p>"{t.message}"</p>

            <div style={{ marginTop: '10px' }}>
                <button onClick={() => switchLanguage('en')} disabled={language === 'en'}>English</button>
                <button onClick={() => switchLanguage('es')} disabled={language === 'es'}>Spanish</button>
            </div>
        </div>
    );
};

// ==========================================
// CASE 2: User Profile Component
// ==========================================
const UserProfile = () => {
    const { user, login, logout } = useContext(GlobalContext);

    return (
        <div style={styles.card}>
            <h3>Case 2: User Auth</h3>
            <p><strong>User:</strong> {user.name}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong> {user.isLoggedIn ? "✅ Logged In" : "❌ Guest"}</p>

            <div style={{ marginTop: '10px' }}>
                {user.isLoggedIn ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <button onClick={() => login("Alice_Admin")}>Login</button>
                )}
            </div>
        </div>
    );
};

// ==========================================
// CASE 3: Shopping Cart Component
// ==========================================
const ShoppingCart = () => {
    const { cart, addToCart, removeFromCart, totalPrice } = useContext(CartContext);

    const products = [
        { name: "Laptop", price: 1000 },
        { name: "Mouse", price: 50 },
    ];

    return (
        <div style={styles.card}>
            <h3>Case 3: Shopping Cart</h3>
            <p>Items in Cart: <strong>{cart.length}</strong></p>

            {/* List Products */}
            <div style={{ marginBottom: '10px', padding: '5px', background: '#eee' }}>
                <small>Available Products:</small><br />
                {products.map((p, i) => (
                    <button key={i} onClick={() => addToCart(p)} style={{ marginRight: '5px' }}>
                        + Add {p.name} (${p.price})
                    </button>
                ))}
            </div>

            {/* List Cart */}
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price}
                        <button onClick={() => removeFromCart(index)} style={{ marginLeft: '10px', color: 'red' }}>x</button>
                    </li>
                ))}
            </ul>

            <p><strong>Total: ${totalPrice}</strong></p>
        </div>
    );
};


// ==========================================
// MAIN PARENT COMPONENT
// ==========================================
const UseContextDemo = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', paddingBottom: '100px' }}>
            <h1 style={{ marginBottom: '5px' }}>useContext: Visual Lab</h1>
            
            <div style={{ backgroundColor: '#e8f5e9', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #4caf50', marginBottom: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', maxWidth: '900px' }}>
                <h2 style={{ marginTop: 0, color: '#2e7d32' }}>Wait... What actually IS "useContext"?</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.5' }}><strong>Think of useContext as a "Global Radio Broadcast System".</strong></p>
                <p style={{ lineHeight: '1.5', margin: '0 0 15px 0' }}>Normally in React, if a component at the very top of your app has data (like User Login Info), and a tiny component at the very bottom needs it, you have to do <strong>Prop Drilling</strong>.<br/>This is like taking a physical envelope and manually handing it down a chain of 10 different people until it finally reaches the bottom. It's annoying, exhausting, and pollutes your whole app.</p>
                <p style={{ lineHeight: '1.5', margin: 0 }}><strong>useContext</strong> fixes this instantly. It allows you to build a giant Radio Tower at the top of your app (The <code>&lt;Provider&gt;</code>). Once built, ANY component, anywhere deep in the basement of your app, can simply grab a literal walkie-talkie (<code>useContext()</code>) and tune into the live broadcast to instantly download the global data, totally bypassing everyone in the middle!</p>
            </div>

            <p style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                This live demo combines 3 entirely separate Global Radio Broadcasts:
            </p>

            {/* 
               NESTED PROVIDERS:
               Just like wrapping a gift, we wrap the app layers.
               Order usually doesn't matter unless they depend on each other.
            */}
            <GlobalProvider>      {/* Layer 1: Auth */}
                <LanguageProvider>  {/* Layer 2: Language */}
                    <CartProvider>    {/* Layer 3: Cart */}

                        <div style={styles.grid}>
                            {/* NEW: Web Dev Simplified Lab Card */}
                            <ThemeProvider>
                                <FunctionContextComponent />
                            </ThemeProvider>

                            <UserProfile />
                            <LanguageSelector />
                            <ShoppingCart />
                        </div>

                    </CartProvider>
                </LanguageProvider>
            </GlobalProvider>
        </div>
    );
};

const styles = {
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px'
    },
    card: {
        border: '1px solid #333',
        padding: '20px',
        width: '300px',
        borderRadius: '8px',
        backgroundColor: '#fff'
    }
};

export default UseContextDemo;
