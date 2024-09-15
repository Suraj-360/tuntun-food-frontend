import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VerificationError.css';  // You can create a separate CSS file for styling

const VerificationError = () => {
  const navigate = useNavigate();

  const handleResendClick = () => {
    // Redirect to a page or function where the user can request to resend the verification email
    navigate('/signup');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="error-container">
      <div className="content">
        <img
          src="https://img.icons8.com/ios/452/error.png"
          alt="Error Icon"
          className="error-icon"
        />
        <h1>Verification Failed</h1>
        <p>
          The verification link is either invalid or has expired. Please try requesting a new verification email.
        </p>
        <button className="resend-button" onClick={handleResendClick}>
          Sign Up Again
        </button>
        <button className="home-button" onClick={handleHomeClick}>
          Go to Home
        </button>
        <footer>&copy; 2024 Tuntun's Food. All rights reserved.</footer>
      </div>
    </div>
  );
};

export default VerificationError;
