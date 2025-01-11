import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram, FaEarlybirds } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import ReactPlayer from 'react-player/youtube';

import { SiGmail } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { colors } from '@mui/material';




interface Project {
  title: string;
  description: string;
}


const Course: React.FC = () => {

    
    return (


      
<div style={{
        display:"flex",
        flexDirection:"column",
        // justifyContent:"space-around",
        gap:"10px",
        background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '100%', // Ensure it takes full viewport height
        width: '100%', 
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
        }}>
        <img src="data:image/png;base64,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" alt="" sizes='10px' />

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
  <a 
      style={{ color: "white" }}

href="https://youtube.com/playlist?list=PLJ7-HiqskdZKn03J2X0y37agMrYCnhvEU&si=SehUd4Ev-QOKgGWp" target="_blank" rel="noopener noreferrer">
    View Course
    </a>
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
        }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7_GCEX2LRWIwLy7DavJqsBuk3TEqxRfq44Q&s" alt="" />

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
  <a 
      style={{ color: "white" }}

href="https://www.youtube.com/watch?v=CgkZ7MvWUAA&list=LL&index=46&t=4279s" target="_blank" rel="noopener noreferrer">
    View Course
    </a>
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
        }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS6AUfDIZzaVfVqS2yMgrQ2BxcQYjofHhUH-D2N12_usfq6Agj0z-i51L6e0e_q6_raco&usqp=CAU" alt="" />

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
  <a 
      style={{ color: "white" }}

href="https://youtube.com/playlist?list=PLvepBxfiuao1hO1vPOskQ1X4dbjGXF9bm&si=BTw9L6ReQyqXGLKg" target="_blank" rel="noopener noreferrer">
    View Course
    </a>
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
        }}>
           <img src="data:image/jpeg;base64,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" alt="" sizes='10px' />
          
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



  <a 
      style={{ color: "white" }}

href="https://youtu.be/Gex-j7GlCHc?si=rdts7t99zWGq3RHH" target="_blank" rel="noopener noreferrer">
    View Course
    </a>

        </nav>  

{/* <a href="https://1drv.ms/w/c/a969a5ec561b8918/IQQYiRtW7KVpIICpiQAAAAAAAVnP4roQuAapbeOeWi7Y0cE?em=2" target="_blank" rel="noopener noreferrer">
Get CV        </a> */}
        
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
        }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq80Y2NejsbkqNNb4RSLqFQAm-fY_N-EGcyQ&s" alt="" />

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
  <a 
      style={{ color: "white" }}

href="https://www.youtube.com/watch?v=qw--VYLpxG4&t=681s" target="_blank" rel="noopener noreferrer">
    View Course
    </a>
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
        }}>
        <img src="data:image/png;base64,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" alt="" />

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
  <a 
      style={{ color: "white" }}

href="https://www.youtube.com/watch?v=0zwYbudzaJc" target="_blank" rel="noopener noreferrer">
    View Course
    </a>
        </nav>  
</div>  
      </div>




    </div>






</div>




    );
};

export default Course;