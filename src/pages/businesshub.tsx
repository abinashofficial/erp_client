import  { useEffect, useState } from "react";
import { motion } from 'framer-motion';
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
    description: 'Inventory Management is a centralized system that tracks and controls stock levels across locations in real time. It manages item procurement, storage, issuance, and replenishment with role-based access. The system provides alerts, reports, and audit trails to prevent shortages or overstocking. This ensures operational efficiency, accuracy, and cost optimization.',
    url:"https://erp-management-mu.vercel.app/",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767037336/Inventory_ii73n0.json",
    jsonName:"inventory_gif",
  },
  // {
  //   title: 'Check - in / out',
  //   description: 'Employee Check-in/Check-out feature using QR code scanning for accurate attendance tracking. Each employee is assigned a unique QR code, which they scan at entry and exit points to record their working hours automatically. The data is stored in the system for attendance monitoring, shift management, and productivity analysis. This ensures secure, contactless, and real-time attendance tracking across the packaging facility.',
  //       url:"https://www.youtube.com/watch?v=Gb6ADWcMLEY",
  //   jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767038588/security_qntgz8.json",
  //       jsonName:"CheckIn_gif",
  // },
    {
    title: 'Cybersecurity',
    description: 'Cybersecurity is a comprehensive security framework designed to protect applications, systems, and data from digital threats. It enforces secure access through authentication, authorization, and encryption across users and services. The system monitors, detects, and responds to threats in real time. This ensures data integrity, system availability, and customer trust.',
        url:"https://www.youtube.com/watch?v=Gb6ADWcMLEY",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767038588/security_qntgz8.json",
        jsonName:"Cyber_gif",
  },
  {
      title: 'AI Chat Bot',
    description: 'AI Business Chatbot is an intelligent, automated assistant designed to handle customer interactions and business queries in real time. It can answer FAQs, assist with bookings, payments, and support requests using natural language understanding. The chatbot integrates with business systems to provide accurate, personalized responses. This improves customer engagement, reduces response time, and lowers support costs.',
    url:"https://shindentech.vercel.app",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767037104/Robot-Bot_3D_bhaksb.json",
    jsonName:"chatbot",
  },
      {
      title: 'Payroll Management',
    description: 'Payroll Management is a role-based system that automates employee salary processing and compensation workflows. It handles attendance, allowances, deductions, taxes, and statutory compliance accurately. The system generates payslips, manages payment schedules, and maintains audit-ready records. This ensures timely payroll, reduced errors, and regulatory compliance.',
    url:"https://payroll-ruby-xi.vercel.app",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767917188/Woman_payment_schedule_sheet_with_calendar_j2jviv.json",
    jsonName:"payroll_gif",
  },

      {
      title: 'Invoice Management',
    description: 'The Invoice Management System (IMS) is a role-based platform that streamlines invoicing operations across roles such as Admin, Finance, Sales, and Customers. Each role has dedicated interfaces to manage invoice creation, approvals, payments, and records efficiently. The system supports end-to-end workflows from invoice generation to delivery, payment tracking, and reconciliation. It ensures accuracy, compliance, traceability, and improved cash-flow management.',
    url:"https://shindentech.vercel.app",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767051377/Invoice_Template_Preview_vwkycy.json",
    jsonName:"invoice_gif",
  },
        {
      title: 'Ticket Management',
    description: 'Ticket Management is a centralized system for tracking and resolving customer or internal support requests efficiently. It allows users to raise tickets, assigns them to the right teams with defined priorities and SLAs, and tracks progress in real time. The system supports communication, escalation, and resolution workflows. This ensures faster response times, accountability, and improved service quality.',
    url:"https://shindentech.vercel.app",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1763230169/Itsupportanime_t1vdrx.json",
    jsonName:"ticket_gif",
  },
          {
      title: 'Human Resource Management',
    description: 'Human Resource Management is a centralized, role-based platform that manages the complete employee lifecycle within an organization. It handles recruitment, onboarding, attendance, leave, payroll, and performance tracking through dedicated workflows. The system ensures policy compliance, secure data management, and transparent processes. This improves HR efficiency, employee experience, and organizational productivity.',
    url:"https://shindentech.vercel.app",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767913620/We_are_hiring_jduohm.json",
    jsonName:"hrms_gif",
  },
            {
      title: 'Digital Financial Services',
    description: 'Digital Financial Services is a technology-driven platform that provides secure, online access to banking, payments, lending, and investment services. It enables users to perform transactions, manage accounts, and access financial products seamlessly through web or mobile interfaces. The system ensures real-time processing, compliance, and data security. This enhances financial accessibility, convenience, and customer trust.',
    url:"https://shindentech.vercel.app",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767914355/money_zbsqe1.json",
    jsonName:"dfs_gif",
  },
              {
      title: 'Attendance Management',
    description: 'Attendance Management is a role-based system that tracks and records employee attendance, leaves, and working hours accurately. It integrates with biometric devices, web portals, or mobile apps to capture real-time data. The system supports approvals, reports, and compliance with organizational policies. This ensures transparency, punctuality, and streamlined HR operations.',
    url:"https://shindentech.vercel.app",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767915437/attendance_gxx5o5.json",
    jsonName:"attendance_gif",
  },
                {
      title: 'Customer Analytics',
    description: 'Customer Analytics is a data-driven platform that collects and analyzes customer behavior, preferences, and interactions across channels. It provides insights on buying patterns, engagement, and churn risks to help businesses make informed decisions. The system supports segmentation, personalization, and predictive modeling for targeted strategies. This improves customer experience, retention, and business growth.',
    url:"https://shindentech.vercel.app",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767037180/Payroll_woz07x.json",
    jsonName:"analytics_gif",
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
                             <motion.div
            key={index}
            className="rounded-2xl p-6 bg-white text-gray-900 shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 border border-purple-200"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            style={{ transformStyle: 'preserve-3d' }}
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
          </motion.div>
  </div>

                      ))}
                                    </div>


             

 </div>




         






  );
}
