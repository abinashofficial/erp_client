import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PrizeModal from "../pages/prizemodal";

const DownloadPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state?.data;

  if (!data) {
    return (
      <div className="p-5">
        <h2>No game selected.</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <PrizeModal
        isOpen={true}
        onClose={() => navigate(-1)}
        data={data}
      >
        {/* Optional children */}
        <p className="text-center text-gray-700">Download your game safely</p>
      </PrizeModal>
    </div>
  );
};

export default DownloadPage;
