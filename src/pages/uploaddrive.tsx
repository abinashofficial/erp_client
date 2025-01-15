// // src/components/GoogleDriveUpload.tsx
// import React, { useEffect, useState } from "react";
// import { gapi } from "gapi-script";
// import { initGoogleDrive } from "./auth/firebaseConfig";

// const GoogleDriveUpload: React.FC = () => {
//   const [fileData, setFileData] = useState<string | null>(null);

//   useEffect(() => {
//     // Initialize the Google API client and Picker after component mount
//     initGoogleDrive();
//   }, []);

//   const handleAuth = () => {
//     const auth2 = gapi.auth2.getAuthInstance();
//     auth2.signIn().then(() => {
//       console.log("User signed in");
//     });
//   };

//   const handleFilePicker = () => {
//     const auth2 = gapi.auth2.getAuthInstance();
//     const accessToken = auth2.currentUser.get().getAuthResponse().access_token;

//     // Initialize the Picker
//     const view = new window.google.picker.DocsView();
//     const picker = new window.google.picker.PickerBuilder()
//       .setOAuthToken(accessToken)
//       .setDeveloperKey("AIzaSyD1Iwm0p_L4vYpCzS90zzzQyMxqQd-jB4w")
//       .addView(view)
//       .setCallback((data: any) => {
//         if (data.action === window.google.picker.Action.PICKED) {
//           const file = data.docs[0];
//           console.log("Selected file:", file);
//           downloadFile(file.id, accessToken);
//         }
//       })
//       .build();
//     picker.setVisible(true);
//   };

//   const downloadFile = async (fileId: string, accessToken: string) => {
//     const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const blob = await response.blob();
//     const objectURL = URL.createObjectURL(blob);
//     setFileData(objectURL); // Display image or file content
//   };

//   return (
//     <div>
//       <button onClick={handleAuth}>Login to Google</button>
//       <button onClick={handleFilePicker}>Select File (Resume)</button>
//       {fileData && <img src={fileData} alt="Resume" style={{ width: "300px" }} />}
//     </div>
//   );
// };

// export default GoogleDriveUpload;


import React, { useState } from "react";

const ImgurUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("https://drive.google.com/uc?export=view&id=11hBYGyUJgVAxoscK1A5-gH2QEpnkkp8F"
);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: "0cbefdeb97998c2", // Replace with your Client ID
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.link); // Imgur's link to the uploaded image
        console.log("Uploaded Image URL:", data.data.link);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h1>Imgur Photo Uploader</h1>

        <div>
          <h2>Uploaded Image</h2>
          <img
            src={imageUrl}
            alt="Profile Preview"
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '50px',
            //   marginTop: '10px',
            }}
          />
        </div>
    </div>
  );
};

export default ImgurUploader;


