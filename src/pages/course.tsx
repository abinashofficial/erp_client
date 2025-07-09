import { useAuth } from '../context/authContext';
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram, FaEarlybirds } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import coinEmoji from "../assets/animations/coin.json";
import ReactPlayer from 'react-player/youtube';
import Coins from "../pages/coins"
import { SiGmail } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { colors } from '@mui/material';
import Header from '../components/header';




interface Project {
  title: string;
  description: string;
}


interface CourseSpecs {
  title:any;
  description: any;
  price: any;
  coins: any;
  project_link: any;
  image_link: any;
  pdf_link: any;
  video_link:any
    language:any


}
const Course: React.FC = () => {
    const [courseSpec] = useState<CourseSpecs[]>([
      {
        title: "Glang",
        description: "Developed by Google, known for its efficiency and concurrency, gaining popularity in cloud infrastructure and backend development.",
        price: "Free",
        coins: 0,
        project_link: "",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752076352/golang_mmibq2.png",
        pdf_link:"",
        video_link:"https://www.youtube.com/playlist?list=PLJ7-HiqskdZKn03J2X0y37agMrYCnhvEU",
        language: "Tamil",
      },
            {
        title: "React",
        description: "React is a JavaScript library for building user interfaces, not a programming language itself. It's a tool that simplifies the development of interactive and dynamic web applications by using a component-based approach. React is focused on the 'view' or frontend of an application. ",
        price: "Free",
        coins: 0,
        project_link: "",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752076551/react_zrskiu.jpg",
        pdf_link:"",
        video_link:"https://www.youtube.com/watch?v=CgkZ7MvWUAA&list=LL&index=47&t=4279s",
        language: "English",
      },
                  {
        title: "Python",
        description: "Known for its readability and versatility, widely used in web development, data science, machine learning, and scripting.",
        price: "Free",
        coins: 0,
        project_link: "",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752076858/python_fgom1y.jpg",
        pdf_link:"",
        video_link:"https://www.youtube.com/playlist?list=PLvepBxfiuao1hO1vPOskQ1X4dbjGXF9bm",
        language: "Tamil",
      },            {
        title: "Java",
        description: "A robust language used for enterprise-level applications, Android mobile development, and big data processing.",
        price: "Free",
        coins: 0,
        project_link: "",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752077090/java_gwtsap.jpg",
        pdf_link:"",
        video_link:"https://www.youtube.com/watch?v=Gex-j7GlCHc",
        language: "Tamil",
      },     
       {
        title: "Postgre SQL",
        description: "Structured query language (SQL) is a programming language for storing and processing information in a relational database. A relational database stores information in tabular form, with rows and columns representing different data attributes and the various relationships between the data values.",
        price: "Free",
        coins: 0,
        project_link: "",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752077213/sql_coy39y.jpg",
        pdf_link:"",
        video_link:"https://www.youtube.com/watch?v=qw--VYLpxG4&t=681s",
        language: "English",
      },  {
        title: "MongoDB",
        description: "MongoDB is a popular, open-source, NoSQL database that stores data in flexible, JSON-like documents. It's known for its scalability, flexibility, and ease of use, making it a popular choice for modern web and mobile applications. Unlike traditional relational databases, MongoDB uses a document-oriented data model, where data is stored in documents (similar to JSON) rather than tables and rows.",
        price: "Free",
        coins: 0,
        project_link: "",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752077418/mongodb_aqohbv.png ",
        pdf_link:"",
        video_link:"https://www.youtube.com/watch?v=0zwYbudzaJc",
        language: "tamil",
      },  {
        title: "NodeJS",
        description: "Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser. It is built on Google Chrome's V8 JavaScript engine, which compiles JavaScript into machine code for efficient execution.",
        price: "Free",
        coins: 0,
        project_link: "",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752077605/nodejs_rabjb2.jpg",
        pdf_link:"",
        video_link:"https://www.youtube.com/watch?v=AZzV3wZCvI4&list=PL78RhpUUKSwfeSOOwfE9x6l5jTjn5LbY3",
        language: "English",
      },  {
        title: "C and C++",
        description: "C and C++ are both programming languages, but C++ is an extension of C with object-oriented programming (OOP) features added. C is a procedural language, while C++ supports both procedural and object-oriented programming. C++ was developed to add OOP capabilities to the already existing C language.",
        price: "Free",
        coins: 0,
        project_link: "",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752078826/c_x0gyrr.jpg",
        pdf_link:"",
        video_link:"https://www.youtube.com/watch?v=ZzaPdXTrSb8",
        language: "English",
      },      
    ]);
    
    return (


      <div>
        <Header/>

<Coins isVisible={true} />
<div className='main-content'>


<div style={{
        display:"flex",
        // flexDirection:"column",
        flexWrap:"wrap",
justifyContent:"space-around",
gap:"50px",
      }}>


        {courseSpec.map((data, index) => (

      <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        }}>
        <img src={data.image_link}  alt="" sizes='10px' />

        </div>



<button
 className='course_box'
    onClick={() =>
      window.open(
        "https://youtube.com/playlist?list=PLJ7-HiqskdZKn03J2X0y37agMrYCnhvEU&si=SehUd4Ev-QOKgGWp",
        "_blank",
        "noopener,noreferrer"
      )
    }
  >
  
<div className='game-button'>
    <h3>View Course</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
{data.price}
</div>

</div>

  </button>
 
      </div>
      ))}




    </div>





      </div>

</div>




    );
};

export default Course;
