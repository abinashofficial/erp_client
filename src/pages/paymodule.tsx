import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import PayCoin from "../assets/animations/paycoins.json"
import coinEmoji from "../assets/animations/coin.json";
    import { useAuth } from "../context/authContext"
            import { toast, ToastContainer } from 'react-toastify';
            import { FaLinkedin, FaWhatsapp, FaInstagram  } from 'react-icons/fa';
    import upiIcon from "../assets/animations/upi.svg";
import { QRCodeCanvas } from 'qrcode.react';





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
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
 coin?: string;
  children: React.ReactNode;
};



const PayModule: React.FC<ModalProps> = ({ isOpen, onClose, coin, children }) => {
          const { empDetail, setEmpDetail} = useAuth();
              const [liveUpdate, setLiveUpdate] = useState<any | null>(null);
                const [showQR, setShowQR] = useState(false);

          
              useEffect(() => {
            setLiveUpdate(empDetail.coins);
          }, [empDetail.coins]);
                const [visible, setVisible] = useState<Boolean>(true);
          
                               const formData: SignupFormData = {
  employee_id: empDetail.employee_id,
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
  country_code: empDetail.countryCode,
  access_token: empDetail.access_token,
  coins: empDetail.coins,
};

        const [payCoinvisible, setPayCoinVisible] = useState(false);
                const [redownload, setRedownload] = useState(false);


  if (!isOpen) return null;


    const handleUPIPayment = async (pay: any) => {
            if (!empDetail.employee_id){
      alert('Please signup to add coins.');
      return
    }
          // Mobile detection using user agent
  const isMobile = /android|iphone|ipad|mobile/i.test(
    navigator.userAgent || navigator.vendor || (window as any).opera
  );



    const upiLink = `upi://pay?pa=abinash1411999-1@oksbi&pn=abinash&am=${pay}&cu=INR&tn=${encodeURIComponent(
      'for buy coins'
    )}`;
       if (isMobile) {
      window.location.href = upiLink;
    } else {
      setShowQR(true); // Show QR on desktop
    }
  };

      const handleWatsapp = async () => {
    if (!empDetail.employee_id){
      alert('Please signup to add coins.');
      return
    }

    const upiLink = `https://wa.me/+919940463927?text=I%20want%20to%20buy%20coins.%20My%20email%20ID%20is%20${empDetail.email}.`;
    window.location.href = upiLink;
  };

          const AddCoins = async (add :any, msg :string) => {
                    const controller = new AbortController();
        setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

            setVisible(false);
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
               signal: controller.signal, // Attach the abort signal to the fetch request
        });
    
        const result = await response.json();
    
        if (response.ok) {
            setVisible(true);
    
          console.log('Updated employee data:', updatedFormData);
                  setPayCoinVisible(true);
        setRedownload(true);
                console.log("You have enough coins to download this game.");
    
          toast.success(msg);
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

        } else if (response.status === 500) {
            setVisible(true);
          alert(result.message + " Sign in again");
          return
        } else {
            setVisible(true);
          console.error('Update failed:', result);
          return
        }
      } catch (error: any) {
          if (error.name === "AbortError") {
    setVisible(true)
    alert("Request timed out");
    // setError("Request timed out");
    return
  } 
            setVisible(true);
        alert('Internal server error');
        console.error('Error:', error);
        return
      }
    };


const handleClose = () => {
  setRedownload(false);
  onClose();
};


  return (
            <div className="modal-backdrop">
  <div className="modal-content">
    {visible?(

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
<div>
    {children}
</div>

{showQR && (
        <div style={{ marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "20px",
         }}>
          <h2>Scan to Pay</h2>
          <QRCodeCanvas value={`upi://pay?pa=abinash1411999-1@oksbi&pn=abinash&am=${coin}&cu=INR&tn=${encodeURIComponent('for buy coins')}`} size={200} />
          <p>Amount: ₹{coin}</p>
        </div>
      )}
        
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "15px",
            backgroundColor: "white",
            borderRadius: "20px",
            cursor: "pointer",
            height: "50px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}>
            <button style={{
                            display: "flex",
            justifyContent: "center",
            background:"white",
            cursor: "pointer",
            alignItems: "center",
            color: "black",
                        gap: "10px",


            }}
            onClick={() =>handleUPIPayment(coin)} >
            <h4 style={{
                fontSize: "20px",
                fontWeight: "bold",
            }}>
                Pay via UPI
            </h4>
                                                    <img
              src={upiIcon}
              alt="upiicon"
              style={{ width: "50px", height: "50px" }}
            /> 
            </button>

        </div>



            <button
      className='course_box'
      onClick={() => handleWatsapp()}
    >
     <div className='game-button'>
        <h3>Collect Coupon</h3>
        <FaWhatsapp size={30} />

      </div>
    </button>



        <div style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
        }}>
          <button
onClick={handleClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Close
          </button>

        </div>
      </div>
    </div>

    ) :(<div className="spinner"> </div>)}


      </div>
              <ToastContainer/>
</div>
  );
};

export default PayModule;
