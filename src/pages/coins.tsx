import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import coinEmoji from "../assets/animations/coin.json";
    import { useAuth } from "../context/authContext"
import { useNavigate } from 'react-router-dom';

    

 


const useSSE = (userId: string | null, updateCoins: (coins: number) => void) => {
  useEffect(() => {
    if (!userId) return; // handle null here

    const source = new EventSource(`https://erp-iliw.onrender.com/events?userId=${userId}`);

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("Coins updated:", data);
      updateCoins(data.coins);
    };

    return () => {
      source.close();
    };
  }, [userId, updateCoins]);
};

interface CoinsProps {
  isVisible: boolean;
}

const Coins: React.FC<CoinsProps> = ({ isVisible }) => {
    const { empDetail} = useAuth();
      const navigate = useNavigate();


    const [liveUpdate, setLiveUpdate] = useState<any | null>(null);
    

    useEffect(() => {
  setLiveUpdate(empDetail.coins);
}, [empDetail.coins]);

useSSE(empDetail.email, (coins) => {
setLiveUpdate(coins);
});
    return (

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
{isVisible?(
          <div>
<button onClick={()=>navigate("/coins")} className='coin-button'>
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



    );
};

export default Coins;
