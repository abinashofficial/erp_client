import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { useAuth } from '../context/authContext';


const UserQRCode = () => {
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