import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Coins from "../pages/coins"
import coinEmoji from "../assets/animations/coin.json";
import Lottie from "lottie-react";
import androidAnime from "../assets/animations/android-anime.json"
import windowsAnime from "../assets/animations/windows.json"
    import { useAuth } from "../context/authContext"
        import { toast, ToastContainer } from 'react-toastify';






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

const Android: React.FC = () => {
  const navigate = useNavigate();
      const { empDetail, visible, setEmpDetail} = useAuth();
          const [liveUpdate, setLiveUpdate] = useState<any | null>(null);
          
      
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
  
        const AddCoins = async (add :any, msg :string) => {
    const updatedFormData = {
      ...formData,
      coins: add,
    };
  
    const apiUrl = 'https://erp-iliw.onrender.com/public/updateprofile';
  
    try {
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

  const handleDownload = (url: string, free :boolean): void => {
        // const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        // if (isMobile) {
        //     alert('Download links only work on PC or Laptop devices.');
        //     return;
        // }
        if (free){
  window.open(url, "_blank", "noopener,noreferrer");
            return;
        }

    if(empDetail.coins && empDetail.coins >= 50 && !free && error === "") {
            AddCoins(liveUpdate-50, "you have downloaded the game");

        console.log("You have enough coins to download this game.");

  window.open(url, "_blank", "noopener,noreferrer");
    }else{
        alert("You don't have enough coins to download this game. Please add coins.")
    }
};
    return (


      <div>
  <Coins/>

  <div style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
    width:"50px",
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

                            </div>



<div className='main-content'>



<div style={{
        display:"flex",
        // flexDirection:"column",
        flexWrap:"wrap",
justifyContent:"space-around",
gap:"50px",
      }}>



 <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/png;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>GTA SA</h3>
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
    <p>size 3gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/grand-theft-auto-san-andreas/GTA-SA-v2.11.277-full-mod-money-apkvision.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>





       <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>NFS Most Wanted</h3>
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
    <p>size 1gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://cdn700.onehost.io/2023/Need_For_Speed_Most_Wanted_1.3.128_1695274246_latestmodapks.com.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>








  <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Naruto ultimate ninja storm</h3>
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
    <p>size 4gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/naruto-ultimate-ninja-storm/Ultimate-Ninja-STORM-v1.2.6-unlocked-apkvision.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>









        <div className='service_box'>
        <div style={{
        display:"flex",
        justifyContent:"center",
        borderRadius:"10px",

        }}>
        <img style={{
        borderRadius:"10px"}} src="data:image/jpeg;base64,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" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Leo's fortune</h3>
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
    <p>size 1gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://dl.apkvision.org/leo039s-fortune/Leos-Fortune-v1-0-11-patched-apkvision.apk", true)}

  >
    
<div className='game-button'>
    <h3>Download</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
Free
</div>

</div>

  </button>
 
      </div>

      




    </div>
</div>

      </div>



    );
};

export default Android;
