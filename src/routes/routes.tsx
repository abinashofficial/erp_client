import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import SignIn from '../pages/auth/sign_in';
import SignUp from '../pages/auth/sign_up';
import ProtectedRoute from './protectedRoute';
import ForgetPassword from '.././pages/auth/forget_password';



const Main: React.FC = () => {
    return (
        <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recoverypassword" element={<ForgetPassword />} />

        <Route 
            path="/home" 
            element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } 
        />
    </Routes>
    );
};

export default Main;
