import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';
import {  FaEarlybirds, FaHome, FaBlog, FaServicestack, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoGameControllerSharp } from "react-icons/io5";
import Lottie from "lottie-react";
import LogoAnime from './logoanime';



type ButtonKey = 'button1' | 'button2' | 'button3' | 'button4' | 'button5';


const Header: React.FC = () => {
    const { logout, empDetail } = useAuth();
      const [notifications, setNotifications] = useState<string[]>([]);
               const [isHovered, setIsHovered] = useState(false);
           const [animations, setAnimations] = useState<any>(null);
               const [clickedButtons, setClickedButtons] = useState({
      "button1": true,
      "button2": false,
      "button3": false,
      "button4": false,
      "button5": false,
    });
          const [isOpen, setIsOpen] = useState(false);

    //   const userId = "user123"; // Replace with the logged-in user's ID
      useEffect(() => {
    fetch("https://res.cloudinary.com/dababspdo/raw/upload/v1759006201/Untitled_video_Made_with_Clipchamp_4_a4epeb.json")
      .then((res) => res.json())
      .then((data) => setAnimations(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []); // ✅ Empty dependency array → runs only once
    
      useEffect(() => {
        // const ws = new WebSocket(`ws://localhost:8080/ws?userId=${empDetail.email}`);
        const ws = new WebSocket(`wss://erp-client-pink.vercel.app/ws?userId=${empDetail.email}`);

        ws.onopen = () => {
          console.log("WebSocket connection established");
        };
    
        ws.onmessage = (event) => {
          setNotifications((prev) => [...prev, event.data]);    
    
          console.log(event.data)
          alert(event.data)
        };
    
        ws.onclose = () => {
          console.log("WebSocket connection closed");
        };
    
        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
    
        // Cleanup on unmount
        return () => {
          ws.close();
        };
      }, [empDetail.email]);

      
    
    const navigate = useNavigate()


  




    const landPage = (buttonKey: ButtonKey, result: string) => {
        navigate(result)
        setClickedButtons((prevState) => ({
          ...prevState,
          "button1": false,
          "button2": false,
          "button3": false,
          "button4": false,
          "button5": false,
        }));
        setClickedButtons((prevState) => ({
          ...prevState,
          [buttonKey]: !prevState[buttonKey],
        }));
        setIsOpen(!isOpen);

    }


    const toggleDrawer = () => {
      setIsOpen(!isOpen);

    };

    const handleLogout = () => {
        setIsOpen(!isOpen);
        logout()
        navigate('/'); // Redirect to dashboard after login
    };

        const handleSignup = () => {
if (empDetail.email==="") {
  navigate('/otpverify')

}else{
    navigate('/signup')
}
        }

    const headerButtonHandle = (buttonKey: ButtonKey, result:string) => {
      navigate(result)
      setClickedButtons((prevState) => ({
        ...prevState,
        "button1": false,
        "button2": false,
        "button3": false,
        "button4": false,
        "button5": false,

      }));
      setClickedButtons((prevState) => ({
        ...prevState,
        [buttonKey]: !prevState[buttonKey],
      }));
         };


           

         
    return (


      
      <div  style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        background: 'white',
        // height: '100%', // Ensure it takes full viewport height
        // width: '100%',  // Ensure it takes full viewport width
        // marginLeft:"10px",
        boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
      }}>
        <div style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          flexFlow: "wrap",
          position:"fixed", 
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          backgroundColor: 'white',
                  boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
                  height:"90px",

        }}>
                     
    

          <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            height:"90px",
            marginLeft:"10px",
            cursor:"pointer",
          }}
              onClick={() => setIsHovered(!isHovered)}
          
  
          >
            <FaEarlybirds size={50} />


                 



          {/* <FaEarlybirds size={50} /> */}
          </div>




              <button onClick={() => headerButtonHandle("button1",  '/home')} className={`header-btn ${clickedButtons.button3 ? 'clicked' : ''}`}>
    <div className='header-txt'>
Home
    </div>
 </button>

  {/* <button onClick={() => headerButtonHandle("button2",  '/blog')} className={`mobile-only-header-button ${clickedButtons.button3 ? 'clicked' : ''}`}>Blog</button> */}
{/* <button onClick={() => headerButtonHandle("button5", '/game')} className={`header-btn ${clickedButtons.button2 ? 'clicked' : ''}`}>Game</button> */}
  <button onClick={() => headerButtonHandle("button2",  '/blog')} className={`header-btn ${clickedButtons.button3 ? 'clicked' : ''}`}>
    <div className='header-txt'>
Blog
    </div>
 </button>
<button onClick={() => headerButtonHandle("button3",  '/service')} className={`header-btn ${clickedButtons.button3 ? 'clicked' : ''}`}>     <div className='header-txt'>
Service
    </div> </button>



{!empDetail.employee_id?(<button onClick={()=>navigate('/')} className='signup-button'>
    <div style={{
        fontSize:"10px",
        fontWeight:"bolder",
        width:"25px"
    }}>
        Sign In

    </div>
</button>):(
<button onClick={()=>navigate("/coins")} className='coin-button'>
    <div style={{
        fontSize:"10px",
        fontWeight:"bolder",
            width:"29px"
    }}>
        Add Coins

    </div>
</button>
  )  }




        <div >
        <button className="menu-btn" onClick={toggleDrawer}>
        ☰
      </button>
        </div>

        </div>




        {/* <div style={{
          height:"2px",
          backgroundColor:"#F0F2F5",
        }}>
            </div> */}


            <div className="drawer-container">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleDrawer}>
          ×
        </button>
        <ul style={{
          display:"flex",
          flexDirection:"column",
          gap:"25px",
          marginLeft:"0px",
        }}>

            <li> 

              <button onClick={() => landPage("button1", '/home')} className="link-button"><FaHome className="menu-item-icon" />Home</button>
              </li>

            <li>  <button onClick={() => landPage("button4", '/profile')} className="link-button"><FaUser className="menu-item-icon"  /> Profile</button></li>
            <li>  <button onClick={() => landPage("button2", '/blog')} className="link-button"><FaBlog className="menu-item-icon"  /> Blog</button></li>
            <li>  <button onClick={() => landPage("button5", '/game')} className="link-button"><IoGameControllerSharp className="menu-item-icon"  /> Games</button></li>

            <li>  <button onClick={() => landPage("button3", '/service')} className="link-button"> <FaServicestack className="menu-item-icon" /> Services</button></li>
          <li> <button onClick={handleLogout} className="link-button">  <FaSignOutAlt className="menu-item-icon" /> Logout</button></li>

        </ul>
      </div>

      <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={toggleDrawer}></div>
    </div>

                            <LogoAnime
        isOpen={isHovered}
        onClose={() => setIsHovered(false)}
        data = {animations}
      >
      </LogoAnime>


               </div>



    );
};

export default Header;
