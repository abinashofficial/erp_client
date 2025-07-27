import React from 'react';
import Coins from "../pages/coins"
import Header from '../components/header';







const Project: React.FC = () => {

    
    return (


      <div>
        <Header/>

<Coins isVisible={true} />
<div className='main-content'>


<div style={{
        display:"flex",
        // flexDirection:"column",
        flexWrap:"wrap",
justifyContent:"space-around",
gap:"50px",
      }}>




<div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        height:"250px",
        width:"250px",
        }}>
        <img src="https://res.cloudinary.com/dababspdo/image/upload/v1753637352/erpmodule_of4yfa.jpg" alt="" sizes='10px' />

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
        <img src="https://res.cloudinary.com/dababspdo/image/upload/v1753637387/employeecheckinout_axrdqo.png" alt="" sizes='5px' />

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

      </div>



    );
};

export default Project;

