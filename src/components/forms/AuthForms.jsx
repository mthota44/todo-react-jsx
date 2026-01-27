import React, { useState } from 'react';

/*
  =====================================================================
  MODULE 3: FORMS (Controlled Components & Validation)
  =====================================================================
  
  Concepts:
  1. Controlled Components: React state allows the value of the input.
     - Value is set from state.
     - Updates happen via onChange handlers.
  2. Validation: Checking data before submission.
*/

const AuthForms = () => {
    // State to toggle between Login and Signup
    const [isSignup, setIsSignup] = useState(false);

    // Single State object for all inputs (Scalable approach)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });

    // State for Errors
    const [errors, setErrors] = useState({});

    // ----------------------------------------------------
    // HANDLE INPUT CHANGE
    // ----------------------------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update state
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // ----------------------------------------------------
    // VALIDATION LOGIC
    // ----------------------------------------------------
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Email Validation (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Invalid email format";
            isValid = false;
        }

        // Password Validation
        if (!formData.password) {
            tempErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            tempErrors.password = "Password must be at least 6 chars";
            isValid = false;
        }

        // Signup Specific Validation
        if (isSignup) {
            if (!formData.username) {
                tempErrors.username = "Username is required";
                isValid = false;
            }
            if (formData.password !== formData.confirmPassword) {
                tempErrors.confirmPassword = "Passwords do not match";
                isValid = false;
            }
        }

        setErrors(tempErrors);
        return isValid;
    };

    // ----------------------------------------------------
    // SUBMIT HANDLER
    // ----------------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        if (validate()) {
            console.log("Form Payload Submitted:", formData);
            alert(`Success! Check the console for the payload.\nType: ${isSignup ? 'Sign Up' : 'Login'}`);
            // Here you would typically send 'formData' to your backend API
        } else {
            console.log("Validation Failed");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', border: '1px solid #ccc', margin: '20px' }}>
            <h2>{isSignup ? 'Create Account' : 'Sign In'}</h2>

            <form onSubmit={handleSubmit}>
                {/* Username Field (Only for Signup) */}
                {isSignup && (
                    <div style={{ marginBottom: '10px' }}>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', display: 'block' }}
                        />
                        {errors.username && <span style={{ color: 'red', fontSize: '12px' }}>{errors.username}</span>}
                    </div>
                )}

                {/* Email Field */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', display: 'block' }}
                    />
                    {/* Display Error if exists */}
                    {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
                </div>

                {/* Password Field */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', display: 'block' }}
                    />
                    {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
                </div>

                {/* Confirm Password (Only for Signup) */}
                {isSignup && (
                    <div style={{ marginBottom: '10px' }}>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', display: 'block' }}
                        />
                        {errors.confirmPassword && <span style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword}</span>}
                    </div>
                )}

                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    {isSignup ? 'Sign Up' : 'Login'}
                </button>
            </form>

            <p style={{ marginTop: '15px', fontSize: '14px', textAlign: 'center' }}>
                {isSignup ? "Already have an account? " : "Don't have an account? "}
                <button
                    onClick={() => {
                        setIsSignup(!isSignup);
                        setErrors({}); // Clear errors when switching
                        setFormData({ email: '', password: '', confirmPassword: '', username: '' }); // Clear form
                    }}
                    style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    {isSignup ? "Login" : "Sign Up"}
                </button>
            </p>
        </div>
    );
};

export default AuthForms;
