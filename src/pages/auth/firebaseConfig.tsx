// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { gapi } from "gapi-script";


const firebaseConfig = {
    apiKey: "AIzaSyD1Iwm0p_L4vYpCzS90zzzQyMxqQd-jB4w",
    authDomain: "abhitech-a3484.firebaseapp.com",
    projectId: "abhitech-a3484",
    storageBucket: "abhitech-a3484.appspot.com",
    messagingSenderId: "252613924014",
    appId: "1:252613924014:web:922fb10592e3fc30aa893f",
    measurementId: "G-E45BJMTQR6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


// src/utils/googleDrive.ts

export const initGoogleDrive = () => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      apiKey: firebaseConfig.apiKey, // Replace with your API key
      clientId: "252613924014-o7gvk632to0mgl5u6pkhvo70b7ft0i3s.apps.googleusercontent.com", // Replace with your Client ID
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      scope: "https://www.googleapis.com/auth/drive.readonly",
    });
  });
};

