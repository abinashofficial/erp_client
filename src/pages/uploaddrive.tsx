import React, { useState } from "react";
import { useAuth } from "../context/authContext";

const CloudinaryUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const cloudName = "dababspdo"; 
  const uploadPreset = "ml_default"; 

  const { empDetail, setEmpDetail, setVisible } = useAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];

      // Validate image type
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("Image must be less than 5MB.");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);
    setVisible(false);

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

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.secure_url) {
        console.log("Uploaded Image URL:", data.secure_url);

        setEmpDetail({
          ...empDetail,
          photo_url: data.secure_url,
        });

        setEdit(true);
      } else {
        throw new Error("No secure_url returned");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
      setVisible(true);
    }
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      {edit ? (
        <div>
          <button onClick={() => setEdit(false)}>
            Re-Upload
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUploader;