import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import SignIn from '../pages/auth/sign_in';
import SignUp from '../pages/auth/sign_up';
import Otp from '../pages/auth/otp';
import ProtectedRoute from './protectedRoute';
import ForgetPassword from '.././pages/auth/forget_password';
import Blog from '../pages/blog';
import Game from '../pages/game';
import Header from '../components/header';
import Footer from '../components/footer';
import Service from '../pages/service';
import { useAuth } from '../context/authContext';
import Course from '../pages/course';
import Project from '../pages/project';
import Profile from '../pages/profile';
import EditProfile from '../pages/editProfile';
import Qrscan from '../pages/qrscan';
import Qrgenerate from '../pages/qrgenerate';
import Gdrive from "../pages/uploaddrive"
import PrivacyPolicy from "../pages/privacypolicy"
import Terms from "../pages/terms"
import Whatsapp from "../pages/whatsapp"
import '../styles/App.css';
import Chat from "../pages/chat"
import PaymentMethodSelector from "../pages/earnCoins"
import Notification from "../pages/notification"
import ErrorBoundary from '../utils/errorHandle'
import NoReturnPolicy from '../pages/returnPolicy';
import NoRefundPolicy from '../pages/refundpolicy';



const Main: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <ErrorBoundary fallback={<p>Something went wrong</p>}>

        <div className="page-container">



{
                isAuthenticated ?         <Header/>:""
            }

        <Routes>
        {/* <Route path="/" element={<Whatsapp />} /> */}

        {/* <Route path="/" element={<Gdrive />} /> */}
                {/* <Route path="/" element={<OpenAI />} /> */}



        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
                <Route path="/returnpolicy" element={<NoReturnPolicy />} />
                <Route path="/refundpolicy" element={<NoRefundPolicy />} />


        
        <Route path="/" element={<SignIn />} />

        <Route path="/qrscan" element={<Qrscan />} />
        <Route path="/qrgenerate" element={
                            <ProtectedRoute>
                            <Qrgenerate />
                        </ProtectedRoute>
                        } />


        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/otpverify" element={<Otp />} />

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
            path="/game" 
            element={
                <ProtectedRoute>
                    <Game />
                 </ProtectedRoute>
            } 
        />

                <Route 
            path="/coins" 
            element={
                    <PaymentMethodSelector />

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
    <div style={{
        background:"lightgray",
        backgroundColor:"lightgray"
    }}>
    <Chat />

    </div>


    </div>
        </ErrorBoundary>


    );
};

export default Main;
