import React from 'react';
import { useNavigate } from 'react-router-dom';


const TermsOfService: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="terms-of-service">
      <h1>Terms of Service</h1>

      <p>Last updated: January 15, 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to prison birds tech's ERP module. By accessing or using our ERP system, you agree to comply with and be bound by the terms and conditions outlined in this Terms of Service ("ToS"). If you do not agree to these terms, please refrain from using our ERP services.
        </p>
        <p>
        Prison birds tech reserves the right to update, modify, or revise these Terms of Service at any time. Changes will take effect immediately upon posting on this page, and we recommend you review these terms periodically.
        </p>
      </section>

      <section>
        <h2>2. User Eligibility</h2>
        <p>
          To use our ERP system, you must be at least 18 years old or have legal capacity to form a binding contract. By using the ERP module, you represent that you meet these eligibility requirements.
        </p>
      </section>

      <section>
        <h2>3. User Account</h2>
        <p>
          To access certain features of the ERP module, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials (e.g., username and password) and for all activities that occur under your account.
        </p>
        <p>
          If you believe your account has been compromised, you must immediately notify us and change your password to protect your account.
        </p>
      </section>

      <section>
        <h2>4. Use of the ERP System</h2>
        <p>
          You agree to use our ERP module only for lawful purposes and in accordance with the terms of this agreement. Specifically, you shall not:
        </p>
        <ul>
          <li>Violate any applicable laws or regulations.</li>
          <li>Engage in unauthorized access or interfere with the proper operation of the ERP system.</li>
          <li>Transmit harmful or illegal content through the ERP module.</li>
          <li>Use the ERP module to distribute viruses, malware, or any other malicious software.</li>
          <li>Use the ERP system in any way that could damage, disable, overburden, or impair the functionality of the system or interfere with other users' access.</li>
        </ul>
      </section>

      <section>
        <h2>5. Intellectual Property</h2>
        <p>
          The ERP system, including all content, design, logos, software, and documentation, is the property of [Company Name] and is protected by intellectual property laws.
        </p>
        <p>
          You are granted a limited, non-exclusive, non-transferable license to use the ERP system for its intended purpose as outlined in this agreement. You may not reverse engineer, copy, distribute, modify, or create derivative works based on the ERP system without express written permission from [Company Name].
        </p>
      </section>

      <section>
        <h2>6. Data Privacy and Security</h2>
        <p>
          Your use of the ERP module may involve the collection, storage, and processing of personal data. Please refer to our <div className='link' onClick={()=>navigate('/privacypolicy')}>
Privacy Policy
    </div> for detailed information on how we handle your data.
        </p>
        <p>
          We take reasonable security measures to protect your data, but cannot guarantee the complete security of your information. By using the ERP system, you acknowledge that data transmission over the internet is never completely secure.
        </p>
      </section>

      <section>
        <h2>7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the ERP system at any time, without notice, for any reason, including if we believe you have violated the terms of this agreement.
        </p>
        <p>
          Upon termination, all rights and licenses granted to you under this agreement will immediately cease, and you must stop using the ERP system and delete any associated data or materials.
        </p>
      </section>

      <section>
        <h2>8. Limitation of Liability</h2>
        <p>
        Prison birds tech will not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the ERP system, even if we have been advised of the possibility of such damages.
        </p>
        <p>
          Our total liability to you for any claims related to the ERP system shall not exceed the amount you paid for the service in the past 12 months.
        </p>
      </section>

      <section>
        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless prison birds tech, its affiliates, employees, and contractors from any claims, damages, losses, and expenses (including legal fees) arising from your use of the ERP system or your violation of these Terms of Service.
        </p>
      </section>

      <section>
        <h2>10. Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising from or in connection with this agreement shall be resolved in the courts of [Jurisdiction].
        </p>
      </section>

      <section>
        <h2>11. Changes to These Terms</h2>
        <p>
          We may update these Terms of Service from time to time. Any changes will be posted on this page, and the updated version will take effect immediately upon posting. We encourage you to review this page periodically for any updates.
        </p>
      </section>

      <section>
        <h2>12. Contact Information</h2>
        <p>
          If you have any questions or concerns about these Terms of Service, please contact us at:
        </p>
        <ul>
          <li>Email: <a href="prisonbirdstech@gmail.com">prisonbirdstech@gmail.com</a></li>
          <li>Address: No.12, Business St., Chennai, India</li>
        </ul>
      </section>
    </div>
  );
};

export default TermsOfService;
