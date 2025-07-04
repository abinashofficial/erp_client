import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import PayCoin from "../assets/animations/paycoins.json"
import coinEmoji from "../assets/animations/coin.json";
import { useNavigate } from 'react-router-dom';
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
 data :GameSpecs;
  children: React.ReactNode;
};
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

const PrizeModal: React.FC<ModalProps> = ({ isOpen, onClose, data, children }) => {
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
        const [payCoinvisible, setPayCoinVisible] = useState(false);
                const [redownload, setRedownload] = useState(false);


  if (!isOpen) return null;


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
                  setPayCoinVisible(true);
        setRedownload(true);
                console.log("You have enough coins to download this game.");
setTimeout(() => {
  window.open(data.download_link, "_blank", "noopener,noreferrer");
}, 3000); // 3000 milliseconds = 3 seconds
          // setEmpDetail(updatedFormData);
    
    
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

    const handleDownload = (data : GameSpecs): void => {
        // const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        // if (isMobile) {
        //     alert('Download links only work on PC or Laptop devices.');
        //     return;
        // }
        if (redownload) {
  window.open(data.download_link, "_blank", "noopener,noreferrer");
            return;
        }

    if(empDetail.coins && empDetail.coins >= data.coins && data.price==="Price") {
            AddCoins(liveUpdate-data.coins, "you have downloaded the game");


    }else{
        alert("You don't have enough coins to download this game. Please add coins.")
    }
};


  return (
            <div className="modal-backdrop">
  <div className="modal-content">
    {/* Modal Content */}


    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2>
            {data.title}
        </h2>
        
        <div>{children}</div>

{payCoinvisible && (
        <div className="modal-backdrop">
          <Lottie
            style={{
              transform: "scale(0.5)",
              height: "100%",
              width: "100%",
            }}
            animationData={PayCoin}
            loop={false}
            autoplay={true}
            onComplete={() => setPayCoinVisible(false)} // ✅ hide div after 1 cycle
          />
        </div>)}


            <button
      className='course_box'
      onClick={() => handleDownload(data)}
    >
              {redownload ? (
 <div className='game-button'>
        <h3>Re-Download</h3>
      </div>
      ) : (
     <div className='game-button'>
        <h3>Download</h3>
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
      )}
 

    </button>
        <div style={{
            marginTop: "10px",
        }}>
          <button
  onClick={() => {
      setRedownload(false);

  onClose();
}}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Close
          </button>

        </div>
      </div>
    </div>
      </div>
              <ToastContainer/>
</div>
  );
};

export default PrizeModal;
