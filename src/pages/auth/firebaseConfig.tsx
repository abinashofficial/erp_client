// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

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
