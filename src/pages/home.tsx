import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';




interface Project {
  title: string;
  description: string;
}


const Home: React.FC = () => {
    const { logout ,empDetail} = useAuth();
    const [paragraph, setFormData] = useState("  hi.. I am an adept software engineer with over 3+ years of experience in Agile methodologies, backend development, and a versatile range of programming languages including Python, Go Lang, and Core Java. Skilled in utilizing ReactJS for web application development and proficient in managing relational databases like PostgreSQL, alongside familiarity with MongoDB, Redis, and Elasticsearch.")

    
    const [displayedText, setDisplayedText] = useState('');
    const navigate = useNavigate()

  
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

      <div>

      
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

        <div style={{
  display:"flex",
  justifyContent:"center",
}}>
  <div>
  <a href="https://1drv.ms/w/c/a969a5ec561b8918/IQQYiRtW7KVpIICpiQAAAAAAAVnP4roQuAapbeOeWi7Y0cE?em=2" target="_blank" rel="noopener noreferrer">
  Get CV        </a>
  </div>
</div>



        </div>

        <footer>
        <p>&copy; 2024 Abinas Chinnasamy</p>
        <div className="social-media-icons">
        <a href="https://www.linkedin.com/in/abinash-chinnasamy-1330741a0" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} />
        </a>
        <a href="https://wa.me/+919940463927" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={30} />
        </a>
        <a href="https://www.instagram.com/__abinash__?utm_source=qr" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
        </a>

        <a href="mailto:abinash1411999@gmail.com">
            <SiGmail size={30} />
        </a>
        
    </div>
    </footer>


    </div>

    );
};

export default Home;
