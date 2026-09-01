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
    if (data !== null && data.text !== "") {

       const  {id: extractedId, name: extractedName} = extractEmployeeInfo(data.text);
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
    
const decodeQRCode = (file: File) => {
  if (!file) {
    alert("Please select an image.");
    return;
  }

  console.log("File:", {
    name: file.name,
    type: file.type,
    size: file.size,
  });

  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();

    img.onload = () => {
      console.log("Image loaded:", img.width, img.height);

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        console.error("Could not get canvas context");
        return;
      }

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      context.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight
      );

      try {
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        console.log("Image data loaded");

        const qrCode = jsQR(
          imageData.data,
          imageData.width,
          imageData.height
        );

        if (qrCode) {
          console.log("QR detected:", qrCode.data);

          setScanResult(qrCode.data);
          handleScan(qrCode.data);
        } else {
          console.log("QR not detected");
          alert("No QR code found.");
        }
      } catch (error) {
        console.error("Canvas error:", error);
        alert("Unable to process this image.");
      }
    };

    img.onerror = (error) => {
      console.error("Image loading failed:", error);
      alert("Failed to load image.");
    };

    img.src = reader.result as string;
  };

  reader.onerror = (error) => {
    console.error("FileReader error:", error);
    alert("Failed to read the image.");
  };

  reader.readAsDataURL(file);
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
