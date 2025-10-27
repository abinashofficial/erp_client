import React, { useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "YOUR_CLIENT_ID.apps.googleusercontent.com";
const API_KEY = "YOUR_API_KEY";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

const GoogleAuth: React.FC = () => {
  useEffect(() => {
    function start() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
        })
        .then(() => console.log("GAPI client initialized"));
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleLogin = async () => {
    const auth = gapi.auth2.getAuthInstance();
    const user = await auth.signIn();
    const token = user.getAuthResponse().access_token;
    console.log("Access Token:", token);
  };

  return <button onClick={handleLogin}>Sign in with Google</button>;
};

export default GoogleAuth;
