import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Coins from "../pages/coins"
import Header from '../components/header';
import Lottie from "lottie-react";


interface Animations {
  [key: string]: any; // JSON object for each Lottie animation
}




interface Services {
  title:any;
  image_link: any;
    json_link?: any
  page_link?: any
  icon_link?:any
}

const Service: React.FC = () => {
  const navigate = useNavigate();
    const [animations, setAnimations] = useState<Animations>({});
      const [serviceSpec] = useState<Services[]>([
        {
          title: "Professional Development Course",
          image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753636436/course_nkny1h.jpg",
          json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1759009564/animation_luhjne.json",
          page_link:"/course",
          icon_link:"https://res.cloudinary.com/dababspdo/image/upload/v1765337643/Video-Player--Streamline-Ultimate_jpkfzb.svg",
        },
                {
          title: "Products",
          image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1753636468/projects_ufutjn.jpg",
          json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1759010200/man_working_with_projects_management_animation_gif_download_10674170_z97wak.json",
                    page_link:"/project",
                    icon_link:"https://res.cloudinary.com/dababspdo/image/upload/v1765337469/App-Window-Pie-Chart--Streamline-Ultimate_yobcdl.svg",

        },  
                        {
          title: "UI/UX & Web Development",
          image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1761924976/web_designs_hnzsa9.jpg",
          json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761925151/data_analysis_nkhubi.json",
                    page_link:"/webdesigns",
                    icon_link:"https://res.cloudinary.com/dababspdo/image/upload/v1765337719/Analytics-Pie-2--Streamline-Ultimate_hptcej.svg",

        },
      ]);

          useEffect(() => {
          // Fetch all JSONs in parallel
          const fetchAnimations = async () => {
            const anims  :any ={};
            await Promise.all(
              serviceSpec.map(async (course) => {
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
        }, [serviceSpec]);
          const [activeCardId, setActiveCardId] = useState<string | null>(null);

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
gap:"20px",
// margin:"50px",
      }}>
        {serviceSpec.map((data, index) => (
  <div key={index} className='pc_box'
             onClick={() => {
  navigate(data.page_link);
}}
  >
    
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
      height:"50px",
    }}>
      <h4>{data.title}</h4>
      <img src={data.icon_link} alt="logo" />

    {/* <div >
    <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px",
    marginRight: "10px",
  


}} animationData= {animations[data.title]} loop autoplay />

    </div> */}
    </div>


    {/* <button
      className='course_box'
 onClick={() => {
  navigate(data.page_link);
}}
    >
      <div className='game-button'>
        <h3>{data.title}</h3>
      </div>
    </button> */}

  </div>
))}



    </div>
</div>

      </div>



    );
};

export default Service;
