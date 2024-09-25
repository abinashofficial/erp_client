import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';


const Home: React.FC = () => {
    const { logout ,empDetail} = useAuth();
    const [paragraph, setFormData] = useState("  hi.. this is for testing app. Thank you so much for visiting this page.  ")

    
    const [displayedText, setDisplayedText] = useState('');
  
    useEffect(() => {
        // if (empDetail.mobile_number === "8925184971"){
        //     setFormData("  Hi, da gundu paiya.., Inta application panratuku tan rendu nala seria pesa mudiala. actually neraya pesanum nu nenakiren.. epdina na unkita pesuven and ne enkita pesuva namba matum pesuvom la just like that.. I hope u stay with me forever..")
        // }
      let index = 0;
  
      const interval = setInterval(() => {
        if (index < paragraph.length) {
          setDisplayedText((prev) => prev + paragraph[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 100);
  
      return () => clearInterval(interval);
    }, [paragraph, empDetail]);
    
    return (
      
      <div  style={{
        background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '100vh', // Ensure it takes full viewport height
        width: '100vw',  // Ensure it takes full viewport width
      }}
      
      >
        <div 
        style={{
          display: 'flex',
          justifyContent: "space-around",
          alignItems: 'center',
          padding:"10px"
        }}
        >
        <div>
        {empDetail.photo_url && (
          <img
            src={empDetail.photo_url}
            alt="Profile Preview"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginTop: '10px',
            }}
          />
        )}
      </div>
<div>
<button onClick={logout}>Logout</button>

</div>

        </div>


        <div className="home-container">
            <h2>Welcome... {empDetail.full_name}</h2>
            <div>{displayedText}</div>
        </div>

        </div>

    );
};

export default Home;
