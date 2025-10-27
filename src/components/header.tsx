import { useAuth } from '../context/authContext';
import React, { useState, useEffect, useRef } from 'react';
import {  FaEarlybirds, FaHome, FaServicestack, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoGameControllerSharp } from "react-icons/io5";
// import Lottie from "lottie-react";
import LogoAnime from './logoanime';
import { CgProfile } from "react-icons/cg";
// import { IoMdNotificationsOutline } from "react-icons/io";






type ButtonKey = 'button1' | 'button2' | 'button3' | 'button4' | 'button5';


const Header: React.FC = () => {
    const { logout, empDetail } = useAuth();
      // const [notifications, setNotifications] = useState<string[]>([]);
               const [isHovered, setIsHovered] = useState(false);
           const [animations, setAnimations] = useState<any>(null);
               const [clickedButtons, setClickedButtons] = useState({
      "button1": true,
      "button2": false,
      "button3": false,
      "button4": false,
      "button5": false,
    });
      // const [open, setOpen] = useState(false);

          const [isOpen, setIsOpen] = useState(false);
                           const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    //   const userId = "user123"; // Replace with the logged-in user's ID
      useEffect(() => {
    fetch("https://res.cloudinary.com/dababspdo/raw/upload/v1759006201/Untitled_video_Made_with_Clipchamp_4_a4epeb.json")
      .then((res) => res.json())
      .then((data) => setAnimations(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []); // ✅ Empty dependency array → runs only once
    
      // useEffect(() => {
      //   // const ws = new WebSocket(`ws://localhost:8080/ws?userId=${empDetail.email}`);
      //   const ws = new WebSocket(`wss://erp-client-pink.vercel.app/ws?userId=${empDetail.email}`);

      //   ws.onopen = () => {
      //     console.log("WebSocket connection established");
      //   };
    
      //   ws.onmessage = (event) => {
      //     setNotifications((prev) => [...prev, event.data]);    
    
      //     console.log(event.data)
      //     alert(event.data)
      //   };
    
      //   ws.onclose = () => {
      //     console.log("WebSocket connection closed");
      //   };
    
      //   ws.onerror = (error) => {
      //     console.error("WebSocket error:", error);
      //   };
    
      //   // Cleanup on unmount
      //   return () => {
      //     ws.close();
      //   };
      // }, [empDetail.email]);

      
    
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

//         const handleSignup = () => {
// if (empDetail.email==="") {
//   navigate('/otpverify')

// }else{
//     navigate('/signup')
// }
//         }

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

                   useEffect(() => {
                     const mediaQuery = window.matchMedia("(orientation: portrait)");
                 
                     const handleChange = (e: MediaQueryListEvent) => {
                       setIsPortrait(e.matches);
                     };
                 
                     mediaQuery.addEventListener("change", handleChange);
                 
                     return () => {
                       mediaQuery.removeEventListener("change", handleChange);
                     };
                   }, []);


           

         
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
                  boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
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


          <div>

<div style={{
  display: isPortrait ? "none":"flex",
          justifyContent:"space-between",
          alignItems:"center",
          // flexFlow: "wrap",
          gap:"50px",
}}>

                     
    





              <button onClick={() => headerButtonHandle("button1",  '/home')} className={`header-btn ${clickedButtons.button3 ? 'clicked' : ''}`}>
    <div className='header-txt'>
Home
    </div>
 </button>

<button onClick={() => headerButtonHandle("button5", '/game')} className={`header-btn ${clickedButtons.button2 ? 'clicked' : ''}`}>
  
      <div className='header-txt'>
Games
    </div></button>
  {/* <button onClick={() => headerButtonHandle("button2",  '/blog')} className={`header-btn ${clickedButtons.button3 ? 'clicked' : ''}`}>
    <div className='header-txt'>
Blog
    </div>
 </button> */}
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


                <div 
        style={{
          display: 'flex',
          justifyContent: "space-around",
          alignItems: 'center',
          // padding:"10px",
        }}
        >
        {/* {empDetail.photo_url ? (
          <img
            src={empDetail.photo_url}
            alt="Profile Preview"
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '50px',
            //   marginTop: '10px',
            }}
          />
        ):(
          <div style={{
            marginRight:"20px",
          }}>
< CgProfile size={50}/>
          </div>
        )} */}

            <div style={{ position: "relative", display: "inline-block" }} ref={popupRef}>
      {/* Profile icon / image */}
      <div
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        onClick={() => setOpen(!open)}
      >
        {empDetail.photo_url ? (
          <img
            src={empDetail.photo_url}
            alt="Profile"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          <div style={{ marginRight: "20px" }}>
            <CgProfile size={50} />
          </div>
        )}
      </div>

      {/* Popup dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            right: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            padding: "10px 20px",
            zIndex: 100,
            minWidth: "150px",
          }}
        >
          <div
                      onClick= {()=>navigate("/profile")}

        className='profile-btn'
>
            <p>
              Profile
            </p>

          </div>

                    <div
                      onClick= {()=>navigate("/coins")}
className='profile-btn'
   >
            <p>
              Coins
            </p>

          </div>
          {/* <hr style={{ margin: "8px 0", borderColor: "#eee" }} /> */}
          <button
            onClick= {()=>navigate("/")}
            style={{
              width: "100%",
              padding: "8px 0",
              border: "none",
              borderRadius: "8px",
              background: "#f44336",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
              marginTop:"10px",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>

      </div>

        </div>

        </div>

        <div 
        style={{
          display: isPortrait? "block":"none"
        }}>
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
            {/* <li>  <button onClick={() => landPage("button2", '/blog')} className="link-button"><FaBlog className="menu-item-icon"  /> Blog</button></li> */}
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
