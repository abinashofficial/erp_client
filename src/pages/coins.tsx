import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import coinEmoji from "../assets/animations/coin.json";
    import { useAuth } from "../context/authContext"
    import { toast, ToastContainer } from 'react-toastify';
import { FaCoins } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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

const Coins: React.FC = () => {
    const { empDetail, setEmpDetail} = useAuth();
    const [visible, setVisible] = useState(false);

    const [liveUpdate, setLiveUpdate] = useState<any | null>(null);
    

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





      const AddCoins = async (add :any) => {
    await sleep(10000); // wait for 10 seconds

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
      toast.success('Coins added successfully');
      return
    } else if (response.status === 500) {
      alert(result.message);
      return
    } else {
      console.error('Update failed:', result);
      return
    }
  } catch (error) {
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
    AddCoins(coin); // Call your actual function here
  };


    return (
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
                Total coins  : {liveUpdate}

                </h2>

                            <div style={{
            height:"100px",
            width:"100px",
        }}>
<Lottie style={{
  transform: "scale(0.5)",
  height:"100%",
  width:"100%",
}} animationData={coinEmoji} loop autoplay />

        </div>

        {!visible?(
          <div>
<button onClick={()=>setVisible(!visible)} style={{
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


{visible ? (
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

    );
};

export default Coins;
