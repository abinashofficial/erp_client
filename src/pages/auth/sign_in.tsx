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
import { RiQrScan2Line } from "react-icons/ri";
import { BsQrCodeScan } from "react-icons/bs";




interface SignInFormData {
    email: string;
    password: string;
    mobile_number:string;
  }

  function isAllInteger(input: string): boolean {
    const regex = /^\d+$/; // Matches strings with only digits (0-9)
    return regex.test(input);
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
    country_code:any;
  }

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
        mobile_number:"",
      });
      const [sendData, setSendData] = useState<SignInFormData>({
        email: '',
        password: '',
        mobile_number:"",
      });
      const [emailmob, setEmailMob] = useState<Boolean>(false);

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
        setVisible(false);
        const isIntegerString = formData.email.split("").every((char) => /\d/.test(char));
        let message = "Invalid Email"
        sendData.email = formData.email
        sendData.password = formData.password



      if (isIntegerString){
        sendData.mobile_number = formData.email
        sendData.email = ""
        message = "Invalid Mobile Number"
      }
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

 // Add your API endpoint here
 const apiUrl = 'https://erp-iliw.onrender.com/public/signin';
// const apiUrl = 'http://localhost:8080/public/signin';
 try {
   const response = await fetch(apiUrl, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(sendData),
     signal: controller.signal, // Attach the abort signal to the fetch request
   });
    console.log("response: ", response)

  if (response.ok) {
    const result:SignupFormData = await response.json();
    console.log('Signed in successful:', result);

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
    country_code:result.country_code,
  });
  
    login(empDetail);
    navigate('/home'); // Redirect to dashboard after login

  }else if (response.status===401){
    setVisible(true)
    alert("Invalid Password");
  }else if (response.status===400){
    setVisible(true)
    alert(message);
  }else{
    console.error('Signup failed:', response);
  }
 } catch (error: any) {
  if (error.name === "AbortError") {
    setVisible(true)
    alert("Request timed out");
    // setError("Request timed out");
    return
  } 
    setVisible(true)
    alert("Internal server Error " + error);
    // setError("Failed to fetch data: " + err.message);
  return
 }
    };


    const handleGoogleSignIn = async(e: React.FormEvent) => {
      setVisible(false)
      e.preventDefault();
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
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
        });


        const apiUrl = 'https://erp-iliw.onrender.com/public/get-user';
        // const apiUrl = 'http://localhost:8080/public/get-user';

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(empDetail),
        });

            
       if (response.ok) {   
        const result:SignupFormData = await response.json();
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
          photo_url:user.photoURL,
          confirmPassword:result.confirmPassword,
          access_token: result.access_token,
          country_code:result.country_code,
        });
        login(empDetail)
        navigate('/home'); // Redirect to dashboard after login
        // Handle successful sign-in (e.g., redirect or store token)
      }else{  
        login(empDetail)
        navigate('/home'); // Redirect to dashboard after login
  
        // Handle user info and proceed with your signup logic
      } 
    }catch (error: any) {
      if (error.name === "AbortError") {
        setVisible(true)
        alert("Request timed out");
        return
        // setError("Request timed out");
      } 
        setVisible(true)
        alert("Internal server Error " + error);
        console.log(error, "Internal server Error")
        // setError("Failed to fetch data: " + err.message);
      return
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
          
          }, [isPeek, isThink, singleTouchEmoji, unTouchEmoji, touchEmoji, isHeart]);



    return (


        <div className='main-content'>
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
        <form onSubmit={handleSignin}>
          <div className="input-group">
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email or Phone number"
              required
            />
          </div>
          <div className="input-group password-group">
            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="additional-options">
          <button className="google-signin-button" onClick={handleGoogleSignIn}>
            <div style={{
                display:"flex",
                flexDirection:"row",
                gap:"20px"
            }}>
            <FcGoogle style={{
  height:"25px",
  width:"25px",
}} />
<div style={{
    display:"flex",
    alignItems:"center",
}}>
Sign in with Google

</div>
            </div>

          </button>


          <div style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-around",
marginTop:"25px",
          }}>
            <a href="/recoverypassword" className="link">
              Forgot Password?
            </a>
            <a href="/otpverify" className="link">
              Sign Up
            </a>
          </div>


          <div style={{
            marginBottom:"20px",
            marginTop:"20px",
          }}>
            <a className="link">
              -----------------
            </a>
            <span> OR </span>
            <a  className="link">
              -----------------
            </a>
          </div>


<button className="google-signin-button" onClick={()=>navigate('/qrscan')}>
            <div style={{
                display:"flex",
                flexDirection:"row",
                gap:"20px"
            }}>
            <BsQrCodeScan style={{
  height:"25px",
  width:"25px",
}} />
<div style={{
    display:"flex",
    alignItems:"center",
}}>
Scan QR Code

</div>
            </div>

          </button>

        </div>
      </div>
              ):(<div className="spinner"> </div>)}

        </div>
    );
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default SignIn;