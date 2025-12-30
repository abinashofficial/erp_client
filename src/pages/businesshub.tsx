import  { useEffect, useState } from "react";
// import { motion } from 'framer-motion';
import Lottie from "lottie-react";




import Header from '../components/header';
import { GoArrowRight } from "react-icons/go";
// import { dividerClasses } from "@mui/material";




  interface Animations {
  [key: string]: any; // JSON object for each Lottie animation
}
  const services = [
  {
    title: 'Inventory Management',
    description: 'The Packaging Management System (PMS) is a role-based platform that streamlines packaging operations across roles like Employee, Project Lead, Inventory Lead, Packer, and Quality Lead. Each role has dedicated interfaces to manage tasks, inventory, packing, and quality checks efficiently. The system covers end-to-end workflows from project creation to packing, inspection, and closure, ensuring traceability and accountability. Overall, it enhances collaboration, quality control, and operational efficiency in packaging management.',
    url:"https://erp-management-mu.vercel.app/",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767037336/Inventory_ii73n0.json",
    jsonName:"inventory_gif",
  },
  {
    title: 'Check - in / out',
    description: 'Employee Check-in/Check-out feature using QR code scanning for accurate attendance tracking. Each employee is assigned a unique QR code, which they scan at entry and exit points to record their working hours automatically. The data is stored in the system for attendance monitoring, shift management, and productivity analysis. This ensures secure, contactless, and real-time attendance tracking across the packaging facility.',
        url:"https://www.youtube.com/watch?v=Gb6ADWcMLEY",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767038588/security_qntgz8.json",
        jsonName:"CheckIn_gif",
  },
  {
      title: 'AI Chat Bot',
    description: 'The Packaging Management System (PMS) is a role-based platform that streamlines packaging operations across roles like Employee, Project Lead, Inventory Lead, Packer, and Quality Lead. Each role has dedicated interfaces to manage tasks, inventory, packing, and quality checks efficiently. The system covers end-to-end workflows from project creation to packing, inspection, and closure, ensuring traceability and accountability. Overall, it enhances collaboration, quality control, and operational efficiency in packaging management.',
    url:"https://erp-management-mu.vercel.app/",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767037104/Robot-Bot_3D_bhaksb.json",
    jsonName:"chatbot",
  },
    {
      title: 'Payroll Management',
    description: 'The Packaging Management System (PMS) is a role-based platform that streamlines packaging operations across roles like Employee, Project Lead, Inventory Lead, Packer, and Quality Lead. Each role has dedicated interfaces to manage tasks, inventory, packing, and quality checks efficiently. The system covers end-to-end workflows from project creation to packing, inspection, and closure, ensuring traceability and accountability. Overall, it enhances collaboration, quality control, and operational efficiency in packaging management.',
    url:"https://erp-management-mu.vercel.app/",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767037180/Payroll_woz07x.json",
    jsonName:"payroll_gif",
  },
      {
      title: 'Invoice Management',
    description: 'The Packaging Management System (PMS) is a role-based platform that streamlines packaging operations across roles like Employee, Project Lead, Inventory Lead, Packer, and Quality Lead. Each role has dedicated interfaces to manage tasks, inventory, packing, and quality checks efficiently. The system covers end-to-end workflows from project creation to packing, inspection, and closure, ensuring traceability and accountability. Overall, it enhances collaboration, quality control, and operational efficiency in packaging management.',
    url:"https://erp-management-mu.vercel.app/",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767051377/Invoice_Template_Preview_vwkycy.json",
    jsonName:"invoice_gif",
  },
];

export default function Business() {

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
      



          


<div style={{
  display:"flex",
  flexWrap:"wrap",
  justifyContent:"space-around",
  gap:"30px",
}}>



                      {services.map((service, index) => (

    <div
className="project_box"
  >

<div style={{
        display: "flex",
      justifyContent: "center",
      alignItems: "center",
}}>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flex: 1, // equal width in row mode, equal height in column mode
      // width: "100%",
      // flexDirection: "column",
    }}
  >

    <Lottie
      className="lottie-animation"
      animationData={animations[service.jsonName]}  
      loop
      autoplay
      style={{
        width:  "80%",
        height: "100%",
      }}
    />
  </div>
  </div>





  <div>


    <p style={{ fontSize:isPortrait ? "" :  "1rem", lineHeight: isPortrait ? "" :"1.2rem", color:"grey" }}>
     
                   <div  style={{
              display:"flex",
              justifyContent:"center",
              color:"#3E5055"
            }}>
                   <h3 >{service.title}</h3>
      </div>
       <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"end",
                flexDirection:"row",
                cursor:"pointer",
                // height:"100%",
                marginBottom:"10px",
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
      {service.description}
    </p>

                            </div>

  


              {/* <button type="submit" className="blog-button"> */}

          {/* </button> */}
  </div>

                      ))}
                                    </div>


             

 </div>




         






  );
}
