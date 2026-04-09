import React, { useState } from 'react';

const VanillaJsStateProblem = () => {
    // Demonstration of React fixing the issue
    const [cartCount, setCartCount] = useState(0);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', lineHeight: '1.6', paddingBottom: '100px' }}>
            <h1 style={{ color: '#d32f2f', marginBottom: '5px' }}>Why is building Vanilla JS Apps so Painful?</h1>
            <p style={{ fontSize: '18px', marginTop: 0 }}>Why do we even need React? Why is tracking "State" in plain Vanilla JavaScript considered a completely unscalable nightmare for huge web apps?</p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '30px' }}>
                
                {/* Vanilla JS Card */}
                <div style={{ ...cardStyle, borderColor: '#ff9800', backgroundColor: '#fff3e0' }}>
                    <h3 style={{ color: '#e65100', marginTop: 0 }}>❌ The Vanilla JS Nightmare (Spaghetti DOM)</h3>
                    <p>In standard vanilla JavaScript, your <strong>Data</strong> (the memory) and your <strong>HTML</strong> (the pixels on the screen) have absolute zero automatic connection. They do not magically talk to each other.</p>
                    
                    <p>Imagine building an Amazon Shopping Cart. If the user clicks "Add to Cart", you explicitly have to write manual code to brutally hunt down every single visual piece of HTML and update it:</p>
                    
                    <div style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', padding: '15px', borderRadius: '5px', fontFamily: 'monospace', fontSize: '13px' }}>
                        <div><span style={{color: '#569cd6'}}>let</span> cartCount = <span style={{color: '#b5cea8'}}>1</span>;</div>
                        <br/>
                        <div><span style={{color: '#6a9955'}}>// You MUST manually hunt down and mutate every single HTML element individually:</span></div>
                        <div><span style={{color: '#4ec9b0'}}>document</span>.getElementById(<span style={{color: '#ce9178'}}>'header-cart-icon'</span>).innerText = cartCount;</div>
                        <div><span style={{color: '#4ec9b0'}}>document</span>.getElementById(<span style={{color: '#ce9178'}}>'sidebar-total'</span>).innerText = cartCount;</div>
                        <div><span style={{color: '#4ec9b0'}}>document</span>.getElementById(<span style={{color: '#ce9178'}}>'checkout-btn'</span>).disabled = <span style={{color: '#569cd6'}}>false</span>;</div>
                    </div>

                    <h4 style={{ color: '#d32f2f', marginBottom: '5px', marginTop: '20px' }}>The Severe Disadvantages:</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li style={{marginBottom: '10px'}}><strong>The "Out-of-Sync" Bug:</strong> If a junior developer adds a new "Mini Cart Popup" to the website next year, but forgets to write the exact 4th <code>document.getElementById</code> line needed to update it, your app's data becomes fatally out of sync. The database logic mathematically calculates a total of "$50", but the user's screen visually lies and displays "$0".</li>
                        <li style={{marginBottom: '10px'}}><strong>Spaghetti Code:</strong> Your Javascript files become massively bloated with thousands of lines of highly fragile code exclusively meant for hunting down HTML ID string selectors. It becomes an unreadable nightmare.</li>
                        <li><strong>Sluggish Performance:</strong> Manually commanding the browser to heavily redraw very specific HTML nodes via <code>innerHTML</code> logic is historically unoptimized and sluggish.</li>
                    </ul>
                </div>

                {/* React Fix Card */}
                <div style={{ ...cardStyle, borderColor: '#4caf50', backgroundColor: '#e8f5e9' }}>
                    <h3 style={{ color: '#2e7d32', marginTop: 0 }}>✅ The React Solution (State-Driven UI)</h3>
                    <p>React spectacularly eliminates this entire Vanilla JS nightmare using a strict fundamental philosophy: <strong>The User Interface is merely a direct mathematical reflection of the State.</strong></p>
                    
                    <p>In highly scalable React architecture, you absolutely never manually hunt for HTML elements. You literally just effortlessly update the raw Data variable, and React's Virtual Graphics Engine violently calculates and redraws the entire visible screen automatically to perfectly match the data.</p>

                    <div style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', padding: '15px', borderRadius: '5px', fontFamily: 'monospace', fontSize: '13px', marginBottom: '25px' }}>
                        <div><span style={{color: '#569cd6'}}>const</span> [cartCount, setCartCount] = useState(<span style={{color: '#b5cea8'}}>0</span>);</div>
                        <br/>
                        <div><span style={{color: '#6a9955'}}>// This single elegant line of code magically commands React to update the Header, the Sidebar, AND the Checkout Button simultaneously!</span></div>
                        <div>setCartCount(cartCount + <span style={{color: '#b5cea8'}}>1</span>);</div>
                    </div>

                    <div style={{ padding: '15px', border: '2px dashed #4caf50', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <h4 style={{ marginTop: 0, color: '#388e3c' }}>Live React Demo (Look at everything perfectly sync!):</h4>
                        <p style={{ margin: '5px 0' }}>Actual Global Data State: <strong>{cartCount}</strong></p>
                        
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                            <div style={{ padding: '10px 15px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                                Header Nav: 🛒 {cartCount}
                            </div>
                            <div style={{ padding: '10px 15px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold' }}>
                                Sidebar Total: {cartCount}
                            </div>
                            <button 
                                onClick={() => setCartCount(c => c + 1)}
                                style={{ backgroundColor: '#1976d2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 2px 5px rgba(25,118,210,0.4)' }}
                            >
                                Add to Cart +
                            </button>
                        </div>
                        <p style={{ fontSize: '12px', color: '#666', marginTop: '15px', marginBottom: 0, fontStyle: 'italic' }}>* Notice how ALL independent visual components update flawlessly with just 1 data change, and zero HTML manipulation code.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

const cardStyle = {
    flex: '1',
    minWidth: '400px',
    border: '2px solid',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
};

export default VanillaJsStateProblem;
