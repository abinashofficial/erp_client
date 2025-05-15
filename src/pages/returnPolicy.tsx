import React from "react";

const NoReturnPolicy: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>📜 No Return Policy</h1>

      <h2>1. No Returns Accepted</h2>
      <p>
        All sales are <strong>final</strong>. We do not accept returns of any kind, including but not limited to:
      </p>
      <ul>
        <li>Items ordered by mistake</li>
        <li>Items that did not meet customer expectations</li>
        <li>Items received as gifts</li>
        <li>Digital products or downloadable content</li>
      </ul>

      <h2>2. Non-Returnable Products</h2>
      <p>
        Due to the nature of our products/services, we cannot accept any returns.
        This includes physical goods, digital products, and subscriptions.
      </p>

      <h2>3. Damaged or Defective Items</h2>
      <p>
        If the product you received is damaged or defective, please contact us within
        <strong> 3 days</strong> of delivery. While we do not offer returns, we may offer a replacement or assistance
        based on the situation and at our discretion.
      </p>

      <h2>4. Contact Us</h2>
      <p>
        If you have any questions or concerns, feel free to contact us:
      </p>
      <ul>
        <li>Email: <a href="mailto:prisonbirdstech@gmail.com">prisonbirdstech@gmail.com</a></li>
      </ul>
    </div>
  );
};

export default NoReturnPolicy;
