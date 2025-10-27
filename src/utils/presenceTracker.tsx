import { useEffect } from "react";
import { useAuth } from '../context/authContext';

const PresenceTracker = () => {
  const { setVisible } = useAuth();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("User is offline (tab inactive)");
        setVisible(false);
      } else {
        console.log("User is online (tab active)");
        setVisible(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [setVisible]); // ✅ Add setVisible here

  return <div>
    
  </div>;
};

export default PresenceTracker;
