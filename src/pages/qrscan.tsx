import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import jsQR from "jsqr"; // Import jsQR for decoding QR codes from an image
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';



interface SignupFormData {
    employee_id:any;
    first_name: any;
    last_name: any;
    full_name: any;
    mobile_number: any;
    email: any;
    date_of_birth: any;
    gender: any;
    password: any;
    confirmPassword:any;
    photo_url:any;
    access_token:any;
    country_code:any;
    coins:any,
  }
const QRCodeScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
      const [visible, setVisible] = useState<Boolean>(true);

    const {empDetail, login} = useAuth();
    const navigate = useNavigate();

    // const [image, setImage] = useState<File | null>(null); // To store the uploaded image
  // Extract Employee ID and Name from the scan result
  const extractEmployeeInfo = (scanResult: string | null) => {
    if (!scanResult) return { id: "", name: "" };
    const parts = scanResult.split("/");
    const id = parts[0] || "";
    const name = parts[1] || "";
    return { id, name };
  };
 
  const handleScan = async (data: any) =>{
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
    if (data) {
       const  {id: extractedId, name: extractedName} = extractEmployeeInfo(data);
        empDetail.employee_id = extractedId
        empDetail.email = extractedName
        console.log("Extracted Employee ID:", extractedId);

          try {

                setVisible(false)
                // const apiUrl = 'https://erp-iliw.onrender.com/public/get-user';
                                const apiUrl = 'https://crud-production-a206.up.railway.app/public/get-user';

                // const apiUrl = 'http://localhost:8080/public/get-user';

                const response = await fetch(apiUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(empDetail),
                });
        
                    
               if (response.ok) {   
                const result:SignupFormData = await response.json();
                const empDetail = ({
                  employee_id: result.employee_id,
                  first_name: result.first_name,
                  last_name: result.last_name,
                  full_name:result.first_name + " " + result.last_name,
                  mobile_number: result.mobile_number,
                  email: result.email,
                  date_of_birth: result.date_of_birth,
                  gender: result.gender,
                  password: result.password,
                  photo_url:result.photo_url,
                  confirmPassword:result.confirmPassword,
                  access_token: result.access_token,
                  country_code:result.country_code,
                  coins:result.coins,
                });
                login(empDetail)
                navigate('/home'); // Redirect to dashboard after login
                setVisible(true)
                // Handle successful sign-in (e.g., redirect or store token)
  }else if (response.status===400){
    setVisible(true)
    alert("Invalid QR Code");
  }
            }catch (error :any) {
                if (error.name === "AbortError") {
                    setVisible(true)
                    alert("Request timed out");
                    // setError("Request timed out");
                  } else {
                    setVisible(true)
                    alert("Internal server Error");
                    // setError("Failed to fetch data: " + err.message);
                  }              }
    }
  };
    
  // Decode QR code from image file
  const decodeQRCode = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (context) {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0, img.width, img.height);

          // Get image data from canvas
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

          if (qrCode) {
            setScanResult(qrCode.data); // Set the QR code text
            handleScan(qrCode.data)
          } else {
            alert("No QR code found.")
          }
        }
      };
      img.src = reader.result as string; // Set the image source
    };
    reader.readAsDataURL(file); // Read the image file as data URL
  };

  
    // Handle image upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        // setImage(file);
        decodeQRCode(file); // Decode the QR code as soon as the file is uploaded
      }
    };

  const handleError = (err: any) => {
    console.error("Error scanning QR Code: ", err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div       style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        marginBottom:"100px"
      }}>
              {visible ? (

<div >
      <h2>QR Code Scanner</h2>
      <QrReader
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <div>
        {scanResult ? (
          <span></span>
        ) : (
          <span>No QR code scanned yet.</span>
        )}
      </div>

<div className="links" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <span style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}></span>
  <span style={{ color: "#888" }}>OR</span>
  <span style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}></span>
</div>


      <div style={{
        marginTop:"10px"
      }}>
      {/* File upload input */}
      <input type="file" onChange={handleFileChange} accept="image/*" />

    </div>
    <p className="signin-link">
          Already have an account?     <div className='link' onClick={()=>navigate('/')}>
Sign In
    </div>
        </p>

        </div>
              ):(<div className="spinner"> </div>)}
    </div>

  );
};

export default QRCodeScanner;
