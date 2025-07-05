import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Coins from "../pages/coins"
import coinEmoji from "../assets/animations/coin.json";
import Lottie from "lottie-react";
import androidAnime from "../assets/animations/android-anime.json"
import windowsAnime from "../assets/animations/windows.json"
        import playstationAnime from "../assets/animations/playstation.json"
                import { SiPlaystation2, SiPlaystation3  } from "react-icons/si";
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


    
const Android: React.FC = () => {
    const [gameSpecs] = useState<GameSpecs[]>([
      {
        title: "GTA SA",
        size: "3 GB",
        price: "Free",
        coins: 0,
        download_link: "https://dl.apkvision.org/grand-theft-auto-san-andreas/GTA-SA-v2.11.277-full-mod-money-apkvision.apk",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751669834/gtasa_z7hdgt.png",
        platform: "Android",
      },
            {
        title: "NFS Most Wanted",
        size: "3 GB",
        price: "Free",
        coins: 0,
        download_link: "https://cdn700.onehost.io/2023/Need_For_Speed_Most_Wanted_1.3.128_1695274246_latestmodapks.com.apk",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657434/nfsmw_snouw0.jpg",
        platform: "Android",
      },      {
        title: "Naruto ultimate ninja storm",
        size: "4 GB",
        price: "Free",
        coins: 0,
        download_link: "https://dl.apkvision.org/naruto-ultimate-ninja-storm/Ultimate-Ninja-STORM-v1.2.6-unlocked-apkvision.apk",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751669959/naruto_wshd5b.jpg",
        platform: "Android",
      },      {
        title: "Leo's fortune",
        size: "1 GB",
        price: "Free",
        coins: 0,
        download_link: "https://dl.apkvision.org/leo039s-fortune/Leos-Fortune-v1-0-11-patched-apkvision.apk",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751670018/leo_s_ydbnru.jpg",
        platform: "Android",
      },      {
        title: "Grid Autosport",
        size: "3 GB",
        price: "Free",
        coins: 0,
        download_link: "https://dl.apkvision.org/grid-autosport/grid-autosport-1.10.2RC1-mod-apkvision.apk",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751670076/autogrid_qv1enl.jpg",
        platform: "Android",
      },      {
        title: "PPSSPP Gold",
        size: "50 MB",
        price: "Free",
        coins: 0,
        download_link: "https://dl.apkvision.org/ppsspp-gold-psp-emulator/ppsspp-gold_1.18.1-apkvision.apk",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751670145/ppsspp_vrrbam.png",
        platform: "Android",
      },      {
        title: "Vector Classic",
        size: "150 MB",
        price: "Free",
        coins: 0,
        download_link: "https://dl.apkvision.org/vector-classic/Vector-Full-v1.4.3-full-apkvision.apk",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751670206/vector_vrebrp.jpg",
        platform: "Android",
      },      {
        title: "Shadow Fight 2 Special Edition",
        size: "3 GB",
        price: "Free",
        coins: 0,
        download_link: "https://dl.apkvision.org/shadow-fight-2-se/shadow-fight-2-se-mod-v1.0.12-apkvision.org.apk",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751670261/shadowfight2_yhgnqu.jpg",
        platform: "Android",
      },      {
        title: "Hitman Sniper",
        size: "700 MB",
        price: "Free",
        coins: 0,
        download_link: "https://dl.apkvision.org/hitman-sniper/hitman-sniper-mod_1.15.13-apkvision.apk",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751670336/hitmansniper_m4r3yp.jpg",
        platform: "Android",
      },      {
        title: "Hitman Blood Money Reprisal",
        size: "3 GB",
        price: "Free",
        coins: 0,
        download_link: "https://dl.apkvision.org/hitman-blood-money-reprisal/hitman-bmr-v1.2RC13-apkvision.apks",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751670451/hitmanblood_wrnhoj.jpg",
        platform: "Android",
      },      {
        title: "Zarchiever",
        size: "3 GB",
        price: "Free",
        coins: 0,
        download_link: "https://play.google.com/store/apps/details?id=ru.zdevs.zarchiver&pcampaignid=web_share",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751670505/zarchiever_nzdsqq.jpg",
        platform: "Android",
      },      {
        title: "Ps2 Emulator",
        size: "3 GB",
        price: "Free",
        coins: 0,
        download_link: "https://download851.mediafire.com/z2plezkyzufgZ-dInywDleKmQgFruP7j4FPgdsvqm6VKwmGco66lq5Jmdnc4IVNpGBDboKo_pUklHeo8Qh8I6Scr1OLn8Zwz1PJ9SApm-h1wKaIWAWX2pyJkEL9mxQea0qXFZDL8hzptLunBZRI4ltCB1ophDUq3nFrqtmcBdfgYgg/xm1v86q9q6ssj4j/Aethersx2.zip",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751670553/aether_lwvnec.png",
        platform: "Android",
      }, 
    ]);

  const navigate = useNavigate();
          
                         const [isModalOpen, setIsModalOpen] = useState(false);
                                                    const [gameData, setGameData] = useState<GameSpecs>({} as GameSpecs);
      
 
  

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
  <Coins/>

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



                <div style={{
                display:"flex",
                flexDirection:"row",
                background:"#f1f1f1",
                              justifyContent:"center",
                              width:"160px",
                              borderRadius:"10px",
                              cursor:"pointer",

              }}

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


                             <div className='platform-button'

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
              style={{ width: "50px", height: "45px" }}
                            className="icon-bounce"
            />  
            </div>


            
              </div>




                  <div className='platform-button'

               onClick={() => navigate("/ps3")}>

              

<div style={{
              display:"flex",
              justifyContent:"center",
              alignContent:"center",
              alignItems:"center",
fontSize:"50px"
            }}>
                            <SiPlaystation3/>
                            

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
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",
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
    <div style={{
      fontSize:"50px"
    }}>
    {/* < FcAndroidOs/> */}
        <Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={androidAnime} loop autoplay />

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
              height: "50px",
              width: "50px",
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
        <p>Coins required for one-time download</p>
      </PrizeModal>
  </div>
))}

    </div>
</div>

      </div>



    );
};

export default Android;
