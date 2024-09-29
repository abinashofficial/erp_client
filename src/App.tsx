import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import './styles/App.css';
import Main from './routes/routes';
import { createContext, useState } from 'react';
// export const locateContext = createContext<any>({});
import Footer from './components/footer';
import Header from './components/header';
import SignIn from './pages/auth/sign_in';
import SignUp from './pages/auth/sign_up';
import ForgetPassword from './pages/auth/forget_password';
import ProtectedRoute from './routes/protectedRoute';
import Home from './pages/home';
import Blog from './pages/blog';
import Service from './pages/service';

interface SignupFormData {
  employee_id:any;
  first_name: any;
  last_name: any;
  mobile_number: any;
  email: any;
  date_of_birth: any;
  gender: any;
  password: any;
  confirmPassword:any;
}
const App: React.FC = () => {


  const [empDetail, setEmpDetail] = useState<SignupFormData>({
    employee_id:'',
    first_name: '',
    last_name: '',
    mobile_number: '',
    email: '',
    date_of_birth: '',
    gender: '',
    password: '',
    confirmPassword:'',
  });
    return (
      <BrowserRouter>
      
        <AuthProvider>
                {/* <Main/> */}
                <ProtectedRoute>
                <Header/>
                </ProtectedRoute>
                
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

    </Routes>
    <Footer/>
        </AuthProvider>
        </BrowserRouter>

    );
};

export default App;








