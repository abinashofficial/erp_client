import React, { useState } from 'react';
import Lottie from "lottie-react";
import coinEmoji from "../assets/animations/coin.json";
import windowsicon from "../assets/animations/windows.json"
import androidAnime from "../assets/animations/android-anime.json"
import { useNavigate } from 'react-router-dom';
import playstationAnime from "../assets/animations/playstation.json"
import { SiPlaystation2, SiPlaystation3 } from "react-icons/si";
import Playstation2Icon from "../assets/animations/playstation-icon.svg";
        import PrizeModal from "../pages/prizemodal";
        import Coins from "./coins"










interface GameSpecs {
  title:any;
  size: any;
  price: any;
  coins: any;
  download_link: any;
  image_link: any;
  platform: any;
}

const Game: React.FC = () => {
  const [gameSpecs] = useState<GameSpecs[]>([
    {
      title: "GTA V",
      size: "115 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?xgo0gvbkihr5un58ho3t",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657170/gtav_fnwq4x.jpg",
      platform: "PC",
    },
        {
      title: "NFS Most Wanted",
      size: "7 GB",
      price: "Free",
      coins: 0,
      download_link: "https://1fichier.com/?jqcarswzwebdl2m53vo6",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657434/nfsmw_snouw0.jpg",
      platform: "PC",
    },
        {
      title: "God Of War",
      size: "37 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?y5wqst42q5y2b46zt0t4",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657562/gow_lkvqp6.jpg",
      platform: "PC",
    },    {
      title: "Far cry 3",
      size: "12 GB",
      price: "Free",
      coins: 0,
      download_link: "https://1fichier.com/?tm29i5u619vnqsj4s2cq",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657619/farcry3_hshcr5.jpg",
      platform: "PC",
    },    {
      title: "God Of War Ragnarok",
      size: "120 GB",
      price: "Price",
      coins: 50,
      download_link: "https://gofile.io/d/o1o1m0",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657691/gowra_abt9a5.jpg",
      platform: "PC",
    },    {
      title: "COD Black Ops 2",
      size: "21 GB",
      price: "Free",
      coins: 0,
      download_link: "https://1fichier.com/?r7zq0shu9f301ylvj50w",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657781/codbo2_u6u97a.jpg",
      platform: "PC",
    },    {
      title: "It Takes Two",
      size: "44 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?w03is6ep4f523aoxbj62",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657846/ittakes2_ppaguj.jpg",
      platform: "PC",
    },    {
      title: "Spiderman Miles Morales",
      size: "50 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?8odokoodkd929sgashby",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657912/spidymiles_utbhh8.jpg",
      platform: "PC",
    },    {
      title: "Ghost Of Tshushima",
      size: "60 GB",
      price: "Price",
      coins: 50,
      download_link: "https://download.akirabox.com/uploads/users/v1RgzRVvzbpB/co3OBJoppmJMF0Iybde-Ghost%20of%20Tsushima%20-SteamGG.NET.zip?access=ANhhDZysWdyNTYzRWMzdWMkFHdhpXYl5GOhBXb",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657977/ghostoftshushima_z1nfqv.jpg",
      platform: "PC",
    },    {
      title: "Spiderman 2",
      size: "120 GB",
      price: "Price",
      coins: 50,
      download_link: "https://store3.gofile.io/download/web/efa3741f-19d1-4b3f-bddd-08f3aab045a9/Marvels-Spider-Man-2-SteamRIP.com.rar",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658033/spidy2_llaayr.jpg",
      platform: "PC",
    },    {
      title: "Red Dead Redemption 2",
      size: "115 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?ljo5eq6zgvs8p4wgbtk2",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658099/rdr2_rgmqmn.jpg",
      platform: "PC",
    },    {
      title: "Elden Ring",
      size: "65 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?fadbewy093pis0xhe5nj",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751657256/eldenring_z6exsg.jpg",
      platform: "PC",
    },    {
      title: "Ratchet and Clank",
      size: "50 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?0n1yh4d676g5juf8unqn",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658159/ratchet_g0bumh.jpg",
      platform: "PC",
    },    {
      title: "Batman Arkham Knight",
      size: "55 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?dpvhcbffsi1x0j92v8gj",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658260/batmanak_ql2j0e.jpg",
      platform: "PC",
    },    {
      title: "Days Gone",
      size: "50 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?0iy561ulmhs2a1dd9c2e",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658323/daysgone_xkeetf.jpg",
      platform: "PC",
    },    {
      title: "A Way Out",
      size: "25 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?e5ftvgs1bhjgkgz9n0vq",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658413/wayout_ce1dfq.jpg",
      platform: "PC",
    },    {
      title: "Detroit",
      size: "60 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?edn0b6iwl70ej7uh04ly",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658493/detroit_sqenxc.jpg",
      platform: "PC",
    },    {
      title: "The Witcher 3",
      size: "55 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?axbt4kd0kcfu2wxx2v3s",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658572/witcher3_bf9piu.jpg",
      platform: "PC",
    },    {
      title: "Stray",
      size: "7 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?rr3mhrab8of90kw3qoh4",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658662/stray_ajzpu3.jpg",
      platform: "PC",
    },    {
      title: "Sekiro",
      size: "16 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?0jagji1icdd009wn9h39",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658654/sekiro_h1otuk.jpg",
      platform: "PC",
    }, 
       {
      title: "Cyberpunk 2077",
      size: "80 GB",
      price: "Price",
      coins: 50,
      download_link: "https://1fichier.com/?3yuf4bdne7kvm6ojbxth",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751658642/cyberpunk_abatbz.jpg",
      platform: "PC",
    },
           {
      title: "X-Men",
      size: "3 GB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/16zcgvx6q4av839/X-Men.zip/file",
      image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751686298/xmenwolv_l9kojj.jpg",
      platform: "PC",
    },
               {
      title: "NFS Classic",
      size: "600 MB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/qqx37fcjrwvtjqz/NFS_Most_Wanted_2005.zip/file",
       image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751685683/nfs2005_td3vtq.jpg",
      platform: "PC",
    },
                   {
      title: "MotoGP 3",
      size: "200 MB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/pawk6g3nx6zc6ol/motogp_urt_3_demo.zip/file",
       image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751686623/motogp3_buzlxt.jpg",
      platform: "PC",
    },               {
      title: "Retro Games",
      size: "100 MB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/su0n3hnmt0uac8o/Mesen_%2528Windows_-_net8.0_-_AoT%2529.zip/file",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751686815/retro_ssxnka.jpg",
      platform: "PC",
    },               {
      title: "GTA SA",
      size: "600 MB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/q6lltylvlig7m9u/GTA_SA_setup.zip/file",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751669834/gtasa_z7hdgt.png",
      platform: "PC",
    },               {
      title: "GTA VC",
      size: "1.5 GB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/rntigjvd2u67lm3/GTA_VC.zip/file",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751839528/gta_vc_p3mhje.jpg",
      platform: "PC",
    },
    {
      title: "GTA 3",
      size: "200 MB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/g7ucp1wm15oax2o/GTA3_Setup.zip/file",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751688127/gta3_hltstf.jpg",
      platform: "PC",
    },                {
      title: "God Of War 1",
      size: "200 MB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/0tkp75zba783nd1/God_Of_War_1.zip/file",
         image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751687548/gow1_n2m3qx.jpg",
      platform: "PC",
    },
    {
      title: "God Of War 2",
      size: "200 MB",
      price: "Free",
      coins: 0,
      download_link: "https://www.mediafire.com/file/n1ltnkna70h70d6/God_of_War_2.zip/file",
        image_link: "https://res.cloudinary.com/dababspdo/image/upload/v1751687715/gow2_s4q05w.jpg",
      platform: "PC",
    },
    
  ]
)
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

<Coins isVisible={true} />
             

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginTop: "30px",
      }}>
    
        
                   <div style={{
                    display:"flex",
                    flexDirection:"row",
                                  justifyContent:"center",
                                  width:"160px",
                                  borderRadius:"10px",
                                  cursor:"pointer",
                                                      background:"#f1f1f1",

    
                  }}
    
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
    }} animationData={windowsicon} loop autoplay />
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
// margin:"50px",
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
    <div style={
      {
        fontSize:"30px"
      }
    }>
    <Lottie style={{
    height:"30px",
    width:"30px",
    marginLeft:"10px"
}} animationData={windowsicon} loop autoplay />

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
        <p>Coins required for one-time download.</p>
        <p>Reach out to customer support for assistance.</p>
      </PrizeModal>
  </div>
))}



    </div>
</div>
        {/* <ToastContainer/> */}
            </div>

    );
};

export default Game;
