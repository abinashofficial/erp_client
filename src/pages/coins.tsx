import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import coinEmoji from "../assets/animations/coin.json";
    import { useAuth } from "../context/authContext"
    import { toast, ToastContainer } from 'react-toastify';
import { FaCoins } from 'react-icons/fa';
    

 
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

const Coins: React.FC = () => {
    const { empDetail, login} = useAuth();

    const [liveUpdate, setLiveUpdate] = useState<any | null>(null);

    useEffect(() => {
  setLiveUpdate(empDetail.coins);
}, []);

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


const handleDownload = (url: string, free :boolean): void => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (isMobile) {
            alert('Download links only work on PC or Laptop devices.');
            return;
        }

    if(empDetail.coins && empDetail.coins >= 50 || free){
            AddCoins(formData.coins - 50);

        console.log("You have enough coins to download this game.");

  window.open(url, "_blank", "noopener,noreferrer");
    }else{
        alert("You don't have enough coins to download this game. Please add coins.")
    }
};


  const handleUPIPayment = async () => {
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

<div style={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    flexWrap:"wrap",

}}>
    
                <h2>Hi... {empDetail.full_name}</h2>

                <h3 style={{
                        marginLeft:"50px",
                }}>
                Total coins: {liveUpdate}

                </h3>

                            <div style={{
            height:"50px",
            width:"50px",
        }}>
<Lottie animationData={coinEmoji} loop autoplay />

        </div>
<button onClick={handleUPIPayment} style={{
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
 

        <ToastContainer/>

    </div>





    );
};

export default Coins;
