import React, { createContext, useContext, useState, ReactNode,useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    const login = (email: string, password: string) => {
        setIsAuthenticated(true);
        const id = window.setTimeout(() => {
            logout();
            alert("Your session has expired. Please log in again.");
        }, 15 * 60 * 1000); // 15 minutes
    
        // Optional: Set an alert for 14 minutes
        const alertId = window.setTimeout(() => {
            alert("Your session will expire in 1 minute. Please save your work.");
        }, 14 * 60 * 1000); // 14 minutes
    
        setTimeoutId(id);
    
        // Clean up the alert timeout when logging out
        return () => {
            clearTimeout(alertId);
        };
    };


    const logout = () => {
        setIsAuthenticated(false);
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
    };

    useEffect(() => {
        // Clean up timeout on component unmount
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
