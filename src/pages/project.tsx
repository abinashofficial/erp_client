






import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram, FaEarlybirds } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Checkin from "../assets/animations/entryillustrator.png"
import ReactPlayer from 'react-player/youtube';

import { SiGmail } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { colors } from '@mui/material';







const Project: React.FC = () => {

    







    
    return (


      
<div className='main-content'>


<div style={{
        display:"flex",
        // flexDirection:"column",
        flexWrap:"wrap",
justifyContent:"space-around",
gap:"50px",
margin:"50px",
      }}>




<div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        height:"250px",
        width:"250px",
        }}>
        <img src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div className='course_box'>

<nav style={{
marginTop:"15px"
}}>
  <a 
      style={{ color: "white" }}
          target="_blank"
      rel="noopener noreferrer"

href="https://www.youtube.com/watch?v=lCqEhvqefqs&list=PLL7RrfYQRQay94iEBIUWYfGyz9r2RmXYJ&index=2">
    ERP Module
    </a>
        </nav>  
</div>
      </div>







      
<div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        height:"250px",
        width:"250px",
        }}>
        <img src={Checkin} alt="" sizes='5px' />

        </div>

    <div className='course_box'>

    <nav style={{
    marginTop:"15px"
    }}>
    <a 
        style={{ color: "white" }}
            target="_blank"
      rel="noopener noreferrer"

    href="https://www.youtube.com/watch?v=Gb6ADWcMLEY">
        Employee Check - in / out
        </a>
            </nav>  
    </div>
      </div>





      



      




    </div>
</div>




    );
};

export default Project;

