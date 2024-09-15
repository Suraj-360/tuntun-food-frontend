import React from 'react';
import './TermsAndConditions.css';

function TermsAndConditions() {
    return (
        <div className="terms-and-conditions-container">
            <header className="terms-header">
                <h1>Terms and Conditions</h1>
                <p><strong>Effective Date:</strong> [25/08/2024]</p>
            </header>

            <section className="terms-section">
                <h2>1. Acceptance of Terms</h2>
                <p>Welcome to Tuntun's Food. By accessing and using our website, you agree to be bound by the following terms and conditions. If you do not agree with any part of these terms, you must not use our website.</p>
            </section>

            <section className="terms-section">
                <h2>2. Changes to Terms</h2>
                <p>We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website after any changes indicates your acceptance of the new terms.</p>
            </section>

            <section className="terms-section">
                <h2>3. User Accounts</h2>
                <p>When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
            </section>

            <section className="terms-section">
                <h2>4. Orders and Payments</h2>
                <p>All orders placed through our website are subject to acceptance. We reserve the right to refuse or cancel any order at any time. Payment must be made in full at the time of order.</p>
            </section>

            <section className="terms-section">
                <h2>5. Product Availability and Pricing</h2>
                <p>All products and prices are subject to change without notice. We strive to provide accurate product descriptions and pricing, but errors may occur.</p>
            </section>

            <section className="terms-section">
                <h2>6. Shipping and Delivery</h2>
                <p>We aim to deliver your order within the estimated time frame, but delays may occur due to unforeseen circumstances.</p>
            </section>

            <section className="terms-section">
                <h2>7. Returns and Refunds</h2>
                <p>If you are not satisfied with your purchase, you may return the product within [number of days] days of receipt for a refund or exchange.</p>
            </section>

            <section className="terms-section">
                <h2>8. Intellectual Property</h2>
                <p>All content on this website is the property of Tuntun's Food and is protected by copyright and other intellectual property laws.</p>
            </section>

            <section className="terms-section">
                <h2>9. Limitation of Liability</h2>
                <p>To the fullest extent permitted by law, Tuntun's Food shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our website.</p>
            </section>

            <section className="terms-section">
                <h2>10. Governing Law</h2>
                <p>These terms and conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction].</p>
            </section>

            <section className="terms-section">
                <h2>11. Contact Information</h2>
                <address>
                    <strong>Tuntun's Food</strong><br />
                    Email: <a href="mailto:info@tuntunsfood.com">info@tuntunsfood.com</a><br />
                    Phone: +1 234 567 890
                </address>
            </section>
        </div>
    );
}

export default TermsAndConditions;
