import React, { useState, useEffect } from 'react';
import './AccountInformation.css';
import { useUser } from '../components/UserContextProvider'; // Adjust the import path as necessary

function AccountInformation() {
  // Access user data from the context
  const user = useUser();

  console.log(user);
  // Initialize form data with context values, defaulting to empty strings if undefined
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    street: user.street || '',
    city: user.city || '',
    state: user.state || '',
    postalCode: user.postal || '',
    country: user.country || ''
  });

  // Update formData whenever user data changes
  useEffect(() => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      street: user.street || '',
      city: user.city || '',
      state: user.state || '',
      postalCode: user.postal || '',
      country: user.country || ''
    });
  }, [user]);

  return (
    <div className="account-information">
      <h2>Account Information</h2>
      <form>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State/Province:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            disabled
          />
        </div>
      </form>
    </div>
  );
}

export default AccountInformation;
