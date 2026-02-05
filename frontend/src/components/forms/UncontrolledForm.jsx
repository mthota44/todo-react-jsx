import React, { useRef } from 'react';

/*
  =====================================================================
  UNCONTROLLED FORM (useRef)
  =====================================================================
  
  Concept:
  - The DOM handles the form data, not React state.
  - We use Refs to pull values from the DOM when needed (e.g., on submit).
  - Good for simple forms or integrating with non-React libraries.
*/

const UncontrolledForm = () => {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Access values directly from the DOM nodes
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value
        };

        console.log("Uncontrolled Form Payload:", payload);
        alert("Payload captured using Refs (Uncontrolled). Check Console.");
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', border: '1px solid #ccc', margin: '20px' }}>
            <h2>Uncontrolled Form (useRef)</h2>
            <p>Type in the fields. No re-renders happen while typing!</p>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Name:</label>
                    <input type="text" ref={nameRef} style={{ display: 'block', width: '100%', padding: '5px' }} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input type="email" ref={emailRef} style={{ display: 'block', width: '100%', padding: '5px' }} />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UncontrolledForm;
