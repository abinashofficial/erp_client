import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Coins from "./coins"
import coinEmoji from "../assets/animations/coin.json";
import Lottie from "lottie-react";
import androidAnime from "../assets/animations/android-anime.json"
import windowsAnime from "../assets/animations/windows.json"
    import { useAuth } from "../context/authContext"
        import { toast, ToastContainer } from 'react-toastify';
        import playstationAnime from "../assets/animations/playstation.json"

        import { SiPlaystation2, SiPlaystation3 } from "react-icons/si";
        import Playstation2Icon from "../assets/animations/playstation-icon.svg"







interface SignupFormData {
  employee_id:any;
  first_name: any;
  last_name: any;
  full_name: any;
  mobile_number: any;
  email: any;
  date_of_birth: any;
  gender: any;
  password: any;
  confirmPassword:any;
  photo_url:any;
  country_code:any;
  access_token:any;
  coins:any;
}

interface GameSpecs {
  title:any;
  size: any;
  price: any;
  coins: any;
  download_link: any;
  image_link: any;
  platform: any;
}

const useSSE = (userId: string, updateCoins: (coins: number) => void) => {
  useEffect(() => {
    const source = new EventSource(`https://erp-iliw.onrender.com/events?userId=${userId}`);

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Coins updated:", data);
      updateCoins(data.coins);
    };

    return () => {
      source.close();
    };
  }, [userId]);
};

const PS3: React.FC = () => {
  const navigate = useNavigate();
      const { empDetail, visible, setEmpDetail} = useAuth();
          const [liveUpdate, setLiveUpdate] = useState<any | null>(null);
                  useEffect(() => {
                setLiveUpdate(empDetail.coins);
              }, [empDetail.coins]);
              
              useSSE(empDetail.email, (coins) => {
              setLiveUpdate(coins);
              });
      
              const [error, setError] = useState<string >("");
      
                            const [formData, setFormData] = useState<SignupFormData>({
                  employee_id:empDetail.employee_id,
                  first_name: empDetail.first_name,
                  last_name: empDetail.last_name,
                  full_name: empDetail.full_name,
                  mobile_number: empDetail.mobile_number,
                  email: empDetail.email,
                  date_of_birth: empDetail.date_of_birth,
                  gender: empDetail.gender,
                  password: "",
                  confirmPassword: "",
                  photo_url: empDetail.photo_url,
                  country_code:empDetail.countryCode,
                  access_token: empDetail.access_token,
                  coins:empDetail.coins, 
                     });

const [gameSpecs, setGameSpecs] = useState<GameSpecs[]>([
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
  
        const AddCoins = async (add :any, msg :string) => {
    const updatedFormData = {
      ...formData,
      coins: add,
    };
  
    const apiUrl = 'https://erp-iliw.onrender.com/public/updateprofile';
  
    try {

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${empDetail.access_token}`,
        },
        body: JSON.stringify(updatedFormData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
  
        console.log('Updated employee data:', updatedFormData);
                                  setEmpDetail({...empDetail,
              employee_id: updatedFormData.employee_id,
              first_name: updatedFormData.first_name,
              last_name: updatedFormData.last_name,
              full_name:updatedFormData.full_name,
              mobile_number: updatedFormData.mobile_number,
              email: updatedFormData.email,
              date_of_birth: updatedFormData.date_of_birth,
              gender: updatedFormData.gender,
              password: "",
              photo_url:updatedFormData.photo_url,
              access_token:updatedFormData.access_token,
              country_code:updatedFormData.country_code,
              coins:updatedFormData.coins,
          })
        // setEmpDetail(updatedFormData);
  
  
        toast.success(msg);
        return
      } else if (response.status === 500) {
          setError('Internal server error');
        alert(result.message);
        return
      } else {
          setError('Update failed');
        console.error('Update failed:', result);
        return
      }
    } catch (error) {
      setError('Internal server error');
      alert('Internal server error');
      console.error('Error:', error);
      return
    }
  };

  const handleDownload = (data : GameSpecs): void => {
        // const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        // if (isMobile) {
        //     alert('Download links only work on PC or Laptop devices.');
        //     return;
        // }
        if (data.price === "Free") {
  window.open(data.download_link, "_blank", "noopener,noreferrer");
            return;
        }

    if(liveUpdate >= data.coins && data.price==="Price"  && error === "") {
            AddCoins(liveUpdate-data.coins, "you have downloaded the game");

        console.log("You have enough coins to download this game.");

  window.open(data.download_link, "_blank", "noopener,noreferrer");
    }else{
        alert("You don't have enough coins to download this game. Please add coins.")
    }
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
  </div>
))}







    </div>
</div>
        <ToastContainer/>

      </div>



    );
};

export default PS3;
