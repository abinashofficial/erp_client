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


const PS3: React.FC = () => {
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
    title: "God Of War Ascension",
    size: "35 GB",
    price: "Price",
    coins: 50,
    download_link: "https://downloads.romspedia.com/roms/God%20of%20War%20-%20Ascension%20%28UK%29.7z",
    image_link: "https://romsfun.com/wp-content/uploads/2019/11/Ascension-ps3-300x345.jpg",
    platform: "PS3",
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
              style={{ width: "50px", height: "40px" }}
              className="icon-bounce"
            />  
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
        <div style={{
            display: "flex",
            flexWrap: "wrap",
        }}>
      <h3>{data.title}</h3>

        </div>
      <div style={{ fontSize: "50px" }}>
        <Lottie
          style={{
            height: "50px",
            width: "50px",
            marginLeft: "10px",
          }}
          animationData={playstationAnime}
          loop
          autoplay
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
        <p>Coins required for one-time download</p>
      </PrizeModal>
  </div>

))}







    </div>
</div>
        {/* <ToastContainer/> */}

      </div>



    );
};

export default PS3;
