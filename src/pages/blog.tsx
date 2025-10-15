import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Lottie from "lottie-react";

import DigitalMarketingIcon from "../assets/animations/digital-marketing-anime.json";
import WebDesignAnime from "../assets/animations/webdesignanime.json"
import ECommerceAnime from "../assets/animations/ecommerceanime.json"
import ItSupportAnime from "../assets/animations/Itsupportanime.json"
import ItServiceAnime from "../assets/animations/serviceanime.json"
import Header from '../components/header';
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom';



const services = [
  {
    title: 'Digital Marketing',
    description: 'Boost your brand visibility and reach through comprehensive digital marketing strategies. Our services include SEO to enhance search engine rankings, SEM for targeted ads, engaging content marketing, and strategic social media campaigns that captivate your audience and convert leads into loyal customers.',
    icon: DigitalMarketingIcon, // Anime-style fairy
  },
  {
    title: 'Web Development',
    description: 'Craft visually stunning and user-friendly websites with our modern web design and development solutions. We build responsive, accessible, and lightning-fast web applications using cutting-edge technologies, ensuring your online presence is both functional and captivating across all devices.',
    icon: WebDesignAnime, // Anime wizard
  },
  {
    title: 'E-Commerce Development',
    description: 'Launch a powerful online store with our e-commerce development services. We create secure, scalable, and high-performing e-commerce platforms tailored to your business needs, equipped with features like payment integration, inventory management, and customer-centric UX for a seamless shopping experience.',
    icon: ECommerceAnime, // Anime elf
  },
  {
    title: 'Technical Support',
    description: 'Stay worry-free with our round-the-clock technical support. Whether it’s software troubleshooting, system maintenance, or hardware configuration, our expert team ensures your IT infrastructure runs smoothly, minimizing downtime and maximizing productivity.',
    icon: ItSupportAnime, // Anime superhero
  },
  {
    title: 'IT Services',
    description: 'Empower your business with our full spectrum of IT services. From network setup and infrastructure management to cloud solutions and cybersecurity, we provide enterprise-grade IT support that scales with your growth and adapts to evolving technological needs.',
    icon: ItServiceAnime, // Anime genie
  },
];

export default function Blog() {
   const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
    const navigate = useNavigate()
   

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
    <div className='main-content' style={{
              marginTop:"70px",

    }}>
      <Header/>
      

    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white">


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (



          <div>
                                  {index%2==0 ? (
            
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
      animationData={service.icon}  
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
      animationData={service.icon}  
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

  );
}
