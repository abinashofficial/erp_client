import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';


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



       


      




</div>
    );
};

export default Home;
