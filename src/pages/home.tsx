// src/pages/Home.tsx
import React from 'react';
import { useAuth } from '../context/authContext';

const Home: React.FC = () => {
    const { logout } = useAuth();
    
    return (
        <div className="home-container">
            <h2>Welcome to the Home Page</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Home;
