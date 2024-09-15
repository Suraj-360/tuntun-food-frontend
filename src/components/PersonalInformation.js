import React, { useState, useEffect } from 'react';
import './PersonalInformation.css';
import { useUser, useDispatchUser } from '../components/UserContextProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PersonalInformation() {
  const user = useUser();
  const dispatchUser = useDispatchUser();

  // Initialize form data with context values
  const [formData, setFormData] = useState({
    street: user.street || '',
    city: user.city || '',
    state: user.state || '',
    postalCode: user.postal || '',
    country: user.country || '',
    dob: user.dob || '',
    gender: user.gender || '',
  });

  // Update formData whenever user data changes
  useEffect(() => {
    setFormData({
      street: user.street || '',
      city: user.city || '',
      state: user.state || '',
      postalCode: user.postal || '',
      country: user.country || '',
      dob: user.dob || '',
      gender: user.gender || '',
    });
  }, [user]);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/v1/app/v1/update-user-data/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)  // Include formData in the request body
      });

      const json = await response.json();
      if (response.status === 200) {
        toast.success(json.message, { position: 'top-center', theme: 'colored' });
        dispatchUser({ type: 'UPDATE_USER', payload: json.user });
      } else {
        toast.error(json.message, { position: 'top-center', theme: 'dark' });
      }
      setIsEditMode(false); // Exit edit mode after saving
    } catch (error) {
      toast.error(error.message, { position: 'top-center', theme: 'dark' });
    }
  };

  return (
    <div className="personal-information">
      <h2>Personal Information</h2>

      <div className="form-buttons">
        {isEditMode ? (
          <>
            <button type="button" onClick={handleSubmit}>Save</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setIsEditMode(false);
                // Optionally reset form data or perform other actions on cancel
                setFormData({
                  street: user.street || '',
                  city: user.city || '',
                  state: user.state || '',
                  postalCode: user.postal || '',
                  country: user.country || '',
                  dob: user.dob || '',
                  gender: user.gender || '',
                });
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditMode(true)}
          >
            Edit
          </button>
        )}
      </div>

      <form id="personal-info-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="street"
            disabled={!isEditMode}
            value={formData.street}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            disabled={!isEditMode}
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            disabled={!isEditMode}
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            disabled={!isEditMode}
            value={formData.postalCode}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            disabled={!isEditMode}
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            disabled={!isEditMode}
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            disabled={!isEditMode}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default PersonalInformation;
