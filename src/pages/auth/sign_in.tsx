import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSignin = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
        navigate('/home'); // Redirect to dashboard after login
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/signup'); // Redirect to dashboard after login
    };

    return (
        <div className="form-container">
            <h2>Sign In</h2>
            <div>

            <form onSubmit={handleSignin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign In</button>


            </form>
            </div>
<div>
<nav>
            <Link to="/recoverypassword">Forget Password</Link>

            <Link to="/signup">Sign Up</Link>

        </nav>
</div>



        </div>
    );
};


export default SignIn;



