import React, {useState} from 'react';
import { auth, googleProvider } from './firebaseConfig'; // Adjust the path as necessary
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';




  interface SignupFormData {
    employee_id:any;
    first_name: any;
    last_name: any;
    full_name: any;
    mobile_number: any;
    email: any;
    date_of_birth: any;
    gender: any;
    password: any;
    confirmPassword:any;
    photo_url:any;
  }
const GoogleSignIn: React.FC = () => {
    const navigate = useNavigate();

    // const [empDetail, setEmpDetail] = useState<SignupFormData>({
    //     employee_id:'',
    //     first_name: '',
    //     last_name: '',
    //     full_name: '',
    //     mobile_number: '',
    //     email: '',
    //     date_of_birth: '',
    //     gender: '',
    //     password: '',
    //     confirmPassword:'',
    //     photo_url:"",
    //   });
    const { login } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user; // The signed-in user info
      console.log('User Info:', user);
    //   setEmpDetail({...empDetail,
    //     employee_id:'',
    //     first_name: '',
    //     last_name: '',
    //     mobile_number: '',
    //     date_of_birth: '',
    //     gender: '',
    //     password: '',
    //     confirmPassword:'',

    //     full_name: user.displayName,

    //     email: user.email,

    //     photo_url:user.photoURL,
    // })

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
