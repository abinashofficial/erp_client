import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram, FaEarlybirds } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import ReactPlayer from 'react-player/youtube';

import { SiGmail } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { colors } from '@mui/material';




const Service: React.FC = () => {

    







    
    return (


      
<div style={{
        display:"flex",
        flexDirection:"column",
        // justifyContent:"space-around",
        gap:"10px",
        background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '100vh', // Ensure it takes full viewport height
        width: '100vw', 
      }}>


<div style={{
        display:"flex",
        // flexDirection:"column",
        flexWrap:"wrap",
justifyContent:"space-around",
gap:"50px",
margin:"50px",
      }}>



      <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        height:"250px",
        width:"300px",
        background:"white",
        gap:"20px",
        padding:"10px",
        borderRadius:"10px"
      }}>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9ECerywwwLVp9hl_651Yti-uX2fniKQpElxueNRj4ofNW99tASQWMAxMPjFILffA2rnc&usqp=CAU" alt="" sizes='10px' />

        </div>

<div style={{
  background:"#04AA6D",
  borderRadius:"5px",
  width:"290px",
  display:"flex",
  justifyContent:"center",
}}>

<nav style={{
marginTop:"15px"
}}>
           <Link style={{
            color:"white",
           }} to="/course">View Courses</Link>

        </nav>  
</div>
 
      </div>




      <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        height:"250px",
        width:"300px",
        background:"white",
        gap:"20px",
        padding:"10px",
        borderRadius:"10px"
      }}>
                <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img src="data:image/jpeg;base64,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" alt="" />

      </div>

      <div style={{
  background:"#04AA6D",
  borderRadius:"5px",
  width:"290px",
  display:"flex",
  justifyContent:"center",
}}>

<nav style={{
marginTop:"15px"
}}>
           <Link style={{
            color:"white",
           }} to="/project">View Projects</Link>
        </nav>  
</div>  
      </div>





      




    </div>
</div>




    );
};

export default Service;
