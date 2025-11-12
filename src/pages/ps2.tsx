import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Coins from "./coins"
import coinEmoji from "../assets/animations/coin.json";
import Lottie from "lottie-react";
import androidAnime from "../assets/animations/android-anime.json"
import windowsAnime from "../assets/animations/windows.json"
        import playstationAnime from "../assets/animations/playstation.json"
        import Playstation2Icon from "../assets/animations/playstation-icon.svg"
        import PrizeModal from "../pages/prizemodal";
import Header from '../components/header';
import { IoSearch } from "react-icons/io5";





interface GameSpecs {
  title:any;
  size: any;
  price: any;
  coins: any;
  download_link: any;
  image_link: any;
  platform: any;
}



const PS2: React.FC = () => {
  const navigate = useNavigate();
                       const [isModalOpen, setIsModalOpen] = useState(false);
                                              const [gameData, setGameData] = useState<GameSpecs>({} as GameSpecs);



const [gameSpecs] = useState<GameSpecs[]>([
        
    {
    title: "God Of War III",
    size: "30 GB",
    price: "Price",
    coins: 100,
    download_link: "https://romsfun.com/download/god-of-war-iii-42825-34746/5",
    image_link: "https://romsfun.com/wp-content/uploads/2019/10/March-16-2010-300x345.jpg",
    platform: "PS3",
  },

  {
    title: "SmackDown Pain",
    size: "3 GB",
    price: "Price",
    coins: 50,
    download_link: "https://romsfun.com/download/wwe-smackdown-here-comes-the-pain-12960/3",
    image_link: "https://romsfun.com/wp-content/uploads/2019/09/2139896-box_wwesdhctp-300x381.png",
    platform: "PS2",
  },

    {
    title: "God Of War Ascension",
    size: "35 GB",
    price: "Price",
    coins: 100,
    download_link: "https://romsfun.com/download/god-of-war-ascension-41046/3",
    image_link: "https://romsfun.com/wp-content/uploads/2019/11/Ascension-ps3-300x345.jpg",
    platform: "PS3",
  },
  {
    title: "God Of War II",
    size: "7 GB",
    price: "Price",
    coins: 50,
    download_link: "https://romsfun.com/download/god-of-war-ii-12928/5",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/God-of-War-II-ps2-300x411.jpg",
    platform: "PS2",
  },

    {
    title: "MKSM",
    size: "3 GB",
    price: "Price",
    coins: 50,
    download_link: "https://romsfun.com/download/mortal-kombat-shaolin-monks-ps2-2-106937/3",
    image_link: "https://romsfun.com/wp-content/uploads/2023/05/Mortal-Kombat-Shaolin-Monks-300x423.jpg",
    platform: "PS2",
  },
        {
    title: "God Of War I",
    size: "7 GB",
    price: "Price",
    coins: 50,
    download_link: "https://romsfun.com/download/god-of-war-169969-70788/5",
    image_link: "https://romsfun.com/wp-content/uploads/2020/05/cover-God-Of-War-2-Ps2-Pal-Iso-300x416.jpeg",
    platform: "PS2",
  },
    {
    title: "Downhill Domination",
    size: "7 GB",
    price: "Price",
    coins: 50,
    download_link: "https://romsfun.com/download/downhill-domination-12988/4",
    image_link: "https://romsfun.com/wp-content/uploads/2019/09/downhill-domination-box-art-300x426.jpg",
    platform: "PS2",
  },
    {
    title: "God Hand",
    size: "2 GB",
    price: "Price",
    coins: 50,
    download_link: "https://romsfun.com/download/god-hand-13011/3",
    image_link: "https://romsfun.com/wp-content/uploads/2019/09/153422-God_Hand_Europe_EnFrDeEsIt-1482315106-300x424.jpg",
    platform: "PS2",
  },
    {
    title: "Urban Reign",
    size: "2 GB",
    price: "Price",
    coins: 50,
    download_link: "https://romsfun.com/download/urban-reign-71066/3",
    image_link: "https://romsfun.com/wp-content/uploads/2020/05/51E7QES99ML._SY445_-300x425.jpg",
    platform: "PS2",
  },
    {
    title: "Dragon Ball Z Budokai Tenkaichi 3",
    size: "2 GB",
    price: "Price",
    coins: 50,
    download_link: "https://romsfun.com/download/dragonball-z-budokai-tenkaichi-3-1-12934/2",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/Dragon-Ball-Z-Budokai-Tenkaichi-3-300x424.jpg",
    platform: "PS2",
  },
      {
    title: "Dragon Ball Z Budokai 3",
    size: "2 GB",
    price: "Price",
    coins: 20,
    download_link: "https://romsfun.com/download/dragon-ball-z-shin-budokai-11128/3",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/Dragon-Ball-Z-Shin-Budokai-300x523.jpg",
    platform: "PSP",
  },
  {
    title: "God of War Ghost of Sparta",
    size: "1 GB",
    price: "Price",
    coins: 20,
    download_link: "https://romsfun.com/download/god-of-war-ghost-of-sparta-id2-11101/9",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/God-of-War-Ghost-of-Sparta-300x514.jpg",
    platform: "PSP",
  },
      {
    title: "God of War Chains of Olympus",
    size: "1 GB",
    price: "Price",
    coins: 20,
    download_link: "https://romsfun.com/download/god-of-war-chains-of-olympus-11095/6",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/God-of-War-Chains-of-Olympus-1-300x485.jpg",
    platform: "PSP",
  },
]);
    const [searchTerm, setSearchTerm] = useState<string>("");
  
    const filteredGames = gameSpecs.filter((game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleDownload = (data : GameSpecs): void => {
        if (data.price === "Free") {
  window.open(data.download_link, "_blank", "noopener,noreferrer");
            return;
        }
        setIsModalOpen(true);
        setGameData(data);
};
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

  <div style={{
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
  }}>

    
               <div className='platform-button'

               onClick={() => navigate("/game")}>

              

<div style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center",
              alignItems:"center",

            }}>
                            Windows
                            

            </div>

            <div>
  <Lottie style={{
    height:"50px",
    width:"30px",
    marginLeft:"10px"
}} animationData={windowsAnime} loop autoplay />
            </div>
            
              </div>



                <div className='platform-button'

               onClick={() => navigate("/android")}
>

<div style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center",
              alignItems:"center",

            }}>
                            Android
                            

            </div>

            <div>
  <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />
            </div>
            
              </div>


{/* <div style={{
                display:"flex",
                flexDirection:"row",
                background:"#f1f1f1",
                              justifyContent:"center",
                              width:"160px",
                              borderRadius:"10px",
                              cursor:"pointer",

              }}

               onClick={() => navigate("/ps2")}>

              

<div style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center",
              alignItems:"center",
            }}>
                
                            <SiPlaystation2 style={{
                                fontSize:"50px",
                            }}/>
                            

            </div>
            <div>
                                      <img
              src={Playstation2Icon}
              alt="ps2"
              style={{ width: "50px", height: "40px" }}
              className="icon-bounce"
            />  
            </div>


            
              </div> */}




                  <div style={{
                display:"flex",
                flexDirection:"row",
                background:"#f1f1f1",
                              justifyContent:"center",
                              width:"160px",
                              borderRadius:"10px",
                              cursor:"pointer",

              }}

               >

              

            <div style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center",
              alignItems:"center",

            }}>
                            PlayStation
                            

            </div>
                            <div>
      <Lottie style={{
        height:"45px",
        width:"45px",
        marginLeft:"10px"
    }} animationData={playstationAnime} loop autoplay />
                </div>
                
              </div>
                            </div>



<div className='main-content'>



<div style={{
        display:"flex",
        // flexDirection:"column",
        flexWrap:"wrap",
justifyContent:"space-around",
gap:"20px",
      }}>


{filteredGames.map((data, index) => (
  <div key={index} className='ps2_box'>
    <div style={{
      display: "flex",
      justifyContent: "center",
      borderRadius: "10px",
    }}>
      <img
        style={{ borderRadius: "10px",
          height:"280px",
          width:"220px",
         }}
        src={data.image_link}
        alt=""
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
            <div>
                                      <img
              src={Playstation2Icon}
              alt="ps2"
              style={{ width: "50px", height: "40px" }}
              className="icon-bounce"
            />  
            </div>
            <div>
      <p>size {data.size}</p>

            </div>
    </div>

    <button
      className='course_box'
      onClick={() => handleDownload(data)}
    >
      <div className='game-button'>
        <h4>{data.price}</h4>
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
                      <PrizeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
data={gameData}
      >
        <div>
     <p>Coins required for one-time download.</p>
        <p>Reach out to customer support for assistance.</p>  
        </div>

   
            </PrizeModal>
  </div>
))}



    </div>

</div>





      </div>



    );
};

export default PS2;
