import React from 'react';
import './HelpAndSupport.css';

function HelpAndSupport() {
  return (
    <div className="help-support-container">
      <h3>Help & Support</h3>
      <p>If you need assistance, we're here to help! Please choose from the following options to get the support you need.</p>

      <div className="support-options">
        <div className="support-option">
          <h4>FAQs</h4>
          <p>Find answers to the most commonly asked questions about our service.</p>
          <button>View FAQs</button>
        </div>
        <div className="support-option">
          <h4>Contact Us</h4>
          <p>Get in touch with our support team for personalized assistance.</p>
          <button>Contact Support</button>
        </div>
        <div className="support-option">
          <h4>Live Chat</h4>
          <p>Chat with a support agent in real-time to resolve your issues quickly.</p>
          <button>Start Live Chat</button>
        </div>
        <div className="support-option">
          <h4>Feedback</h4>
          <p>We value your feedback. Let us know how we can improve our service.</p>
          <button>Give Feedback</button>
        </div>
      </div>
    </div>
  );
}

export default HelpAndSupport;
