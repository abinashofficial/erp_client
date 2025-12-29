import { useEffect } from "react";

const UseSSE = (userId: string, updateCoins: (coins: number) => void) => {
  useEffect(() => {
    // const source = new EventSource(`https://erp-iliw.onrender.com/events?userId=${userId}`);
    const source = new EventSource(`https://crud-production-a206.up.railway.app/events?userId=${userId}`);

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

export default UseSSE;