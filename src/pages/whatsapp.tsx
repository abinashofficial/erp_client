// src/components/PhoneAuth.tsx
import React, { useState, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth } from '../pages/auth/firebaseConfig';

const PhoneAuth: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);

  // Initialize reCAPTCHA when the component mounts
  useEffect(() => {
    if (window.recaptchaVerifier) {
      return; // If reCAPTCHA is already initialized, don't initialize again
    }

    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    });

    window.recaptchaVerifier = recaptchaVerifier; // Save the recaptchaVerifier to window object

    recaptchaVerifier.render()
      .then(() => {
        console.log('reCAPTCHA rendered');
      })
      .catch((error) => {
        console.error('Error rendering reCAPTCHA: ', error);
      });
  }, []);

  // Send verification code to phone number
  const sendVerificationCode = () => {
    if (!phoneNumber) {
      alert('Please enter a valid phone number.');
      return;
    }

    const appVerifier = window.recaptchaVerifier; // Access recaptchaVerifier from window
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        console.log(confirmationResult)
        setIsCodeSent(true);
        alert('Verification code sent!');
      })
      .catch((error) => {
        console.error('Error sending verification code:', error);
        alert('Error sending verification code.');
      });
  };

  // Verify entered verification code
  const verifyCode = () => {
    if (!verificationCode) {
      alert('Please enter the verification code.');
      return;
    }

    if (confirmationResult) {
      confirmationResult.confirm(verificationCode)
        .then((result) => {
          const user = result.user;
          alert('Phone number verified successfully!');
          console.log(user);
        })
        .catch((error) => {
          console.error('Error verifying code:', error);
          alert('Invalid verification code.');
        });
    }
  };

  return (
    <div>
      <h2>Phone Authentication</h2>
      <div>
        <label htmlFor="phone-number">Phone Number</label>
        <input
          id="phone-number"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
      </div>
      <button onClick={sendVerificationCode}>Send Verification Code</button>

      {isCodeSent && (
        <div>
          <label htmlFor="verification-code">Verification Code</label>
          <input
            id="verification-code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
          />
          <button onClick={verifyCode}>Verify Code</button>
        </div>
      )}

      <div id="recaptcha-container"></div> {/* reCAPTCHA widget container */}
    </div>
  );
};

export default PhoneAuth;






