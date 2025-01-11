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
    const {empDetail } = useAuth();
    const [formData, setFormData] = useState<SignInFormData>({
        email: '',
        password: '',
      });
      const [email, setEmail] = useState("");
      const [otp, setOtp] = useState("");
      const [otpSent, setOtpSent] = useState(true);
      const [verify, setVerify] = useState(false);
      const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
    const [expiryTime, setExpiryTime] = useState(60);
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

      const controller = new AbortController();
      setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    
             // Add your API endpoint here
    //  const apiUrl = 'https://erp-iliw.onrender.com/public/get-user';
    const apiUrl = 'http://localhost:8080/public/get-user';
    
    
     try {
       const response = await fetch(apiUrl, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(empDetail),
       });

    
       if (response.ok) {
         showSnackbar("Email Already exists", "error");
         return
    
         // Handle successful sign-in (e.g., redirect or store token)
       }else if (response.status===400){
        sendOtp()

      } 
     } catch (error) {
      // showSnackbar("Internal Server Error");
      console.error(error)

     }
        };

      


    const sendOtp = async () => {
      setOtpSent(false)
      setSpinner(true)

      try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
          const apiUrl = 'https://erp-iliw.onrender.com/public/send-otp';
  
          // const apiUrl = 'http://localhost:8080/public/send-otp';
  
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          // setOtpSent(true);
          setSpinner(false)
          setVerify(true)
          // showSnackbar("OTP sent successfully", data.message);
        } else {
          showSnackbar("Failed to send OTP", data.message);
          setOtpSent(true)
          setSpinner(false)

        }
      } catch (error) {
        showSnackbar("Failed to send OTP", "error");
        setOtpSent(true)
        setSpinner(false)
      }
    };
    // console.log("spiinner", spinner);

  
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

        try {
          const otplength = otpValues.join("")
          if (otplength.length == 6) {
          const apiUrl = 'https://erp-iliw.onrender.com/public/verify-otp';
          // setVerify(false)
          // setSpinner(true)
          // const apiUrl = 'http://localhost:8080/public/verify-otp';
const response = await fetch(apiUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, otp }),
});
const data = await response.json();
if (data.valid) {
  // setSpinner(false)
  showSnackbar("OTP verified", data.message);
  empDetail.email = email
  navigate('/signup'); // Redirect to dashboard after login

} else {
  // setSpinner(false)
  showSnackbar("Invalid OTP", "error");
  // setVerify(true)
}
}else{
  showSnackbar("Invalid OTP", "error");

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
      padding: "8px 19.2px",
    };
  
    const resendTimerCss = {
      color: "black",
      border: "white",
      fontWeight: "bold",
      padding: "8px 19.2px",
    };
  
    return (
      <div style={{
        background: 'linear-gradient(to bottom, #ff99ff 0%, #66ccff 100%)',
        height: '100vh', // Ensure it takes full viewport height
        width: '100vw',  // Ensure it takes full viewport width
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <form
        onSubmit={handleSend}
      >
      <div>
               {otpSent ? (<div className="otp_container">
  <h2>
            Email Verification
          </h2>

          <input
          style={{
            width:"200px"

          }}
          type="email"
          name="email"
          placeholder = "Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
                <button
                type="submit"          >
                  
            Send OTP
          </button>
          <p>Already have an account? <Link to="/">Sign In</Link></p>

</div>):
(<div > </div>)}
{verify ? 
(<div className="otp_container">


          <h4>
          {email}
          </h4>
       {resendClicked ? (

            <h4>
              OTP has been Re-Sent 
            </h4>
          ) : (
            <h4
            >
              OTP has been Sent
            </h4>
          )}
  
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


        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop:"15px",
            gap:"10px"
          }}
        >
        <button
            onClick={verifyOtp}
            type="button"
          >
            Verify
          </button>


          <button
            onClick={handleResend}
            disabled={!resendVisible}
            style={resendVisible ? resendCss : resendTimerCss}
          >
            {resendVisible ? "Resend" : `Your OTP expires in ${expiryTime}s`}
          </button>

        </div>
        <p>Already have an account? <Link to="/">Sign In</Link></p>

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
      </div>
      {spinner ? (<div className="spinner"> </div>): <div></div> }

      </form>
      
      </div>
    );
  }

  export default Otp;
