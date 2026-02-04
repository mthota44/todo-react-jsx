import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// ==========================================
// 1. Basic React Hook Form Demo
// ==========================================
// Concept:
// React Hook Form embraces uncontrolled components and native HTML inputs.
// It registers inputs into a custom hook (useForm) which manages the form state.
// This reduces the need for re-renders that happen with controlled components (useState for every keypress).
const BasicHookForm = () => {
    // useForm hook returns methods to handle form events and state
    // register: function to register an input
    // handleSubmit: function to handle form submission
    // formState: object containing form state (errors, isSubmitting, etc.)
    const { register, handleSubmit, watch } = useForm();

    // Watch specific input values to show them in real-time (optional, causes re-render for subscribed fields)
    const watchedName = watch("fullName");

    const onSubmit = (data) => {
        console.log("Basic Form Data:", data);
        alert(JSON.stringify(data));
    };

    return (
        <div style={sectionStyle}>
            <h3>1. Basic React Hook Form</h3>
            <p>Simple registration of inputs without external libraries.</p>

            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                <div style={fieldStyle}>
                    <label>Full Name:</label>
                    {/* The "register" function returns props like onChange, onBlur, name, ref */}
                    <input {...register("fullName")} style={inputStyle} placeholder="Type your name" />
                </div>

                <div style={fieldStyle}>
                    <label>Email:</label>
                    <input type="email" {...register("email")} style={inputStyle} placeholder="Type email" />
                </div>

                <button type="submit" style={buttonStyle}>Submit</button>
            </form>

            <div style={{ marginTop: '10px', fontSize: '12px', color: '#555' }}>
                <strong>Real-time Watch:</strong> {watchedName}
            </div>
        </div>
    );
};


// ==========================================
// 2. React Hook Form with Built-in Validations
// ==========================================
// Concept:
// React Hook Form allows you to pass validation rules directly into the register function.
// Supported rules: required, min, max, minLength, maxLength, pattern, validate.
// This keeps validation logic collocated with the input definition.
const HookFormValidation = () => {
    const {
        register,
        handleSubmit,
        formState: { errors } // We extract "errors" to display validation messages
    } = useForm();

    const onSubmit = (data) => {
        console.log("Validated Form Data:", data);
        alert("Form Valid! " + JSON.stringify(data));
    };

    return (
        <div style={sectionStyle}>
            <h3>2. React Hook Form Validations</h3>
            <p>Using built-in validation rules passed to `register`.</p>

            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                <div style={fieldStyle}>
                    <label>Username (Required, Min 4 chars):</label>
                    <input
                        {...register("username", {
                            required: "Username is required",
                            minLength: {
                                value: 4,
                                message: "Must be at least 4 characters"
                            }
                        })}
                        style={inputStyle}
                    />
                    {/* Display error message if validation fails */}
                    {errors.username && <span style={errorStyle}>{errors.username.message}</span>}
                </div>

                <div style={fieldStyle}>
                    <label>Age (18-99):</label>
                    <input
                        type="number"
                        {...register("age", {
                            required: "Age is required",
                            min: { value: 18, message: "Must be at least 18" },
                            max: { value: 99, message: "Must be under 99" }
                        })}
                        style={inputStyle}
                    />
                    {errors.age && <span style={errorStyle}>{errors.age.message}</span>}
                </div>

                <button type="submit" style={buttonStyle}>Submit</button>
            </form>
        </div>
    );
};


// ==========================================
// 3. React Hook Form with Zod Validation
// ==========================================
// Concept:
// Zod is a schema declaration and validation library.
// Instead of defining rules in the UI (JSX), we define a "schema" object.
// We use `zodResolver` to connect this schema to React Hook Form.
//
// Benefits:
// 1. Separation of concerns: Validation logic is strictly separated from UI.
// 2. Reusability: The schema can be used elsewhere (e.g., backend) if using Node.js.
// 3. Complex validations: Easier to handle interdependent fields (e.g. confirm password).

// Define Zod Schema
const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
});

const ZodValidationDemo = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(signUpSchema) // Integrate Zod schema here
    });

    const onSubmit = (data) => {
        console.log("Zod Validated Data:", data);
        alert("Zod Validation Passed!");
    };

    return (
        <div style={sectionStyle}>
            <h3>3. Zod Validations (Schema Based)</h3>
            <p>Using Zod schema for cleaner, reusable validation logic.</p>

            <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
                <div style={fieldStyle}>
                    <label>Email:</label>
                    <input {...register("email")} style={inputStyle} />
                    {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
                </div>

                <div style={fieldStyle}>
                    <label>Password:</label>
                    <input type="password" {...register("password")} style={inputStyle} />
                    {errors.password && <span style={errorStyle}>{errors.password.message}</span>}
                </div>

                <div style={fieldStyle}>
                    <label>Confirm Password:</label>
                    <input type="password" {...register("confirmPassword")} style={inputStyle} />
                    {errors.confirmPassword && <span style={errorStyle}>{errors.confirmPassword.message}</span>}
                </div>

                <button type="submit" style={buttonStyle}>Register (Zod)</button>
            </form>
        </div>
    );
};

// ==========================================
// Main Container
// ==========================================
const ReactHookFormDemo = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>React Hook Form & Zod Demo</h2>
            <p>
                This demo displays three approaches to form handling in React.
                <br />
                We move from basic usage to inline validation, and finally to schema-based validation with Zod.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <BasicHookForm />
                <HookFormValidation />
                <ZodValidationDemo />
            </div>
        </div>
    );
};

// ==========================================
// Styles (No CSS file used)
// ==========================================
const sectionStyle = {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    maxWidth: '500px'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '15px'
};

const fieldStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
};

const inputStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px'
};

const buttonStyle = {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
};

const errorStyle = {
    color: 'red',
    fontSize: '12px'
};

export default ReactHookFormDemo;
