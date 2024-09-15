import React from 'react';
import './PrivacyPolicy.css'; // Optional: Create a CSS file for custom styles if needed

function PrivacyPolicy() {
    return (
        <div className="privacy-policy-container">
            <h1>Privacy Policy</h1>
            <p><strong>Effective Date:</strong> [25/08/2024]</p>

            <h2>1. Introduction</h2>
            <p>Welcome to Tuntun's Food! We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect personal information from you in various ways, including:</p>
            <ul>
                <li><strong>Personal Data:</strong> When you register on our site, place an order, subscribe to our newsletter, or interact with us in any other way, we may collect your name, email address, phone number, and payment information.</li>
                <li><strong>Usage Data:</strong> We may collect information on how you access and use our website, such as your IP address, browser type, pages visited, and the time and date of your visit.</li>
                <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your experience on our website. You can choose to disable cookies through your browser settings, but this may affect your ability to use certain features on our site.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>The information we collect may be used in the following ways:</p>
            <ul>
                <li>To process transactions and deliver your orders</li>
                <li>To improve our website and customer service</li>
                <li>To send you promotional emails and offers</li>
                <li>To personalize your experience on our site</li>
                <li>To respond to your inquiries and provide support</li>
            </ul>

            <h2>4. Sharing Your Information</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to outside parties, except in the following cases:</p>
            <ul>
                <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our website, conducting business, or serving you, as long as those parties agree to keep this information confidential.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or if we believe such action is necessary to comply with a legal obligation, protect our rights, or ensure the safety of our users.</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, so we cannot guarantee absolute security.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of receiving promotional emails</li>
            </ul>
            <p>To exercise these rights, please contact us at <a href="mailto:info@tuntunsfood.com">info@tuntunsfood.com</a>.</p>

            <h2>7. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Effective Date" at the top.</p>

            <h2>8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <address>
                <strong>Tuntun's Food</strong><br />
                Email: <a href="mailto:info@tuntunsfood.com">info@tuntunsfood.com</a><br />
                Phone: +1 234 567 890
            </address>
        </div>
    );
}

export default PrivacyPolicy;
