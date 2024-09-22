// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        // In a real app, add sign-up logic here
        console.log('Signing up with', email, password);
    };

    return (
        <div className="form-container">
            <h2>Recovery Password</h2>
            <form onSubmit={handleSignUp}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <button type="submit">Change Password</button>
            </form>
            <p>Already have an account? <Link to="/">Sign In</Link></p>
        </div>
    );
};

export default ForgetPassword;
