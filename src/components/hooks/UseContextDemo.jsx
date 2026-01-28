import React, { useContext } from 'react';

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
        <div style={{ padding: '20px' }}>
            <h1>useContext - Real World Cases</h1>
            <p style={{ marginBottom: '20px' }}>
                This demo combines 3 separate contexts:
                <strong> Auth, Language, and Cart.</strong>
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
