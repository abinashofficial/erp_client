// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { gapi } from "gapi-script";
import { getMessaging } from 'firebase/messaging';



const firebaseConfig = {
  apiKey: "AIzaSyA89RVDizQX0znz0Qt27Vb_K15SUXL0274",
  authDomain: "erp-tech-abb08.firebaseapp.com",
  databaseURL: "https://erp-tech-abb08-default-rtdb.firebaseio.com",
  projectId: "erp-tech-abb08",
  storageBucket: "erp-tech-abb08.firebasestorage.app",
  messagingSenderId: "631378468215",
  appId: "1:631378468215:web:811bce94af327a6c495572",
  measurementId: "G-T0QC5RHGE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const messaging = getMessaging(app);


// src/utils/googleDrive.ts
export const initGoogleDrive = () => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      apiKey: firebaseConfig.apiKey, // Replace with your API key
      clientId: "252613924014-vav5ql9rbhp45sou45pgal3na4m1ihb9.apps.googleusercontent.com", // Replace with your Client ID
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      scope: "https://www.googleapis.com/auth/drive.readonly",
    });
  });
};

