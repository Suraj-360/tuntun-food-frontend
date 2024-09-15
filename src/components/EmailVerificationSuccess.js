// EmailVerificationSuccess.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailVerificationSuccess.css';  // You can separate CSS as you prefer

const EmailVerificationSuccess = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="verification-container">
      <div className="content">
        <img
          src="https://img.icons8.com/ios/452/checkmark.png"
          alt="Success Icon"
          className="success-icon"
        />
        <h1>Email Verified Successfully!</h1>
        <p>
          Thank you for verifying your email. Your account is now activated, and
          you can log in to enjoy our services.
        </p>
        <button className="login-button" onClick={handleLoginClick}>
          Go to Login
        </button>
        <footer>&copy; 2024 Tuntun's Food. All rights reserved.</footer>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;
