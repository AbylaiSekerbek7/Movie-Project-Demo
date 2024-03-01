import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
    );
    
    const toggleTheme = () => {
        setTheme(theme == "dark" ? "light" : "dark");
        localStorage.setItem("theme", theme == "dark" ? "light" : "dark");
    }
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("Context not found");
    }
    return context;
};

export { ThemeProvider, useTheme };