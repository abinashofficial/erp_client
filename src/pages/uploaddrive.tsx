import React, { useState } from "react";
import { useAuth } from '../context/authContext';


const CloudinaryUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [edit, setEdit] = useState<boolean>();


  const cloudName = "dababspdo"; // Replace with your Cloudinary Cloud Name
  const uploadPreset = "ml_default"; // Replace with your unsigned upload preset

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
    const {empDetail, setEmpDetail} = useAuth();

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url); // URL of the uploaded image
        console.log("Uploaded Image URL:", data.secure_url);
        setEmpDetail({ ...empDetail, ["photo_url"]: data.secure_url });
        setEdit(!edit)
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div style={{
        marginBottom:"30px"
    }}>
                  <h2>Profile Picture</h2>

              {imageUrl && (

        // <div style={{
        //     display: 'flex',
        //     justifyContent: "space-around",
        //     alignItems: 'center',
        //     padding:"10px",
        //   }}> 
        //   <img src={imageUrl} alt="Uploaded"  style={{
        //       width: '100px',
        //       height: '100px',
        //       objectFit: 'cover',
        //       borderRadius: '50px',
        //     //   marginTop: '10px',
        //     }} />
        // </div>
        <div>

        </div>

      )}
      {edit ? (
        <div>
      <button onClick={()=>setEdit(!edit)}>Re - Upload</button>

        </div>):
        (<div style={{
            display:"flex",
            flexDirection:"column",
            flexWrap:"wrap",
        }}>
                  <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
        </div>
      )}

    </div>
  );
};

export default CloudinaryUploader;




