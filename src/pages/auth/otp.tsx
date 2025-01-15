import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { error } from "console";

import Select from "react-select";

interface CountryOption {
  value: string;
  label: JSX.Element;
}



interface SignInFormData {
  email: string;
  password: string;
}

// Generate OTP For Users
  export const GenerateOTP = (function () {
    return function () {
          // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
      
    // Return the generated OTP
    return otp.toString();
    };
  })();
  



//Otp input function for check expired or not and invalid or Valid
  export function Otp() {
    const [verificationMethod, setVerificationMethod] = useState<"email id" | "mobile no">("email id");
    const [mobileNumber, setMobileNumber] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
    const {empDetail } = useAuth();
      const [email, setEmail] = useState("");
      const [otp, setOtp] = useState("");
      const [otpSent, setOtpSent] = useState(true);
      const [verify, setVerify] = useState(false);
      const [spinner, setSpinner] = useState(true);
    const navigate = useNavigate();
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
    const [expiryTime, setExpiryTime] = useState(300);
    const [resendVisible, setResendVisible] = useState(false);
    const [resendClicked, setResendClicked] = useState(false);
  
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] =
      useState<AlertColor>("success");
  
    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };

        const handleSend = async(e: React.FormEvent) => {
            e.preventDefault();
            emailVerify()
        };
  
    const showSnackbar = (message: string, severity: AlertColor = "success") => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);
    };
    

    const emailVerify = async () => {
      empDetail.email = email
      empDetail.mobile_number = selectedCountry?.value+mobileNumber
console.log(empDetail)
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    
             // Add your API endpoint here
     const apiUrl = 'https://erp-iliw.onrender.com/public/get-user';
    // const apiUrl = 'http://localhost:8080/public/get-user';
    
    
     try {  
       const response = await fetch(apiUrl, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(empDetail),
       });

    console.log(response)
       if (response.ok) {
         showSnackbar(verificationMethod + " Already exists", "error");
         return
    
         // Handle successful sign-in (e.g., redirect or store token)
       }else if (response.status===400){
        console.log("400")
        sendOtp()

      } 
     } catch (error) {
      // showSnackbar("Internal Server Error");
      console.error(error)

     }
        };

      


    const   sendOtp = async () => {
      setOtpSent(false)
      setSpinner(false)

      

      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
                    let apiUrl = 'https://erp-iliw.onrender.com/public/send-otp-email';


          // let apiUrl = 'http://localhost:8080/public/send-otp-email';

          if (verificationMethod === "mobile no"){
            apiUrl = 'https://erp-iliw.onrender.com/public/send-otp-mobile-no';

            //  apiUrl = "http://localhost:8080/public/send-otp-mobile-no";
          }
  empDetail.mobile_number = selectedCountry?.value+ mobileNumber
  empDetail.email = email
  
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...empDetail}),
        });
        const data = await response.json();
        if (response.ok) {
          // setOtpSent(true);
          setSpinner(true)
          setVerify(true)
          console.log("send otp", spinner)

          // showSnackbar("OTP sent successfully", data.message);
        } else {
          showSnackbar("Failed to send OTP", data.message);
          setOtpSent(true)
          setSpinner(true)
          console.log("not send otp", spinner)


        }
      } catch (error) {
        showSnackbar("Failed to send OTP", "error");
        setOtpSent(true)
        setSpinner(true)
        console.log("catch not send otp", spinner)
      }
    };

  
    useEffect(() => {
      if (!resendVisible) {
        const timer = setInterval(() => {
          setExpiryTime((prevTime) => {
            if (prevTime === 1) {
              clearInterval(timer);
              setResendVisible(true);
              // showSnackbar("OTP Expired", "error");
            }
            return prevTime - 1;
          });
        }, 1000);
  
        return () => clearInterval(timer);
      }
    }, [resendVisible]);
  
    const handleInput = (index: any, value: any) => {
      const numericValue = value.replace(/\D/g, "");
      const newOtpValues = [...otpValues];
      newOtpValues[index] = numericValue;
      setOtpValues(newOtpValues);
  
      if (numericValue !== "" && index < otpValues.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
  
      if (numericValue === "" && index > 0) {
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
          newOtpValues[index] = "";
          setOtpValues(newOtpValues);
        }
      }
  
      if (newOtpValues[newOtpValues.length - 1] !== "") {
        const otplength = newOtpValues.join("")
        setOtp(otplength)
      }
    };

    const verifyOtp = async () => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
      setVerify(false)
      setSpinner(false)
        try {
          const otplength = otpValues.join("")
          if (otplength.length == 6) {
          const apiUrl = 'https://erp-iliw.onrender.com/public/verify-otp';
          // const apiUrl = 'http://localhost:8080/public/verify-otp';
          const temp = {
            mobile_number : selectedCountry?.value+ mobileNumber,
            email: email,
            otp:otp,
          }

const response = await fetch(apiUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify( {...temp}),
});
const data = await response.json();
if (data.valid) {
  setSpinner(true)
  showSnackbar("OTP verified", data.message);
  empDetail.email = email
  navigate('/signup'); // Redirect to dashboard after login

} else {
  setSpinner(true)
  setVerify(true)
  showSnackbar("Invalid OTP", "error");
}
}else{
  showSnackbar("Invalid OTP", "error");
  setSpinner(true)
  setVerify(true)

}
} catch (error) {
console.error("Error verifying OTP:", error);
}
      };


    
  
    const handleResend = () => {
      setExpiryTime(60);
      setResendVisible(false);
      setResendClicked(true);
      setOtpValues(["", "", "", "", "", ""])
      setOtp("")
      // sendOtp()
      setVerify(false)
      setOtpSent(true)
    };
  
    const resendCss = {
      // backgroundColor: "#313B44",
      borderRadius: ".375rem",
      width: "100px",
      height: "2em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "proxima-nova ",
      fontStyle: "normal",
      fontWeight: "400",
      margin: "10px",
      color: "black",
      // border: "white",
      backround:"grey",
      padding: "8px 19.2px",
    };
  
    const resendTimerCss = {
      // color: "black",
      border: "white",
      fontWeight: "bold",
      padding: "8px 19.2px",
      backround:"grey",
    };


    const handleVerificationChange = (method: "email id" | "mobile no") => {
      setVerificationMethod(method);
      setEmail("");
      setMobileNumber("");
    };

    const countryData = [
      {
        name: "United States",
        dialCode: "+1",
        flag: "https://flagcdn.com/us.svg",
      },
      {
        name: "India",
        dialCode: "+91",
        flag: "https://flagcdn.com/in.svg",
      },
      {
        name: "United Kingdom",
        dialCode: "+44",
        flag: "https://flagcdn.com/gb.svg",
      },
      {
        name: "Canada",
        dialCode: "+1",
        flag: "https://flagcdn.com/ca.svg",
      },
      {
        name: "Australia",
        dialCode: "+61",
        flag: "https://flagcdn.com/au.svg",
      },
    ];
      
    const countryOptions = countryData.map((country) => ({
      value: country.dialCode,
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={country.flag}
            alt={`${country.name} flag`}
            style={{ width: "20px", height: "15px" }}
          />
          {country.name} ({country.dialCode})
        </div>
      ),
    }));

    const handleCountryChange = (selected: CountryOption | null) => {
      setSelectedCountry(selected);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === 'mobile_number' && !/^\d*$/.test(value)) {
        return; // Prevent updating state if the value is not a valid integer
      }
      if (verificationMethod === "email id") setEmail(e.target.value);

      if (verificationMethod === "mobile no") setMobileNumber(e.target.value);
    };

    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
  
    return (
      <div className="main-content">


      {spinner ?(
                <div className="form-container">

                {otpSent ? (
  
  <div>
  <h2 className="heading">Choose Verification Method</h2>
          <div className="method-selection">
            <button
              className={`method-button ${verificationMethod === "email id" ? "active" : ""}`}
              onClick={() => handleVerificationChange("email id")}
            >
              Email
            </button>
            <button
              className={`method-button ${verificationMethod === "mobile no" ? "active" : ""}`}
              onClick={() => handleVerificationChange("mobile no")}
            >
              Mobile Number
            </button>
          </div>
  
  </div>): (<div></div>)}
  
                
        <form
          onSubmit={handleSend}
        >
                 {otpSent ? (<div>
  
            {verificationMethod === "email id" ? (
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            ) : (
              <div className="input-group">
                <label htmlFor="mobile-number">Mobile Number</label>
                <div className="mobile-input-wrapper">
                  <div style={{
                    display:"flex",
                    flexDirection:"row",
                    flexWrap:"wrap",

                  }}>
                  
                  <div style={{
  display:"flex",
  alignItems:"center",
}}>
<Select
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  placeholder="Select Country"
                  // className="country-select"
                />
</div>
                  
                  <input
                            type="text"
                            name="mobile_number"
                            placeholder="Mobile Number"
                            value={mobileNumber}
                            onChange={handleInputChange}
                            required
                  />
                  </div>
  
                </div>
              </div>
            )}
            <button type="submit" className="verify-button">
              Send Verification Code
            </button>
            <p className="signin-link">
          Already have an account? <a href="/">Sign In</a>
        </p>  
  
  </div>):
  (<div > </div>)}
  {verify ? 
  (<div>
  
        <h2 className="otp-heading">OTP Verification</h2>
        <p className="otp-instructions">
          Please enter the 6-digit OTP sent to your registered email or mobile
          number.
        </p>
        <form onSubmit={handleResend}>
          <div className="input-group">
            <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // background: "white",
              gap: "5px",
            }}
          >
            {otpValues.map((value, index) => (
              <React.Fragment key={index}>
                <TextField
                  variant="outlined"
                  id={`otp-input-${index}`}
                  sx={{
                    width: "40px",
                    height: "10px",
                    // background: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                    textAlign: "center",
                    "& input": {
                      fontSize: "20px",
                      padding: "10",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "none",
                      outline: "none",
                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                      height: "0.9em",
                    },
                  }}
                  type="text"
                  value={value}
                  onChange={(e) => handleInput(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace") {
                      e.preventDefault();
                      handleInput(index, "");
                    }
                  }}
                  inputProps={{
                    maxLength: 1,
                  }}
                />
                {index === 1 || index === 3 ? (
                  <h6
                    style={{
                      color: "black",
                    }}
                  >
                    -
                  </h6>
                ) : null}
              </React.Fragment>
            ))}
          </div>
          
          </div>
          <button  className="verify-button"
          onClick={verifyOtp}
          >
            Verify OTP
          </button>
        </form>
        <p className="resend-instructions">
          Didn't receive the OTP?{" "}
          <button
            className="resend-button"
            onClick={handleResend}
            disabled={expiryTime > 0}
          >
            Resend OTP {expiryTime > 0 && `in ${formatTime(expiryTime)}`}
          </button>
        </p>
      <p className="signin-link">
          Already have an account? <a href="/">Sign In</a>
        </p>
  
          </div>):(<div> </div>)}
  
        
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity={snackbarSeverity as AlertColor}
              onClose={handleSnackbarClose}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
  
        </form>
  
  
        </div>
      ): (<div className="spinner"> </div>) }

      </div>
    );
  }

  export default Otp;
