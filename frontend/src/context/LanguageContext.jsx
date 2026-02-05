import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // State: "en" for English, "es" for Spanish
    const [language, setLanguage] = useState('en');

    // Simple dictionary for demo
    const translations = {
        en: {
            greeting: "Hello, Visitor!",
            message: "Welcome to our application."
        },
        es: {
            greeting: "¡Hola, Visitante!",
            message: "Bienvenido a nuestra aplicación."
        }
    };

    const switchLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};
