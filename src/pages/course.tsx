import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import coinEmoji from "../assets/animations/coin.json";
import Coins from "../pages/coins"
import Header from '../components/header';
import { IoSearch } from "react-icons/io5";








interface Animations {
  [key: string]: any; // JSON object for each Lottie animation
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
    json_link?: any
}
const Course: React.FC = () => {
  const [animations, setAnimations] = useState<Animations>({});
    const [courseSpec] = useState<CourseSpecs[]>([
      {
        title: "Golang",
        description: "Developed by Google, known for its efficiency and concurrency, gaining popularity in cloud infrastructure and backend development.",
        price: "Free",
        coins: 0,
        project_link: "",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1752076352/golang_mmibq2.png",
        pdf_link:"",
        video_link:"https://www.youtube.com/playlist?list=PLJ7-HiqskdZKn03J2X0y37agMrYCnhvEU",
        language: "Tamil",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1758973649/Gopher_b9ao3c.json",
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
                json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1758975314/React_icon_circling_czl5iy.json",

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
                json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1758975359/Python_logo_wrevwv.json",

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
                json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1758975404/Java_logo_hxrtjf.json",

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
                json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1758976666/SQL_ur03jh.json",

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
                json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1758977382/mongodb_database_logo_animation_gif_download_9717087_sybcku.json",

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
                json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1758976395/Nodejs_uouygr.json",

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
                json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1758976442/c_programming_animation_jfbcyg.json",

      },      
    ]);

      useEffect(() => {
    // Fetch all JSONs in parallel
    const fetchAnimations = async () => {
      const anims  :any ={};
      await Promise.all(
        courseSpec.map(async (course) => {
          try {
            const res = await fetch(course.json_link); // each course has its JSON URL
            const data = await res.json();
            anims[course.title] = data; // store by course id
          } catch (err) {
            console.error("Failed to load animation:", err);
          }
        })
      );
      setAnimations(anims);
    };

    fetchAnimations();
  }, [courseSpec]);
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredGames = courseSpec.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
    
    return (


      <div>
        <Header/>

<Coins isVisible={true} />
             <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",  
        marginBottom:"20px",            
             }}>
              {/* <IoSearch />
                      <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> */}
         <div style={{ position: "relative" }}>
    <IoSearch
      style={{
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#999",
      }}
    />
    <input
      type="text"
      placeholder="Search by title"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        width: "100%",
        padding: "10px 10px 10px 35px", // extra left padding for icon
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
      }}
    />
  </div>
             </div>


      <div className='main-content'>



<div style={{
        display:"flex",
        // flexDirection:"column",
        flexWrap:"wrap",
justifyContent:"space-around",
gap:"20px",
// margin:"50px",
      }}>
        {filteredGames.map((data, index) => (
  <div key={index} className='pc_box'>
    
    <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
         cursor:"pointer",
                  background:"white",

    }}
    onMouseEnter={() => setActiveCardId(data.title)}
          onMouseLeave={() => setActiveCardId(null)}
          onTouchStart={() => setActiveCardId(data.title)}
          onTouchEnd={() => setActiveCardId(null)}
      >
               {animations[data.title] && activeCardId === data.title ? (
            <Lottie
              style={{ height: "150px", width: "260px" }}
              animationData={animations[data.title]}
              loop
              autoplay
            />
          ) : (
            
      <img
        style={{ borderRadius: "10px",
          width: "260px",
          height: "150px",
         }}
        src={data.image_link}
        alt=""
        sizes="5px"
      />
                 )}

    </div>

    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      textAlign: "center",
    }}>
      <h4>{data.title}</h4>

      {/* <p>size {data.size}</p> */}
    </div>

    <button
      className='course_box'
          onClick={() =>
      window.open(
        data.video_link,
        "_blank",
        "noopener,noreferrer"
      )
    }
    >
      <div className='game-button'>
        <h3>{data.price}</h3>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          textAlign: "center",
        }}>
          <Lottie
  className='button-coin'
            animationData={coinEmoji}
            loop
            autoplay
          />
          {data.coins}
        </div>
      </div>
    </button>
                      {/* <PrizeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
data={gameData}
      >
        <p>Coins required for one-time download.</p>
        <p>Reach out to customer support for assistance.</p>
      </PrizeModal> */}
  </div>
))}



    </div>
</div>

</div>




    );
};

export default Course;
