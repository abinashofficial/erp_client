import React, {useState} from 'react';
import { auth, googleProvider } from './firebaseConfig'; // Adjust the path as necessary
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn: React.FC = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user; // The signed-in user info
      console.log('User Info:', user);


      const empDetail= ({
        employee_id:'',
        first_name: '',
        last_name: '',
        mobile_number: '',
        date_of_birth: '',
        gender: '',
        password: '',
        confirmPassword:'',
        full_name: user.displayName, 
        email: user.email,
        photo_url:user.photoURL,
        access_token:"",
        country_code:"",
        coins:0,
      });

      login(empDetail)
      navigate('/home'); // Redirect to dashboard after login

      // Handle user info and proceed with your signup logic
    } catch (error) {
        console.log('result :', error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default GoogleSignIn;
