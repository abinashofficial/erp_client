import  { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Lottie from "lottie-react";




import Header from '../components/header';
import { GoArrowRight } from "react-icons/go";




  interface Animations {
  [key: string]: any; // JSON object for each Lottie animation
}
  const services = [
  {
    title: 'Package Management',
    description: 'The Packaging Management System (PMS) is a role-based platform that streamlines packaging operations across roles like Employee, Project Lead, Inventory Lead, Packer, and Quality Lead. Each role has dedicated interfaces to manage tasks, inventory, packing, and quality checks efficiently. The system covers end-to-end workflows from project creation to packing, inspection, and closure, ensuring traceability and accountability. Overall, it enhances collaboration, quality control, and operational efficiency in packaging management.',
    url:"https://erp-management-mu.vercel.app/",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1763229080/package_gif_a4w3j8.json",
    jsonName:"package_gif",
  },
  {
    title: 'Check - in / out',
    description: 'Employee Check-in/Check-out feature using QR code scanning for accurate attendance tracking. Each employee is assigned a unique QR code, which they scan at entry and exit points to record their working hours automatically. The data is stored in the system for attendance monitoring, shift management, and productivity analysis. This ensures secure, contactless, and real-time attendance tracking across the packaging facility.',
        url:"https://www.youtube.com/watch?v=Gb6ADWcMLEY",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1763229017/checkin_tgqw20.json",
        jsonName:"CheckIn_gif",


  },
];

export default function Projects() {

   const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
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
    <div className='main-content' style={{
              marginTop:"70px",

    }}>
      <Header/>
      

    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white">


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
                cursor:"pointer",
              }}
              onClick={() => window.open(service.url, "_blank")}>
              
            Explore <div style={{
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
                            onClick={() => window.open(service.url, "_blank")}>

              
            Explore <div style={{
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

  );
}
