

import React, { useState, useEffect } from "react";
import { FaMoneyBillWave, FaGooglePay } from "react-icons/fa";
import Lottie from "lottie-react";
import coinEmoji from "../assets/animations/coin.json";
    import { useAuth } from "../context/authContext"
    import { toast, ToastContainer } from 'react-toastify';
    import Coins from "../pages/coins"

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
      console.log("Coins updated:", data.coins);
      updateCoins(data.coins);
    };

    return () => {
      source.close();
    };
  }, [userId]);
};
const PaymentMethodSelector: React.FC = () => {



      const { empDetail, login} = useAuth();
  
      const [liveUpdate, setLiveUpdate] = useState<any | null>(null);

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
  
      useEffect(() => {
    setLiveUpdate(empDetail.coins);
  }, []);
  
  useSSE(empDetail.email, (coins) => {
  setLiveUpdate(coins);
  });

      const AddCoins = async (add :any) => {
    await sleep(10000); // wait for 10 seconds

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
      const updatedEmp = {
        employee_id: result.employee_id,
        first_name: result.first_name,
        last_name: result.last_name,
        full_name: `${result.first_name} ${result.last_name}`,
        mobile_number: result.mobile_number,
        email: result.email,
        date_of_birth: result.date_of_birth,
        gender: result.gender,
        password: result.password,
        confirmPassword: result.confirmPassword,
        photo_url: result.photo_url,
        access_token: result.access_token,
        country_code: result.country_code,
        coins: result.coins,
      };

      setFormData(updatedEmp);
      login(updatedEmp);
      toast.success('Coins added successfully');
    } else if (response.status === 500) {
      alert(result.message);
    } else {
      console.error('Update failed:', result);
    }
  } catch (error) {
    alert('Internal server error');
    console.error('Error:', error);
  }
};
      const handleUPIPayment = async () => {
    if (!empDetail.employee_id){
      alert('Please signup to add coins.');
      return
    }
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
      alert('UPI payment links only work on mobile devices with UPI apps like GPay or PhonePe.');
      return;
    }

    const upiLink = `upi://pay?pa=abinash1411999-1@oksbi&pn=abinash&am=50&cu=INR&tn=${encodeURIComponent(
      'for game purchase'
    )}`;
    window.location.href = upiLink;
    AddCoins(formData.coins + 50); // Call your actual function here
  };

  return (
    <div>
      <Coins/>

      <div style={{
        display:"flex",
        // flexDirection:"column",
        flexWrap:"wrap",
justifyContent:"space-around",
gap:"50px",
margin:"50px",
      }}>


    <div className="form-container">
<form onSubmit={handleUPIPayment}>


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

</form>
    </div>
        </div>
    </div>


  );
};

export default PaymentMethodSelector;
