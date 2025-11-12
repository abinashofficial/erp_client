import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
// import coinEmoji from "../assets/animations/coin.json";
// import windowsicon from "../assets/animations/windows.json"
// import androidAnime from "../assets/animations/android-anime.json"
// import { useNavigate } from 'react-router-dom';
// import playstationAnime from "../assets/animations/playstation.json"
        // import PrizeModal from "../pages/prizemodal";
        import Coins from "./coins"
import Header from '../components/header';
import { IoSearch } from "react-icons/io5";
// import LawAnime from "../assets/animations/law.json"











interface GameSpecs {
  title:any;
  size: any;
  price: any;
  coins: any;
  download_link: any;
  image_link: any;
  platform: any;
  json_link:any;
  page_link:any;
}

interface Animations {
  [key: string]: any; // JSON object for each Lottie animation
}

const WebDesigns: React.FC = () => {
        const [animations, setAnimations] = useState<Animations>({});
    
  const [gameSpecs] = useState<GameSpecs[]>([
        {
      title: "PetCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2024/03/waGGy.png",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761940921/animals_tnr4xj.json",
  page_link:"https://themewagon.github.io/waggy/",
    },

    {
      title: "PetCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/07/anipat.webp",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761940921/animals_tnr4xj.json",
  page_link:"https://themewagon.github.io/petsitting/",
    },
        {
      title: "PetCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/11/petsitting-1.webp",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761940921/animals_tnr4xj.json",
  page_link:"https://themewagon.github.io/anipat/",
    },
            {
      title: "PetCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/06/petcare-1.webp",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761940921/animals_tnr4xj.json",
  page_link:"https://technext.github.io/petcare/index.html",
    },


            {
      title: "HealthCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2021/12/dentcare-1.png",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761941257/hospital_mlubpv.json",
  page_link:"https://themewagon.github.io/dentcare/",
    },

                {
      title: "HealthCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2021/08/medic.png",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761941257/hospital_mlubpv.json",
  page_link:"https://themewagon.github.io/medic-care/",
    },
                {
      title: "HealthCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2021/06/novena-1.png",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761941257/hospital_mlubpv.json",
  page_link:"https://themewagon.github.io/novena/",
    },
                {
      title: "HealthCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/08/Healthcouch.png",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761941257/hospital_mlubpv.json",
  page_link:"https://themewagon.github.io/healthcouch/",
    },
                    {
      title: "HealthCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/08/healthcoach.jpg",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761941257/hospital_mlubpv.json",
  page_link:"https://themewagon.github.io/healthcoach/",
    },
                    {
      title: "HealthCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/06/acupuncture.jpg",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761941257/hospital_mlubpv.json",
  page_link:"https://themewagon.github.io/acupuncture/",
    },
                    {
      title: "HealthCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/01/docmed.webp",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761941257/hospital_mlubpv.json",
  page_link:"https://themewagon.github.io/docmed/",
    },
                        {
      title: "HealthCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2018/04/Health-center-ft-Free-HTML5-Bootstrap-Medical-Template-1.jpg",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761941257/hospital_mlubpv.json",
  page_link:"https://themewagon.github.io/health-center/",
    },
                        {
      title: "HealthCare Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/06/MedicalCenter-1.jpg",
      platform: "PC",
        json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761941257/hospital_mlubpv.json",
  page_link:"https://themewagon.github.io/medicalcenter/",
    },
    








    {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/12/judge.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/judge/",
    },
        {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/09/justlaw.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/justlaw/",
    },
        {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/08/lawmaker-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://technext.github.io/lawmaker/index.html",
    },
        {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/07/lawncare-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/lawncare/",
    },
        {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/07/kanun-1.png",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/kanun/",
    },
            {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/06/notary.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/notary/",
    },
            {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/06/law-firm.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/law-firm/",
    },
                {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/05/adalot-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/adalot/",
    },
                    {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/05/judicial-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/judicial/",
    },
                    {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/05/thelawfirm-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/thelawyer/",
    },
                    {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/04/ariclaw-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/ariclaw/",
    },
                        {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2020/02/legalcare-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/legalcare/",
    },
                        {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2019/12/lawyer.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/lawyer/",
    },
                        {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2019/12/JD-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/jd/",
    },
                        {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2019/06/lawride-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/lawride/",
    },
                        {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2018/12/lawful-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://technext.github.io/lawful/index.html",
    },
                            {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2018/12/lawful-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://technext.github.io/lawful/index.html",
    },
                            {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2018/09/StarLaw.webp",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/star-law/",
    },
                            {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2018/09/Lawfirm-free-HTML5-lawyer-website-template-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/lawfirm/",
    },
                            {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2017/11/Law.webp",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/law/",
    },
                                {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2017/11/Law.webp",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/law/",
    },
                                    {
      title: "Law Templates",
      size: "120 GB",
      price: "Price",
      coins: 100,
      download_link: "",
      image_link: "https://themewagon.com/wp-content/uploads/2016/05/free-lawyer-attorney-law-firm-website-template1-1.jpg",
      platform: "PC",
              json_link:"https://res.cloudinary.com/dababspdo/raw/upload/v1761926061/law_fffkle.json",
  page_link:"https://themewagon.github.io/Texas-Lawyer-2/",
    },
    
  ]
)
//   const navigate = useNavigate();




            // const [isModalOpen, setIsModalOpen] = useState(false);
            // const [gameData, setGameData] = useState<GameSpecs>({} as GameSpecs);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredGames = gameSpecs.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

//   const handleDownload = (data : GameSpecs): void => {
//         if (data.price === "Free") {
//   window.open(data.download_link, "_blank", "noopener,noreferrer");
//             return;
//         }
//         setIsModalOpen(true);
//         setGameData(data);
// };


          useEffect(() => {
          // Fetch all JSONs in parallel
          const fetchAnimations = async () => {
            const anims  :any ={};
            await Promise.all(
              gameSpecs.map(async (course) => {
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
        }, [gameSpecs]);



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
      }}
      >
      
        {filteredGames.map((data, index) => (
  <div key={index} className='pc_box'         onClick={() => window.open(data.page_link, "_blank")}>
    
    <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",
    }}>
      <img
        style={{ borderRadius: "10px",
          width: "260px",
                    height: "150px",

         }}
        src={data.image_link}
        alt=""
        sizes="5px"
      />
    </div>

    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      textAlign: "center",
    }}>
      <h4>{data.title}</h4>
    <div >
    <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px",
    marginRight: "10px",
  


}} animationData= {animations[data.title]} loop autoplay />

    </div>
      {/* <p>size {data.size}</p> */}
    </div>

    {/* <button
      className='course_box'
      onClick={() => handleDownload(data)}
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
    </button> */}
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

export default WebDesigns;
