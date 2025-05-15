import { useEffect, useState } from "react";
import { useAuth } from '../context/authContext';


const PresenceTracker = () => {
        const { setVisible } = useAuth();
    
//   const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("User is offline (tab inactive)");
        setVisible(false);
        // Optionally: notify your backend here
      } else {
        console.log("User is online (tab active)");
        setVisible(true);
        // Optionally: notify your backend here
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div>
      {/* <h1>Status: {isOnline ? "Online" : "Offline"}</h1> */}
    </div>
  );
};

export default PresenceTracker;
