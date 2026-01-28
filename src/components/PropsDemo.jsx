import React from 'react';

/* 
  =====================================================================
  MODULE 2: PROPS (Detailed Demo)
  =====================================================================
  
  What are Props?
  - Props (short for "Properties") are inputs to components.
  - They allow data to flow from a Parent component down to a Child component.
  - They are read-only (immutable).
*/

// 1. BASIC PROPS (Primitives)
// This child receives simple data like Strings, Numbers, and Booleans.
const ProfileCard = (props) => {
    // Concept: Conditional Rendering using Boolean Props
    // If 'isOnline' is true, we show "Online", otherwise "Offline"
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>User Profile (Primitives)</h3>
            <p><strong>Name:</strong> {props.name} (String)</p>
            <p><strong>Age:</strong> {props.age} (Number)</p>
            <p><strong>Status:</strong> {props.isOnline ? "✅ Online" : "❌ Offline"} (Boolean)</p>
        </div>
    );
};

// 2. OBJECT & ARRAY PROPS
// We can pass complex data structures like Objects and Arrays.
const ProductList = (props) => {
    // Concept: Destructuring Props
    // Instead of using 'props.config', we extract it directly.
    const { config, items } = props;

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{config.title} (Object & Array)</h3>
            <p>Theme: {config.theme}</p>

            <h4>Items List:</h4>
            <ul>
                {/* Concept: Rendering Lists from Array Props */}
                {items.map((item, index) => (
                    <li key={index}>{index}<b>:</b>{item}</li>
                ))}
            </ul>
        </div>
    );
};

// 3. FUNCTION PROPS (Event Handling)
// Parent passes a function to the Child. The Child calls it to "send data back".
const ActionButton = (props) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>Interaction (Function Prop)</h3>
            <p>Click the button to talk to the Parent:</p>
            {/* When clicked, we call the function passed by the Parent */}
            <button onClick={props.onClickAction}>
                {props.btnLabel}
            </button>
        </div>
    );
};

// 4. CHILDREN PROP
// A special prop that lets you pass elements *inside* the opening and closing tags of a component.
const CardWrapper = (props) => {
    return (
        <div style={{
            backgroundColor: '#f0f0f0',
            padding: '20px',
            border: '2px dashed #999',
            margin: '10px 0'
        }}>
            <h3>I am a Wrapper Component (Children Prop)</h3>
            <p>Whatever you put inside me will appear below:</p>
            {/* 'props.children' renders whatever is inside <CardWrapper>...</CardWrapper> */}
            <div style={{ background: 'white', padding: '10px' }}>
                {props.children}
            </div>
        </div>
    );
};

// ===================================
// PARENT COMPONENT (Main Page)
// ===================================
const PropsDemo = () => {

    // Data for Object/Array Demo
    const listConfig = { title: "My Shopping List", theme: "Dark" };
    const groceryItems = ["Apples", "Bananas", "Milk", "Bread"];

    // Function to handle child events
    const handleChildClick = () => {
        alert("Parent received the click event from the Child!");
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>All Types of Props Demo</h1>

            {/* 1. Passing Primitives */}
            <ProfileCard
                name="Alice"
                age={25}
                isOnline={true}
            />
            <ProfileCard
                name="Bob"
                age={30}
                isOnline={false}
            />

            {/* 2. Passing Objects and Arrays */}
            <ProductList
                config={listConfig}
                items={groceryItems}
            />

            {/* 3. Passing Functions */}
            <ActionButton
                btnLabel="Click Me!"
                onClickAction={handleChildClick}
            />

            {/* 4. Passing Children */}
            <CardWrapper>
                <p><strong>This is passed as a child!</strong></p>
                <p>It helps in creating reusable layouts.</p>
                <button>Internal Button</button>
            </CardWrapper>

        </div>
    );
};

export default PropsDemo;
