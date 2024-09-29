import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram, FaEarlybirds } from 'react-icons/fa';


import { SiGmail } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';




interface Project {
  title: string;
  description: string;
}


const Header: React.FC = () => {
    const { logout ,empDetail} = useAuth();
    const [paragraph, setFormData] = useState("  hi.. I am an adept software engineer with over 3+ years of experience in Agile methodologies, backend development, and a versatile range of programming languages including Python, Go Lang, and Core Java. Skilled in utilizing ReactJS for web application development and proficient in managing relational databases like PostgreSQL, alongside familiarity with MongoDB, Redis, and Elasticsearch.")

    
    const navigate = useNavigate()

  



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
          <li><a onClick={() => landPage('/home')}>Home</a></li>
          <li><a onClick={() => landPage('/service')}>Services</a></li>
          <li><a onClick={() => landPage('/blog')}>Blog</a></li>
          <li><a  onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>

      <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={toggleDrawer}></div>
    </div>

               </div>



    );
};

export default Header;
