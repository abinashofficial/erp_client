

import React, { useState, useEffect } from "react";
    import { FaEarlybirds } from "react-icons/fa";



const PaymentMethodSelector: React.FC = () => {


  return (
    <div style={{
            display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "pink",
    }} >
<FaEarlybirds style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "50vh",
      backgroundColor: "pink",
      width: "50vw",
      color: "white",
      margin: "1000px",
    }}  />


    </div>


  );
};

export default PaymentMethodSelector;
