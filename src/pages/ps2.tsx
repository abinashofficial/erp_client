import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Coins from "./coins"
import coinEmoji from "../assets/animations/coin.json";
import Lottie from "lottie-react";
import androidAnime from "../assets/animations/android-anime.json"
import windowsAnime from "../assets/animations/windows.json"
        import playstationAnime from "../assets/animations/playstation.json"
        import { SiPlaystation2, SiPlaystation3 } from "react-icons/si";
        import Playstation2Icon from "../assets/animations/playstation-icon.svg"
        import PrizeModal from "../pages/prizemodal";




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
    coins: 50,
    download_link: "https://downloads.romspedia.com/roms/God%20of%20War%20III%20%28USA%29%20%28v02.00%29.7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/10/March-16-2010-300x345.jpg",
    platform: "PS3",
  },

  {
    title: "SmackDown Pain",
    size: "3 GB",
    price: "Price",
    coins: 20,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/WWE%20SmackDown!%20Here%20Comes%20the%20Pain%20(USA).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/09/2139896-box_wwesdhctp-300x381.png",
    platform: "PS2",
  },

    {
    title: "God Of War Ascension",
    size: "35 GB",
    price: "Price",
    coins: 50,
    download_link: "https://downloads.romspedia.com/roms/God%20of%20War%20-%20Ascension%20%28UK%29.7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/11/Ascension-ps3-300x345.jpg",
    platform: "PS3",
  },
  {
    title: "God Of War II",
    size: "7 GB",
    price: "Price",
    coins: 20,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/God%20of%20War%20II%20(USA).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/God-of-War-II-ps2-300x411.jpg",
    platform: "PS2",
  },

    {
    title: "MKSM",
    size: "3 GB",
    price: "Price",
    coins: 20,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/Mortal%20Kombat%20-%20Shaolin%20Monks%20(USA).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2023/05/Mortal-Kombat-Shaolin-Monks-300x423.jpg",
    platform: "PS2",
  },
        {
    title: "God Of War I",
    size: "7 GB",
    price: "Price",
    coins: 20,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/God%20of%20War%20(USA).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2020/05/cover-God-Of-War-2-Ps2-Pal-Iso-300x416.jpeg",
    platform: "PS2",
  },
    {
    title: "Downhill Domination",
    size: "7 GB",
    price: "Price",
    coins: 20,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2Europe/isos/Downhill%20Domination%20(Europe)%20(En,Fr,De,Es,It).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/09/downhill-domination-box-art-300x426.jpg",
    platform: "PS2",
  },
    {
    title: "God Hand",
    size: "2 GB",
    price: "Price",
    coins: 20,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/God%20Hand%20(USA).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/09/153422-God_Hand_Europe_EnFrDeEsIt-1482315106-300x424.jpg",
    platform: "PS2",
  },
    {
    title: "Urban Reign",
    size: "2 GB",
    price: "Price",
    coins: 20,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2Europe/isos/Urban%20Reign%20(Europe)%20(En,Fr,De,Es,It).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2020/05/51E7QES99ML._SY445_-300x425.jpg",
    platform: "PS2",
  },
    {
    title: "Dragon Ball Z Budokai Tenkaichi 3",
    size: "2 GB",
    price: "Price",
    coins: 20,
    download_link: "https://dl.mprd.se/happyXXtd72mal901realEP/Playstation2/DragonBall%20Z%20-%20Budokai%20Tenkaichi%203%20(USA)%20(En,Ja).7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/Dragon-Ball-Z-Budokai-Tenkaichi-3-300x424.jpg",
    platform: "PS2",
  },
      {
    title: "Dragon Ball Z Shin Budokai",
    size: "2 GB",
    price: "Price",
    coins: 10,
    download_link: "https://downloads.romspedia.com/roms/Dragon%20Ball%20Z%20-%20Shin%20Budokai%20%28USA%29.zip",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/Dragon-Ball-Z-Shin-Budokai-300x523.jpg",
    platform: "PSP",
  },
  {
    title: "God of War Ghost of Sparta",
    size: "1 GB",
    price: "Price",
    coins: 10,
    download_link: "https://downloads.romspedia.com/roms/God%20of%20War%20-%20Ghost%20of%20Sparta%20%28USA%29%20%28En%2CFr%2CEs%29%20%28v2.00%29.zip",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/God-of-War-Ghost-of-Sparta-300x514.jpg",
    platform: "PSP",
  },
      {
    title: "God of War Chains of Olympus",
    size: "1 GB",
    price: "Price",
    coins: 10,
    download_link: "https://s3.us-east-2.amazonaws.com/sorrywlcriteria/vbfb200hgf/God-Of-War-Chains-Of-Olympus-PPSSPP-Highly-Com-876284.zip?",
    image_link: "https://romsfun.com/wp-content/uploads/2019/08/God-of-War-Chains-of-Olympus-1-300x485.jpg",
    platform: "PSP",
  },
]);
  
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
<Coins isVisible={true} />

  <div style={{
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "30px",  
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
gap:"50px",
      }}>


{gameSpecs.map((data, index) => (
  <div key={index} className='service_box'>
    <div style={{
      display: "flex",
      justifyContent: "center",
      borderRadius: "10px",
      height: "400px",
    }}>
      <img
        style={{ borderRadius: "10px" }}
        src={data.image_link}
        alt=""
        sizes="10px"
      />
    </div>

    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      textAlign: "center",
    }}>
      <h3>{data.title}</h3>
            <div>
                                      <img
              src={Playstation2Icon}
              alt="ps2"
              style={{ width: "50px", height: "40px" }}
              className="icon-bounce"
            />  
            </div>
      <p>size {data.size}</p>
    </div>

    <button
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
            style={{
              height: "40px",
              width: "40px",
              marginLeft: "10px",
            }}
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
        <p>Coins required for one-time download.</p>
        <p>Reach out to customer support for assistance.</p>      </PrizeModal>
  </div>
))}



    </div>

</div>

        {/* <ToastContainer/> */}




      </div>



    );
};

export default PS2;
