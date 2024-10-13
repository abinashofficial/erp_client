import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';



const Blog: React.FC = () => {
    const { empDetail} = useAuth();
    // const [paragraph, setFormData] = useState("   I am an adept software engineer with over 3+ years of experience in Agile methodologies, backend development, and a versatile range of programming languages including Python, Go Lang, and Core Java. Skilled in utilizing ReactJS for web application development and proficient in managing relational databases like PostgreSQL, alongside familiarity with MongoDB, Redis, and Elasticsearch.")
    const paragraph = "   I am an adept software engineer with over 3+ years of experience in Agile methodologies, backend development, and a versatile range of programming languages including Python, Go Lang, and Core Java. Skilled in utilizing ReactJS for web application development and proficient in managing relational databases like PostgreSQL, alongside familiarity with MongoDB, Redis, and Elasticsearch."
    
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
        display:"flex",
        flexDirection:"column",
        // justifyContent:"space-around",
        gap:"10px",
        background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '100vh', // Ensure it takes full viewport height
        width: '100vw', 
      }}>


        <div className="home-container">
            <h2>Hi... {empDetail.full_name}</h2>
            <div>{displayedText}</div>
        </div>




  <div style={{
  display:"flex",
  justifyContent:"center",
}}>
  <a href="https://1drv.ms/w/c/a969a5ec561b8918/IQQYiRtW7KVpIICpiQAAAAAAAVnP4roQuAapbeOeWi7Y0cE?em=2" target="_blank" rel="noopener noreferrer">
  Get CV        </a>

</div>
</div>
    );
};

export default Blog;
