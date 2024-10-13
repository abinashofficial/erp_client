import { useAuth } from '../context/authContext';
import React from 'react';
import ReactPlayer from 'react-player/youtube';



const Home: React.FC = () => {
    const {empDetail} = useAuth();
    return (

<div  style={{
        display:"flex",
        flexDirection:"column",
        // justifyContent:"space-around",
        gap:"10px",
        background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '100%', // Ensure it takes full viewport height
        width: '100%', 
      }}>


        <div 
        style={{
          display: 'flex',
          justifyContent: "space-around",
          alignItems: 'center',
          padding:"10px",
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
              borderRadius: '50px',
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
          flexDirection:"column",
          justifyContent: "space-around",
          alignItems: 'center',          
        }
      }>
      <h1>   Watch this video!</h1>

<div style={{
        display:"flex",
        // flexDirection:"column",
        flexWrap:"wrap",
justifyContent:"space-around",
gap:"50px",
margin:"50px",
      }}>


      <div style={{
        height:"350px",
        width:"350px",
        // margin:"20px",
        // padding:"20px"
      }}>
      <ReactPlayer
        url="https://youtube.com/shorts/2B_245HdM4A"
        width="100%"
        height="100%"
        controls={true}  // Adds play/pause controls
      />
      </div>


      <div style={{
        height:"350px",
        width:"350px",
        // margin:"20px",
        // padding:"20px"
      }}>
      <ReactPlayer
        url="https://youtube.com/shorts/5NnALdKBc1c"
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
