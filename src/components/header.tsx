import { useAuth } from '../context/authContext';
import React, { useState } from 'react';
import {  FaEarlybirds, FaHome, FaBlog, FaServicestack, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


type ButtonKey = 'button1' | 'button2' | 'button3' | 'button4';


const Header: React.FC = () => {
    const { logout } = useAuth();
    
    const navigate = useNavigate()
    const [clickedButtons, setClickedButtons] = useState({
      "button1": true,
      "button2": false,
      "button3": false,
      "button4": false,

    });

  



    const [isOpen, setIsOpen] = useState(false);

    const landPage = (buttonKey: ButtonKey, result: string) => {
        navigate(result)
        setClickedButtons((prevState) => ({
          ...prevState,
          "button1": false,
          "button2": false,
          "button3": false,
          "button4": false,

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

    const headerButtonHandle = (buttonKey: ButtonKey, result:string) => {
      navigate(result)
      setClickedButtons((prevState) => ({
        ...prevState,
        "button1": false,
        "button2": false,
        "button3": false,
        "button4": false,
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
      }}>
        <div style={{
          display:"flex",
          justifyContent:"space-between",
        }}>

          <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            // color:"white",
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
          backgroundColor:"#F0F2F5",
        }}>
            </div>


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
            <li> <button onClick={() => landPage("button1", '/home')} className="link-button"><FaHome className="menu-item-icon" />Home</button></li>
            <li>  <button onClick={() => landPage("button4", '/profile')} className="link-button"><FaUser className="menu-item-icon"  /> Profile</button></li>
            <li>  <button onClick={() => landPage("button2", '/blog')} className="link-button"><FaBlog className="menu-item-icon"  /> Blog</button></li>
            <li>  <button onClick={() => landPage("button3", '/service')} className="link-button"> <FaServicestack className="menu-item-icon" /> Services</button></li>
          <li> <button onClick={handleLogout} className="link-button">  <FaSignOutAlt className="menu-item-icon" /> Logout</button></li>

        </ul>
      </div>

      <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={toggleDrawer}></div>
    </div>

               </div>



    );
};

export default Header;
