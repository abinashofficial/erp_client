import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import coinEmoji from "../assets/animations/coin.json";
    import { useAuth } from "../context/authContext"
    import { toast, ToastContainer } from 'react-toastify';
    import PresenceTracker from "../utils/presenceTracker";
import { FaGooglePay } from "react-icons/fa";

    import phonepayIcon from "../assets/animations/phonepe.svg";
    import gpayIcon from "../assets/animations/google-pay-primary-logo-logo-svgrepo-com.svg";
    import upiIcon from "../assets/animations/upi.svg";

 
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
    AddCoins(coin, "Coins added successfully"); // Call your actual function here
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
  handleUPIPayment(liveUpdate + 50);
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
  handleUPIPayment(liveUpdate + 275);
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
  handleUPIPayment(liveUpdate + 450);
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
    <p>size 115gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://fs1.uploadbeast.com/games/Grand.Theft.Auto.V(GamingBeasts.com).zip", false)}

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
        borderRadius:"10px"}} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMVFhUXFxgaFhgXFxkZHxogHR8YGiEXGCAdHiggHRolHRgYITEhJSkrLi4uGh8zODMsNygtLisBCgoKDg0OGxAQGjMmICUtLy0tNy01LS0tKy0tLS8tLTUtLS0tLS0tNS0tLystLS0tNS0tLS0tLS0tLS0tLS0tLf/AABEIAKoBKQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAwQFBgcCAQj/xABDEAACAQIEAwcBBQUHAwMFAAABAhEDIQAEEjEFIkEGBxMyUWFxgRQjQlKRM2JyobGCosHR4fDxFUOSFySyCBZTVGP/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QALxEAAgIBAwIEBAUFAAAAAAAAAAECEQMEEiExQRMiUWEycaGxFEKBkfAVU6LB0f/aAAwDAQACEQMRAD8A3HBgwYAMGIHtJnc6kfZKStpAZi6F9UsB4aAVEghdTFiSBCgAlrV0cc43YnK0/KzMoouYP4aCk5gamteoQoEiFa+ANAwYpyZ7i5QHwqEgu7E0nBKKIWnTp/aDNZ2DGTUAClJuSAhk+J8aZ6YbL0FQuutzTYQkSwC+OTIKuA3WafKNTaQLxgxRv+qcbcuVy+XRQzFQ6OToG1xWBZ2n8qxpNjqBwgvHONWJytMDSzMoosxH5aKn7QAzkb1DpUSIDXgDQMGITs5ms4yn7XTUMWbQUTwwFEAawarkMW1EQfLpkKZAm8AGDBgwAYMGDABgwYMAGDBgwAYMGDABgwYMAGDBgwAYMGDABgwYMAGDBgwAYMGDAERxHtDRoVfDqykqGDErBkkaVE6i3KTABthD/wC7srAY1EA1lJ8SmbgxAhrnrAkgG8YrHfRwxmy1PNUxz0Hg9ZSrCFSOo1aJHpOMaBL6KlVy6vqGlG0tymAh1IQJMkBQ5geUdKOVM6ceFTjZ9KntFlulVCYLQrKxgAEkAG4gg26HCTdp8spAdtEgmXtGkSQ15BFrH1ETOMDyWaNKpUqrroK3iU9KqNzE05cMNIlb87WEBd8JZ3jGaroVepppXKgmDc20hYkwSAIAgnEby34f3PpDI8Rp1SwpknTEnSwBmfKSAG2O04d4o/dHxHxcnBYs1NiGkKpEkkLCgQIIP9r2xeMXRzSW10GI/j/FVyuXqV3uEWY9SSAq/ViB9cSGIPtpwmpmsnVoUiod9EFiQOV0YyQCdlPTESunRfAoPLFT6Wr+V8maZTtvnRQqZZldsxXYNQb0WtJOm+1+X0nppw04V2lzGX4bWKVGNSpmBTDsxYoPD1EqTN7R9Scadwfs9So0sq1YU/HoUvCV5tcXiYnrFureuKvwfu/P2KtlsxVpB/FFRHpsWCELp5pC28wI/wAscrx5OOex78dZonuTiktyb9+X09uE692NOL9jcxlMsc4mdrGvTAd+YwdpAMyYn8UgxEXxF9o+PV8yuUrVzXTKtTioaFpdWdGN+WZVSA3Q2vOJep2a4rWprla2eofZ7XDBiVXb8IZgImC3S5tiY4hwDO0VpfYM3SWhTphPCqxpN+Z2MEMzMSSYX2wcG+iaRMdTji14k4ylbp9Eo10vbw76cOiN7LcJy+bo1aNHiOZYakYK0q9MAH1MGSblbWGIvsrwBq+fzNB8zmDTyz/nbnAciGvaQOnvi1dh+ydXL16uazD0vFqAqEoiFAYqxOwEkqsAD1NycWDgXC6dBq5BU1KtWpVqGb8xJUeoAWPrPri8cV02jmza5Y3kjjldpV04fF80u3FkL3mcUr5bLUqlCwFanrN9l5gtvwsVAP6dcUrtt2oqVc0tbKsxpZdKLnSxAlirc8G92RI+cap2h4cmay1WgSOdLH0O6t9GAP0xUOyfYfw8pmqNZqbVK40k0zqCgDl3AuHJO3QYZYTcqXT/AIV0Oo02LEpTXmTr5qVW/wBFZCdqu0gzOcQ03b7Nl6XivpYjXIV9Jg3kmnTjoS2G/ZDimZy+by1bMuxpZ0OLsSAS8AwbDm0/2Xw5od2mcWiaeugGqVFNVgzWRLhV5LkszMf4ExJca7qaXhH7LVqeKCI8Vxpjr5UkGLiPTGe3I3uo73m0UYLDuVPy9L/W+3md/oRHbnimZo8VZ6DPNOmjlASV0hebUsxpjf8AXphSvxoZ7ieV8Ko6JVoFXUMeRitcEETGoWIPWxxZeH9l81/1CnnK5pEeAEqgEkltGkkArBUm/wBcNMl3fvQ4kmZosgy6sW0EnUsqwKraCoJtcWt0k22Tu+1mK1OmUFFtbo46T9XXT96aK1xXs89LiNDJDN5grVUEuXMifE2vH4B+uOe2eU+yZnLZd81mPCFKXqBjqg1KpmJgkWHxi9cY7M16vFMvnFNPwqSqGBJ1W8TYRH4x1w07adls7mM5SzWVekhpUwAXJkMGczGhgRDdcJYqTpd/oTi18ZTx75qtjvovNz7fz0KVUrZf7Nmny2czdR1p0wRVJUANWpCQQZm0fBOH68BzVLIU+IUM7X8TQjmmWJB1ECFuZudiDOJjO9muM16NWjmMxl3V1XSAAvMKlNpJWiDGlW/UYf8AZXsxn6bU0zldGy9EA0qVPYsvlLnQpIXzCSbhT0xVQbfR/b/ZbJqoRx2pxdStr4rVLj4V1fsvmXDhTVTRpmsAKpRfEC7BoEx9cOsGDHafNN27DBgwYEBgwYMAGDBgwAYMGDABgwYzDvC7wqtF2y2TCiqDpZyNRXYW/ApvYnVsQVGIbotCDk6Rp+Gmb4lQpftK1NP43VffqfQY+fuIjiTrNTM1qzsyjwxVqEX8QWC8h5qTqQIuBYi5hMpm6mkAOyqZPoTOkkKFNxKIYgiVBkYpvOmOlvufTXFMkmYoVKLXWrTZTb8wib/rj5jbLVEZkbUGRilTVsSreRFANtQBFiJxtfdDxvxss1BifEy5CnUV1FSLMQoEXDbyepJJnFZ7fZFMtn6rhaY+009eqoRo5dIYMpHPDBHKywJ0/dsROEuVYw3CTgykOyurMx8yqxqVFCc62KpeI0wPUEWTbCNWnUZ3qjSbmZdQ3NOlr6evQBRO4G2OczmqaLoNNWqI5CSzQEkmdIAIk30llAkDQbnC3Z3LvVWtSSGLIrAc0nwnVrAAzfra2rfY52dVUrNQ7j6DJSzaOjI61gGDAgzp2IIEEf0I9sabjPu6HM+LTzFUhdVR0doVVJYoJZlUlQzEarRM7DGg42j0POzfGwwjmqRZSoMTF4m3UfUWwtgxYzGS5Nho5gxVNJ1LM7SRe0x79PS6ScLj8ZJAsSNjpIn0iSWj1O+0SWDADD/p3mEwDpgCbAaRpiYuAbx1xzT4aVIYMCw6sJnfmN/NfpAiRA6SODAEfl+GaCp1TG9vNA0r8QMc/wDTW21wtwYAlpOq8yJOxte/raSwYAizwgEXckjQASLcmmNQ6wQT7F2jph7k6GhQvp8n26nC+DABgwYMAGDBgwAYMGDABgwYMAGDGcdsu9RMpWbL0aBq1EMVC7eGqmxgWJbcXsPc4pWe73eIMOX7PSXoVQsfoWaD8wBirmkbRwTkrN8wY+e+Ed5XEadU1KlU1xoI8NwoF4hzoChYjrFj1xZa3ehxGnoSpkqSOwUg1GamGDG2kMeu29oJ2w3ol6eaNfxT+0neNkso5pEvWqidSUQG0kdGJIA6ze0Yju3neNRy9PwqBdszUpq1PSlkDiVclhBt0APvjFwtTMVZcvVqVGlgksSTsWMEsdRUQAYkARbESl6FsODdzLoaXn++hrihlAfd6th86Vj+9Hvg4P3zgKftdGWNSxoiFCQv521MwOrYQbYzo8PVKoSohVZFib2MMFB3b0kHD3WtMt4OtQy6TIUMVtINlAmOhkWxTczo8HHVUbR2U7fUM9WNKnSrJCFlaqqgMAQIEMfUG+4n0xbsfN3ZLPHLZmnWJP3VTmAJ8plWJJB1QjGwO8Y+jnqqFLEgKBJPSPX4xpF2cmbGoPg7xhvexwtKWe8WoT4dQIyqAZYzDqrEEKYg2DXYWEzjQOJ94FFG0UkNQ3gzExvAgn9QPriE7RZOtxXLIyhUqU6uwG6MpUiSZkG/+GD83CLYk8b3S4Rltfi9RgAAECgAEgM5k02k6pgl6av6gkwADGIw1SCZaWJvEsx6QSRG3uB7Y0X/ANOlpUya1VQwF1DCbev0tHxit5ulkqBtDkdOm49xP0xHhS7my1MPyhwXjeZyHiCjUB8Sk4U02D+G0wGvKSdINp5SCPTDLiGZzNZCczVqOTpK63JIF5gHZWEG0A6Vw0zPGknlWREbESb88Ai4kQNuUTN8MqecuQFLBjZSfX2AM4hxJjmjduvuOszl6CINDM7SZbTpS3RJ5jfq2n+HDvsvWVa0OWVNLksiamEKwkcj2hmBEAGbkb4Y57iFSo33ssRYKsQm1gqqEp7C3Lt1x7wvWaq6ToJmNLc2xsGlVWdtzvilOy3iwcerZuPdg2X8TOfZyCpekwILNIZJkkiC2vxJg2MiBAxfcZv3O8Kr01zFaprSlUKilSdw2nSXnlAGk3AvzGL7Y0jGy6HDkacuAwYMGJKBgwYMAGDBgwAYMGDABgwYMAGDBgwAYMGDABgwYMAGMw70e35oeJkaC1BWKjXVnQEDAEFDuTFpsB7kEDT8Zf3vcCoGpRzlbxCoHhslOJczqUSbLC+JcgzAHUYrLoaYqcuTG6KgmWlpNydUTMn95zvf32w6y0JV5LsCGBIBNiDJnUFEfJ6EjHB63gC24+gcxC/wgE/ujHeYACqyiBYrKm8dQD5jB3IP0xkeiWlezudzCrWq6fDbnV3ZKdPm03AZlLSAOkfOFKdDMKjV1rAJSqLRYKs6vD8pNVFVVU6rQwMMD0GJxOFGpRMLp1ANqprYalOtAwRQRJYL98bEek4rPFcrlRVak7AfdaqYV4Q1FAglafiFmYAg8wuf1kyUr4Hr5GlnKFCtVqNGXZqGYIKqzLPipLMxjSGqj8ROmyyRhgM5Sy+unQLO9VtLOdS04XUIC+ZtOtX1VCB5T4fQzHBa9Goa2VpMKiumml50l0DVVWTU1KJWonKPx9JANUzXFKtYKGYKirFNdOlALctNFEk2An9cGXgrbXY64wQWWt4qOzQ1QIvhhDsUmAGgR5FIMdIkrZahVCF1Pho8pq0AAnlJCyBLeUhpJg9L4YZOWlBqY7wBJg+igwBvvq+BhWkjXVzoYTqDHSeUDzMxXcaTEn4xU0rsOONVQ1c1dN3ADX1c8X3ZgJhjd2PptjbO77PjNcOphzqZVNGpzBjyjSNRBuShUn3OPn6tmQRpQTcQdrj6aj8TiXyPbfMZNKtHJteqRLsoOiJEpuCx6kyLCJucWg+TDUxSgvoWvi2TpZVW1voYOBL1CikKSPy6qhIWdABHN/axFP3iCkgp5UuYmW0hBfog3A+cUmrSrZioatZ3qVG3ZyST7X6e22JTJcEJ6Y1hLY7Ry5U8kdshvn+OVq7EkkE/rhkvD2Y3k4lKeSCVobYNf2B6n2gziQ4nn6VJAKQD1GnT0EDd7/hH5jb5xbLknN22ZYMOPGqiiEbKU6UeJMnZVGpj8CR/UYTr5ibIuhfQGWP8biJ/hXSv8W+EqXO5mrTDFSz1azFVgX0IIJv0G56+gksvll8NarsqIwBDOdIM+k3J9hJxjTNt8WR9PLn9NhsB8DElw/hFSq4WmjM+4Cgza9ovaJw0rcdorajTNU/maUT9PM393HPD6uZr1Ias1MaXKpTDKCQp5QKY1E73ubG+LqJSWRs2DuhzJqVc0WrCo6rRDgGdPmUXA0zCRAM2vfGnYy3uTyjf+5qs5cnQmslQXA1EeIoYsrgl7vdg+5ABxqWLGYYMGDABgwYMAGDBgwAYMGDABgwYMAGDBgwAYMGKx3i8RzVDJmplI160VjoLsFY6ZpqJl9RQCQRc4MmKt0WV3AEkgD1NsV3jXbnIZaQ9dWYbpT5yPYxZT/ERjFmpV6sGrVaq5bSQ9Q1CCb9CVE/kQlpke2GucyIoFX0sdImCg0gxIBuAi9CxlrbDGbmdS0y7s0XO98CiDTyraNyXcBo66VUEfUsBiodt+1uZzb1aVR0p0qdSFpJqhoNnZoBcEcwgqIIgHEIaCkDUlQMI5OYa7STJ5t9iehETvhbimVqMKFRgqGoCph1KlqR0jmUssBNAgAmVcHFXJm0cUE1SIqnlyzhaSs9SRpVVk/Cqtl+gJ62xO8Oyb5bWappl9moio2s6iVIdqakgjnDKWG/S2O/FejRZqb0MsuiDoaatc+Umd6aHUTDsgH5cM6XBKmlalUpQpsYD1WZS8g3UBTUqC34EA5huL4gu3Y3XilfR4TPARQkkByoEwJMqggmwuYEzhspmWHNq6x5v6s5+AB7Y7qUKVvCNSq9wwWlyrYQVuQCeedS20gwJMSWVzlbJFjVpqS6FWp11ne4LBm1TEwIiDttiC6XoN+GZtkakadL7+g+rUNZZzMqugMUpgQFss+04ku2mXoUnq6Ymsy1qca5FOoNWlieUAEsIGo8kcuIXKjMaqlLLs7j8fgzpcISVYAQWHUavWwm2J6j2f4nWCVjl2c6StNHpQaay3lVwqJBJKqZiZHrh1IaSdtlXObqgKgJRRJAB8MXhptdjyggtPT2w+4LxPMUzUrJzhdLVfEYwbyoYhgxJKmwN7/WbPd9xF7vTVNo8SqhIAEASuqB+6BA6YeZbuursD4jUCQQVCs5AgzJOiTsLfOEYuyuTLBRdNWUziSimSiwKjyWANqYP4Fvv0mbQfS8nwPgSugYEEbEggiR0kWgYn6/dPmHu+ZpatyQjb+u4MYUpd21VF0NngUFwgRwL7n9pjZRSR588spu2R5qZWjYtrb8qDUf8sN8zxtwORBTHQka2/TYYlc72Zy+VH3maQei6DqaB+FQSzfQHEBxXtZl6alMrl5qXHiVG16ekqqnQD1BJJFuXFils4zdQIoeqGqVXMU6bG7naSDAVAbEn4xXeNZ3SxSfEqNHiuNiRsq//AM16LaSNR6AM8yKlRjUqsSzEXNyekD/AAAY7y1DmCIpLnZQpdz7BFvPsYwFjJqDlyyj8UqWifaYETh6tFnPiVnLt1ZmLfqzf54uHDe7/ADbrrr6MrT3LViGePamOVf7ZnCtWrwnKeQNnKo2eoZUH90eUD4BwIK9wzhtat+wos4/PGlP/ACYX+gOJvJZYZKolarm9NVDqFPLi835WJksDOxgXxE8Z7aZirI1aE6KlrfO/9MVw5ok2JBmQRuD6j0M9cAbz3W5gHPVkp0KdNRSd6j03FQMWdChDqSDI8SxLbbi4xq2KF3P8Xq5vKGtVPN4jqACYAGm0R636xqi1xi+4AMGDBgAwYMGADBjipUCgliABuSYGIbM9rckhg10YzHJL/qVkAe5OBKTfQnMGAYMCAwYMGADBgwYAMM+McPXMUKtB/LURkP8AaET9N8PMGAMMyOSNEhKjSFldwIYXKKAIBnVMeaV+i3HeJlw1Mo4EbkDWCR1Mx+axMkHpMYW7y+FVxniKesrVQOunpeGBM2UNDSSqjXc3xVchSp0JJahWqzyNNaoFP5U0Kq6iZPIzfJxk+D0Irckzilw2sZDSBphSx9YvG8fOke2FvsxXLuhZSBDoTIhlnUARcyjPYAeUDE1mBIJgnSYIIiCfUGwPqTPxhDM5DMLDsjImpYbmUzupVoJkQCIEAixxU1KpnOHuqhnSAfKG0gnfmFPoto1sCDtvh3wxKlepb76ow0gsWfSLqGY3OlSQeq22w9o5dGC2avUqQApuWqEiBpDAmYMkkm9yt8P+PdpHoJ9lyzIK0aczmKQAgi3g0SAPJ5TU9QYgzBKyuSe33Y44glPLUmpZvO+EzsKho0AWdZlinhLCCSY+8BAgxviv1O0uVUk5fICo3/5c45qkn1NNISfqcQdDhxJvuTJPU+598S2U4V+nri9HO8nq/wBuB0O1fEnAVa/gp+ShTp0lHxpXV/ewjWpZl/2leu/8dWo3/wAmOLZwrspVcDTTgSpl+UWIPoWNuoUj3xbuH9kaQ/ac5H4Y0r+gJJ+rEGNhi1GTyLsjHMp2WesxFOjrM8x0iB/ExsD8nF37K93ApVErPBqIwZRT5VBGxLWZvgaR7kY02nkUppsqoo2sqqB/IDFB7Ud4QFQZXIqalZjpGmAxPtNqagXLNeLwAJxYybss/GeKUqA++qc0T4a3aPU9FHuYxlHanvQYymXhfdTqP1c2/wDER74iOJ8dl2SmKeZqA89WpegrXnwka1Ugn9pW1auiLYko8R4m1kzdUQPJT0UVA/g5bf2cCCs0XrZl+Zp1G/MAD15mY3/tHFr4P2Wr1YShl6tU9fDXw0H8VasoH0RPhsRvEc1m1YVKyU6hFyfCSm5FryijWP3ubfFhod4rUssEy5Ks256p8e/of+MATa9hsvlVLcTzdKiGBnL5YnU2/nqNNWp0OnaRhhV7wMtlKfhcNylOlaGqEXJ2J/M158zYzviHEnqMWZiSdyTJPydz9cRzPgCc4z2kzGZaa1Vn9ATYfCi2IapWJwlfb+X+mHIyDDzkU/4/N9EEt+ojADbVhShSZzCgsfRRMe5OwHvh3TpINkL+9TlH0RD/AFb6Y7qVJEVHsL6FgL9FWF+uANe/+nxaqvXUlPCKgwp1Q8qDcGNrWnpt12rGR9wYpFcwyrDcomALXJFunlO3Xe8DXMAGDBgwAYhe0HaSjlVOrmeCQi77Eyx/CsKbneDAO2JeshKsASpIIDDce4n0xgvBeFOK9QZms7VQeZmBLM4OlxTQkgtqFPndGPKCqNCsIbLwimccS4ln+I1VfMHw0ENSy67AGdL1JhQhv94/m2RWmMIn0M/wxEfM9el/oDi0O9glMeGnMxIY6mPlNRn1SXOqPE1ydvEW9PFaz1Lw3ZLAC8CLSJIgBdO5tpUxuBYYzZ1432Np7HcR8fKUnJlgND/K2n62P1xNYzXun4jD1cuT5gKij0iFb9QU9NjjSsaJ2jkyR2yaDBgwYkoGDBgwAYy3vH7bZnL5paOVrIAoXxF0idROrSWYERpC2W/OfYjUsYv3t8PNLN+Iq8ldA7EartShSrkMISGpm0GWMG5ms+hvp0nOmVnMcfr1nqePWZ1di3hltSoLnSJsFAsJJ2Fgb4kuH0aC1eZUMICzO7NeBYKAJUN7MLi5kHFWWdQqSEg6kAIkw0QmxJFhyxab2nFqZ6Eq0qxeNRswkgESGRgSCB/23JJP3jHGNno7eyJ+lRpOKkkGohAKSFU9bBVG8GTCwOs4heLcQfw5qIqUrxyxsIgMeZgB0mP0xOKzRqQMx6eZzeSAol1U3J5SgB6TtxwTs1mKuYFfNIAlMTSpE6ub8JcAwFU3iZJA2AvdRs5Z5VD5iHC+C+HRfMZiumVqVRpNR2CnLo4B0IWNsxUUgkm6qRFzOIPOdlhTrmjRYVlABUpGxFgY5R8zBtixZrusNfMLWrZurUGovUDqCWJOohDMU0O2kAwOuL7w7gVKkAFUD+f9caUcbm27ZQ+EdgmN6rBB6JzH9Tyj9GxcuF9m6FGClMavzHmb6E7fSMTBdF/0whUzp6CMSVEqxYEgK1vbf+0bAfE/TClLMBfMbxe9hcnf2k4btVJ3OKd3l8RejldQDFCwSoV3XUDpJi4GqB8lYgwcAQneN2zbMa8rlmZdLgHSLNvqlpsVIWAPU9RjM8/lqmVQKCRUzAKE9dBjUJ/fJAPsGHXEpwPj9Cm81Gi/RS39MIduuMUa+aoVKLFkRFUypWG1MTAIBiCL4AleA8KVKYaARDDeCo8pqD94nVfosRuZh8vx6jRplKOVQ6SVavBLsDMEsdgQPL7YTr02UrUBGlqapPoVgEf3ScHCKq09VNaaVGYKdQUagAdXK5M028vMFJ22IBwArnuLMyoQfu7Dw7WkRqFrOvr1Bj1mAz9HS9tm/r/kcOM5mNWlQqoQSpC36m//AB6Y54gmrSJv19oiSfb59/TADfK5N6klRIWNTEhUWdtTNAHx16YcHK003Zqh9EBRf/JhqP0UfOO61eFQatQUGAPwyfToT6i5i+OEWs+w0Kd/f/PAHa1So5StIR+CxPy13P6j4w1FZZhFLH1/x9cP6PC16kn6/E4fUqKrYAD4GAIhMnWfzHSPQf6YfZbhaLvzH3w8x3TGANT7kv2lfoAi2n3HT29fc41rGVdyJM5kdIQzf3t6Hr8fXGq4AMU3j/eXkMrVNFmeq4kMKKhwpH4CSwBb1AmOsYje+Pi+ZpUqFHLvo8curkGGgaQFBkEAluhHS4649X8Kk6eCQGUczTNxY6TAEAyeUQBp2I1GrZrjx3yz6R7N8dpZ3LrmKOoKxYQ0BgVJBBgke9ibEYz3vCofZ84tUAFXEkEiIblqBVIIJkK53EkSIkj3uc4yfEq5Z6itrUVkA18pnS6EsN/KevXffFk70cshyfisdIpsJME8rWMgWInS17couLMHVEpbZ0VavO7HTEEljfYidWvr5ZDhfw+M/wCzxHca4LUFJa+hgghRI0kggRpTSCAGn8NOJPIJLGw9hX8Yq9VRJFtYOoOvKW0mwYgH1a9ywjFu40KTU3ouZNQaLCSCdp9CDBE/QYirRfdtkZF2c4h9nzNKrMBWuB+VuVifaCTP8zEY3ShXVwSrBoJBggwRYqfcG0Y+eaikEg2M3Hv7n139/c40Xut421SpmKNR1LErUUCQYCqjEjbosmxJ1W6mIPsaajHa3GjYMeasR3H+MJlaD16l1QeURLE2CrNpONDjSbdIksI5zMrTRncgKqljPoAWP8gT9MUbgvellqgIrqaDippidQg6oMwNoANrFh02pfabtNmMzUqUzXBFOpNM0ICRDCZuWlGIuepEYo5pI6MelnKVPgumW71soTU106qBCpBYKSykhS2kEkaZkjePiMQvbPthks7TaioqK9MF1LxT1zyGmBq1Tpcvdf8At+uKTUyqqCW2W0BZkg+VREkkGRYT62nGmcB7JUaSrVqovi6QXLRCwBI9LRdjJMTN8VTlI3yQw4Xfczjg/ZzOZleSmEQiNZARYsZ5b1NtzrF/jGicE7HpTVfEIYqGAhdIAP4bkmR+ezHqfSrdoe9WHalw6itYr5q9SdFuqiRI/eJHwRisf+o/Fw0/ast/AFpEfEgT/PFlBI58mpnLpwb1QyYHT6m/898L01VS0+oP0IA/qDjMeyPezrqLQz9NaLtAWqs+GxOwafL8yR6xi/5tuafofrt+ht9Ti5zj584BsMNauYY7nCM48Ck4A61Y5JxzWqol3YfH+/8AAHEFxXtnQoixA/r/AJ/oR8YAsQonrb5t9fYe+IPtkuXqZLMZfWrPUpsFJ8ofzKfgMFM3iMZ5xvvHZpCTHvYfpij8R7T1qpjWxnouAI+rwmopuIxxUyZKkAEn0FzPoMPsqazCFU+pnm/ugW/lh9kez+crNFKjUY+pOgD5AvgCPyHEQ9M0qm3+7/O3p69LpV6R2WPSZj9Zgmd9sXbId1dZx/7jM06QsdCLJjYeYoL7DcHoTi08P7sshTjUK9UzHO7AT6RSpm8XiZA3A3wBjmWy8GRzN6Dp+v8Ax84cUuHtUbmaTYBVv8D3xveQ7MZSnpFLJ0pkgTS8QkjePEcSR1OwO7DbEplywVQiOgMkCmtBQQNyOeNP79luPNNwMPyfZvMnyZWub3ilUifTbf2xJU+xfEG2yr/VqQv6CXEn2F/bGvMz9RmDILWOW8om9yAKdvM3KbQpxzUqWOr7Usrqsivy36KG5Lm78trLgDK6fYPiBj7gCTF6tLf8tnMt7CTjyp2D4gJ+4HoYq0bfxEuADtYmb7Y1JM1SLBftjq7xCOKaswudKrUpq7LvvpX23w6NHMLpIq02WSBKMDEeRHRt4m1KmBbe1wMZrdj+IKYbKVZ9FCufmEJMe5GIzMZapT/aI9O9taMn6agMbpUztWmCKuXbSAS5o6awX3ZOUgxBlg5w4yXEaVYEpUSoAdLc3lMeRiw1gkfgRFwBT+5B/vMwJtoW1/U3/wB+/vjXMQfAuF0aVRnSilNytyqCnqBIuVksdhdr4nMAZz340ZydJ5AK1wPkMryAIubA9LA77HGEXWSToUKgJvpsAACYMkmwAW5JEdQd173lLZJUCswavTEKBMmYEmyy0Xg+ggkYw/RVoEPpAjadJHNsea5JiQY9DaxxSR0YvhJ7sytXKZyjXUM6JVCMViNDnSeVSTJDSBtMbGCfoDiGWFWk6b6lMfO4IPQgwQemPnDLJWIqh2l2SdAVjGzbKQlKIDCZI0wREY0Wr28zGW4blHVKb1STQqCoZYMqhkqQp5gacMRP/cW/Qk6LZIOVNCNGtUp5hk1KrMQ7LT0lwwKoV1GNyB+FWJuuozMnT4g1RbKU6XuSdN1HLzEcwKhTfegRzYyLN8Qq1azZh2BqM+tiAAs+u0EQoG0EbjCz8ZrF1qM+p01QzARpYAaNMQUsYU8t7Rim428Jsn+O0itZryGkgiI97gnYgyB7Si+UNMjxapla9PM07lOVhsrKd1O9vcTE7DDh86czl1qN+0pEJVJ3YELFQiZClgAAQACxAa6rhkwn5m0+ovYeth7/ADijfJ1whujTJVe87iAeUNPSNcIyErDGRLTqYoLAgxG4wtxbtbmc7l/BrqFDGm6lRpUhS0lgdUiSjCLch+MVcBdIJhjMQx67iBbqDMQb/Ur6BqYgSAeaAApBtba5k8pAOIcmTHBFNOhVaSspncietvUb9NL2k7C2EcvTKmVOoBwiEAjUTsL3EwOW3WxiMO0EG/MZn2N/0ILr/fxaOyeXoUz41aqtoCLI5RDaWI3ZiC0AAkAzEEEIrc6L5prFHcxx2J7M1GrfaagPh0xFJJA8RhHO/qilVAtcqDHKC0f3zcZzi06WTGimuaJDBSS8KRIZttB1LtBIDAiN9SoZmnpUqQwIBUqQQQRIIO0RG2Mj78AftGRrHy/fJ7A8kfU6v5HHSlR4UpOTbZl7/eMKFK1MWXoCR/3G9z0nbb5KWUo6bvV5RzMEtqvCj0Bg3PocIUUKuVawcFQSYA2v9LfriyfbsoMmaZoBswCW8bWwJATToUaRygSASCOu84kqQGUl9VB7i+k/lPqPY2n5xsfdb2kOYyZo1mLVcufDJO7IQdBPuIKT+6vU4yTgi89R7aVplTbqRAI99QWY9emPeG8TqZepVdW8PxBpI6sCZmD6ERPzgDf8x2ly9JQzOGsLggbzcztsfXFR4z3kxPhjbY7D6dR8C2Mt+2VcwZRXeptsT7kyTA39v64fZfsxUYzma1KkLyrMJG/Tf+WAHPGO2lapMvHsv9J/4xCU1zNc8qG/4m/1xbshkOF0Ls9Sq37lNjf5qFMTtHthk6Q+5ybn+J0T+it/XAFW4P3eVapBrMwBMbGBvvA2t9bdL4vfCOwdCmBFGeYhi2hrDVzLBbmJ02KiATMxGI9u8hx5MrTHzUqH+mnCTd4+Y/8A18t9Vdv6vgC70OCKoH3aCGJOpajct4AkU9JFryTaBAMB4tBzpBadLEwq0b7whFSo3KsyAI2BMkSc+p95FYb5XLGw2Vh7+pw/y3eXTJ+9yYF5lHU39YZRePe/tgC60srUEQc02liw5sqLtYsdJE2MXEjpAwkMgBolM6NKuF/9wSQGILTorEsTAMmT8Yj+E9oeG5khV8NHMQlRFpmdwFbyzaYkjE6/DzslSshN4DFus2Sprj5QG3pgCIrcPygXS1TM0x4ZpA1K2bproifD1O2mI6z9cLvwgVFLU8zmYfwyWSqKnkMrGsMGT2uDeZnC1XidagC1VRUojz1aAMoLyatPm5Ra4OqfwqBjupwyhVXxqTeGXAZa9FguqRAYz91U+GZh7YAj6mUzyc1PMpW5nqN4tLUHYgafE8MqQEtAKkCNrLpar2kq0iFzVAoupdVZD49OQpL160AOTICqrKFXlP4RElT4nUpVFo5wDnOmhmFGlKhuRTbURoqwCbPpaDpP4cSlfLB7FdYIjymoPj9m426a8ANMrnqVenIKujBGbX94JcAr48XqViCCKCcqyBtoOG7cEFPUcrVfLOqgEBgaajzffpPh0lM+Sjpe4M+lR45lH4dW8fLuEQsTUp6qSwGgPUoq2YYiqUBUQlp+mLhwTiqV6aVKdgTChRqCuRqNOip/a1lB56zcqnV6OFA4yvG2SomXzlMUqjfsGUTSq3gCgrACnU6xVki8Fhs74pwWlWJqGUqqCBXpPoqJv+0rm2kH/tKCoPQjHPGEyz0no5g0wj2fXUCgMNmqVWu1VTsqeUwDaDiK7G8ZLO2Uq1RWeiAaFYc5q0jZWpoLCouzM20iZEkRZba63VwWTsocwhalWCutyldE8MVIi7oRPiX8wOltxGLJiM4d+0aYDRcEl36RrYcqb2QW6jEniSpnPfeW+yUQI0muNQk/keLA3E9D6jGTaKjqCSrD9mupxIjnCqC0jaNoaQLkjGo9+D/d5VYF3c7xsFEf3v1Axl9NCUaaeo2IMkabgSFBmSdPm2vb0zl1OzCvKIZKsiaGGokEE8xpqvSNQIZjEiZFjHwlmK+oxfSLKpNo9h122+I2w4GUuQwMnaCrR9Ryz7C1sIDLkHp7wf8AHqPjbGbZ1RicGT/v+YH133vjsJf3/U/5D+hwutKNh/h/s/1x6tP/ADtt8/574o2dEYDngquX8JCqmqQpLKG9xcg6DNpH5jBEnD7TBvY7Hqfj/S+I7L1Al9J1CChDaQpF5NrjbbEzxvNo9U1EIIcB29mI5gZ/ekyJ33OK3wbwh5qI1kUORYSLSd/md19iYt0x4aBqAaBJGrli4A03O0j+kHCOaza+1vS5/X0w3OfNtIA9ZvqN7tNjvG23yZlQlLsUyajDj6y5/ce5R+h2/MdhIG/rdVN8SPZ7KU3ztCrSVKjIzeKmkNyOAoq8x3puyeUTAmcVmtUZyzMxJMkk9SSScGXzlWmZp1Hpm06DEx0YGxHscb48bjzZ5ur1sc0dqifQbVVUS7ge25xQ+9HO5Svk3otVVXUh6RYgc6zbfqCy/UHpjO81xzMOIatUb2mP/jGIp8sWk6VE7kgT/njU88Qy+bSqgSrIIMyP6/6fPwQZJAf250+nMT8C0YcUuHKN7/yw6Sko8oA+MANyh0eHSXSkyS9yTETHx09zc45y3Daa7jV/Ft+m36zh2Tj1QcAdGs0RJj0Fh+gtjgCMeY9GAPQcdY5XHQwB5j3HgwEYAMGCcBwB4yyIOxxoPdz2qfxFyldi6PakWvpbohs0qekqSDABiIz7C2TcipTYbh0I23DA9cAfQuYqqoLs0BFJJuSoAJJtrcACTYpik8N7R5TL5pvCrKMtXVnNnXwag3gCXC1AZ0hhzBjbVi4cWoPVoVqdMai1N1RRLgkqQBI0UUIJ3M4zDMZbNUzSSpk8uzHTRVZRyzaTAIWoSDClugmT8Y5Jyi/Kj0tDpcGaLeWVV7xX3LfxntBw3NUHpPmF5xZijIVIuryVeoGDAEGRthDg3bTKvl6QzdQGuFipNNql1Maw1RigDRqiLaumIKr2c4gAS3DsuAdpNIRaDH3o+f8AgRV8h2WzlVS1JK1QKzIShVhqUwYiZE9bj0OMvFyen0Z3/wBO0P8Ac/yga3S43QzCOlKuhUC4astHeeiUIO3vimdgaj+NWydKokltNNlqGryEsxCusAUkhnbSFNR2pqdNxiY7vuAZ3K+OalPMprCafD+zlmgub+JMRqEbfXDTsJmo4zXdzWfUrU9VWmqPrgMFqBAFDkUqgG2rTPXG8ZNxt/zk8zNhxY9Q4Y3uilfZ/lvtx14Lo/E+F8PfwqjqtUKNTMjO5HSSqkAeiCAARAAjDxqGTznPQYLWVVYVKYKVEDiV12B0sL6WsR+uKRw9uLKz1atLirt4rtSpCrk1plZlEqkHVf8AFpiAYG0l7kOzXEcnmKOcUU6zOIz6qzeJWNVtTMuqE00TAQWOlWvzQL7UcvizvdZd+zuYLUyrKqOjMjqqlVBB/D6g+YH0YSAcSuIzhMM9eoDINVgsG3KqI2xudSMJN7RiTwXQjIkpOiod4fZ6rm1omiJZGaeZVhWFyNQ3lV/n8ik1u7zOkHkva3iIQdwTJM7RbrJvtjZTjzEOKZaGWUVSMcPYPPKABSuIhlqJ1uwMnYbAgbjaDOPKvdzmmZtCBYIjxHWG3kgrJi3VRII2uBsmDEeGjRaua9DDh2E4hOk0dPodSsDE2kE6fafUbYd5Xu3zZYGppRZvpJdtp5RAUHpJIHz12bBivgxNPx+TtRl2c7vqSKulMyzmNirDczJC25QbAC5X3IY1uw9TwzlhlWerGo5h3bw1blJWnZYBAiQNwJnpr+DF1CK6IwnnyT4lJmJ0O7WtrqF6NQKommodZcwLEgNAk9SLDrMhHgndrmGqIcyjJSMkhbm2mFbqA1743LBixiZDxfuxPiN4VNtHhAoFqAEvMQ2oQOhgb/zx1le7Gn4c1qdfUI/ZOG/CJ8wX8XoD8+muYMAY5me6vlijr1hrs4gEeqi3S5B9LE45rd1ZFInVXaoFmFWnBP5RPoDvNzMY2XBgDD8r3Y12USlZWLRzeEoA0E6jDN+OBuTE9cMMx3eZ0atNCrZFa/hwTEsoIeZBsBBnrGN/wYA+dR2B4nE/ZH+NVOTadtft/QYe5fuz4m0A0kQEAy1RYE/hMEmR1t+uN9wYAw3K92WfRjroUaoNv2zLG1xEb3FwfjDk92NfwyfBbxOaB9opx1IN0k9BEjbcY2rHmAMLo91XEWmfBS4iahMgzflU7f44cHuizukHxaGq8jU/0g6MbbgwBgq91vEpjRSHv4oj42nEjwrumzTT4706e2nS2v5JsL2iPfG04MAZEe514eM0pMHQDTN/TUdX029/bCfD+6KodJrVSpjmC6Tf0DH+um3vvjYcGAMxzfdnSkCnlxpAN2rvLMJIUiTCNAUsCSJstpx1lO7L72lWqeEullepTpgxKxyJsNMiZbckjbGmYMARxyGonWAR01sXH1SyD6Ya57gIq1KDudS0dTKslIcgqGGiIszDrv8AMzeDAEfSyJXmApKfZJP/AJG+89MNODdnly9IU1qVAsuzANYs7F2aY13JO5xN4MARWY4FTcEF8wJ6rma6ke4h8Vrgvd94Ws1a5qVHqBvEOouoFwylmIFbUAfEg2EAXJxesGBKbTtCGUSoFAqMHYfiA0z7kTv6xb42xxn6NR0Ko/hk2LASQP3ZsD7mfjDrBiKJ3O7GfDMiKKKgMhRA6AD4/wASSd5OHmDBiSG23bP/2Q==" alt="" sizes='10px' />

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
    <p>size 7gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://fs2.uploadbeast.com/games/Need.for.Speed.Most.Wanted(GamingBeasts.com).zip", true)}

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
    <p>size 37gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://fs2.uploadbeast.com/games/God.of.War.4.Game(GamingBeasts.com).zip", false)}

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
        borderRadius:"10px"}} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBoYGRgYGBoaGhsdGiAfHRgdGxoaHygiHh0lHh8aIjEhJSkrLi4uGh8zODMsNygtLisBCgoKDg0OGhAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKoBKQMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAFBgMEBwIBAAj/xABIEAACAQIEAwUFBgMFBgUFAQABAhEDIQAEEjEFQVEGImFxgRMykaGxBxRCUtHwI8HhFWJykvEkM1OCorJDY5PS4hYlNESjF//EABsBAAMBAQEBAQAAAAAAAAAAAAECAwAEBQYH/8QAKxEAAgICAQQBAQgDAAAAAAAAAAECERIhAwQxQVETYQUUIjKBsdHwBkJx/9oADAMBAAIRAxEAPwBH+7I0MVB6fhW/5ucfXA/P5fvjQjFjcnT3fABYsB44MKhEIb3k7TA2tH7jEqoxRtJhmYCT+FR/Ob45lOiKdC5Q1IGKkKwMTYzPLTB6b4hHFapPe0E+KAG3isRg+vCAoJRldiIUMCLncxfFDiPCqiKuty1pIBECBaJ3tb0w6nFsZSXkpvnfaACoL/nG9uomDi3l6ggKXQ8u8sD6YF+yNjB0/L44kWsNJt1wzQzRZrVDMBaZ8v8AXHNCmmzK5P8AdIPy3xTa8kcoxPR6gieh39Dg1o3gLZevSBQBogrKlYPiBIwy5L2dQMsHYmCAL9SSd9t8LDad9UEQSpMkcomSJ8D6xidM6wYspt0HKSQT4i0x54m+OwYsdsplE1qw3uDBtfl446KpLICQLi3rA8eWB/AmFaKuqCLFSD6HoBifNkMWX3dwbX8LDC14sBm+e4HUpVjT0kqWIVgLEcr8j54PdkmP3dp90PYeYv8AvxOC7qZi5AOOOxtEIMwpAhaxAB9Y+WLyHy0yvwtZGZWJFPSVHSWFh4QcWlmMSlor17QWSlbwBN/ivyx5mmVUck7An4TgxFk7oXqripUBs0sQJHISf0wycPyiCiSYB6x5mP30wrcNp/w5A9079ZsY6cviOmGfh7/wxP4niPBRf54TeQ8n+FlSvThQPPV15EfU/DEGcpAqsDSIMmfG1uWLWYqBmIHMxJ/dr4pNWMRqI8CbeBxRnMgbWpgDqQd9hEmLemO6CgU3brC7fmt9NWOM0/4Rt1vc9fLpjvMnSqJ4Fj62H0J9cArZ1lWYDSpjUbb96NwRsQZG88hgzQyqomkXJBggE2tp+d5xQyaKFDNMCRIuSWtbxiT6YM+zppTlWgkc4PS0ibzy+GGSJTkA87UZQrMTM79eYP8AL9nFKpUFSY5yelhiTjuYLLygWsDz6z44E0ahAFpnAyGS1ZxWkGCe6JAIuJ5XHQ4lyWUaB3ZYnnPd6yOvn0xDWVwdIgfiIH8wOmLOXpCoVX2pEkAXMAX3sPD44Kex32HegpAE9MS06e9hGBOU7MMsMtUqeRDHbmfHBfLV9RNNwRUXwjUPzDwx0qR5c+Otp2WMsSPcJHh/TF375+ZfhhHzHFaq1ymqyswkASQbD1BxLQ7Rs+Y0iyEhb8rmT5/pjLlV0UXFNKx3bNIOeODm0/MMJfEOPkMdEEeN5g3jzB9IxPVqll9oNjyPj5YZcl9gSyjtjS3EqS2LevLFihn6T2V1J6f64z2tWY88VxUI54OQqkzUNBOPvZ+OFDgnaYqdFaWX83Nf1GGT+2Mr/wARfn+mHUrHFakVPMSd7jl1xIaSkDvCDYePkOfpgAmaC0CNMtJMm5vYCcfZSiz+0aSLKJW3I/s48T4/NnbXsYVpMPdA/flihWZQTqOo9Lsfgs/M4F5LNsYXWbWCm6+JC7TiQ59QNNT2ogwSpAHwTTbGUGmbFk+fJcALRZre8/dC+SSAPPC+mWfaLdcEWSg86WJPixn4NjoVSEER3eVr+GKx0hk6BnsTBHPBDIcM9qdQMAbkzv8ADHf3U6grWJImL+9aJB52GG/hvDO7oUbGCOdwST8QcHIpBZMF0+ytJ0bSxRwLElrny2v5c8KZrNScqR3gbzy62+PxONsy/Aop6dvA3+DbzhM7XdmiWJgFtww5/vpg37LY32KPYrMaajAsZIE+N+njJjyHWcG69aXMgjzwl5bLvl3V5JaZIHTnhiyWXq16qU0BL1D3RMeI8Ii8zhcd5EOSLTDGWAkHw/YwM4VXAzOYWIBqA+ZKA/seGGZOyGepiXRBtvUQc+d4nl54gyvYLNio1YUpD6TOtOmnYN9epw1OwR82A87QJrpUG+krEWN5g/E4i48/8IgC7kJHnv8AKcOFTsdno/3I/wDUp/8Auwndocm9Kp7Ooul0ZCyiCLxFxzgjDIHoGIFX24FlVT5FhpgdYnFvIVdVLWJESoEzc3m48R8cWafZbM5nWcvTLgNe4A1N1LEb3/Zwb4d9n/EFpFTQg62j+JTEACAfe540Vuwz3HQtOwBEDpPn+n6YrVQWqEC9yPKTHw8MNNHspmfvHsDTU1AusIWQys6ZmY3m2Osx9n/ENb6MuBJlR7WlMDf8QNycUfcgsvQl1aU90Xg3Pgbf09ce5ilqqGLiY9EEfWcOeW+z/iKku9CTGoxUp3Ikge91n4jFF+ztaiy+3psi3BYxBtqcgi22rChdpEBytNKCazBaW2m5BifIQfXArP8AFEEjTqBAmDzjywSzfEAVEgWYkWte3yGFPiVUEkLNzYDn0HicCndiwjbOEz6hmEMUIIINybWmLb4vpQH5bBZItLG+w/LtfrPli5w77PeJVWlMo4XqzJTHprYNHLa+DXGOwebpIalSiKNNFhWFVDHgwDSQxvPXrhZF2hOzNVSFIp6X6REjf4+XTxwQ4blpYFVL+0WQAL6huLfi0melsMuU+z3iRVSaCsjDXPtKY94A7arefKZxNl+wucB9n7ITrVifa0+6DEx3oNv0xl3JzujjhaVaZdap7lipO4HMHr4YH8bzftCpp9wpMO1j5WM+nx6YcuKdls9RoFUpNXBMSSpZVtIABlr+M+cYT+EcBr53UlKnranuhZKZXlsxF9p33HXFW2lSE4+Nt3JCvmqhgfnBbvAzIMR6zPnbxxZydGAWUhWfYEjYzMT9cND/AGZZ6T/szQsSPa07yO8V71yOlsKuZQ6gh7xAgFT48553G+EujoaVUU62V75BN7mRHPrh14GlKrTVV5C4JGrxJAPM4D8J7M5rOsTlqYqGmoDSQkdAdRAk384nDPw3sLxCm61KuXVCktrWpS2AaQ3eiLn4YeDohzwyiVOIdnNKlpAHKTGF0ZRiSBflhg4jxAObvMAbzgDWLBtSMPj+uKfLBackQj0XUSVx45U/o/4KVfLsN8QX64N1HFTSD3WO4sRN9ud98Q/cG/f+mGUoyVpkpxnxPGap/UC5pu4AoI09eZ646/tEwVFtW5/n448q5kuDO8df30xAtMkypH1xxV7PTpENWkyib2O9/ri1WrA1abEd2oihvM2Y+hv6Y8zkaQuk6pnwI6wMcUVlBO6+7IixMmJI5/XBCVfYlahXmDHwxeZ4GwP19MRhSXdj1P7tgjwnhjVgYAubE/v+mBKSStgb9l7h2TqMDU092npZhIkiVmBuRcAnlIw+8GqBX1fmvf5HCv2bqVVp1AlPW1P3geSidZU9ZKGOgPlhvoZcBAW0hpuBECOXkMSbOvggsU/YX+9d0YBcUzg0md+nntirmeOUC/sRUAcG0SFPgD19Rhc46G1PFSZuRqEg9IMEfPG7l0kgZxKtLHr9PDDj2VTRxDIqJuFPoVYqP8sD0wgFY3P7/wBMPfZFo4jlUN2T2a7/AJaf0ufliqOPm7m28Qya1Fh0VhvDDmNvngbwvj2V9ms5mmDsVeooZSLMpBgyDO/XBRMwGOgjlcH4YybtH2SzdTN5hkyuqm1RirakEggXEtO84qTZplfj2VKkDM0SYMRVp/rjKu1CrWzlc0oYsyadJDaiUQADTbcR8cDeLdnqmWCmtR0audomL3FvTDN9l/DFqVmd9MUhKraSzfijoPqR0GFeybbbo0Ds5wtcrllQkSAWdurG7HyG3kBisva7KOxp069MsFDnUdK6bzDMACREETIm8YV/tizrquXpJWKBy+tFIBYCIJ5wLjoZwmUeC1Xp+0fSVeFRHbS9UzpC0l3MeUYzdDSlXYP5nN+04mWVgf8AZh7pDAfxObJMXO8jfD/w3i4aqlGxfS8mRI0wCB1EnGVcH7L1qecFFfbUKns/aQpElNSqZKsJUyZhpsPMalwjgHsXV2fWyqV1AEWJEjvFiZgc+WCnYI2EF45lSYGZoztHtUn646zXDKFWWelTckQSyhpB3v5YyN+w2YCj/ZpJ1bld2Oxv0vjSeyWWbK5all6nvKDYGQBJIAJ5AEDpghjJt00Yx9oHDHy+cNEK0VCDTURJViVVQBuZEeoxqPYHsDSySCtVVXzTC7RIp/3KfSObbkzygDvieSp1+N5cmCctlmqn/E76ac/ByPLDH2i4oMrla2YIn2SMwX8xA7q+pgeuMaMUiPL1FlRUIR2IhWKS5A2Uc43t0xS+0FZ4bmwNzSYYxTsdxBqvE6WfzdQllcl2IJABRxCgbKCQAB1xpPbXtzkqmVq0adZXaojLEODJEqbqLEiN+YwLRsk0xoy9NzkKSqYc0Kag9CyqJ9JwtcUpFK+phoiQL2tEEdeXTDnwOPu1CLD2VP8A7Rha7f8ADK1ZqPsaRqQHDEFbTpj3iOhwUCd46LNDtAtOmBqWo0qukMDvEQRN45H/AEGdsfZUKlPiVGBXoKGrILGrljaoCNiVHeB/u9MU+yvZWujs9Wj7OA0SwJuPA7zB9B0x12y4YKGXzFd3JX7u1MK0G7qVUAnqzxjGg5VtGg5XMpURalNgyOoZWFwVYSCPAjGCfat2XNDPPVWPZVwHUcg8haiiBvOlv+Yxhs+xrtIRSbJVN6ctSk30T3l/5SZ8m/u40HP8Po5paRqrIp1FqpP5l930nl5YA72gZ9nXZ05LJU6b/wC9b+JVP95uX/KIX0OAP2ucd9mgyqHv1Vl43FOfj3iI8tXXD3xLP06FGpWqNFOmpdj4C59fDH5vq8dqZutXzNUQazHSPy0wAFVZtMQCfE+htJW3QVFykoxjk2+3shC4+CY6MQABAFhzPqeeIMzXKxpRmnpsPPHlNZSqJ93Cfw8PydQkq8Lf6f3X7n2YpTAG8j6HFn+J1HxwNTNMlTWdth4SPh/qMEfvlbr/ANOPW4K44Ys/PPtXm+99S+WKpPt+guhlsNHWf5Y7TSQR7scuvl8/hiEU2Nxf+u2OxRclVF2JACneTbabXxItQY4D2er5k6aaBlX3ixhR4ahz8BfbB/IfZuZBr1iV6ICD5At+gxonCOHJl6CUVgBAAT1b8R9TiTN8sTlJrsX4+NeRYy/ZTJLTKogO4JaGM+JIn54F16FKldUVCuxiwjcED4W+ODucrGmwP4WMHwnYnC9n84PawdjcTeRsQfCL+hxJSt7OlwUdo4o5Fcxm6iUqjU10OCy2aAyMSRy1PoJkREjng5VzKvSZSdiUPUR/TA3smQM5VX/ymI5/ipyPiDiLNiK9WmdmlhH94z+o/wCU4ebF40AO0/AUohWpq1QEyTqNj0BHL05YEZejWRC1TXGyk7fE4ceM1EoUlltTHYHlzJxLW7Q5M5VqLAlxTG8QSRcgg8jgqTaGxSdme5PUzy82kxaPDlh37DVZ4pQuL1TEc7NfC/wFqYrKzXUNMbgkSQPlh54cmUp5qhnAppMraiFvTNiLjdTflbwxVM5Jxdmy5bLaeZ/d8Q1uKZdGKtXpKw3BdQR5gmRj3h/FqNVQUdTPKcYB25APE87Kg/xB/wBqxh2ybdD79oubOarZajRZWXUwhWRiXMBT3SSFjVc9Da2HzhXDaOUpKoAEKqFo7zGTExe7MT64z/7I+BKobPOpi6Uu6SejsAJ/w/5sO/GO12UyyF6zsoHL2dSTJjugqJxl7AvYO7WdnzxCoiafZJSJJrkd4zY00TcrsdZIFrBrwW4FwKjQo01WmsqdWo946oI1avIna1zGF7//AFXhp7uqre16LxfrbDxpta3TBDoUtX/3tVj/APRJ/wD64biMJryeOjkf7PMc/wDxf5YcU2E74xkU8lnKdemtWmQysLHpBggjkQZBHUYB9seNHIZdsx7JqpLaQJAQMRClzNlm0gbkbThO+y/j3sXahUP8OrUOmdlck3no1h5x1ONQ4nkUr0no1F1I6lWHgfofHlgXYE7Rl/2UZ96+czVWq+qtWRWJiw0mIA5AAgAcgOeGD7VstmDw+qEYsti8KgGlWDGSxnlst8JuRyT8NziqZOgsGYfjptaY5nSAfMRjZaOmoimzqQCDYgg7HCxdqgR7UfmzsfmytUWDBWDFT+IA/CSCd8EOLBPasW3LalBUEAXIBUTI90f8p8sOHG/s1qUcw9bKjXSaCEBAdDeQCSJF7EGRtffAHtP2YrlQ5y7qFHfOkgbESWE7TviMrUuxJxaZpvY3P5t8shdEZQAFJJpsFAGmVK7xHQdJGDhzyLWSixAqVFZ1XqEKh4PUal/YwDXiZp0aCAgRl0JnaSFVQeQ/Edx4TjPu23F6tN8nX1EVKRqsh8e4SD1BEA9ZOOgv2NrZZGMI+0XtLWzlT7uab0aNB40N7zuB7zwSBA2WTvJvEa92e44M9lFr0GCswghhq0OPeUgET4XEgg4z/wC07s1Vpzn9SvLAVgiaAAIFNgJJJ5EkncbAYJmIXDqlTK1lriQ9PvqOt9JVugImfDH6PykMikbMAeu/jzx+Zc+CNXs7D3eskBQSSPHUfAjxjH6Fy+Ro0kpvTdaDaVJGqKbCI71OQv8AzCDYX5YCYEI/22cWZFoUASFbVUYAxq0MukaegPenqF64yThY0ozsQF1Hzm02F9o+HhjUPtVz1CvXohKqPopvJUhgGkEeBMcsIFHLoRpJ0iQQPwzzn0+njifI4/ll5L9J8vyPl4Vbhsq/2im3e+GJ6VYMJBkYttw9S10SOQGq/hZsfZwIICoFO5A8hafjjm5eLjjG0ez9n/a/U9Rz/HJa86qilXoBjqiW84nkL9RIv5Yg9oPH/q/XF9EneItvtuMXPuSdV/yn/wB2K9PNuGzzft7ihxdV+FVaTf8A23/BOOy4Egbjppa19xTJKxB2PTHXZ/s5TFamyGm+hlqkq5aVDC8GdoPQ7eGGTJ8Kq1YNOuTRYn2isiqyEEz7qzMxbaN7RI7OVUyru1KjTSoV0SDC3GosaatoQWXbeTAwkW3qzkUFY7g6gZ6/S4xWzbEj5+XTADsDx2pmlrlgSqOFWpEazHesBAiFsOuCHEeL0lJGqTewvtvtjSTWjqhTYE4pWKI4Y3ZmYfyHywncZqmVqdOX8vXBfjnEBU902v8Avzwu8TqyvqP54SC2dWqDGT4wKWap5mYQgK/kwIMnwMt6Yk4/xINV1Juv7IOFBqs0ypvJgegn6sB5Tgv2b4ccwrE1VRUgFmuSeQgfUnynldx0jljJJtMmfOjMO3tZIWAgsIA6gi5wLz9ZC3u+Uoq/9sD1jD7wLsbk6oPtarvVX3lB0ADkRBJZTbvT4WNsXq/Y7ID8BnYE1HJ+BaB8MbSMpN6Myy9I61ZTKgzAtJG8TAwdXjGs6QCCt9JBBHoRgnn+yarJpVR3ROlmHzNgBhZzFcf7thbcTy6weR5WOCmmBxY08A7TVMpWWqskT315MvMefMePmce8VoDN8VrBGCrmKikOTACFFJa9oCg+eEXM02E1EckDeWv6Hn5fXHA4o7gB21BRADDYEkkSIMSSfXDpaOflifqngmeyaUhSoVqWijFOA4sQAd5vYgz44yb7TOPjN50UaZmjQ7sgyGqH3yPBRC+YbAAcDpuuoUx3RJEXB+G39MR1ciabWAC7x08NrEfLC/Kno53O0UqA76mfxj6jH6W/tWh/xqX+df1x+dcvw+HBYCDsHiOhJg4nz/DaBElaYgm/tLeg6nyO22CpUMpUaueI0v7b1e0p6PuMa9Yifa7TMT4YY8/2jylFDUqZikFH94E+QAkk+Ax+dq2QTSNC907yZnxMgb+WPvu69E6W8PIYfIKZ0ubNyCdzAkiRM7fvbG09gO2KZnLxXdUrUjofWwXUPwvfeQL+IPhjEkovBfT3ZP8AXFvKZbWms0tVz42PT4YnljsW6Nk7Z0KFemKiVaRqU7wHWWXcixuRuB4Ec8AeBdqmyigENVoM2yiXSbys+8vMry+RzCjllBkUwDJAkX254u5ridRAsMDaI0xptAA35fu+FlJ5WjNuzduG9rMlXHczFOfysdDf5Wg4VvtP46RQZKdQeyYaW0GkxqFh3VHeLACLwotseWMmI9q0vp0gAkR3j4wNwfDbHzZFfeQeQIvEgcv3bFPk9hyN34GcoMvTmqktTp6g9bVBCiwDMdMdBjPftlNDVlRS0MIrFtBBv/D3jbGcZnKiGJUXI5b+GPaFBUUjQVYgQRABnY4OQbHD7Nu2LZWuBVP8CpCv0Q7K/QAbHw8hjbM1ncrURqb1aLI6lWUusEEQQb9Mfm1FiksjbblvfEGZyqMVhQTygXxkwKVDD2i4QMrVqoKgqKCPZHUGmnDaLyY0nukc8bhwbjGXr5dGWql0EgsNSmIIINwQZ36YwAUv933CEMgiw8B67jwiZnHacNGtSo1UzcEgEgDcHyxsgZ0aR2j7NZdqi06dZbq9Qk6DEteAgAi9yb2F8ZvnqMMY2O23yjf0wWHsFBDCCbnnE8pjaLR44p5zI6lDIdSGRsNQ5iQTtPOfhbEuSCn3L9F18+k5HOK0+6f8+AXcWx0ifDri7lcqs6dRBjqY+GCuVoojwyzFryTfY/CPjiP3b2z15f5Il+Ti39Xr9tgOrkKrDWo7lPvRsT/eg8gP54ozV/Y/pjQaegqF02IIIE7Gx+PTEP3I/lo/+jSxaNRVI+c6jquTn5Hycu2y5S7Tt7NNZmsF9wAhS0XMzztCxGELtTmWqlkDAFjLECJW+rlt7vxjBCumkGpMMDp0llMQLxAuJ/nihx0D2qwP4baW0CdREAKi2EktAFzzv72NBVs78S52f7H5ipQc6xTpyViX7+glWJRSsiRHePLaNyFP7PQQZemOdqX/AMt8M/D6Rp0Uy595EXURsWMM/pqJx3Uz4QQxj92t0wkuV3otHhszjjPZOtlP4lJw9P8AEqkgxz7p39JOFrieY91elz58hjReNZxqvdpqzT+UE/QYE9mvs7ao/tM3KU5JFMHvsJ/ER7g/6vLBhPLchpRwVRAvY3stVzzc0oKx11PQd1J3aw8Bueh07ieVXLUBToALTH4efiT1nnOLGd41QyyCnT0qqiAiDboFAws8T7QQNRgudkGy9NR5nwwZcnoEeK9sDcSz/sStakQO9BUEyrETEf8ADYA9Igje+DmS43RcapKgge8Lkm5uMZ1xmt/EJG7XgbD05eXLFZOIVgI9oY9P54ZxyFi8bNA4pxtGp1KYTVq7oaSNueEriLbD1titlM7V17s5OwLGB4xi3xbhtRKQruynU2kqJ7trHytGMo0wy5E0VEOCnZ5KRzFIVUVkLgEED8VgfQwfTAOnVxbotB6dD9MMxHtG0ZpUO1PR0YGAYETa0b2OA33MLpZ7XN47v1v6nBPsrxmnWy4qvZw2moqqW7w5+AIvHLlgg2Yy7hQykGwCwwI9IMfHEMKOWXFYEDI1l5kciCT4Hb/XHFfIIWn8V41hm2EzbmNo8Npwe/smi1MgMAJ5EQCeZVrTfwxBmcoQ8KjEWBO+o+IFj5iN4jAySA+NoBPkZGlqh3F1B6XH0Ppiw/ZZ1iIZeercdIgXsSfhg1R4dNgSGHjMHkY/d/TBSg5ACtAMxeNLcxaxnwwyloaMX2YtnhwVBT0tcSRvvvyviHLcKKLpBkRsbEehw9GiGHesb3AsPGDN8R18rTge7PWLRztqHLxwME13M+IzutwQlpg3E2bvfLl/pgRn+zlYsSsR0J5eexxquYymXkBheZjWogDc3O3xN8RjI5YGA4gd3SGU3teTcG8RMQTY2OMoTT0xfiaMozHCHSCAWIEk6Tb4WxYPDXgMJAY3jkZ3P9MaivBcue7rmdiTM+uxm2Pv/pu8rUER+X4X1YZ5+jODMszWRZtr6RtttvH0xVGUktrJJWLDa3L441duzh5tTJ22/f7+OKNXspJnSkwDq7sE+G/zGEUpr/UGEjOEosTMSfHaMcHLGRuN5v8AsR8sP79kmZTCX/xAddibczb4jAvM9mqoiKRmR3jsDse9hly/RgprwC6FRR3SfrNheTPn8sWKjaQSDHPnHr16+YxazfZqudDAXURMTMXv47/y8OBw2qFl6ZkC5XmPUCNv64OaJyVFPM5RWSTAaAZF5HlzMx/SMVaQ9mVIJKsNiI7oIJibeO/XFuplnV5uVB8ze8Ruu+3OCbbYq5vLlubBgBEgkW5X223B9MVU12DklpndLLamkcwN+Z6/KTi5lFlmU8lN42i/w3HT5YqZFK1P8JAubQTPKCDtt03xI2Y0EPA5ht+Y6H6jBteCer0XdRG3LbHHt/H54rZzidLTpWxXmdjO4kCbW3tgZ/aC/mX/ADD9cHEPxtlLJhistHeIk2uARN+kEj44kWov3rL1ABICSNMXWwYnnuxnrOI8tVmB1j4m5PwYfHBLKZNa+eUL3VGqNrhANvOT8DiMtRPV42268LY6U6r1F7mldUa6jXAHQLzb5D5HzL+xpmKaanO7kCfiBbyAAx3m4RABYbAeeKNfPpRAVbtf4458jpxCdSoFGqo2kQbTvhY4r2oZlK0u6u2rmfAeOI80tR9T1GhBsPphZztUM3dmBYeXgOQwVs1UfVc0xado9TJ3wOzuZ02Hvnbwnmce5rMimmo7myjqf0/fPARahYksZJucXhG9keSdaRPxHK6XsSQfzbyAJvzgmPTEuQyDVTCjYSTyUdTiFqzPo1nZbHz3nDTw/KlVVdDRAJYAxJE9L2th2xONVDJhPheTy9NSgXlOsm7bRMWHPBo8By2ZpPSAKu6QCWlQy+6dzENFumBeVoKQQNRIAE7FWnmPAA/sYK0f4aoqSDcyTErzuDuCNsJIn52ZC1MoxVhDKSpB5EGCPQ4sU5OGDtnwlxpzcErVgP4PtJ/xRv188AaD4pdqx4oZ+xnFjl66mYSpCPy8j6H5E4158oGs+lo2Bv4g7YwRKu2NiyvH0OXosqyzr73JdMAyN7bemEfYElTGGEQMWOkASTygYUOL9qgXVKcqmoSxA1GNoAiB8/LEvaDOk09V5AV1/LExdd5Jg3tAwrDKqKYqamDvMEiVBFz5WwqimrBbsYKtVQyjWwLGUaVvuJBAHPlOIeN13rMKkjQAswYiNyZ2O5/nheq5qukIBAJLSYIuO8ReRttywUyFKqQO9MkkmxHKxE390HbfEXFx8lbT8B3KdqGp6bVWQ2GoIdhaNMFb8jIwZyfailVALrCyRq3AI+YHj4YTMrTqUzDIYglSFhbbwCIDRPTfHznQwR7s6jSdtSzMxyscG2BpGm0npzfSYMCRtbaf1xeTLIfwr8OuM74Z2nCtpMlZ0yYkDly+Xn6uGXzYPT4jFIzruI4+gpRyKLsOc9PKY3iw9Bj5eH0xMILiDbfzjHOXzAxZ1jFk0yTTQLz/AAVWVvZhRUMd5i5Xe8gN0LAXtPPFqlw1AsMJuSTPM3tEYnDgWB+Jn5m+PvvA2nG/CbZW/sun+Ui/Jj4+PicVuJ8BFWIq1EjkCCvqCLn1wVFUdR8cRnMRuDvYiWEdSQLYbQBZr9kKjQPvlSOkEePJvLHzdmsyp/h5rumNQeW25jx8ARtvho9sLRJB5jb445esAdj0Jjbffw8p3xgULlfsTRfTLOGX8UgzedmB5+PTEOf7F6lcJVklCq6xZSSO9KkXHQg8sMFXiiBgsEyYBXqfOMTU81K6tLDexjl5E+eNozijH+N9nq+WGmu6VA2wV7x+bRAaBzPzwNHD61ZlFAGy7SgkLaZYiDyjwFsbZmKIqFRUoo43GoBo8bi3piIcFozq+70gZP4VnzkDfY+mDYKMkzfB84E7y1Gpz3Q4Q7k2lZAIubn9MDvuFX/gjG60MmqbKoneAPrjn7oOvyH6YNoFMwqnSVM06EwKUiSIlgsiQNpMbcgMd8HdvvNEzB9o3pqJkeUYtpwLNZjMqCQCFl32C3gTG7QDA+gw1U+xlBGRva1dakEGVEx4accs9pHocEoxjJPuzrOZF9XtHcHSO4g69T1OAgqLSBZu88Ex0wz8WJp0zomY30M3zGxxn3EazKpNWV8wRPxxLFlFNMrcT4jUqG+3TlihWqKg1MbfMnoOuI62fESAT06fHAHOVXZpc+XQeWLQhYnJNxPM7mHqNqNhyHQYjoKxYDrbkN9rm3xx5GOqa39R9cX8HLVsNcNyksQySEMtJMLE9DBmOsW6YN1M00E6wNRB0lm08tOywbQfW/THvAG9lTdCiszMQ080VNR87kR5HrjmnU1Gn3BDd4XBAA5t0tyjELtlZNpYf2wnw2hVJ7q3HebvATzBgjlNsHclmkKhhIbqBqJ6x4evXfFbh1en7M06rCbSUW9ogFgLHwF98U8yTTWNLCnMj3gIJmLXiw+W+Fu3QjjiSZvMJXml7MkERpt03M7Hb4YQOKcPNCoyzqX8LdR4+Iw8cN06mMlS6sskWvaZG2KmY4StTSC0lTJ2jaBPrHwxXURYW3Qo5WiTc4Z+zecMrREnvah4dYPiMUOJ0QhjkMQ8LzwpuTMbQfK+AnZScaH7OH/aWUEiKIAWJUgTIHPysTIwNzv+6BbmY1kdxF2t42n18b2Wpe0IFiWIB9kZ7sfiHKRb9cXM1lIUjQe9IiASRt3BygE35DmcRyqh1FNAank6jsalOqrAjaIN9tufjizmqGaUxCtYAaidQiL3uQbi8bzAxLlK4VhSpwGPItIBG/e3Pib7b4sZys6gsabOZltMzzJMjywmTb7DUqIqXEXWdT/4oQsvjA2+QnEObz4qSWEhYQNp0karQpG2/OQMVTR9qQCSj911XkNXvAiwJi873jli9maCimdbo7RYajOqbwF2ItfDqJNso6VchEZgFTQQVvqkybXMzv4YLdmsq6uFeqFIIBBllYf3Ra/64oUCSg7x9rDAAkkTyGkbNe1uXliF82SwZIUSYIaN5gEbTynbbDuIlmkLTU+6dPoR8jHyxWzXD8w9lrlR/dEfrgTwLjrOpLBdWqO8GEebR9b4PpWeJ0A/4XB+sYTaCB37NZoSaeac9J3+oG/hi9kuE5hY9pU1x1P9OuLozDCI7vgefwnHdPPCBLAN528Yk3w1oBboU9P4b3v5+fp8MWBT35GIB3InYiZHpEYrpmfEm0iNvjiRK4br5EEH54dSQjRZp0wosfObf6elr4mBxWV7xfadjGJVOKKQrR26g7ifPHK0VUBQIAgACwAFgIHLHQOPcMA8OPJ+OOjiNhjNmOKtYDcxit9/p/nGLLYg9iPH44lY1C5w/uDSxAb3m8WIk+gsB4AY+fiNMHvGNz8P6EfHCvnOJrSzBZ2JNWdKgfhOx8B7vwwudouNlCUWI96QfzC6mPjGIJtnRSGrjrZfMFQ9QkD3VFTQJ5m4gnbfAt+z7Ul1085UojcamkHwJTSB88J+Wz+sgxeeu/6YaFz4Wn3FMjeHZJ9Zg+RGG2nsLrwBuJ0Kla/tKNRoiQwVj/nCz64VuIZZ0MVFKHcBhv4g7H0w4jjlMt3svSYA3JEN495NPzBww0nyecpik1ND+VSy61J6KwEn/CWxSLoVt1RkJOJ8osn1X/uGD/H+zoy9TS1OASdLAtpYD6HqNx88Cc9VCrCpSXbYSbHrit2Ini7Y8vlgPZkKrGZZmIgdDfew6G1r4sU80kEl+6SbBVAM/h5Ei+1xGED+3K1++194hQfO0nHn9tVTYu0cgGJ+bTHoMT+L2afK5ScvbNEzNOmse09q2tZAQEQP70yATyUCwNzfHFCkE72qroKmdRi52DGY9Z/Q5/Qq16ximC3UzIHmWOkYZeH9m6rgGozMf7qkx4S0Y0opKmxYt3aClTO96xpMBKjSG1NIuWKwD15Y74OdJdYPeB0kiNriZ2MdOnLEtLgzJsjbbkfzJn54ucN4a5qKNQA2a4kLzPO4wmqpFFd2xf4hwzUxOom/KAPSd8LPEcvoaBf64cu0mUQB9ACqBpH1JJNz5nCLVqd7TeP0w0NjciaNQy1YrRA0A0LKXDaWYm3/AIWw5XPK+K3EsnWZYRopOwEKbA8lYklth15YXOw3GjSzGhmPs6ndI1T3vwc+tvXGmDieXJIZUYTIbSVERuxMDnEnpvgUkyTk2LH3EBDRSqJBBZgQJO5ANiV6+MHYHEuV4fUpBlNQgRAaTM9VAJJHiRhnHBKFUh1YKIgqqgfOTHO+LQ4SEEBiV6OFMdNsbRrEsoqnR7eq/IhtJUn8Q70fXFXN00HeIAuADoEi3Ob40CpkVMCAY2IGofCxHlipmuzyPfT8Iv5gx9TjWjClwtQneLgxzI5j3ZA96+3O3PY95jhku5KkuxBBEiLSw0QBJ6eO3Rpo8HSmQRCxsRKn1FwT5YrZzhtdvdqrHLWlwPA6pHLbByRqAmQy1RFqPrSViVNiQeem0R8d8M/D8yjgBlKvGzOflqPyxA3CiyD2sOR/iIHkQdX8sQ1uF0xBiOYZbem9/rgWmDYxU6A6MPCbfLHzqBzHKRhVrcQNMCmq1CBMuSfPcc/P4Y+biOqxdlPKIiOewk4zSMrG2nUXkR5YnRx4GOeEVMuqSwJ1Dwnfa28+n9DnDMzrUP7yn8SknbcGL9eWE7DUMqsf9cSoRinlsyrLKnUNgRB+Y547OYg3t++gwykLRcJHM77Xx0uK9NuYNjiRWw6kK0SaRMwJ2nnj2ZxwrDHYbD2CjgrjnTiU45jAaCfnfi3EjVr62EERAsRA6HpJJxQz0Eg+Gn4f0IxzmagaJseo3GIKmYMaXWf7wn5j9PhiaRdsjpUyDIwRy3E3XZuW1iD4EGx+GKAq/wBMR674arBdBytxemw7+XU/3k/hn/pGnryxWD0GNqpp84qLIn/El/8ApwNFX98sT0cxO8HzAP1wKNYxPna70jSfRmaR5BgzDoVI76keI9MLWY4dIIpiT+INAqDxJPLxEeIGLtNqfOhTPlqQ/FGGC2UrU3gFaixt3hUA/wDUUkehGCpUCUbFKnwx2Nyo83WfrglkeCoT3tJG8FoHxBn5jDFneD02GrY9RKg9NSnVHmCPI2wAzWbFE6XpR0MllYeB2P72wcm+wuKXcY+H5ynShJQAbAafjODX/wBQ0wLMu3N15euEKh2kpqbUh/lGLHFs+talSNOnoZ2eQAASPcAkXIJLAg9MIoO9j5pLQ6UuJvVZVosjM2wDqSfGN4wWJNFIcq1UgyVAAWbaQeZ64X+B5z7ll3KrrNSt7NCAosiqpYncqWBt4+eL9LNo5AFQM7OdQHvSk6hHIC0el8JLWkV41e2AuKozK6Obr3gBPnedzEeWEmZYt429MOvGy7I6RB1NqMcjqsTO25wm5lgGJsJ/dsPx9gcpBVB1gLMk2jfwjxxoppZhVfUi3MkEmxJltQsVm5kdcKvAOFGo4qMIRdoYBy34Y3KwYaSOVpwzHiVWkNTkq5GkQ2pRAmST+LmPTwwOSW0kTivIbyNbMhy6UzGkMhF5sJWGswkf4hPjOD3CeN1KvvJ7O8FWBDTyueRvv0wkDilQPRFMqFL94XaLAkmRabWmd94kN9PizMIZNRDBSCCPK8RymeUbmMT2EOFw17ECItcHfcbGCMdq15g/GfriqM8AIIVD4NIPXcC+I6kMwIqMb2E2JvyEEwOuAAI68cMg6W87fDFRfaFiFK2AtHWeXpiUNU5geYB/XGswuccqVKdSaOstPLYefKPPDGtAVEBaNRAnmPGOnpilnKQaRUUurDTpFiD1kX8MccFT2KlVbVTB7gIIZRzGqYMeQxrMXamUVQAAF8pj1xWr5RWnUtNrXlQf9MWqlcmBbvciACI353xRz+bNNTpXWRJIEaue0kCbGx3xrCe8LqUwHQEhUMEMDAnkpcXEjYY5ylRaOY0KQNQEoS0QOacgRK2GBvDOIU80rPQ9oqiQzFSe9EkPTcTIMGULDxxTzWfzVAgeyWpSjUGoNMjxpPspHRtPlvg0waHJ6LBzU1kLF0gQfEzcHlY+mLpYFZFvFd/SL4RKHaPK5p0oOzUmcQFYFGB5CRK3MQJPmObPl9aKqEFwpIJJ7wHK8C3n05420YI5bNyO6VYDmDz/ALy8rY7Su0E6dQ8CD9YM+BwIzefaRUoVBUAjWhgrpb8YYXt0wTpVUY6kIJi8b+HjzwbBRepG1vnjw1oMEEdNyPlih9+PISOoMj0Kzf0xJ98EAzbruPDDZC0X1/f9cda/3GKCV2/ELdRf+Uj54l9un51/zD9cNmDE/LtbMNq69R+mPGzFtvQ4MqoO4GAnEVAawjFVTBbIRWbVaB6Y9d252xJkN/hjipv6/phvIPBycy3hiahmscURv5fzxFF/jjUjJsN0a4GL9FxujaWwCo+7ieixxJxKphxO0Fan3WGrxnEOd4jRrpDSrAyIsCdriCPpgdXxBSUXtywEl3M2cVciZ7pB6DBtKQNcICNNBACeRKRqPq5JxU4X/vU/xqP+oY64Mf8AZ84efs9+dw83xQmxh4pm9OVop+MaKjT/AOcWdYv9cVK9UpmXem8ezRjO12kAeN2+WPO3DGUE27luVkWLep+OA+oxUvvp/niTXk64ulRK/GGFBkJ7pYsT+IzynpMn1xV4f2lahPs6dIlgQXZB7QTtpfcRijxA9xfMfQ4HpisYqjn5Zu6NO7N5nL5vLvSD6a8atLC5IuWUzDeGxEDbfC7QaotYpULB6Y5mbeF4PLbfC/w1yKiEEgyLjDlS7yktc+N8TcFG68gU2wpwnLBtY1fw4lCYDLUO5ZRHMtYjpEYLZbMPUqJ7VlDKSsK0ioCCdYXYFYPxYWMSsVDcfvkcS8MqHVubbX2wmI1j4XUmZVbXJsL9Y3HnizQoKwuigjYhSD5hlOFTL1m7/ePvjmfyjB7h1VtR7x2HM9ThGg2WalGsp1IdRmRcHzBBEx6/yx7/AGnq5MrD08bdb8xgjlxIvex3wMzDE02kzGqMAxZoZh+bo6G15Vh6nfHVb+GpKq0QSNMRfcwTuesYS+Gf/kp5t9Dhr7I1mbKKzMWJLSSSSb9TguNGTLeQzqtKkmwmSsenT/XAbtJmwjpPuMdJdX0ssi0gxMGPTyxW4jVZQxUlTBuDB68sU+3KA5FGIBaRc3Pxxoq2F6JMplBw01KoDulUggA2UCdjEEmecbDE/B8zQzRhBoYFnCsBYmNTLpM3Jk6SJxN2WUfdqawNJQyORsdxzwOzlMUqqmkBTMgSg0/TBAHDl6aVATpZlDMJidI8WuCPp1jBalxJYAkEbATJ9CJwp/aAf9iLfi0rfnfe+Eb7OmIz1NR7rLU1Dk0IxEjnBgieeCoXGwOW6Ncp8HlnILU2AARtQNuhEe75n4Y5zmdzNCkXdUqAQSF1Bt4MQDbnzwQoGw/wn64jyjH2TeDsB4Cdh4YQY84TmPaI1Sm61AdgAABbYkXnrPwGIszn0j2ftPY1jsCRv4SCCPMbcsV+xlJRTYgAFmMkCCY2nriTN5dDSLlFLBmAYgEgAmBO9sEBNleKOHKVqbptDgSh6wRgr95X/iJ8f/lhd4DWY07sbMwFztO2CGkdMCzUf//Z" alt="" sizes='10px' />

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
    <p>size 12gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://fs2.uploadbeast.com/games/Far.Cry.3(GamingBeasts.com).zip", true)}

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
    <p>size 21gb</p>
</div>

<button
 className='course_box'

// style={{
//     height:"50px",
// }}
 onClick={() => handleDownload("https://fs1.uploadbeast.com/games/Call.of.Duty.Black.Ops.2(GamingBeasts.com).zip", true)}

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
    <p>size 44gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://fs1.uploadbeast.com/games/It.Takes.Two(GamingBeasts.com).zip", false)}

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
        borderRadius:"10px"}} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8ODw8PDw8VDw0ODxAPDw8QEBAPEA4PFRUWFhUXFRUYHSggGBolHRUVITEhJSktLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGS0mHyUyKy0yMS8tLS8rLSstLS0tLS0rKy0rLSstNS0rLSstLS01LS0tKy43Mi0tKy0yKystL//AABEIAKMBNgMBIgACEQEDEQH/xAAcAAACAQUBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABHEAABAwIDAwcJBQUGBwEAAAABAAIDBBEFEiEGMUEHEyJRYXF0CBQyNDWBkbGzI0JSobIzYnLB8BVDc4KD0TZTY5Ki4fEk/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EAC4RAQACAQMCBAQGAwEAAAAAAAABEQIDITEEEkFRYfBxodHhEzKBkbHBFCNCBf/aAAwDAQACEQMRAD8A7ivNPLp7bl8PT/pK9LLzVy5+25fD0/6SkDn9kWTQtIEJosgSE7J2VCRZOydkEbJ2TsnZBGyLKVkWRCsiyadkEbIspWSI0VD5s/hPwKObd+E/Ar0js/NSNoaSQvibLFQ0plzuaAOZhL23G/0ptdL6FXVTVUsLXMDo3ebxPlY+8XRdAyIxsFtXZs7j3tcFx/Ee7/Fi6iJeZMh32Nuuxso2XXeWduaGKRpBaKmoYTzkD3AOewx6R/dytNrjQWB1XJLLeGXc4a+lGnMVPMX85j+kbIspWRZacEbIspWSsgjZFlKyLII2RZSslZFRRZSsiyCKSlZFkEUJ2QoEu6eTl6tiHiIvprhi7n5OXq2IeIi+mpI7AhCFFC81cuftuXw9P+kr0qvNfLl7bl8PT/pKsDQEJpqoVkJpqhWQmmiFZCaaoSE7J2QbZsNsFNi7KiYTx0tNTHK+aUF132zEAXFgG2JcSN4362jtzsLNg/m7nTMqaeqvzc0YLekACQWkneCCCCb67uO08kL46yhxbBi8RT1kb5YXHUHNGI3accpDCRxDj1LSdpsUrZHQUdX9mMLjjo2U40bGYmtY5x/E52UHN1EW0U3tW8S8iUocY24pA6oyGRsLoXMc5u65s8kNvpmsVqeyexEuIvr4zM2mkw5t5WuYZczwZGuaCHC1jGddd67DiTCdrqIgEgYRJc20A5yUan3/AJrWuTP17an+Kb61UpY03Yjk/OLUctaa6OjihnMLudjzD0I35i/O0AfaAe7tVrtfsNPhVTSwSTMljrS0QzsaQD02tdmYTpbO07zcH4bDsr/wdjPix+ijV/ym+jsp/hM+dGr4ixxfkjFIyR0mL04kjidKInRZHvABIABlvrYi9litjeTs4nRPrTXR0cUczoXCWO4BAYQS/O0C5eBZZzl5wioNe2s5kmkFLBDz+mQS85Kcu+99QqGGi+xeJganz6PT/VpFPBbattvsbNg08cMr2SsmjMkM0YLQ8A2cC06tIJHEizhrvArbA7FvxqWeJlQ2nNPGyQl0ZlzZiRawcLbltXLg0gYKCLEUUgItqD9jwUuQafmpcUkP93Rxv1/dMh/kr4I1nZ3YKauxKrw0TtidRc/nmMbntfzcrYxZuYWzZsw13BYrENnXw4mcM5wPkFXFSCUNLWl0hYA7Lfhn3X4LuGzdCafHsenLbNkfhjIyfvc80c5b3haGyl57bMstcCvMp/0qfnB+bApEjVdvNkJMGqI6d8wnEsImbI1hjHpOaW2LjqMoN/3lU2i2KloaTDawzCWLEmRkARlhgdIxsjWk3ObQu109DtW6cvJEzcNqmjol1dAT/C9mX9D1sW0uHtqtmKJosZaWjw2sYDwaxjBIR/kdJ8Uscf222YdhFX5o+YTnmo5ecawxizy4Wykn8PXxWAXROXb2yfB0/wCqVc9srAihOyFURQpJIFZKykkoFZKykkiku5+Tn6tiHiIvprhq7l5Ofq+IeIi+mpI6+hCFlQvNfLj7bl8PT/Ir0ovNnLj7bl8PT/IqwNBTQmtMkmhNUJNFk0BZFk0IBCaLKjK7ONrGSurKJpz4cw1ckv3ImNBuHniHC7cu9wJ4XI3nlkp4qiPCsXjZzb8RgZzzN5P2bJIyesgFzSeIDepYbYHbeLDIaukqaTzujqzmewFocHZcjgQ7RzSAOItbjfSO3+2rMUbSQU9L5pR0QPNxktLibBoADdGta0WAF96lTaug8rW3uIYZWR01IYmxyUjZS98Rkka90krSWkuy7mDeCte5Enl39tucS576WNznE3LnHnySTxJJJWB5QMeGN1DKyKF8DI6dlO1kha58rxI93Rynd09/YVPY/HI8HZWuc90k9TTNiZTMAyyvcXhpL7dFrAXHTU5wsd0cRy7x0+p298xUVe/yr4/fhkNlP+DsY8WP0Uav+U30dlf8Jnzo1hNidtKPDaCow6ton1cc9SZXtDo8haGRNDSCdTeK/wAFbba7btxOpoZI6bzelw/LzMWZpe4Zo3O3aNFo2gAXtbfrYbqbcJ2Zvl6xCY4hHSmRxpmU0M7Yb9ATF0zC+3Xl0V/sTjk2G7LV1ZThpmhrugJGlzOm6mYbgEcHHirXaPlFwjEBI+bB3PqXQuijnk5hzo9HZDe97AuutdwraBhwOswgxPzzzNnNTdvNRta6F1iL3J+yPxU4jdrDDLPLtx5bVysYlJRV+EYpTkNrJKSRxz5pIm9EN0Y42AtO/d2FUOTzFpq+XaGqqCDPNhgzljcjTljfG2w4aNCxG2u08ddDh8phMU1LTGHI8tc3nXZdRbgAwHWx6VrcTi9itqI8NbXiSJ0prqXzdpYWjIen0nX3jpcOpTGe6Jp01dKdOI7p3nevKPC/j5O3VdY0/wBlVDSD/alVREkcWtppZQf/ABb8Vp+ytNn2xxJ5GkDJ5L8AS2CP5PP5rWYOUNrWYEwwPLcHF5rOZ9vli5pmTXSwJ39aVBt3HBW4tXebSXxWLJTjNHmh6OUl+uoJDd3UVacuWb5QcPe3Z2mEkrJ5qPFJ2zSREuju+SoBaCQD0S9jTpvaVsFLXNjk2appP2OI4JNRyC+nShpnNuOvo5R/GuYwbURx4DJg74JOcfOJop7tEbQJGSWIOv3XDT8QRtDtiKluC8xE6OXB4Y2ZnlpbLJHzBaW23C8PHrSk4ZTl19snwdP+qVc9WzcoO0rMWrvO44nQt5iOLJIWl12F5vduluktaViAkWTQqiNkrKSFBFJSslZAklfYXhc9W4tgZmAvnkJDYo9L9OQ9FvvOvBZB9Dh9OBztU6rkyua6KkblY19+i4Tv0c0C33b3NrCyDA9nE6AdZXf+QXCZqakqnTNyecSxyMYT9o1oaW9Nu9pNrgHgQuPT7TSANZSxR0TGNytMLQZiOJdKRmJPE711fyepnyQYgXvc93nEWr3Fx/Z33lSVh1tCELChebOXD23L4en/AElek15t5cPbcvh6f5FWCWhIQmtshOyE0AhCaoEWTTVCsmmgBAWVaKNoGd+o+6zcXn+Te1Qa1SyLMt4TU3Xv378GRiq+hc6gavNst3HRsTBwFt/ZfrUecb0i6QB7SdQMxMpGrgOIaNBw4q1nIs1jfRbrfdmed5/kOwKhZco0ond7s+tzionevjz78b53vdkYomhmWJxLnDM4gnONNAQwG3xClTUssoMTY88mXdFmLw47nSvDsoH8Sxgvw46d6yVZIWEwxkiKM2AGmYjQuPaVuNLxmXLLq7isca2r0/b7q52SxAMMjqZ3MtBL5GOjnEbRvJETnEK2pqpobljFy5wbG069RL3njw+HesjgdfU0b2zRucADvuQD16qe2rIjPFV07ebjrYi94aMrW1TejOG8LEOY7TjIVvU04yhy6fqJ0Z2j9fGvfz+DHGQXbJcOa0luZ1j0QdbDi95v3CylFKbAB2aRjiXnMdBv7S5o3EDisVZA01GhG4jQhcp0YenH/wBDKJuvn8PpHnttfFZSGONzAAbMcS6RzrMLw3hv0BcfdZUWOY15kdI10n3AwPc1vDhbcNArE679e9RcQN+gV/C53Znrfy1hG3x/j95jneWUH2ZPOltibhxc4ygW3NbckfEKwAb0i4E5g4sJdq3XRzuvXT4rJYZs9LKWmW9LAdTNLG70bE3ZHoZN3YO0KlRxdGqdGxrxdscTpcrg3cM9jxsCRv10VjCcd3PPqI1dqiIi/Xn1pigQdxv3J2W609dHOBFXRRvqC0RU1U6PMSdcoflOrQTx7dy1KreS4tcxrCxxBaxjW2I0IvvO7iStRlc1Tnnpdsd3dEx7/ZbWQpJHRacUUW3DeSQAOJJ3BZSTBXw2NW7zQOAc1jm85UyA3sWQAggab3lg6iVUpsaFK69FA2Nw9GonDaiqB1s5hsGRHX7jb9bnKCMGASZBLUSMo4S6w84ztme3S7ooQMz+PUDY6q487w+lyCKn8+mbq6ecyxQude4tADrbQdLQ63BWFqJ3yuL5Hukkdq573Fzjx3nvKpoMljWO1FZlbI60TfRhYMkTf8o0WKUkrKCK7j5Ovq+IeIi+muHruHk6+r4h4iL6ak8LDryEIWFC828uHtuXw9P8ivSS828uHtuXw9P8iriktDTQhbQ0ITVAE0JqgTQmgLKTQkAq0bVJmlxi0o2K9jpSW3tpe3vV5guGGZ4uDkGryOA/3O5dNwfZWMZpJWAU0FsjCNJpDuLhvdv3e7rXzdfq4xmoe7T0oiLlzGbCTDG2SRt5JBeOMk2AtcF1uzW3UR16XWFOdUBkBpYahz2tLbwxxvYHcOcYGu69L8FuO1NK0kxht5Mr3PL90QIJNz1nQE7hfr1WG2aomucyWCVrpIG2lhvlkIYSczAfSBBPyXbS6/Tq54csukyymN+SxLZvDIxE1/PQTFxYTTvMsDni1wOdzOJv1Gyx+H4IKqofCZObcZpm5i2/Sbl5vML8RzxGv3T1KrtDh87CXOvYvc6M7yx5OYXHvCwc8s7YxO1xY6+SXKSHNIsWu7OwjcQeteuc8c8YnHhjHGdLUmPK48/S/Vmccp30oFO7Nls14zWyl1rPykb23vvsbEXHXb7VYTJT02HscS+QieV0Yu7mRIYsgsN18uvbpwWNbi00pvLI6Y5S0GRxflB6r7joPgnFikzLtjlkZGGZSGyPAcXelx10s3s1UyyqLl0xxjUnsx5nny9fr9F1h2xtTOQ0zUtPI7dFUVOSTsuGtdlPY4g9ijjGxWJ0bwySjlkzAlr6eN1TG8DeQ6MG3cbFWIrRG4XdZo1IFwXdl7rIT7cz83zMRLYhpkFms+AsD3nVbxnbd59Xsia07mPOfotqagp4AXVpJl1yUrHFh75JACB/C03va5GoVN20zIvU6aKFwFhII80g67SPu/8ANYqvrXznM/Vw3W3WVGKHTUap3T4OdebY34uXU0hkkMtXMLZt7ImcRY+kb6+73nB5rAAbgO7VA3W4DglZSInxl0zyiYiIiqK5692osbWPYiR5cS5xJcTckm5J6yVVp6d8hIYL2GZxJDWsb+J7jo1vaVcCWKH9mBNMP717bwsP/TicOn/FILfuDQqsXNUqUuCuLRJUSNpYC3OHyaySN481ENXu042Go1TnxGKKwomOisOlUSBpqnutYlrhcQj+Cx13lY+eV0jnPe4ve43c9xLnOPaSqaAe4uJLiXOO8kkk95KjZSSQRSUklAklJJAl27ydfV8Q8RF9NcRXb/J29XxDxEX01meFh11CELChebuW/wBty+Hp/kV6RXm7lv8Abc3h6f5FaxSWhhNJNaQ0wkmqGmkmqGEwgJqhtCvqSK5CtIws1g9g5t91wvN1GfbjLvo43LpewOEDmg9wAALsrrbnZQLm+h1Lbcbngt0mfEYS6N12RDojdZ5F8xPXqde9YbBozPA7m3XaHB0bBdpaOq9uq2g6k8TqIYIZg+/SYA0uJc5zz93U6WNj2a77r8tlqZZZTFcvfONzy0TbDFGPHNR3sHFz3E/tHcDbqGth2laNKdbg2INwRoQewrJ4rPmee9YmVy+/0Wl2Yw83UZ3NOi4MDilBncc88LXxSknpF0bc7HHvad/FxK0TFmyxPIBs9ocC07ng7wVcbLY2aKfMSeZlAZKB1cD7r/mVk+USjcKhrmC7ZRmY64DXs4EHdxPxC6R/q1Jwn8skYzq4xljzH9fZpcJlzWsG3NgTfK2/Wskxou1u/r7etUat+jfxBrT+Z0HxChHLYOPXoO+xXTu7px8nfT0uzS1J/wCq+U8/wtq7pyOeN17e4GwTEA6/kqlHSOnnigZbO5waLmzc2/U/kpvYWktcC1zSWuaRYtcDYgjgQV6ofKUw0Dcmmm1pJDQCXOIa1oFy5xNgAOJJ4KiBV4KLm7OqM0bXNzMYABNKD6JAd6DDvzkHsDuFWRjaVws9stS03u3pRU7gdLHdI8fBp/EdRZTSOe5z3uc97jdz3uLnOPWXHUlBOoq3PaGACOEHMImXy5vxOJ1e/wDede24WGitlJJFJKykkgikpJKCKRUkigihMpKBLt3k7+r4h4iL6a4ku2+Tv6viHiIvprM8K66hCFhQvN3Lf7bl8PT/ACK9Irzdy3+25fD0/wAitYpLQ00k1tDCaQTVDUgoqQQMKQSCYVFSNZGjkykLHMKrMfZcNTDuh208qdIwbbDzeEx5Guvucd7T1hYLHNoJKhxc9xJ3ancFrjZ0i6+p0H5k9QXgw6HGMremdbbZUcHyE5GueQLkNaXWG+5t3FWTirukcXyxjNzbWOD8zb/ZNZ0nPHaA0m+/RW1RJne94bkD3ueGDcwOJNh3Xsvo6eNbPJnlamr7zp0sQie83jA5q50c1t7MPdc2VimtamnGcVJo606WVwoSSEm/4d4471TjmykXubbgq8sZduGvZ6X/ALVi/ontBG8WsuEY9uz15a+WdzfMT8/T9F3SSmGQScb36iFuNDhRxmNroS1uIQxNbI15yira0BrTmOgkAFrneANdAtKhkzaEXvoOtXmFYu6imzNeQw9GSxI047v5L045Q+dlEr6rwCthcWS0ssZG8ujIjHbznoW7b2CpuqY4gW07szyCJKjcSDcFsXFrCN5Op1GguDvVJygA9Jjraakvyk/FUana2jqSRPTRTa2zFrHOB7yF07Y82e6fJz6yS3KqocOnuYozG4/8t5Fv8riR8LLCVWBvALonc60bwBlkb3t4pOErGcMOhSI+PHsSWG0UlJRKBJJpKBJJpIEUkykoEu2+Tv6viHiIvpriS7d5O/q+IeIi+mplwrriEIXNQvN3Lf7bl8PT/Ir0ivNvLh7bl8PT/Iq4pLREwkhdESCaSaoakFFMIJhMKIUlUMKYKgAp3A3anr/2CKrNFtXe5vF3+wUXPv8A1oAqd1dww5GCaRt2OuIWOBtM4GxP+G07zxPRH3i2UtpF3NROb/eTtbn62Q3a9o73ENd3Nb+IpYfQSVDssYFh6T3uDI4x1vedB8zwup4e2OWYuqZCIhnlneLc48DUht9Mzjp2XvwVvXY2akBoaIIG6RwRizGN/eO97utx1vdTuiJpK2tlIKCha1zpa0SvaSDHTNIG/Q85KBp3M96saieAfs49Ot7nOPzA/JYkuDSbC3uJJ+QVI1A7bdyvclL17y46EDuAsrKsa4m5OY9u9MVTOtKSdp3LM1K3K084c3S1u3VSLw5vcqnNZuCuIKD8Wg6hvUjFbWcbju4KqCVkfNmcG27lTkDWnUG3XYK9tFqEdY8dvxCyUGOZRc5swGhzce9WhZG7cfjdvzVtND1fyKsZTDNRLoEjMLxKBjqaeRlc0HnI52sEhsOAYLPbpvBJHG25ajUQujcWPFnNNiFhW52HM0lrhuIuCD2LJ09Y+RgEgvl9F/HuvxC1GcTG/KVSSRUkkaRSTKSgSipJFBFJSKSgiu3eTx6viHiIvpriS7b5PHq+IeIi+mplwrriEIXNQvNvLh7bl8PT/Ir0kvN/LjITjMjb6CCnI7LtN/kriktBTSCa6IYUlFSVDCYSCYKCYb16f11KVx/9VMKQVRK90wohMmwJ6lRkcLpo3Z5qgkU0OW7W+lPKdWwtNxluGvJcL5Q08SFb1NS6V2d++wa1ouGRsbo1jBwaBoB8zcq9x8iOQUrLc3SDJdoI52ctbz0pvrdxaB2BrbLGBSN91lNp944jrCsYoSCQRcNdp2hXoUmtJ3AnuF9FJxi7L2pb823Xo3sSN6pyRN/DZXRb2IyD+ifklIw0tNY9iuqWKM2u436jYK8kgDuKomh4g+5Z7ZhbXIa1g4AfNSaQdRqFj3G2hVxRyXuPeFYy3opcILQ7Q/HqTQtooMbY2PXrcbutJ9OOCvGtDgbgF1txvv61QAI0KzQg2AG2Z2g772VxI9oY1jRoCTf+u9U0kqhFJSUSqpFJMpFQRKRUlEoEkUykUCXbfJ49XxDxEX01xJdt8nj1fEPERfTWcuFdcQhC5qF5t5cPbcvh6f8ASV6SXmzlw9ty+Hp/0lXFJaIhIJraGFIKKYVEk1FSVEgmFEKQVEgpMdYgjeCCLgEXHWDvUE0RmsTlirJPOBIyCaWxmikEgYJAAC9j2ggtdvsbEG+/eqf9lsbq+tpmjsdUSm/cyIrFBSClVxK2yH/5oyfTqSN1x5vF77EvcP8AsKpTVbnDKAI4/wDlxjK338Xd7id5VsEwrSWaaSa0GmkmgjIwO0Iv8wrV8JZrw6+IV4ghZnGJFOF1wppRNDc1vvC2vDW+iaQBIlNJUJJNJQJIppFFRSUiooEkU0ioIpFMpFAl23yePV8Q8RF9NcSXbfJ49XxDxEX01nLhXXEIQuahebOXH23L4en/AElCFcUloaaELaGmEkKiQTCEKhhSQhUSCaSERJMIQqJBMJoQNNCEDTCEKgQhCASQhQJCEIEkU0KCJSKaEEUkkIpFIoQoIlIoQgS7b5PHq+IeIi+mkhZy4V11CELmr//Z" alt="" sizes='10px' />

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
    <p>size 50gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://fs1.uploadbeast.com/games/Marvels.Spider.Man.Miles.Morales(GamingBeasts.com).zip", false)}

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
    <h3>Spiderman 2</h3>
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
    <p>size 115gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://dn1.datavaults.co/d/4ngfpmbjqtc5exjzxu2igsvwcgy77eqcghh2duo4djuwk2ke7tmvtexwurzgzdutekcnmfyn/RDR2%20[CONOR].rar", false)}

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
        borderRadius:"10px"}} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIVFRUVFRUVFRUVFRUXFxUXFRUXFhUVFRUYHSggGBolHRUVITEhJSkrLi4vFx8zODMsNygtLisBCgoKDg0OGhAQGy0fHR4tLS0tLS0tLi0tLS0tLSstKy0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EADkQAAEDAgQEBAQEBgEFAAAAAAEAAhEDIQQSMUEFE1FhBiJxgTKRofAUscHhB0JSctHxIxYkdKKy/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKBEAAgICAgEDBAIDAAAAAAAAAAECEQMSITFBBFFhEyKRwdHwFCMy/9oADAMBAAIRAxEAPwD4sorhXCRBSuFFaBEhSFcKQgClFcKJAVCiKFcJgCArIXovCnh6njXOp859N7W5yOW1zSJAJBzA6kajdZaeEwRcB+KrCTEuw7QNY2qlRura9vhlaOk/c4qi6VPg1ao6oKNN1RrHOaSC2waTd17WBM6LE2iS7KIJmPibE/3Tl+qq0JpoWAjFI7Lo/wDT2LnLyH5onKMpcR2aDJ9lnoYWqanLDHCoD8DvI6ekOgz2StPpjprtGXlouUV22cMxM+fDEydPKDbW4M7brZheH06rOYynVFMSXPzMe1oFySfLljus5ZKKWOzzHJKo0yvpnCPA9HEU89LGsdeA3luzC9swn77rl8a8M0aDsrsSHQJljJuCRlguHTqsl6qLdfpmj9PI8OKZU5S9a7gfka+nQqPa74XuqUg1x0MAHqD/ADLi8Tovpv5b6RpPEeV4LTfQy7Y9dFrHJs+DNw17OYacISF0cZwbEUmNqVKRYx/wuc5gDv7b39kGK4RXp021alItpujK8lsOnTLe/t0Wlr3IpmCFFswvDatUF1NmYNu4gt8oG7pNh3K38M8POqUXYmrUZQw7XZOY+S6o6/lo023qGx6CxvYwOSXkFFs4kK4Xf4ZwbC4iq2jTxrmPe4NZzsNkY9xMABzKroJ2kBcSo1v8rsw6xG50uZEQfdCafANNCoVI4VEKiQYUVqkDBKitSEDBVFFCpIAVFapMY0hRMyqsqdE2ArCLKplRQrKCtWGo8idCsVCuEzIryIoLFgK0eVQNRQrPV/wvn8Y+DEUHehBq0hB7Xm3QLm4Pg2HJj8bSqWeQ1jK4c8tY5wAL2ACY3XZ8AUjRdVxFQZW8nK0lwaXFzmu8oJkiGa91x6fhjE5oDWxJh/OpAQN/in6T2XNa+pLmujop6R4vs0eEjGG4j/4o+ucFeYqNsfRemwOOoYYYqieZU5rRRc5mQABsh5aSbguJIkaAarlObh8paOdLoBc5tM5WyCS1odd1o10JWsf+m67Jl0lfR1fHrf8AuKOs/haBncGX3BXWY/8AFYHC1qt61DF06QqH46jTUbZx3sR7tncrn+JeLYXGVGVMuJpllJlKA2k4OayYM5xldfoR2WVvGGk4dmRzKGGeKjKbYe+o8OzF9R5LRmPYQJIAUaPVKuit1s3fDH+LMGwY7EO57A9pLg0NqZw5lIFozZcoMtG/1Wfwzj3Ydleq1ocG8hrmHR7XPcC09LT92TOM4/CYjEVK7mYgcwhxYOVGYNAu6ZAMDvcrLg8TRFCvTeKmesaZBY1mSny3l0QXAumY2jumo/ZT+BOS2tfJ6TheC5dajisKS7C1KlPMJ81F3MaOVUE2Amx/Yng8Qxxl7Y1c+Zubu+i7v8LcPXfiXMo+YGmX1KZIyvDPh10dJEHv8vJ44HO8HZ7v/oqIwTyNPwVKdY015PTHhpxXDsDSY+k1/OxIHNcW5i6o6GiAZPZcrxnjA+pSojM44WizDue4Fpe5g8xyuuB0nqfU1jeJ034LD4ZoqB9CpUqZyGgEvc50Nh0tjNr22Vca4qzFMpuqscMSwBj6rcpbXaLBz2kgh4G419Iy1GElK31yTKUWqXfA7xM0jB8NBLj/AMNd0nL/ADvY6GgXgWubm618I4zTp4ShhsSwPw1fnhx/mpOFQZarIvYm4/0ePxDHtq0KFMh4fQa5gMNLHNcWxvLSA0dUrGV6TqNKm3mZqXMu4Nyv5jg46OlsR3nsjRyST93+6BzSba9kacdw52CfiGOIqNfhXcuq34Xtc+mQ8HrbT/IK6v8AEKg+i3C0Lclrar6ZaC1pzOA+GTo0N803znRcfCcUIw9TD1AXNLIpGb0yXSW31Yb22Omq7WI47Sx2Eo4XFOFKvQdFPEuEsLMsEVI8wnKwHuA6dQlrNSTfj+OytoOOq/vwee4LwrEV3j8M0Pe0hwAqUg8ZSCHBjnAwDF4hYq9A03FjoBaYIDmuAI2zNJB+a9h4Oo0sFixXr4vDctrHiaNXmuJc22VrGl30Xkq7BndBzDM4ggEAgkwYcAR7hXFtya8GUklFe4iEJCNwUhaEWLhUQjIVQkOwIVQm5UOVFBYsqoTcimVA7FZVMqaArhFBYQTGhJlMY5WiGMLAllt0YMqC5TJI1qY0KBqMBNIlsHKplCOFRamKwOWjbTVhG1yAbZRojoh5A6BPaZRtamRbMxpWVCituVWlQbMxtYjFNaRRT6dAEbyk3RSdnPFFbsLwlzgHGGsJIzmzbRInrcW7rv8AAMG1mbE1Wg06cANLWvD3vBDRBIECCZ2gdQubjXuqmf5RoBFh2+/kuZ5HJ1H8nVDGkrl+D2PgajhaWJJo1KpyUa4qVC1oaAWnzNAk5oy6nU9r+cxHDMFWqZaFVzHTEVgGgjLY5wYFwRfqNF0/4eYB767pLMoo1hlztzO8hvEzMxc7fNecrcNrC2SQby3zFuX4i6NNRPsuaMf9kvu9jqlJaL7RPHeA1MM4B4EOEte1wcx46tcLfquRkXaoV3QabxmYdWk6H+pve2qxYrDZXWuCJBjb7su3G2uJHFNJ8xMDgrYwLS6kEBhamNlGlZZ3tTi5U2kSgFwA2mge2FqayELmoCzNCmQJ+QKi1IdiCxVkTsqohOh2JLFRamkISEqCxZCGEwhUlRVgQpCKFcJUFmYBOYEsJjDdJFMYWa+qjQjJ/NRoVmdkY4jumAgqZUDgmT2MIVBMpuBsVCzumKygZRimlkQmUqqAr2H06aYWwrpPnRG4HoiyGgA1CUwOV5VLZSQLKkJ+HqEn1QihOnuu7wPAta9hqR5nCAfUC/qenqscmRRR0YsTkz02H8NE4dj3B3LDObVAIlxLoDWAwAYIk7e68zxZjwCGgU6ZuabSCRNsr4vNrheo/iPjs/LaPgDYaGE5PKSHQDfUC+hiQvBUcOXv97k9z9VyYItraTO3I0vtSPY/w94TWFVznMe1rqNVucgiQ5pAaD1kfRcLE8KrtNmuYTaScsgRrew9ei9v/DvHCk51FpDiW1HF0nL5WzABsfhgmF5vxTUZiSKtJmUgHmMGg3L+sGd/RRCcvqv5LljWlewDMIys7l12MNY+RlSg5glzLDm5ZaWmD5g0kh0ydsXEeEVRhJfTLH0qzmEFsEBwzACdbh3z9VyGy02Mei+k8F8QCtgHU64L2hzWE6uDcsBzJtLbG/TvbTI5Y6a6M4RU7Xk+QvCVlXpvEXBTRfEggiQ4aHuFxHUIvC64ZVJWjklicXRnpUZKOoYVzeFpZw8nUgde3b1V7E6GVl7Kq9IhbMjW6XOkrNVcSqTM2qEtYqcjyndQNJsAixCi1CWrSyhe6qqy5jZMmzNkQOC0R1SXlMaYgyqhEVUqSyBitVKsIAzwiCgRAKUWxjUSBgToVozZQKsqNRGn0TJsBqibRp6yoWIHfIESia1W1ia1ndIdjaLfmtVIEIMMJuL+i18vopbBKyDDg6J1WhDrCxj2UaMpuurRexzRmt+hWE8jR0Qw7BcM4TzHtyzqNSBEmLlbOKiK1OXNc9rm2JblADvKJH1E2WzgVXK8GASJM7G1yRuI27Ll47B5aj8xs209SCLN6rj2cp8+DuWPWHHkzhzqzS1xlzS+pFhAJzVMomBoTHqsrWOaHOiACWjQ+YjQj0Gq6WMolj2mAQQHtIMECdQ4dxv2Xa4fgqOKhtUmm5xcc4EhzyQXF7ewJuIVueq+AULfyjjeFsZkrvcbf8VbSRJNMwJH3ZYcLictUuiQZBa64cCILT3v+q9vwbwqzmuDalOo0Nc0uDwJLm5Zym4aMxvfT2XNw3hsNcHVa1Ju0MdzHAgjZumsrNZYbSfwaODpJHncbwpweKYbLto/mkAj6HVMovc1tSlTaSBSyukmS8VGy5rTcTAbEaL2niKnSpFgYfMGNzFtr6/HM31915dpLKdXL5Q8BhI2lwdcxJ+FEcrnHkbxJO0BwrPiDyngucxhiPNla3btF9TC4mIwD2zeGmSDGoBiY6nQBeo8EcPIrh5Foe31lpFuyLjWGYxpcSSQ6A3bMPh+QCFk1y0gljvHz4PEYTAuL5FtTP5emyfiXhjcjNtSt1WplZJN3H7K5b2lx1j2XdF3yefNVwZwyVQGy2CgA2Zk90mrTOvXdap2c0lQllOT2WnIAIAA/VBTeG90uriTPRUZsjwAkVCExz5CzuVEBNywZjT69FkfEpjikvQVFC3IVHOUOik0JCuEpTOUrHQGdMY5ICJqlMto0sKc0pDEcLRGTRqaQiBCxhaKDtoTszcR0qsiunUEwmSmLoCEBamtCp5SGmMw1bLoLrv4KpmAMAOgLzOFJze3yXWw9aCFE42jSMqZ0TQdmzfv20K6GBw+cFjpa7UAjUESk4LE9VpquLsrgbgWPbXVck02duOaRv4XSdSeCHQJgjc9REdF1OL8ELoeTGZoM2IPpC53DuJ5jkqNkn5hep4biGFnKeIZ/UAMwMm5O/7Lz8rlGV+T0YOLjweXOBYWCnMPbLmuNszbeTTUGSPVHgyMpYJzZSABF7y5s9x+QC9HiOBv+Eedrrgtg/6PVY2cHe10hhLpsRIIIU/WTVMtQXaOdwd7qdQv3DXWO4ywR8p+Srg7M9TzkBjbvduGwZI6m37L3OA4QyqJfIeQQ4HcncD5/NcfjHDKVIcsA3u6AQXHpmNsuh3ULLfLXYKm9V2jyvFquZxc0+V0uGkgT/NGhXNczNDWz/k7n0XqKfCXOGUAkf0jqJAv11WzA+F3Mhz4Zv5o/JaLNGMRyjzyy+AYPl0i46xkZ1E6x0mSvPcbwwnKILmiRe3cr1PFsdlacgjUDawH7LxfEsS1xBBN/iB2j9Fjg2lPYc2lHk4WIokkTeSRHSFkrtIdEdF1MZVlzYGUBZ65YCCdY0/Ur2cdvs8jNKK6M/4UkXt0QYpoiAdBsrxFcGwJjqVixFbYLpSOGUrM7jdQhADulmoqJDc8DdKe8bJdRAQmOgnBLcFZRNA6oH0Z3BBCa9LUstAFVCuFEihICtQFWlRYxpWkELI1MBTRnJGiyNtaNNVmzItlVkuJTXwZXSpulcordhChEzXBocUDkxyz1X7BUQhmG1laefC5oeQtlGgXXSGzUzFLpYPGlvcfei4hoELXhidCplFMcZ0ehw3EWyCQZG67+G4sz4g6CNQd/wDK8hRat1NsAzraFy5MMZHbizSR7/hfHOYIGvQHf7C6dTiJIIm5/XW6+d4KplLXAkXv6Su7h+Iiei83L6RXaO/H6hVyem4fWLXEg/yuHYyP8q8LjMhlzs3rp3j5Lh0saQCQQg/GCJcVl/jM0+vFnffx/M5wky07QBp9hcfifHXOBzOAH53XnsXjPM4gxJJ1WerjxF4sumPo03bMH6lLo04/i+cBtyAuViKzdrIKmOa6YgH81zq9bUrtx4FHo48vqGwsXio0+ZXM58dyrrv76pTmkCdei64xSOGU2wX1iTJ+SUXptPDONyEXKaNf9qyTK8quS7WPmU+rVHTTRZalYlItFOMaqnBCPMmONkhgsbKTUKbT0SwJTBdiwJUcxMmEl9S/ZLgpWAhJVvcglSzRAQorBVhKiiwUwEIQrCZLDhCXK1RamIqCn0HkFJa1NY1IT6Nb6tkplygiU2kMpVmdUE1o3Wuk+IH3Cxu1WhsgH73j9UyWdBrgU0NnZYBU2W2jWtc6apMmjTTadlsounVY6NS+umqc6k8iWOi42mPaLrKSNYM7NClPZbRRjdeRrcZrUiGuLJ7NfJ9Gwf0XP4j4gxQPmeWg6ANDLHQkfEs9LNk2e/fiTEWWHFVzELi8J4r5mZ3Oc2pIiAXMIy+YkxmBJNpmx7L0FWiHA2IIgGe4B/IhJRSE2zi1ahKyuzHVdWrRASfw/ePVaWiHZi5XT5Ln8Qe6YFl1cXRLRM2A1XPqPYWnWe6uJnJnFqOi1z22R4XFHTaLX0slV2XVU6SrkdKh1TEvBjNIHdQVTKB1JDKApDnlZ3oy5A4oGgIKPbullyvMgbCYEpxvChd3SyUAkW8XSimaoC1KikCUBRFCUi0CCjCFUXpWMbn6hRrlmL1bSlYamxjgmtAKwhybTqkbqlIhxNdMAmNwnMokd1gc4zIN1op4hydkNPwPDCELwU9tVV+J9AqM+RTtlsNIxZYi++q00qpA1RY2mEaREHotWEYZ01Wb8VO8bC0k+yZRxbwYLY+STYKLO7QwjiSRaY+nda6FItNz7LjjiZF8x9As9fidV9gYG0a+5Cz5Zao9ccQGtc8izGucfRokx8l4/D0adauK9Ul1M1AHW0BjK3/2bb1WnDcRytcyq7yOaWuE3giCY99Viw9Nv4dwLiA2qHMdMRYtmN5hih8GsT3OE8N4kVHtoVKdKiTmaSwPc2bxT6Da+gAhdLhHC3NFXmPNQiqRmOpLWsBMev5BeQ4Z4yrUqBZAc8ACmTt69Y2XEx3ifEuMGo4AmbWBcfjNt5lKh9n0x2BadAsdTh4l0j9l4XhviqrQkOJcwjQEHL/bOnotz+PUny41H3H9RB7RsiiWjp43AmLBcavgiCtVHjRdfNIG5ifp6qVeIzYOAk9DYfqrUmjNwOVVwRiVmFONlpxLXOuHTfvY/okOc4xLvyWiZDi0CQkVGJ5Ql0bKhIRlSXFaXFIcgpMoMVOaivslvaU6GAYVEKoKmZIoooHI5SnFIaKKCURKAqS0CXShcrn3+aNoHT30U0X0KCJr1eXpJVeqQAkos3RSAhIQA6m7um5x1WTMizIJcTXze6FtRIaiIA1+n+U7FqjWKgTKFfMdYWF5lRghO2TqqN/Mgkj09Lq38RkQTJt02ECd1he8nf1SWujb3P3ZJsaiddlclKe693xGkfssYrOGgt6wjpzqInWbGevqhsWtDss6Fx9j+sJ3JJaYJtcyCAPdAMQINr7D/YkIIJ1Bve8j80h2ByydAf27KNpz7dzKc3FWiSD2ggexT8NiQJnQ6kwNJ1bJsgNhFLCPMHNAmJ6fJCMObg6A6xrtZNq4ljrEgj+0/P8A0s5xIsGz8jHt5kqHbN1LGBrMocR2EAH6JRxfqffT3+9VjkGwj5j9SqBH2U6ENGLcXAHTp+6lR19v3/bdJNQbK9ttLdk+RsdSru0lN58rECrFUhUmQ4mlz0TaizB/VWSVVi1NBehc8rMT3QlyNh6jzWQF0pZYpYItjpFlCSqc4oErKSLcUJcihUXeqkoDXSytr41uookMPmfLoqkaKKIFQMISVFEhoqVapRAywUQCiiBMNpsqJUUQIFzlYIIvAOxmPnNvyUUQOgPcff0Vhh6j6yoogGPbVcdi7YqzI7dQbqlEyPNFc0x8P1V1SbOsOw36W3UURQeRD3dkyhOoIkdRPy/ZWokU+gMxB29f9ojUJUUQBJ9FGyrUTQmUXIWndRRIYQcrzKKJiohKmZRRMCnVFXMUURY6LlC5RRKwKVZiookM/9k=" alt="" sizes='10px' />

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
    <p>size 65gb</p>
</div>
<button
 className='course_box'
 onClick={() => handleDownload("https://fs1.uploadbeast.com/games/ELDEN.RING.Deluxe.Edition(GamingBeasts.com).zip", false)}

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
