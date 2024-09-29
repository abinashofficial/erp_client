import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';



import { SiGmail } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';




interface Project {
  title: string;
  description: string;
}


const Home: React.FC = () => {
    const { logout ,empDetail} = useAuth();

  

  







    
    return (

<div  style={{
        display:"flex",
        flexDirection:"column",
        // justifyContent:"space-around",
        gap:"10px",
        background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '100vh', // Ensure it takes full viewport height
        width: '100vw', 
      }}>


        <div 
        style={{
          display: 'flex',
          justifyContent: "space-around",
          alignItems: 'center',
          padding:"10px"
        }}
        >
        {empDetail.photo_url && (
          <img
            src={empDetail.photo_url}
            alt="Profile Preview"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '8px',
            //   marginTop: '10px',
            }}
          />
        )}
      </div>
      <div
             style={{
              display: 'flex',
              justifyContent: "space-around",
              alignItems: 'center',
            //   padding:"10px"
            }}
            >
      <h2>Welcome... {empDetail.full_name}</h2>
      </div>

      <div style={
        {
          display: 'flex',
          justifyContent: "space-around",
          alignItems: 'center',          
        }
      }>

<div style={{
        display:"flex",
        flexDirection:"column",
        // gap:"10px",

justifyContent:"space-around",
      }}>
      <h1>   Watch this video!</h1>
      <div style={{
        height:"350px",
        width:"350px",
        // margin:"20px",
        // padding:"20px"
      }}>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=BswOY0bYgKg&list=PLL7RrfYQRQayzK8i2-9R1p5iPAv6WRcnc"
        width="100%"
        height="100%"
        controls={true}  // Adds play/pause controls
      />
      </div>

    </div>


      </div>


</div>
    );
};

export default Home;
