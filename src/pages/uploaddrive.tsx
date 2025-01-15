// src/components/GoogleDriveUpload.tsx
import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { initGoogleDrive } from "./auth/firebaseConfig";

const GoogleDriveUpload: React.FC = () => {
  const [fileData, setFileData] = useState<string | null>(null);

  useEffect(() => {
    // Initialize the Google API client and Picker after component mount
    initGoogleDrive();
  }, []);

  const handleAuth = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(() => {
      console.log("User signed in");
    });
  };

  const handleFilePicker = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    const accessToken = auth2.currentUser.get().getAuthResponse().access_token;

    // Initialize the Picker
    const view = new window.google.picker.DocsView();
    const picker = new window.google.picker.PickerBuilder()
      .setOAuthToken(accessToken)
      .setDeveloperKey("AIzaSyD1Iwm0p_L4vYpCzS90zzzQyMxqQd-jB4w")
      .addView(view)
      .setCallback((data: any) => {
        if (data.action === window.google.picker.Action.PICKED) {
          const file = data.docs[0];
          console.log("Selected file:", file);
          downloadFile(file.id, accessToken);
        }
      })
      .build();
    picker.setVisible(true);
  };

  const downloadFile = async (fileId: string, accessToken: string) => {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    setFileData(objectURL); // Display image or file content
  };

  return (
    <div>
      <button onClick={handleAuth}>Login to Google</button>
      <button onClick={handleFilePicker}>Select File (Resume)</button>
      {fileData && <img src={fileData} alt="Resume" style={{ width: "300px" }} />}
    </div>
  );
};

export default GoogleDriveUpload;
