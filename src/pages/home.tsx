import { useAuth } from '../context/authContext';
// import ReactPlayer from 'react-player/youtube';
import Header from '../components/header';
// import Blog from './blog'
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom';


  interface Animations {
  [key: string]: any; // JSON object for each Lottie animation
}





const Home: React.FC = () => {
  const services = [
  {
    title: 'Digital Marketing',
    description: 'Boost your brand visibility and reach through comprehensive digital marketing strategies. Our services include SEO to enhance search engine rankings, SEM for targeted ads, engaging content marketing, and strategic social media campaigns that captivate your audience and convert leads into loyal customers.',
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1763229782/digital-marketing-anime_ggzuwy.json", // Anime-style fairy
    jsonName:"digital_marketing_anime",
  },
  {
    title: 'Web Development',
    description: 'Craft visually stunning and user-friendly websites with our modern web design and development solutions. We build responsive, accessible, and lightning-fast web applications using cutting-edge technologies, ensuring your online presence is both functional and captivating across all devices.',
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1763230044/webdesignanime_cw2i6e.json", // Anime wizard
    jsonName:"webdesignanime",
  },
  {
    title: 'E-Commerce Development',
    description: 'Launch a powerful online store with our e-commerce development services. We create secure, scalable, and high-performing e-commerce platforms tailored to your business needs, equipped with features like payment integration, inventory management, and customer-centric UX for a seamless shopping experience.',
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1763230092/ecommerceanime_amqcue.json", // Anime elf
    jsonName:"ecommerceanime",
  },
  {
    title: 'Technical Support',
    description: 'Stay worry-free with our round-the-clock technical support. Whether it’s software troubleshooting, system maintenance, or hardware configuration, our expert team ensures your IT infrastructure runs smoothly, minimizing downtime and maximizing productivity.',
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1763230169/Itsupportanime_t1vdrx.json", // Anime superhero
    jsonName:"Itsupportanime",
  },
  {
    title: 'IT Services',
    description: 'Empower your business with our full spectrum of IT services. From network setup and infrastructure management to cloud solutions and cybersecurity, we provide enterprise-grade IT support that scales with your growth and adapts to evolving technological needs.',
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1763230223/serviceanime_ivdqsf.json", // Anime genie
    jsonName:"serviceanime",
  },
];
    const {empDetail} = useAuth();
    const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
        const navigate = useNavigate()
       
             const [animations, setAnimations] = useState<Animations>({});
       
                    useEffect(() => {
                  // Fetch all JSONs in parallel
                  const fetchAnimations = async () => {
                    const anims  :any ={};
                    await Promise.all(
                      services.map(async (jsonfile) => {
                        try {
                          const res = await fetch(jsonfile.jsonLink); // each course has its JSON URL
                          const data = await res.json();
                          anims[jsonfile.jsonName] = data; // store by course id
                        } catch (err) {
                          console.error("Failed to load animation:", err);
                        }
                      })
                    );
                    setAnimations(anims);
                  };
        fetchAnimations();
      }, []);

      useEffect(() => {
        const mediaQuery = window.matchMedia("(orientation: portrait)");
    
        const handleChange = (e: MediaQueryListEvent) => {
          setIsPortrait(e.matches);
        };
    
        mediaQuery.addEventListener("change", handleChange);
    
        return () => {
          mediaQuery.removeEventListener("change", handleChange);
        };
      }, []);
    return (
      <div className='main-content'>
<Header/>

<div  style={{
        display:"flex",
        flexDirection:"column",
        // justifyContent:"space-around",
        // gap:"5px",
        // background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '100%', // Ensure it takes full viewport height
        width: '100%', 
        // background:"white",
        marginTop:"180px",
      }}>


        {/* <div 
        style={{
          display: 'flex',
          justifyContent: "space-around",
          alignItems: 'center',
          // padding:"10px",
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
      </div> */}
      
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

      {/* <div style={
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
        url="https://www.youtube.com/watch?v=Gb6ADWcMLEY"
        width="100%"
        height="100%"
        controls={true}  // Adds play/pause controls
      />
      </div>
    </div>






      </div> */}

      <div 
      
      className="min-h-screen p-6 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white">
      
      
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
      
      
      
                <div>
                                        {index%2===0 ? (
                  
       <motion.div
                  key={index}
                  className="rounded-2xl p-6 bg-white text-gray-900 shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 border border-purple-200"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
      
                                <div 
                                style={{
          // boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
          // gap:"1rem",
              borderBottom: "2px solid rgba(0, 0, 0, 1.0)",
              marginBottom:"30px",
              // borderTop:"2px solid rgb(0, 0, 0)",
      
      
                                }}
                            >
      
      
                            <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                  }}>
                    
                    {isPortrait ? (
                      <h2 >{service.title}</h2>
                    ):(
                  <h1 >{service.title}</h1>
      
                    )}
                  </div>
      
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: isPortrait ? "column" : "row",
          width: "100%",
          height: "100%", // optional, for vertical centering in column mode
          // gap: "1rem", // space between icon & text
          // margin:"20px",
          // borderBottom: "2px solid rgba(0, 0, 0, 1.0)",
           marginBottom:"30px",
        }}
      >
      
      
      
          {/* Lottie Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1, // equal width in row mode, equal height in column mode
            width: "100%",
            flexDirection: "column",
          }}
        >
      
          <Lottie
            className="lottie-animation"
            animationData={animations[service.jsonName]}  
            loop
            autoplay
            style={{
              width:  isPortrait ?"100%":"50%",
              height:  isPortrait ?"100%":"50%",
            }}
          />
        </div>
      
        
        {/* Description Section */}
        <div
          style={{
            flex: 1, // equal share
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // textAlign: "center",
            padding: "1rem",
            width: "100%",
            flexDirection: "column",
          }}
        >
                    <div style={{
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      flexDirection:"row",
                      cursor:"pointer"
                    }}
                    onClick={()=>navigate('/bookdemo')}
                    >
                    
                  Get Started <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    marginLeft:"5px",
                  }}>
                    <GoArrowRight/>
                    </div>
                    </div>
      
          <p style={{ fontSize:isPortrait ? "" :  "1.2rem", lineHeight: isPortrait ? "" :"1.5rem" }}>
            {service.description}
          </p>
                    {/* <button type="submit" className="blog-button"> */}
      
                {/* </button> */}
        </div>
      
      
      
      
      
      
      </div>
      
      
      
      
                  </div>
      
      
      
      
      
                </motion.div>
      
                ):(
       <motion.div
                  key={index}
                  className="rounded-2xl p-6 bg-white text-gray-900 shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 border border-purple-200"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
      
                                <div 
                                style={{
          // boxShadow:"0 4px 20px rgba(0, 0, 0, 0.1)",
          // gap:"1rem",
              borderBottom: "2px solid rgba(0, 0, 0, 1.0)",
              marginBottom:"30px",
                            // borderTop:"2px solid rgb(0, 0, 0)",

      
      
                                }}
                            >
      
      
                            <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                  }}>
                    {isPortrait ? (
                      <h2 >{service.title}</h2>
                    ):(
                  <h1 >{service.title}</h1>
      
                    )}
                    
      
                  </div>
      
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: isPortrait ? "column" : "row",
          width: "100%",
          height: "100%", // optional, for vertical centering in column mode
          // gap: "1rem", // space between icon & text
          // margin:"20px",
          // borderBottom: "2px solid rgba(0, 0, 0, 1.0)",
           marginBottom:"30px",
        }}
      >
      
      
        {/* Description Section */}
        <div
          style={{
            flex: 1, // equal share
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // textAlign: "center",
            padding: "1rem",
            width: "100%",
            flexDirection: "column",
          }}
        >
      
      
          <p style={{ fontSize:isPortrait ? "" :  "1.2rem", lineHeight: isPortrait ? "" :"1.5rem" }}>
            {service.description}
          </p>
                        <div style={{
                      display:"flex",
                      justifyContent:"center",
                      alignItems:"center",
                      flexDirection:"row",
                      cursor:"pointer",
                    }}
                                  onClick={()=>navigate('/bookdemo')}
      
                    >
                    
                  Get Started <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    marginLeft:"5px",
                  }}>
                    <GoArrowRight/>
                    </div>
                    </div>
                    {/* <button type="submit" className="blog-button"> */}
      
                {/* </button> */}
        </div>
      
          {/* Lottie Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1, // equal width in row mode, equal height in column mode
            width: "100%",
            flexDirection: "column",
          }}
        >
      
          <Lottie
            className="lottie-animation"
            animationData={animations[service.jsonName]}  
            loop
            autoplay
            style={{
              width:  isPortrait ?"100%":"50%",
              height:  isPortrait ?"100%":"50%",
            }}
          />
        </div>
      
        
      
      
      
      
      
      
      
      </div>
      
      
      
      
                  </div>
      
      
      
      
      
                </motion.div>
                )
      
                }
      
               
                          </div>
      
      
      
      
              ))}
            </div>
          </div>

      </div>

</div>
    );
};

export default Home;
