import React from 'react';
import { useNavigate } from 'react-router-dom';
import Coins from "../pages/coins"
import Header from '../components/header';

const Service: React.FC = () => {
  const navigate = useNavigate();

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
        borderRadius:"10px",

        }}>
        <img src="https://res.cloudinary.com/dababspdo/image/upload/v1753636436/course_nkny1h.jpg" alt="" sizes='10px' />

        </div>


<button
 className='course_box'
 onClick={() => {
  navigate("/course");
}}
  >
    View Course

  </button>
 
      </div>




      <div className='service_box'>

                <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img src="https://res.cloudinary.com/dababspdo/image/upload/v1753636468/projects_ufutjn.jpg" alt="" />

      </div>
  

<button
 className='course_box'
 onClick={() => {
  navigate("/project");
}}
  >
    View Projects

  </button>
      </div>





      




    </div>
</div>

      </div>



    );
};

export default Service;
