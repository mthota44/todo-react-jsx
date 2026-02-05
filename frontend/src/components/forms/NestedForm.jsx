import React, { useState } from 'react';

/*
  =====================================================================
  NESTED FORMS & DYNAMIC DATA
  =====================================================================
  
  Concept: 
  - Managing state for nested objects (e.g., user.address.city).
  - Updating state immutably for nested levels.
*/

const NestedForm = () => {
    const [userProfile, setUserProfile] = useState({
        fullName: '',
        contact: '',
        address: {
            street: '',
            city: '',
            zipCode: ''
        },
        preferences: {
            newsletter: false,
            smsAlerts: false
        }
    });

    // ----------------------------------------------------
    // GENERIC HANDLER FOR NESTED STATE
    // ----------------------------------------------------
    const handleNestedChange = (e, section) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;

        setUserProfile(prev => ({
            ...prev, // Copy top level
            [section]: {
                ...prev[section], // Copy specific section (e.g., address)
                [name]: finalValue // Update specific field
            }
        }));
    };

    const handleBasicChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nested Form Payload:", userProfile);
        alert("Formatted Payload logged to console.");
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', border: '1px solid #ccc', margin: '20px' }}>
            <h2>User Profile (Nested Data)</h2>
            <form onSubmit={handleSubmit}>

                {/* ROOT LEVEL FIELDS */}
                <h3>Basic Info</h3>
                <div style={fieldStyle}>
                    <label>Full Name:</label>
                    <input name="fullName" value={userProfile.fullName} onChange={handleBasicChange} />
                </div>
                <div style={fieldStyle}>
                    <label>Contact:</label>
                    <input name="contact" value={userProfile.contact} onChange={handleBasicChange} />
                </div>

                {/* NESTED LEVEL 1: ADDRESS */}
                <h3>Address (Nested Object)</h3>
                <div style={fieldStyle}>
                    <label>Street:</label>
                    <input
                        name="street"
                        value={userProfile.address.street}
                        onChange={(e) => handleNestedChange(e, 'address')}
                    />
                </div>
                <div style={fieldStyle}>
                    <label>City:</label>
                    <input
                        name="city"
                        value={userProfile.address.city}
                        onChange={(e) => handleNestedChange(e, 'address')}
                    />
                </div>
                <div style={fieldStyle}>
                    <label>Zip Code:</label>
                    <input
                        name="zipCode"
                        value={userProfile.address.zipCode}
                        onChange={(e) => handleNestedChange(e, 'address')}
                    />
                </div>

                {/* NESTED LEVEL 2: PREFERENCES (Checkboxes) */}
                <h3>Preferences</h3>
                <div style={fieldStyle}>
                    <label>
                        <input
                            type="checkbox"
                            name="newsletter"
                            checked={userProfile.preferences.newsletter}
                            onChange={(e) => handleNestedChange(e, 'preferences')}
                        />
                        Subscribe to Newsletter
                    </label>
                </div>
                <div style={fieldStyle}>
                    <label>
                        <input
                            type="checkbox"
                            name="smsAlerts"
                            checked={userProfile.preferences.smsAlerts}
                            onChange={(e) => handleNestedChange(e, 'preferences')}
                        />
                        Receive SMS Alerts
                    </label>
                </div>

                <button type="submit" style={{ marginTop: '20px', padding: '10px' }}>Save Profile</button>
            </form>

            {/* Debug View */}
            <pre style={{ background: '#f4f4f4', padding: '10px', marginTop: '20px', fontSize: '12px' }}>
                {JSON.stringify(userProfile, null, 2)}
            </pre>
        </div>
    );
};

const fieldStyle = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column'
};

export default NestedForm;
