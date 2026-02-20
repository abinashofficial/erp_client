import React from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram   } from 'react-icons/fa';

import { FaThreads } from "react-icons/fa6";

import { SiGmail } from 'react-icons/si';




// interface Project {
//   title: string;
//   description: string;
// }


const Footer: React.FC = () => {

    return (
<footer>
        <div className="social-media-icons">
        <a href="https://in.linkedin.com/company/shindentech" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} />
        </a>
        <a href="https://wa.me/+919940463927" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={30} />
        </a>
        <a href="https://www.instagram.com/shindentech" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
        </a>

<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=shindentechnologies@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
>
  <SiGmail size={30} />
</a>
        <a href="https://www.threads.com/@shindentech" target="_blank" rel="noopener noreferrer">
            <FaThreads  size={30} />
        </a>
        
    </div>

    <p style={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
    }}>
        {/* <div>
        <a href="https://erp-client-pink.vercel.app/terms" target="_blank" rel="noopener noreferrer">
    Terms 
  </a>
        </div> */}
        <div>
        {/* <p>&copy; 2024 Prison Birds</p> */}
© Copyright Shindentech All Rights Reserved
        </div>

        {/* <div>
        <a href="https://erp-client-pink.vercel.app/privacypolicy" target="_blank" rel="noopener noreferrer">
    Privacy
  </a>.
        </div> */}


 
</p>

    </footer>




    );
};

export default Footer;
