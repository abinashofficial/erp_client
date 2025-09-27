import React, { useState } from "react";
import Lottie from "lottie-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  coin?: string;
  children?: React.ReactNode;
  data: any;
};

const LogoAnime: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const [isHoveredAnime, setIsHovered] = useState(false); // ✅ Move useState to top

  if (!isOpen) return null; // ✅ Now it's safe

  const handleClose = () => {
    setIsHovered(false)
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleClose}
    >
      <div
        className="modal-content"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHoveredAnime ? (
          <Lottie
            style={{ height: "300px", width: "300px", cursor: "pointer" }}
            animationData={data}
            loop
            autoplay
          />
        ) : (
          <img
            style={{ height: "300px", width: "300px", cursor: "pointer" }}
            src="https://res.cloudinary.com/dababspdo/image/upload/v1759003020/Gemini_Generated_Image_ek2mrzek2mrzek2m_xuotyj.png"
            alt="Logo"
          />
        )}


      </div>
              <button
              style={{
            marginTop: "20px",
              }}
          onClick={handleClose}
        >
          Close
        </button>
    </div>
  );
};

export default LogoAnime;
