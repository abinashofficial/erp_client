// import React, { useState } from 'react';
// import QRCode from 'react-qr-code';
// import html2canvas from 'html2canvas';

// const UserQRCode = () => {
//   const [userDetails, setUserDetails] = useState({
//     id: "EMP01",
//     name: "Abinash"
//   });

//   const qrData = `${userDetails.id},${userDetails.name}`;

//   // Function to download the QR code as JPEG
//   const downloadQRCode = () => {
//     const qrCodeElement = document.getElementById('qr-code-container');
//     if (qrCodeElement) {
//       html2canvas(qrCodeElement, {
//         backgroundColor: '#ffffff', // Set the background color to white
//       }).then((canvas) => {
//         const context = canvas.getContext('2d');
//         if (context) {
//           // Ensure QR code is centered by clearing and filling the background
//           context.fillStyle = '#ffffff'; // White background
//           context.fillRect(1, 1 , canvas.width, canvas.height);
//         }
//         const link = document.createElement('a');
//         link.download = 'user-qr-code.jpeg'; // Set the filename
//         link.href = canvas.toDataURL('image/jpeg'); // Convert canvas to JPEG
//         link.click(); // Trigger download
//       }).catch((error) => {
//         console.error('Error generating QR code image:', error);
//       });
//     } else {
//       console.error('QR Code container not found!');
//     }
//   };

//   return (
//     <div >
//       <div >

//       <h2>Generate QR Code for User Details</h2>
//       <div style={{
//                 display:"flex",
//                 justifyContent:"center",
//       }}>
//  <div id="qr-code-container" style={{
//         display:"flex",
//         justifyContent:"center",
//         height:"300px",
//         width:"300px"
//       }}>
//         <div style={{
//           margin:"20px",
//         }}>
//         <QRCode value={qrData} size={250} />

//         </div>
//       </div>
//       </div>
//       <button onClick={downloadQRCode}>Download QR Code as JPEG</button>

//       </div>


//     </div>
//   );
// };

// export default UserQRCode;

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { useAuth } from '../context/authContext';


const UserQRCode = () => {
  const [userDetails, setUserDetails] = useState("");

    const { empDetail} = useAuth();

  const qrData = `${empDetail.employee_id}/${empDetail.email}`;
  console.log(qrData)

  const downloadQRCode = () => {

    const qrCodeElement = document.getElementById('qr-code-container');
    if (qrCodeElement) {
      html2canvas(qrCodeElement).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'user-qr-code.jpeg';
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
      }).catch((error) => {
        console.error('Error generating QR Code image:', error);
      });
    } else {
      console.error('QR Code container not found!');
    }
  };

  return (


    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        marginBottom:"100px"
      }}
    >
      <h2 style={{ fontSize: '1.5rem' }}>Generate QR Code</h2>

      {/* Inputs for User Details */}
      {/* <input
        type="text"
        value={userDetails}
        onChange={(e) => setUserDetails( e.target.value )}
        placeholder="Enter Data"
        style={{
          width: '80%',
          maxWidth: '400px',
          marginBottom: '10px',
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      /> */}

      {/* QR Code */}
      <div
        id="qr-code-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '250px',
          width: '250px',
          marginBottom: '20px',
          border: '1px solid #ddd',
          borderRadius: '10px',
        }}
      >
        <QRCode value={qrData} size={200} />
      </div>

      <button
        onClick={downloadQRCode}
        style={{
          padding: '12px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          width: '80%',
          maxWidth: '200px',
        }}
      >
        Download QR Code as JPEG
      </button>

      {/* Additional Styling for Mobile */}
      <style>
        {`
          @media (max-width: 600px) {
            h2 {
              font-size: 1.2rem;
            }
            button {
              padding: 10px 15px;
            }
            #qr-code-container {
              height: 200px;
              width: 200px;
            }
          }
        `}
      </style>
    </div>

  );
};

export default UserQRCode;















// import React, { useState } from "react";
// import jsQR from "jsqr"; // Import jsQR for decoding QR codes from an image

// const QRCodeScannerFile: React.FC = () => {
//   const [scanResult, setScanResult] = useState<string | null>(null);
//   const [image, setImage] = useState<File | null>(null); // To store the uploaded image

//   // Handle image upload
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file) {
//       setImage(file);
//       decodeQRCode(file); // Decode the QR code as soon as the file is uploaded
//     }
//   };

//   // Decode QR code from image file
//   const decodeQRCode = (file: File) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");

//         if (context) {
//           canvas.width = img.width;
//           canvas.height = img.height;
//           context.drawImage(img, 0, 0, img.width, img.height);

//           // Get image data from canvas
//           const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//           const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

//           if (qrCode) {
//             setScanResult(qrCode.data); // Set the QR code text
//           } else {
//             setScanResult("No QR code found.");
//           }
//         }
//       };
//       img.src = reader.result as string; // Set the image source
//     };
//     reader.readAsDataURL(file); // Read the image file as data URL
//   };

//   return (
//     <div>
//       <h1>QR Code Scanner from File</h1>

//       {/* File upload input */}
//       <input type="file" onChange={handleFileChange} accept="image/*" />

//       {/* Display the scan result */}
//       <div>
//         {scanResult ? (
//           <p>Scanned Result: <strong>{scanResult}</strong></p>
//         ) : (
//           <p>No QR code scanned yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QRCodeScannerFile;
