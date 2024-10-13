import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import SignIn from '../pages/auth/sign_in';
import SignUp from '../pages/auth/sign_up';
import ProtectedRoute from './protectedRoute';
import ForgetPassword from '.././pages/auth/forget_password';
import Blog from '../pages/blog';
import Header from '../components/header';
import Footer from '../components/footer';
import Service from '../pages/service';
import { useAuth } from '../context/authContext';
import Course from '../pages/course';
import Project from '../pages/project';
import Profile from '../pages/profile';
import EditProfile from '../pages/editProfile';


const Main: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div>
            {
                isAuthenticated ?         <Header/>:""
            }


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

<Route 
            path="/blog" 
            element={
                <ProtectedRoute>
                    <Blog />
                </ProtectedRoute>
            } 
        />


<Route 
            path="/service" 
            element={
                <ProtectedRoute>
                    <Service />
                </ProtectedRoute>
            } 
        />

<Route 
            path="/course" 
            element={
                <ProtectedRoute>
                    <Course />
                </ProtectedRoute>
            } 
        />

<Route 
            path="/project" 
            element={
                <ProtectedRoute>
                    <Project />
                </ProtectedRoute>
            } 
        />

<Route 
            path="/profile" 
            element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } 
        />

<Route 
            path="/editprofile" 
            element={
                <ProtectedRoute>
                    <EditProfile />
                </ProtectedRoute>
            } 
        />


    </Routes>
    <Footer/>
    </div>


    );
};

export default Main;
