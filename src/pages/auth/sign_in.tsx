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
import angryEmoji from "../../assets/animations/angry_emoji.json"; 
import heartFaceEmoji from "../../assets/animations/heartface_emoji.json"; 
import sleepEmoji from "../../assets/animations/sleep_emoji.json"; 
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";


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
      const [isPeek, setIsPeek] = useState(false);
      const [isThink, setIsThink] = useState(false);
      const [touchEmoji, setTouchEmoji] = useState(true);
      const [singleTouchEmoji, setSingleTouchEmoji] = useState(false);
      const [isSleep, setIsSleep] = useState(false);
      const [isHeart, setIsHeart] = useState(false);
      const [unTouchEmoji, setUnTouchEmoji] = useState(false);
      const [showPassword, setShowPassword] = useState<boolean>(false);
      const [count, setCount] = useState(0);
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        console.log(name)
        setFormData({ ...formData, [name]: value });
        if (e.target.value.length > 0){
          if (name === "email"){
            setSingleTouchEmoji(false)
            setIsPeek(false);
            setIsThink(e.target.value.length > 0);
            setTouchEmoji(false) 
            setUnTouchEmoji(false) 
            setIsSleep(false)
            setIsHeart(false)



  
          }else if( name === "password"){
            setIsThink(false);
            setTouchEmoji(false) 
            setUnTouchEmoji(false) 
            setIsSleep(false)
            setSingleTouchEmoji(false)
            setIsHeart(false)
            setIsPeek(e.target.value.length > 0)
          } 
        }else{
          setIsThink(false);
          setIsPeek(false);
          setTouchEmoji(true) 
          setUnTouchEmoji(false) 
          setIsSleep(false)
          setSingleTouchEmoji(false)
          setIsHeart(false)



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


    


    

    const handleClick = async () => {
      setCount(count + 1);

      if (count >0){
        setTouchEmoji( false); // Toggle touchEmoji
        setUnTouchEmoji(true); // Toggle unTouchEmoji
        setIsHeart(false)
        setIsSleep(false)

        await sleep(3000); // 3 seconds

        setIsThink(false);
        setIsPeek(false);
        setTouchEmoji(true) 
        setUnTouchEmoji(false) 
        setIsSleep(false)
        setSingleTouchEmoji(false)
        setIsHeart(false)
        setCount(0)
      }else{
        setTouchEmoji(false); // Toggle touchEmoji
        setSingleTouchEmoji(!singleTouchEmoji)
        setIsHeart(false)
        setIsSleep(false)
        
        await sleep(3000); // 3 seconds
        setIsThink(false);
        setIsPeek(false);
        setTouchEmoji(true) 
        setUnTouchEmoji(false) 
        setIsSleep(false)
        setSingleTouchEmoji(false)
        setIsHeart(false)

        // setUnTouchEmoji( false); // Toggle unTouchEmoji
        // setCount(1)

      }

    };

    const handleSleep =  () => {
      setIsThink(false);
      setIsPeek(false);
      setTouchEmoji(true) 
      setUnTouchEmoji(false) 
      setIsSleep(false)
      setSingleTouchEmoji(false)
      setIsHeart(false)

    }

    const enterTouchEmoji =  () => {
console.log("leave")
setIsThink(false);
setIsPeek(false);
setTouchEmoji(false) 
setUnTouchEmoji(false) 
setIsSleep(false)
setSingleTouchEmoji(false)
setIsHeart(true)
    }

    const leaveHeartEmoji =  () => {
      console.log("leave")
      setIsThink(false);
      setIsPeek(false);
      setTouchEmoji(true) 
      setUnTouchEmoji(false) 
      setIsSleep(false)
      setSingleTouchEmoji(false)
      setIsHeart(false)
          }

          useEffect(() => {
            // Start the interval

            
            const intervalId = window.setInterval(() => {
              if (!isPeek && !isThink && !isPeek && !singleTouchEmoji && !unTouchEmoji  && touchEmoji && !unTouchEmoji && !isHeart){

              setTouchEmoji(false)
              setIsThink(false);
        setIsPeek(false);
        setTouchEmoji(false) 
        setUnTouchEmoji(false) 
        setIsSleep(true)
        setIsHeart(false)

              }
            }, 20000); // 10 seconds
          
        
            // Cleanup the interval when the component is unmounted
            return () => {
              clearInterval(intervalId);
            };
          
          }, []);



    return (
      <div style={{
        background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '100vh', // Ensure it takes full viewport height
        width: '100vw',  // Ensure it takes full viewport width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        <div style={{
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}>

      {visible ? (
        <div className="form-container">

    <div style={{
      display:"flex",
      justifyContent:"center",
    }}>


<div  style={{ width: 100, height: 100,                 cursor: "pointer",
}}>

    {touchEmoji ?
     <Lottie
  onClick={()=> handleClick()}
  onMouseEnter={()=> enterTouchEmoji()}
  animationData={smileEmoji}
  loop
  autoplay
/> 

: <div/>}

    {unTouchEmoji ? <Lottie
  animationData={curseEmoji}
  loop
  autoplay
/> : <div/>}

{singleTouchEmoji ? <Lottie
  animationData={angryEmoji}
  loop
  autoplay
/> : <div/>}

      {isPeek ? <Lottie animationData={peekEmoji} loop autoplay /> : <div/>}
      {isThink ? <Lottie animationData={thinkEmoji} loop autoplay /> : <div/> }
      {isSleep ? <Lottie    onClick={()=> handleSleep()}
 
 animationData={sleepEmoji} loop autoplay /> : <div/> }
      {isHeart ? <Lottie
      onMouseLeave={()=> leaveHeartEmoji()}
      onClick={()=> handleClick()}

      animationData={heartFaceEmoji} loop autoplay /> : <div/> }


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
                <div style={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                }}>

                  
                <input
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                    type={showPassword ? "text" : "password"}
                    name='password'
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{    position: "absolute",
                right: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                color: "black",}}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
              
            </div>
                <button type="submit">Sign In</button>
            </form>
            </div>
<div style={{
  marginTop:"20px"
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
        ):(<div className="spinner"> </div>)} </div>
        </div>
    );
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default SignIn;