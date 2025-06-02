import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import coinEmoji from "../assets/animations/coin.json";
import windowsicon from "../assets/animations/windows.json"
    import { useAuth } from "../context/authContext"
    import { toast, ToastContainer } from 'react-toastify';
    import PresenceTracker from "../utils/presenceTracker";
import { FaGooglePay, FaWindows } from "react-icons/fa";

    import phonepayIcon from "../assets/animations/phonepe.svg";
    import gpayIcon from "../assets/animations/google-pay-primary-logo-logo-svgrepo-com.svg";
    import upiIcon from "../assets/animations/upi.svg";
import { ImAndroid } from "react-icons/im";
import { FcAndroidOs } from "react-icons/fc";
import androidAnime from "../assets/animations/android-anime.json"
import { useNavigate } from 'react-router-dom';




 
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
const Game: React.FC = () => {
    const { empDetail, visible, setEmpDetail} = useAuth();
    const [apear, setApear] = useState(false);
  const navigate = useNavigate();

    const [liveUpdate, setLiveUpdate] = useState<any | null>(null);
        const [error, setError] = useState<string >("");

    

    useEffect(() => {
  setLiveUpdate(empDetail.coins);
}, [empDetail.coins]);

useSSE(empDetail.email, (coins) => {
setLiveUpdate(coins);
});



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


  const handleUPIPayment = async (coin :any) => {
    if (!empDetail.employee_id){
      alert('Please signup to add coins.');
      return
    }
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
      alert('UPI payment links only work on mobile devices with UPI apps like GPay or PhonePe.');
      return;
    }

    const upiLink = `upi://pay?pa=abinash1411999-1@oksbi&pn=abinash&am=${coin}&cu=INR&tn=${encodeURIComponent(
      'for game purchase'
    )}`;
    window.location.href = upiLink;
        await sleep(10000); // wait for 10 seconds
    AddCoins(liveUpdate +coin, "Coins added successfully"); // Call your actual function here
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
          <PresenceTracker />
          {visible ? (
            <div>
              

<div>

<div style={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    flexWrap:"wrap",

}}>
    
                <h2>Hi... {empDetail.full_name}</h2>

                <h2 style={{
                        marginLeft:"50px",
                }}>
                Total coins : {liveUpdate}

                </h2>

                            <div style={{
            height:"100px",
            width:"100px",
        }}>
<Lottie style={{
  transform: "scale(0.5)",
}} animationData={coinEmoji} loop autoplay />

        </div>

        {!apear?(
          <div>
<button onClick={()=>setApear(!apear)} style={{
    backgroundColor:"gold",
    color:"black",
    borderRadius:"10px",

    cursor:"pointer",
}}>
    <div style={{
        fontSize:"12px",
        fontWeight:"bolder",
    }}>
        Add Coins

    </div>
</button>
          </div>
        ):(
          <div>

          </div>
        )}


</div>


{apear ? (
    <div style={{
      display:"flex",
      justifyContent:"space-around",
      flexWrap:"wrap",
      gap:"50px",
      marginTop:"20px",
    }}>

    <div className="form-container">
<form onSubmit={(e) => {
  e.preventDefault();
  handleUPIPayment(50);
}}>


    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white border border-gray-200 text-center">
      <h2 className="text-2xl font-bold mb-4 text-yellow-600">🔥 Limited Time Offer!</h2>
      
      <div className="common-div">
        <Lottie style={{
    height:"30px",
    width:"30px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay /> <span className="font-semibold">1 Coin = ₹50</span>
        </div>

              <div className="common-div">
        <Lottie style={{
    height:"30px",
    width:"30px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay /> <span className="font-semibold">50 Coin = ₹2500</span>
        </div>



      
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg px-4 py-2 my-4">
        <strong>Now Get 50 Coins = ₹50</strong>
      </div>
                    <div className="common-div">
<div>
      <p  style={{
        backgroundColor:"#CC0C39",
        color:"white",
        width:"150px",

      }}>Offer ends soon!</p>

</div>
        </div>



    </div>
          <button className="grab-offer-btn">
        Grab Offer
      </button>
      <div>
                                  <img
        src={upiIcon}
        alt="upiicon"
        style={{ width: "50px", height: "50px" }}
      />  

                <img
        src={phonepayIcon}
        alt="PhonePe"
        style={{ width: "100px", height: "50px" }}
      />  

                      <img
        src={gpayIcon}
        alt="gpay"
        style={{ width: "50px", height: "50px" }}
      />  
          </div>

</form>
    </div>



    



        <div className="form-container">
<form onSubmit={(e) => {
  e.preventDefault();
  handleUPIPayment(275);
}}>


    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white border border-gray-200 text-center">
      <h2 className="text-2xl font-bold mb-4 text-yellow-600">🔥 Ultimate Offer!</h2>
      
      <div className="common-div">
        <Lottie style={{
    height:"30px",
    width:"30px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay /> <span className="font-semibold">1 Coin = ₹50</span>
        </div>

              <div className="common-div">
        <Lottie style={{
    height:"30px",
    width:"30px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay /> <span className="font-semibold">300 Coin = ₹15000</span>
        </div>



      
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg px-4 py-2 my-4">
        <strong>Now Get 300 Coins = ₹275</strong>
      </div>
                    <div className="common-div">
<div>
      <p  style={{
        backgroundColor:"#CC0C39",
        color:"white",
        width:"150px",

      }}>Offer ends soon!</p>

</div>
        </div>



    </div>
          <button className="grab-offer-btn">
        Grab Offer

          </button>

          <div>
                                  <img
        src={upiIcon}
        alt="upiicon"
        style={{ width: "50px", height: "50px" }}
      />  

                <img
        src={phonepayIcon}
        alt="PhonePe"
        style={{ width: "100px", height: "50px" }}
      />  

                      <img
        src={gpayIcon}
        alt="gpay"
        style={{ width: "50px", height: "50px" }}
      />  
          </div>


</form>
    </div>




      <div className="form-container">
<form onSubmit={(e) => {
  e.preventDefault();
  handleUPIPayment(450);
}}>


    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white border border-gray-200 text-center">
      <h2 className="text-2xl font-bold mb-4 text-yellow-600">🔥 Mega Offer!</h2>
      
      <div className="common-div">
        <Lottie style={{
    height:"30px",
    width:"30px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay /> <span className="font-semibold">1 Coin = ₹50</span>
        </div>

              <div className="common-div">
        <Lottie style={{
    height:"30px",
    width:"30px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay /> <span className="font-semibold">500 Coin = ₹25000</span>
        </div>



      
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg px-4 py-2 my-4">
        <strong>Now Get 500 Coins = ₹450</strong>
      </div>
                    <div className="common-div">
<div>
      <p  style={{
        backgroundColor:"#CC0C39",
        color:"white",
        width:"150px",

      }}>Offer ends soon!</p>

</div>
        </div>



    </div>
          <button className="grab-offer-btn">
        Grab Offer
      </button>
      <div>
                                  <img
        src={upiIcon}
        alt="upiicon"
        style={{ width: "50px", height: "50px" }}
      />  

                <img
        src={phonepayIcon}
        alt="PhonePe"
        style={{ width: "100px", height: "50px" }}
      />  

                      <img
        src={gpayIcon}
        alt="gpay"
        style={{ width: "50px", height: "50px" }}
      />  
          </div>

</form>
    </div>




        </div>
 
):(
  <div>
  </div>
)}

        <ToastContainer/>
    </div>


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
        width:"50px",
        marginLeft:"10px"
    }} animationData={windowsicon} loop autoplay />
                </div>
                
                  </div>
    
    
    
                    <div style={{
                    display:"flex",
                    flexDirection:"row",
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
// margin:"50px",
      }}>



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
    <h3>GTA V</h3>
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
    <p>size 115gb</p>
</div>

<button
 className='course_box'

 onClick={() => handleDownload("https://1fichier.com/?xgo0gvbkihr5un58ho3t", false)}

  >
    
<div className='game-button'>
    <h3>Price</h3>

<div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
}}>
   

<Lottie style={{
    height:"50px",
    width:"50px",
    marginLeft:"10px"
}} animationData={coinEmoji} loop autoplay />
50
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
}} animationData={windowsicon} loop autoplay />

    </div>
    <p>size 7gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://1fichier.com/?jqcarswzwebdl2m53vo6", true)}

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
    <h3>God Of War</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 37gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?y5wqst42q5y2b46zt0t4", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Far cry 3</h3>
    <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 12gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://1fichier.com/?tm29i5u619vnqsj4s2cq", true)}

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
    <h3>God Of War Ragnarok</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 120gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload(
    "https://gofile.io/d/o1o1m0", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>COD Black Ops 2</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 21gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://1fichier.com/?r7zq0shu9f301ylvj50w", true)}

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
    <h3>It Takes Two</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 44gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?w03is6ep4f523aoxbj62", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Spiderman Miles Morales</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 50gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?8odokoodkd929sgashby", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Ghost Of Tshushima</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 60gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://download.akirabox.com/uploads/users/v1RgzRVvzbpB/co3OBJoppmJMF0Iybde-Ghost%20of%20Tsushima%20-SteamGG.NET.zip?access=ANhhDZysWdyNTYzRWMzdWMkFHdhpXYl5GOhBXb", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
        borderRadius:"10px"}} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4PDw8NDQ8ODg0NDQ8ODQ0NDQ8NDw0PFREWFhURFRUYHSggGBolGxUVITMhJSkrLi8vFx8zODMsNyguLy0BCgoKDg0OGBAQFy0lHyUyLS0vMC0tLS0tLS0uLS0tLS8tLS0tLS0tLS0rLS0tLS0tLS0tMC0tLS0tLS0tLS0tK//AABEIAKMBNgMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAABAgADBAUHBgj/xABEEAABAwIDBAUJBQUHBQAAAAABAAIDBBEFEiETMUFRBgciYXQIFDQ1cYGRsrMyQlJioRUjscHwJDOCkqLR4WNypNLx/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EADMRAAIBAgQDBgYDAQADAQAAAAABAgMRBBIhMTJBURMiYXGB8AWRobHB0RRC4fFysuIj/9oADAMBAAIRAxEAPwDuKAPmrr19dS+Gp/lKiR0Udjnqk2CgCIAiQyIGRABQBEDCkBEARAwoAiB2JZAWDZAyWQAbIAlkASyBksgLEsgLEsgCWQIlkACyAJZAAsgCIERAiIACAIgAIERMCIEd28nL0av8TF9MrSOxy1uI6+qMSIA+auvX11L4an+UqJHTR2OfKTUiAIkMiBkQAUDCkBEDCgCIHYlkAEBAw2QMNkBYlkh2DZAWJZA7EQFiIHYiAsRAWIgViICxLIFYFkCsSyYAsgAWQIFkARAiIEBAEQIiAAmI7t5OXo1f4mL6ZWkdjlrcR19UYkQB81devrqXw1P8pUSOmjsc+UmpEhkQMKAIgYUgCgZEDDZAw2QAbIHYKQ7EQOwbJXHYlkDsGyVx2JZFx2DZAWJZAWJZAWBZAWJZFwsSyYrAsgViIFYCYrEQKwExAIQIBQAECIgQEARAgIA7t5Ofo1f4mL6ZWsdjkr8R19UYkQB81devrqXw1P8AKVEjpo7HPlJsRIZEAFAwpDCgCBAwgIGMAgdgpFWDZIdiWQVYayQ7BsgdghqRVg5UDsdY6F9AcPrMNpqyVkjpn59s1krwXNbVhl2tH/Ta8e2yuMbq5zVa7hNxt7t+zdnqywhrg10coc10hc3zl/biZoT+U5pIdL7jdVkRl/Jm1dJe/XwZzzrFwGlopYW0rCxkkRef3kkoJEsjNHOAO5jeCyekrHbS71O73v8Ahfs8hZA7AyoCwMqBWBZArAsmKwLIFYlkxWAgmwExWAUCAUxAQICBEQICAIgR3Xyc/Rq/xMX0ytYbHJX4jr6oxIgD5q69fXUnhqf5SokdNHY58oNiIGFAwpDCgCAIKGsgA2SKsGyCkhgEirBASKseg6JdFZMRdPaaCmhpIdtUVFQ4tZGzW272E8AACqjHMZVaqpJXRt29XNR+0hhZqKfM+k88jqW5nRPh1ANt4Oh+CeR3sT/JWTPbwFqur+VlVQUzKqmnixQPNNVwlz4zkF3XHvG7mk4O6Q44mLhKVtizBOr59SKpzq2mpm0le6gLpg4CSUODRY95IACFTvfUc8Uo27u6uLhvQCaSor6WeppqY4YGunmkLjEWuuQ4HSwtY680lTd2ip4qKjGSV7mZgWB1cktZSU2MsjpMPga99THPIKR8LxmeBY2ygl176XBQqd21cJ4lRjGThq+qV9PQwOln7Vw6oFPNiM82eGOaOaKplc2SFx7J1POMaflHcplFxe5tQqQqxuopeiMnHejeIyU2GVVTWvq24jLFHTsmklkdTvnAO9xO+2tt9lTg7J3Mo4iGaUVG1r7WV7eRhYt0Imp8TgwkyxyS1Oyyyta4MaJHEXIOumUlJwaaQ4YhSpupbYEHQiZ+LOwXbRtmZm/fFrshAh2t7b9QQnk72UTxC7LtLGvrejcsNF59I9otiElA6GxztkYwuc6+63ZIScbK441lKeVLlc2XRfoJJXwCqNVS0kclUKSDzhxDp5yLhjQOJvoN5sdFUYNq5FbEKEstrnm8Vw+SmnmpZrbWnlfE/KbtLmmxIPEKWrOxrCSnFSRiEJDsKQmTYFkCsBMmwEyQIEApkgKAAgRECAgR3Xyc/Rq/xMX0ytIbHLX4jr6swIgD5q69fXUvhqf5Ss5HTR2OfKTcIQAUhhQMgCChgEDGCQ0ghIpIICRaQwCCkhwEikj1/Vxi8EFRNSVmlFikBo6h98piLrhj78BckX4Zr8FVOVnZmGJpOUc0d1qem6FYfVU3SGeCskMszKSdonfcCWLI0RvHJuW2g3WtwWkb59TCs4PDJwVtfqZVFNA2t6MUUVTT1UlCyobO+kl20ILwC0B/H7J7/ijnFEqMnCrNqydvuLQH+x4n39K4j/5UaOUvMcl3qf8A4/hmwdHE+v6Usml2EMlLA2SfZul2TNlq/I3V1uQT/tInVUqLS5v7nmOralbJDjkLZY42y4c6Ns9QdjG1pLwHyHXILanfZZ0v7I68c2uzk1z2+Rf1iYWJ66OM1NLT+aYRSt2lXKYmVOUyf3JAOe9+7cUVI3aVyMJUyU3LK3d8lc9lhtOyooMGY/dRDCq72BomB+VaxV4o46knCrPxujVVf7zpLQzu3RYW2pkv+WCU/M4JPWojWDthJ+dvsJS69JqSqGpq8KZVE8HE0bmX/wBCX915BqsLJPkzA6y42fsts0VtjW4y2vitxbPQ53H/ADl6KnCPB3dWz5Jr6mi6tKez5q6qe9uGYWWV0rL9mWrYHCANH4+0f9I4qKX0N8a0rRS7z09DyOL1z6qonqpAA+pmkmc0G4aXuJyjuF7e5RKV3c6KdPJBR6GGQkU0KQmRYUhAmhUyWgFMloCZLAmSBAhSgRECAgDuvk5+jV/iYvplaw2OSvxHX1RgRAHzV16+upPDU/ylZy3Oqjsc+Ck2CkMKBhCBjBAwhIpDBIpIISLSHASLSHASuUkMAkaJHoeiLMNc6pZiT3Q7Sleyln2T5o4ZXC2dzG6ucAbjhodxsVcMt9THEKrZdmuevU9o3pZh/wC2Y6oTk0sOE+ZecOhlG1lBcbhts2uYakcCtM8c61OP+NV7BrLq3ex47oFPHDiNHLM9sccUhdI95s1rRG65JWNN99Ho4uLdCSXh9z1WBY3hzoa2KpqzTbfGhXxE080pfE2Rrxo0dm9ra7uS1jKLvrzOOrh6ydNqF7Rt62aGp+kOHz1WOOmqDTQYnEyGCV0EspIDS0uyNF++xtvSzxcpajlhq0aVK0buLba9bmpwasoqNmM07arbsqaDY0k3m8sXnEhYSW5NclnOI1PC6iLjHMrm9eFWt2UslrPVdCnp5XRVM1HLA8PYMLpo3W3te18ocwjgQf5JVGnZo0wVKVNTUlzPS0XSumjpREyQmUdHxStGzl0rG5gyO+X857W7TeuiEtEkefWw03OTa0zfTqGXpDTx101bG8OdHgQpaZr4Ji2SrFrMcC0aaWJNhrvVZGpX8CVBulk6yv6WEp+kNKKzCKyeXK+nwySmrHbGUZJBG4NFg3W7nu+zcBJpppsOylkqQjrqrHm8Tx6OfA6Khe8mqpKs5mFrv7gRyZXZrZbDOG2vfsrFy7ljrhh5RxDklo19dDJwipw6XB/2dU14oJTXuqZLUk9RtGBmVoOSw5Hf9waJxs4WuRWjUjX7RQurHiaqNjXvbG8yRte5schZszIwEhr8tzluLG19LrJ2vodkbuKbVmUkIE0KQmQ0KQmS0KUEsUpkMBTJYCmSxSmIBQICBAQI7r5Ofo1f4mL6ZWsNjkr8R19UYEQB81devrqTw1P8pWctzqobHPwpNghIYUFIIQMYBAwhItIYKS0OAkUkOAkaJDgJGiQ4CTLSM3DqQSyCO47W8vlZAGi+pDnXBNuHG4stKcYy0Zz4ipVprNFX9Ddw9Fw/PaoipjG4tcytkax2m/Ll7TjfgG+9aTw1tmY0PiTlpKDv4GBWYTsnC8rNiTZtS6KdkTzxt2S7Q9yxdJ33O9YlJXlFr5P8hr8Hnga2V4a6GR2WOeJ7ZYnm17Bw3aa2Njv5KJ05R3NaNenV0i9enMwTYC50A3k8FnudDsldmXRYe+YAxZXE/ZaXZS48hfT4lX2cjPtY2vyLsNpnmYRiHaPDi0xSNeLOB1DgCCNy1oRbna1zHFyiqTk5WXVWPeYVgcbXXfHlJ7X7iaSIRnTsnOP9l7MKKjyPlq+Kc1ZS+aR6VtFAP3j9m5g0O0sWg24OOrTu0zHit379/wCHmdrNaI0fSyejP9neIwJIXPEpAe5hyZm63uOH6LOoouDUjfCzrKrHK+a06+ByiQL5+R9skUEJA0KQnchoQhUQ0IQghoUhMhoUhMhiFMlilMhgTJYCmSKgQCgRECO6eTn6NX+Ji+mVrDY5K/EdfVGBEAfNXXr66k8NT/KVnLc6qPCc/Um4QkMIQMYIGMEikEJM0Q4CRaQ4CRaQ4Ck0SLGhJmiRY0KTRItZbXnaw5C+8pqVtSpQzKxGxDkL8+PxU531LVCFrZUbSlxSoBjjdPI6Bpa0wynaxZNxBYeFrrqo4txajJJo4MT8KhO86balurPd+v7N1hFTDBKaaqkaKWUasLc8LuWYX042IsRoQQt501GThLY4e1c6cKsNJfnb2jTdKMHbAzaQyNngkeWx2uJG69lrgRY+1txztcLmjRcJ35HZVxqrUcr0lpfo/L1JgkuzJYT2oZXMNjpdrrG3wWdROLO3DThWopr31Nj0hrAaoTxu1lhidKASP3gGUg+5jT703UcZKSJoUVOnKnJbNpff8myHS4kssMmoc5jQAAOIb3A6/wCL3r1aOLUz5vG4DsJxUnprqYeMY7I4Ppmzh7LgvZ2w4Zdw7W8C/essTiJNd16HbgsHRhUTlxPbXTU89UT6FznaAakklcCcpuyPXqdlQjmnp75GLA8Shxj7WQXcLEEN4useCUqUoq5lRx1GrLKm0/EVwWR1tFZCZm0IQmiGhCFRm0IUENCkKiGIUEMUpksVUQwFBLAUyRSgRECO6eTn6NX+Ji+mVrDY5K/EdfVGBEAfNfXp66k8NT/KVnI6qGxz9QbhQMIQUMEDCkWhgpLQ7QkWiwBJmiQ7QkapFrQpZokWNCk1SLGhI00WrLXRubo5rmnk4EfxRKMo7qxVOcKivCSfk7kAUGyRnYhgsklM2szR5I2x7SAOyy5AcokcDvabDUc9F6FLWCbPnMbft3CO3X6nn66rL3XdcG5LWgnLHc3s0cE3K5GVR5G6jx01bKeKSKNk8LBD51GXAyxNFmNezcSNO1fXj3Z1Xm3Nvh9OVOTcZaWentllfOJJC5oa1jQ2Ngbe2VjQ0HUkkmxcSTvcVyTlmd0e3hqLpU1GTu935vcpniytbI8htiHNvfdbeeenDfu7r9GHi08zZ5XxacZx7OMW2ufJeH+GqrZLS5w1wsbtBu03/EuuPieNXldpR5JL1sO2YTgxgBr3FrWZndkG+pLuA7+V1FOmoXN8TipYpxVrfkycOpHwTtEmaN7Wh7Q5jm5nZQ4MsRfW40PMcDqNmLpuFrO99rbe7/YaqjDXva37LZHtHsDiAuB7n1Ku4psxyEyGhHBNGbRW4KkZsQpkMQpozYhTIYpTIYpTJYCmQxSmIBQICCTuvk6ejV/iYvplaw2OSvxHXlRgRAHzX16eupfDU/ylZzOqhwnP1B0BQNDBAxgkUghItDBItFgSZoh2hSaItaEmapFjQpNYosaFLNUjLw2MPnhjOmdxsTuDgNP1Xf8AD4pzbZ43xybVOEFzv9LfszsTDxMKd5BzBzg4m4Djqwg95Fj7V24un2sMq35Hk/DcT/HrKT2ej8v83Ne4EXBBBFwQRYgjgvAZ91Gz2PdVcDKiR1DHPDK+ODzCFwaIZGMBjLYntOrw2SNjg8XBBeDY5b+htofKylJPtGrXd/v7t5GixHoNLFKYppKdrQM21L9S3MQLRNvI42ANg0jW11LTN6daE43yv346IrqsGpoNmaWeCrBBEhbFJBNE8fdex2rbnNqeXsSTSV731NFecuzyZbxfrtz9ddxmUAklZG5t3EDMAS0PBJAJPDd+hF0SjGp3mXQnVw77HNddem+3n0ezMLpPDFJMLa5G20de7uOn3dbk+3ctYNnBjKcFJWXXndtvklytzf3NHJR9nNlAIOVwFyHcnNJ/gm3lepnCgq1PNT4lo19mvyYclFM3tN1blzAfe3kEEcxZS6kVowp4Su05wi+78/kehbj1RVMifVNjdJTxujgkyESOv99/Mt4d/OyxrTs99Tu+HYfPq42Sf18PyYZC5j2mVuCaM2itwVGTEKaM2VlUZsQpmbEKZDEKZDFKZDAmSxSmSAoEBBLO6+Tp6NX+Ji+mVrDY5K/EdeVGBEAfNfXp66l8NT/KVnPc66HCc/UG4QgYwQUMkUhgkWhmqS0WBJmiLGpGqLGqWaIsapNkWtUmqCH5HxyDex9x+ht+i78BLvtHjfHIXpwl4tfP/hvcfoc7NtHvABHeP/i9WSuj5mLsYr3CdkMu+RxbFLzdwa499tCfYvMx1FXVSPPR+Z9P8FxjyyoyfCrry5r0Pb4Vi4GK0sOf+zSUUkjYj2WGcyyuEhG4mzdCeeiJ6TaPPjHNh83PT5WFix5tZUF0T52RTYgaEPgqpKeUAxlzKqJ7SAWgNN2OBFg21iXLN6m0IqnHW17X1V15f6vU8l0sxaaomEO2ZO6mkla2tELIZatgNhme0XLQLWubE3OtwuiypxvPmcaU8RPJSWiu7X0XV+HQ1+FYg5krXPs8PvC8PdYOaRqy4+ze9/6ut13nZnIpOHei7Mx8XhaHu2TniPPljLwb3tfIT+IajvtdYygoysjoeInUjr69X5vd+pTQVLg1wPaaHNzAjXTUEfEqZRzRsXhcQ6FRT5c/Iz5JmFhy7mSOeTbUB4aPeLtHxXLClGbtLQ+gxuMqYeEalJJp/LqvnqJG6J7gy+zuwkPdexeAbA33AkWvwV1cPSt3b3PPw/xfEOolVSafRalBXCj6KSEcqM2VuTMmVuTRkytyozYhTM2IVRmysoIYpVEsCZDFKZICgQEEndfJ09Gr/ExfTK1hsclfiOvKjAiAPmvr09dSeGp/lKznuddDhPAKDcIQUMEDQUikMFLNEO1ItFgSZoh2qTVFrVLNUWNSZqi1qk1RJWXaQN+8e0K6VTs5qRljMP29CVPny80b/C6na0pb95nYPMDgf4hfQxeZXR8LJOLszRYfMWOLTqA77O7UO/4WUoZ4OLOnD1nSqxmvaejJjU5e6PQgx07YnNcNxbI8fFedUd3dns4aOVNLr7+hvsKrvM6aPZAOnfHPswL2ilna1r5929sTWMH5nS/hN6ppXu9vuc2KlKTcY8/ol/v4POzOtE9w3uuBz32t/XNRWn2ldLkv+nZhafYfDqlS2svtfKvy/UG0Mjb5bWawXZvs0bjfU33i3HkupSszwmi+krC1rgJCY32dI3sva4Nddu0bxHHTmVpcgXF4oaaUvgLXU0o7Gz+0OOU/mBvxOg36rKVovcuN5LYqgnzguBa+NwLL2ykjQbuB1BWLj37o9N13LBKD5OwsWGNjcX5nSDMQ0kZRpzH4houetUmtDu+GYTDyiql7yXLp+/MyCuZHtMRyZkypypGbK3JoyZW5UjNiFMzYhVIzYhTIYhTIYEyGKUyQFAgIJO6+Tp6NX+Ji+mVrDY5K/EdeVGBEAfNfXp66k8NT/KVnPc66HCeAUG6CEFDBIaCgtDBSWixqRaHClmiLGpGqLGqWaotakzWJY1SaosClmqLqCpMEucaxydiVvcdLr08BiLPs5eh878awGjxEPX9/v59TDxSJ0U77/Zc64PA938/evRlpI8COsbkqagzOzvNnZWtc43cX2Fr+3ndclWg5SvE78Ni404NSNjG+BzB2XyZGBoDpNmxn+Foud51uL3JtqVX8ZNJN6Gaxs4tyitXz/HkjBngOzc0DvaBfney4q0FRrRlyPYwtSWMwVSl/Za/lfVNGFRVeR2/KN593Cy6TwTKa5krrxBkD7Wtchrib6ngL3VxYmiwg5nU87GjsBoDe08HTLIy1/wAN78cxHHSJ+JvQi5StHf3sLDh0jGFjTmjtmbIwagnm3lb3d65JzUZZkexhcLUnSlRnbLun49CplTI0ljvvgBwOocRueP6vvWvdqRPPca2Cqrk/o0XsJcM1iACA64NgTewv7j8CuKVNxep9Lh8VCvFOO/T3v5iuUmjKnKkZMrcmjJiOVIzZWUzNiFUZsQoIYhVEMCZDFKZICgQEEs7p5Ofo1f4mL6ZWsNjkr8R19UYEQB819enrqTw1P8pWc9zrocJ4BQboIQUMEikEJFIcJFocJFocKWaIsakaosapZqixqTNUWtUmqLApZqiSNzNI3EjQ96qEsslLoRXpdrSlT6qxdUsM8DSDbNGLm18j2ka/AW969nEzaipo+Q+HUFXlOi3Zuz+X/TVeaysubtcAOBNz7rLCGMi2kzprfBa8IuSadul7/KwYCCQd4425LtTPHPVQU8U8V2fbZvG42TqU41Y5WVQxFTD1FUg9V7saXF8MEfacPtNzMkbucL63HMcV5iUqNTs5PTkfQVo0cbhniKcbTW6+9/TVM008bo3XBu25yuBuPiujxPEkrNp8jc4bVB7Q93akhc1waRcloNyB/X8US1iXQnkqJlLMRLwcr3sbtC4hgzAOue1yAO/T8Xx5ZrqezSqJq8Xpzty11f59SyXtiz2tPElpIz677cD3grmUlGV9T06tGdWk4NxfRv38tfoLQVJp8hcGPZLK+GoY6+Uw9km9jfg0jkQCNQF2N5o3Pn6UJUsRkv3k7X6Lr8tbc1oZNfSNaGzQuMlNISI5D9pjt5ifbc8Ag94101A5JwcT3aGJjVTV9Vv+14GvckaMrcmjJlblRkyspmbFKozZWUEMUqiGBMlilMkBQICCTunk5+jV/iYvplaw2OSvxHX1RgRAHzX16eupfDU/ylZz3OuhwngFBughBQwSKQwQUhgpLQ7Ui0OEmaIdqRoixqlmqLWqTVFjVJqiwJM0TGBSNEbjoxDG8vpnGwlY0XH2YyWh1zyGYAL27dphz4lTeGxt7bNo1brXOXVtzlPMX0PwXiM+4V7amtq4XRnaxi7d8jeA/N7F6GFxDfdZ8z8W+HKF61Nac108V7/zMw3ENk4SMOhtmb3cQvRjK2p8+1c9hU00c8QA+zKAWOP3X20d/IjkliaKqxtz5HRgcXLC1VPls11XvY56+KSBz4naEPIDH6ggXBFufDRclOd43+ZticO6VTKtnwvqntYsicIy5zb2sWvY7e2+lxzF1SaaujGUZQllkrNDvcGuJtYZRtBwLT/sCP1WM6eaK6ndQxfY15S3i27+KuZDCQBuLefIcD7P4Lil3n4n0dO9KN73j9vHyfPpv1I5o1uAbkHUX1At/NUpdy3iYTor+Uqlrpxt6r9ovoa10OdthJBMAJoHfZfa9iD91wvcOG48wSE1U7tmTLCrtXOLtf79fVbgxGjDA2WJxkppSdlIRZwcLZongbntuLjiCCNCEmraoqNRvuy0a93Xga9yEDK3KjJiFNGbEKZDEKZDFKZDAUyGKUyRSgCIJO6eTn6NX+Ji+mVpDY5K/EdfVmBEAfNfXp66l8NT/KVnPc66HCeAUG6CEFDBIpBCCkMFJaHakWhwky0OEjRFjSpZqiwFI0TLGlSzVMsBSNExwVJomEDW4uDaxsSL+1Wqs1HLfQyeFoyq9q4rN1GUHSHzowgygXyi9rgXHvB+Ftd24rWg7TRx4+N6D8LP9/Q09a9mdzogGMeSRGNzDyHcvYs0kz4uo4uTy7HtOitXtKdjN5YbOHEAHQreGsTnluTpPAwubUMt27MlHKQDRw9oHxb3rycdRyyzrZn1PwLF9pTdCW8dV5f4/uednp2v37xxXNTrShtsejjMBSxKvLSXVfnqYnmBva/7vXS9yPYuiWJjbRankU/gtTP/APpJZfDd/TQzFx7n0FklZFROXeezwv8Ad7vZ/D2btOLz+/8ApxyfYa/0/wDX/wCft5bBxUo0bL6Gt2Zcx7dpTy2E8N7ZgNz2n7r23JDvaDcEg3F2OerDNqt1t76FWI0ZiLXNO0glGaCYCwe3S7XD7r23Ac2+h5ggmmrGcambTmt/fToYJQJiFNGbEcUyGIUyGBUQxSglgKZIqBAQI7r5Ofo1f4mL6ZWkNjkr8R19WYEQB819enrqXw1P8pWc9zrocJ4BQboIQUMEhoKC0MFJSGCRaLAkWhgkaIsaUmaIcFSzRMsBSNEyxpSNExwVJomMCkaJjAoHcqq2F0b2t3lpAVU3aSbMcVCU6Mox3sV07WuZJCWnLcZHfhIc7/2/QL1MTXyQjY+Z+GYPt51FNd21r9HfS3j75ldPJUUh2kbswBuC24I9yKOMi3YjF/CatFZuJeG/qv8AplsxCWYkuuG21uCLnTcFnja8ZRyo6fguEqRq9q1ZJNedxiV5p9NcUlAmxSVRm2VuKZnIqaCOzvH3ef8A2/7fDktX3tef3OJLsNP68vDw8unTYUlQjRsy8Pr2xh0MzTLSykGWIHK5rhoJoz92QXPcQSDoVpF20Zz1IX70d17s/AoxOhMLm2IkhlBfTztByzR3tfucDoW7wQQm1YiNTMvHmYJQDEKCGKVRDFTJYCmQKUCAgTAUCO6+Tn6NX+Ji+mVrDY46/EdfVGJEAfNfXp66k8NT/KVnPc66HCeAUG6CEFDBAwpFIYJFoYKSkOEFoYKWWhwUGiHBUlpjgpGiY7SkaJlgKk0THBQWmEFKxSYbpFXDdA7kugLkugVxSU7E3ASmS2IXIIbKyVRm2Vu700ZSs1ZlT5dbO3nc7n7e9bZcyutzg7V0ZqnLhez/AAwEqDobNhhNawA0tTrSTOu7i6nkykNnj5EXFxucNDwIuL5M56sXxR3Rh4hRvhdlcQ5rhmilZcxzR30ew8R3bwQQbEEIasJTUkYZQDFKZDAmSxSmSAoEBBIECO6+Tn6NX+Ji+mVrHY5K/EdfVGJEAfNnXk0nG5AASfNqfQC5+yVnPc66HCeDFPJp2H67uw7VTY2uuodhIBcseABcktIACVik0IEFDJFIISKQyRaGCRSHCRaYwKRaY4KC0xwVJaYwKRaY4KRaYwclYtMcOSKTDdBVw3RYeYl0WDMAlArgLkCbELkyGxSUyGxCUyGxCVRm2Vv1TTtsZTipKzEzb9LW+HuWjV+8jmp1HF9nPfk+q/YCVJo2Z+HV7Ax1LUguppHZg4C76WUi22j/AEzN3OA5gEUnyZjOLvmjv9zExCikgfs5LG7Q9j2HNHLG7VsjHcWn/g2IIQ1YFJSV0YiYmAoJYCmSKUCAgQExHdvJy9Gr/ExfTK0jsclbiOvqjEiAPmzryJGNyEEg+bU+oNj9krOe510OE8Ftn/jfp+Zym5tZE2z/AMbv8xSuVZACBjBIpBCRaCkUhgkUOEFIYJMtDBItDBItDhJlIYJFoYILQwKQ0FIoKBkQAECAUxClMhiFBDFKohiFBDFKZDK5N1+WoWkN0c2JV6bfTUkgsXDk4j9USVmFKTlBNiJFM21H+8oasP7QpnQSQX3xOkkyyWPIgDTdpferWxzy0mrczTJFsCZIpQICBAQSBMR3bycvRq/xMX0ytI7HLW4jr6oxP//Z" alt="" sizes='10px' />

        </div>

<div style={{
        display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    textAlign:"center",
    // marginTop:"10px"
}}>
    <h3>Spiderman 2</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 120gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://store3.gofile.io/download/web/efa3741f-19d1-4b3f-bddd-08f3aab045a9/Marvels-Spider-Man-2-SteamRIP.com.rar", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Red Dead Redemption 2</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 115gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?ljo5eq6zgvs8p4wgbtk2", false)}

  >
   

  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Elden Ring</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 65gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?fadbewy093pis0xhe5nj", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Ratchet and Clank</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 50gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?0n1yh4d676g5juf8unqn", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Batman Arkham Knight</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 55gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?dpvhcbffsi1x0j92v8gj", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Days Gone</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 50gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?0iy561ulmhs2a1dd9c2e", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>A Way Out</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 25gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?e5ftvgs1bhjgkgz9n0vq", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Detroit</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 60gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?edn0b6iwl70ej7uh04ly", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>The Witcher 3</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 55gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?axbt4kd0kcfu2wxx2v3s", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Stray</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 7gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?rr3mhrab8of90kw3qoh4", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Sekiro</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 16gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?0jagji1icdd009wn9h39", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
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
    <h3>Cyberpunk 2077</h3>
        <div style={
      {
        fontSize:"30px"
      }
    }>
    <FaWindows/>

    </div>
    <p>size 80gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://1fichier.com/?3yuf4bdne7kvm6ojbxth", false)}

  >
  
<div className='game-button'>
    <h3>Price</h3>

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
50
</div>

</div>

  </button>
 
      </div>




      




    </div>
</div>
        <ToastContainer/>
            </div>
          ):(
            <div style={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              height:"100vh"
            }}>
            <div className="spinner">

            </div>
            </div>

          )}
    </div>





    );
};

export default Game;
