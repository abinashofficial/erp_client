import React from 'react';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";

import DigitalMarketingIcon from "../assets/animations/digital-marketing-anime.json";
import WebDesignAnime from "../assets/animations/webdesignanime.json"
import ECommerceAnime from "../assets/animations/ecommerceanime.json"
import ItSupportAnime from "../assets/animations/Itsupportanime.json"
import ItServiceAnime from "../assets/animations/serviceanime.json"
import Header from '../components/header';

const services = [
  {
    title: 'Digital Marketing',
    description: 'Boost your brand visibility and reach through comprehensive digital marketing strategies. Our services include SEO to enhance search engine rankings, SEM for targeted ads, engaging content marketing, and strategic social media campaigns that captivate your audience and convert leads into loyal customers.',
    icon: DigitalMarketingIcon, // Anime-style fairy
  },
  {
    title: 'Web Design & Development',
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
  return (
    <div className='main-content' style={{
              marginTop:"40px",

    }}>
      <Header/>
      

    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white">


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div>

          <motion.div
            key={index}
            className="rounded-2xl p-6 bg-white text-gray-900 shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 border border-purple-200"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div style={{
              marginTop:"20px",
            }}>

            </div>
            <div style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
            }}>
              
            <h2 >{service.title}</h2>

            </div>
            <div style={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
            }}>
            <Lottie  className="lottie-animation" 
 animationData={service.icon} loop autoplay />
            </div>

            <div style={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    gap:"100px",
            }}>
            <p className="text-gray-700 text-center">{service.description}</p>

            </div>

          </motion.div>
                    </div>

        ))}
      </div>
    </div>
        </div>

  );
}
