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
      title: 'Smart Booking',
    description: 'Simplify scheduling and eliminate manual coordination with an intelligent smart booking system. Our solution enables seamless appointment management, real-time availability, automated confirmations, and calendar integrations. Designed to enhance user convenience and operational efficiency, Smart Booking reduces no-shows, saves time, and ensures a smooth booking experience for both businesses and customers.',
    url:"https://erp-management-mu.vercel.app/",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767054074/Booking_Calender_mh7kir.json",
    jsonName:"booking_gif",
  },
    {
    title: 'Digital Marketing',
    description: 'Accelerate your business growth with comprehensive digital marketing solutions designed to increase visibility, engagement, and conversions. We craft data-driven strategies that combine SEO to improve organic search rankings, SEM for high-impact paid campaigns, and content marketing that educates and builds trust. Our social media marketing focuses on creating meaningful interactions, strengthening brand identity, and nurturing leads across platforms.',
    url:"",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1763229782/digital-marketing-anime_ggzuwy.json", // Anime-style fairy
    jsonName:"digital_marketing_anime",
  },
  {
      title: 'AI Chat Bot',
    description: 'Enhance customer engagement and streamline operations with an intelligent AI-powered business chatbot. Our solution provides instant customer support, answers queries accurately, automates lead qualification, and integrates seamlessly with your business systems. Deliver personalized, 24/7 interactions that improve customer satisfaction, reduce response time, and convert conversations into meaningful business outcomes.',
    url:"https://erp-management-mu.vercel.app/",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767037104/Robot-Bot_3D_bhaksb.json",
    jsonName:"chatbot",
  },

  
        {
      title: 'Genzy QR Code',
    description: 'Modernize customer interactions with Genzy QR Code solutions designed for speed and convenience. Create dynamic, customizable QR codes for payments, menus, websites, bookings, and promotions. With real-time analytics, easy updates, and seamless scanning across devices, Genzy QR Codes help businesses connect offline experiences to digital engagement effortlessly.',
    url:"https://erp-management-mu.vercel.app/",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767051515/QR_code_jgjhcy.json",
    jsonName:"qrcode_gif",
  },
          {
      title: 'Two Factor Authentication',
    description: 'Strengthen account security with robust two-factor authentication that adds an extra layer of protection beyond passwords. Our 2FA solutions support OTPs, authenticator apps, and multi-device verification to prevent unauthorized access. Designed for reliability and ease of use, it safeguards user data, reduces fraud risks, and builds trust across your digital platforms.',
    url:"https://erp-management-mu.vercel.app/",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767051760/Two_factor_authentication_mblp5c.json",
    jsonName:"2fa_gif",
  },
            {
      title: 'Payment Integration',
    description: 'Enable fast, secure, and seamless digital transactions with reliable payment integration solutions. We integrate trusted payment gateways to support multiple payment methods, real-time processing, and automated invoicing. Built with security and scalability in mind, our solutions ensure smooth checkout experiences, reduce payment failures, and help businesses get paid effortlessly.',
    url:"https://erp-management-mu.vercel.app/",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767051918/Online_Payment_iqf0go.json",
    jsonName:"payment_gif",
  },
  //             {
  //     title: 'Google Review',
  //   description: 'Boost your online reputation and customer trust with an automated 5-star rating and Google review solution. Make it easy for customers to share feedback, increase positive reviews, and improve local search visibility. Our system helps businesses build credibility, attract new customers, and stand out with a strong, trusted online presence.',
  //   url:"",
  //   jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767054769/googlereview_zmyr5o.json",
  //   jsonName:"review_gif",
  // },
                {
      title: 'Customer Reviews & Ratings',
    description: 'Customer Reviews & Ratings is a platform that collects, manages, and displays feedback from customers about products or services. It allows users to submit ratings, write reviews, and share experiences, while businesses can monitor and respond to feedback. The system provides analytics to track satisfaction trends and identify improvement areas. This enhances customer trust, engagement, and service quality.',
    url:"",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1767915934/Review_jfvfub.json",
    jsonName:"review_gif",
  },
                {
      title: 'E-Commerce',
    description: 'Launch a powerful online store with our e-commerce development services. We create secure, scalable, and high-performing e-commerce platforms tailored to your business needs, equipped with features like payment integration, inventory management, and customer-centric UX for a seamless shopping experience.',
    url:"",
    jsonLink: "https://res.cloudinary.com/dababspdo/raw/upload/v1763230092/ecommerceanime_amqcue.json",
    jsonName:"commerce_gif",
  },

];

export default function Consumer() {

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
