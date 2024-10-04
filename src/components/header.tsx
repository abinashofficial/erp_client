import { useAuth } from '../context/authContext';
import React, { useState } from 'react';
import {  FaEarlybirds } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type ButtonKey = 'button1' | 'button2' | 'button3';


const Header: React.FC = () => {
    const { logout } = useAuth();
    
    const navigate = useNavigate()
    const [clickedButtons, setClickedButtons] = useState({
      "button1": false,
      "button2": false,
      "button3": false,
    });

  



    const [isOpen, setIsOpen] = useState(false);

    const landPage = (result: string) => {
        navigate(result)
        setIsOpen(!isOpen);

    }


    const toggleDrawer = () => {
      setIsOpen(!isOpen);

    };

    const handleLogout = () => {
        setIsOpen(!isOpen);
        logout()
    };

    const headerButtonHandle = (buttonKey: ButtonKey, result:string) => {
      navigate(result)
      setClickedButtons((prevState) => ({
        ...prevState,
        "button1": false,
        "button2": false,
        "button3": false,

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
        background: '#ff99ff',
        height: '100%', // Ensure it takes full viewport height
        width: '100%',  // Ensure it takes full viewport width
      }}>
        <div style={{
          display:"flex",
          justifyContent:"space-between",
        }}>

          <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            color:"white",
            padding:"10px",
          }}>
          <FaEarlybirds size={50} />
          </div>
<button onClick={() => headerButtonHandle("button1", '/home')} className={`header-btn ${clickedButtons.button1 ? 'clicked' : ''}`}>Home</button>
<button onClick={() => headerButtonHandle("button2", '/blog')} className={`header-btn ${clickedButtons.button2 ? 'clicked' : ''}`}>Blog</button>
<button onClick={() => headerButtonHandle("button3",  '/service')} className={`header-btn ${clickedButtons.button3 ? 'clicked' : ''}`}>Service</button>



        <div style={{

        }}>
        <button className="menu-btn" onClick={toggleDrawer}>
        ☰
      </button>
        </div>

        </div>




        <div style={{
          height:"2px",
          backgroundColor:"white",
        }}>
            </div>


            <div className="drawer-container">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleDrawer}>
          ×
        </button>
        <ul>
            <li><button onClick={() => landPage('/home')} className="link-button">Home</button></li>
            <li><button onClick={() => landPage('/blog')} className="link-button">Blog</button></li>
            <li><button onClick={() => landPage('/service')} className="link-button">Services</button></li>

          {/* <li><a onClick={() => landPage('/home')}>Home</a></li>
          <li><a onClick={() => landPage('/service')}>Services</a></li>
          <li><a onClick={() => landPage('/blog')}>Blog</a></li> */}
          {/* <li><a  onClick={handleLogout}>Logout</a></li> */}
          <li><button onClick={handleLogout} className="link-button">Logout</button></li>

        </ul>
      </div>

      <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={toggleDrawer}></div>
    </div>

               </div>



    );
};

export default Header;
