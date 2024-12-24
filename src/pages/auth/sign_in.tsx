import React, { useEffect,useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebaseConfig'; // Adjust the path as necessary
import Lottie from "lottie-react";
import smileEmoji from "../../assets/animations/smile_emoji.json";
import peekEmoji from "../../assets/animations/peeking_emoji.json"; 
import thinkEmoji from "../../assets/animations/thinking_emoji.json"; 
import curseEmoji from "../../assets/animations/cursing_emoji.json"; 

import { FcGoogle } from "react-icons/fc";
import { dividerClasses } from '@mui/material';










interface SignInFormData {
    email: string;
    password: string;
  }

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
    access_token:any;
  }

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
      });
      const [visible, setVisible] = useState<Boolean>(true);
      const [isSmile, setIsSmile] = useState(true);
      const [isPeek, setIsPeek] = useState(false);
      const [isThink, setIsThink] = useState(false);
      const [touchEmoji, setTouchEmoji] = useState(true);
      const [unTouchEmoji, setUnTouchEmoji] = useState(false);







    const { login } = useAuth();



    const navigate = useNavigate();
    // const { empDetail, setEmpDetail} = useContext(locateContext);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        console.log(name)
        setFormData({ ...formData, [name]: value });
        if (e.target.value.length > 0){
          if (name === "email"){
            setIsPeek(false);
            setIsThink(e.target.value.length > 0);
            setTouchEmoji(false) 
            setUnTouchEmoji(false) 


  
          }else if( name === "password"){
            setIsPeek(e.target.value.length > 0);
            setIsThink(false);
            setTouchEmoji(false) 
            setUnTouchEmoji(false) 

  
          } 
        }else{
          setIsThink(false);
          setIsPeek(false);
          setTouchEmoji(true) 
          setUnTouchEmoji(false) 
        }

      };

    const handleSignin = async(e: React.FormEvent) => {
        e.preventDefault();
        setVisible(false)
        const controller = new AbortController();

        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

 // Add your API endpoint here
 const apiUrl = 'https://erp-iliw.onrender.com/public/signin';
// const apiUrl = 'http://localhost:8080/public/signin';


 try {
   const response = await fetch(apiUrl, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(formData),
     signal: controller.signal, // Attach the abort signal to the fetch request
   });
    console.log("response: ", response)

  if (response.ok) {
    const result:SignupFormData = await response.json();
    console.log('Signup successful:', result);

  const empDetail = ({
    employee_id: result.employee_id,
    first_name: result.first_name,
    last_name: result.last_name,
    full_name:result.first_name + " " + result.last_name,
    mobile_number: result.mobile_number,
    email: result.email,
    date_of_birth: result.date_of_birth,
    gender: result.gender,
    password: result.password,
    photo_url:result.photo_url,
    confirmPassword:result.confirmPassword,
    access_token: result.access_token,
  });
  
    login(empDetail);
    navigate('/home'); // Redirect to dashboard after login

  }else if (response.status===401){
    setVisible(true)
    alert("Invalid Password");
  }else if (response.status===400){
    setVisible(true)
    alert("Invalid Email");
  }else{
    console.error('Signup failed:', response);
  }
 } catch (error: any) {
  if (error.name === "AbortError") {
    setVisible(true)
    alert("Request timed out");
    // setError("Request timed out");
  } else {
    setVisible(true)
    alert("Internal server Error");
    // setError("Failed to fetch data: " + err.message);
  }
 }
    };



    const handleGoogleSignIn = async () => {
      setVisible(false)

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
        });
  
        login(empDetail)
        navigate('/home'); // Redirect to dashboard after login
  
        // Handle user info and proceed with your signup logic
      } catch (error) {
          console.log('result :', error);
      }
    };

    
console.log(touchEmoji)


    return (
      <div style={{
        background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '100vh', // Ensure it takes full viewport height
        width: '100vw',  // Ensure it takes full viewport width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {visible ? (
        <div className="form-container">

    <div style={{
      display:"flex",
      justifyContent:"center",
    }}>




<div  style={{ width: 100, height: 100}}>

    {touchEmoji ? <Lottie
  onClick={() => {
    setTouchEmoji((touchEmoji) => !touchEmoji); // Toggle touchEmoji
    setUnTouchEmoji((unTouchEmoji) => !unTouchEmoji); // Toggle unTouchEmoji
  }}
  animationData={smileEmoji}
  loop
  autoplay
/> : <div/>}

    {unTouchEmoji ? <Lottie
  onClick={() => {
    setTouchEmoji((touchEmoji) => !touchEmoji); // Toggle touchEmoji
    setUnTouchEmoji((unTouchEmoji) => !unTouchEmoji); // Toggle unTouchEmoji
  }}
  animationData={curseEmoji}
  loop
  autoplay
/> : <div/>}

      {isPeek ? <Lottie animationData={peekEmoji} loop autoplay /> : <div/>}
      {isThink ? <Lottie animationData={thinkEmoji} loop autoplay /> : <div/> }
    </div>

    </div>



            <div>

            <form onSubmit={handleSignin}>
                <input
                    type="email"
                    name='email'
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name='password'
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign In</button>


            </form>
            </div>
<div style={{
  marginTop:"10px"
}}>
<nav>
            <Link to="/recoverypassword">Forget Password</Link>

            <Link to="/signup">Sign Up</Link>

        </nav>

</div>

<div style={{
  display:"flex",
  gap:"10px"
  
}}>
<FcGoogle style={{
  height:"40px",
  width:"40px",
}} />

<button onClick={handleGoogleSignIn}>
  Sign in with Google
  </button>
  </div>

  

        </div>
        ):(<div className="spinner"> </div>)}
        </div>
    );
};


export default SignIn;