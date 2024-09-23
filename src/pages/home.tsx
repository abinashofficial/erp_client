// src/pages/Home.tsx
import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';


const Home: React.FC = () => {
    const { logout ,empDetail} = useAuth();
    const [paragraph, setFormData] = useState("  hi.. this is for testing app. Thank you so much for visiting this page.  ")

    
    const [displayedText, setDisplayedText] = useState('');
  
    useEffect(() => {
        if (empDetail.mobile_number === "8925184971"){
            setFormData("  Hi, da gundu paiya.., Inta application panratuku tan rendu nala seria pesa mudiala. actually neraya pesanum nu nenakiren.. epdina na unkita pesuven and ne enkita pesuva namba matum pesuvom la just like that.. I hope u stay with me forever..")
        }
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
        <div className="home-container">
            <h2>Welcome... {empDetail.first_name} {empDetail.last_name}</h2>
            <div>{displayedText}</div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Home;
