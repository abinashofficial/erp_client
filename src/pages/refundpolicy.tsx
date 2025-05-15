import React from "react";

const NoRefundPolicy: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        color: "#333",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#d32f2f" }}>
        No Cancellation and Refund Policy
      </h1>


      <h2>1. No Cancellations</h2>
      <p>
        Once a transaction is successfully completed, it <strong>cannot be cancelled</strong> under any circumstances.
        We do not accept requests for cancellations after the payment has been processed.
      </p>

      <h2>2. No Refunds</h2>
      <p>
        All payments made to us are <strong>non-refundable</strong>. By proceeding with a purchase or payment,
        you acknowledge and agree that you are not entitled to a refund for any reason, including but not limited to
        dissatisfaction with the service or accidental payments.
      </p>

      <h2>3. Exceptions</h2>
      <p>
        We do not offer any exceptions to this policy. Please ensure you understand and agree to this policy before
        completing any transaction.
      </p>

      <h2>4. Contact Us</h2>
      <p>
        If you have questions or believe you were charged in error, please contact us:
        <br />
        📧 <a href="mailto:prisonbirdstech@gmail.com">prisonbirdstech@gmail.com</a>
        <br />
      </p>
    </div>
  );
};

export default NoRefundPolicy;
