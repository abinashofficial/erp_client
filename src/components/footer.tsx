import React from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram, FaEarlybirds } from 'react-icons/fa';


import { SiGmail } from 'react-icons/si';




interface Project {
  title: string;
  description: string;
}


const Footer: React.FC = () => {

    return (
<footer>
        <p>&copy; 2024 Abinas Chinnasamy</p>
        <div className="social-media-icons">
        <a href="https://www.linkedin.com/in/abinash-chinnasamy-1330741a0" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} />
        </a>
        <a href="https://wa.me/+919940463927" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={30} />
        </a>
        <a href="https://www.instagram.com/__abinash__?utm_source=qr" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
        </a>

        <a href="mailto:abinash1411999@gmail.com">
            <SiGmail size={30} />
        </a>
        
    </div>
    </footer>




    );
};

export default Footer;
