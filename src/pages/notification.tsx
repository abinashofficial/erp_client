import React, { useEffect, useState } from "react";
import { useAuth } from '../context/authContext';


const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
      const {empDetail} = useAuth();
  
//   const userId = "user123"; // Replace with the logged-in user's ID

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws?userId=${empDetail.email}`);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      setNotifications((prev) => [...prev, event.data]);    

      console.log(event.data)
    //   alert(event.data)
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, [empDetail.email]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
