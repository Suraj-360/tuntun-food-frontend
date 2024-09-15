import React, { useState } from 'react';
import './AccountManagement.css';
import PopUp from '../PopUp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart, useDispatchCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom';
import { useUser, useDispatchUser } from '../components/UserContextProvider'; // Adjust path as necessary

function AccountManagement() {
  const [activeSection, setActiveSection] = useState(null);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    deleteAccountReason: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popInfo, setPopInfo] = useState({ message: '', cancel: '', proceed: '' });

  const dispatch = useDispatchCart();
  const navigate = useNavigate();
  const cartData = useCart();
  const user = useUser();
  const dispatchUser = useDispatchUser();

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const showPopup = (message, proceedAction) => {
    setPopInfo({
      message,
      cancel: 'Cancel',
      proceed: proceedAction,
    });
    setIsPopUpOpen(true);
  };

  const handleDeleteAccount = () => {
    showPopup('Are you sure you want to delete your account? This action cannot be undone.', 'Delete Account');
  };

  const handleChangePassword = () => {
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setStatusMessage('Please fill all the details carefully.');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setStatusMessage('Passwords do not match');
      return;
    }
    if (formData.newPassword.length < 6) {
      setStatusMessage('Password must be at least 6 characters long');
      return;
    }
    showPopup('Are you sure you want to change your password?', 'Change Password');
  };

  const handleProceedClick = async (action) => {
    setIsPopUpOpen(false);

    const apiUrl = action === 'Delete Account'
      ? `${process.env.REACT_APP_BACKEND_URL}/app/v1/delete-account/`
      : `${process.env.REACT_APP_BACKEND_URL}/app/v1/change-password/`;

    const requestBody = action === 'Delete Account'
      ? { reason: formData.deleteAccountReason }
      : { oldPassword: formData.oldPassword, newPassword: formData.newPassword, confirmPassword:formData.confirmPassword};

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestBody),
      });

      const json = await response.json();
      if (response.status === 200) {
        toast.success(json.message, { position: 'top-center', theme: 'colored' });
        if (action === 'Delete Account') {
          localStorage.clear();
          dispatch({ type: 'SET_CART', payload: [] });
          // dispatchUser({ type: 'LOGOUT' }); // Reset user context
          navigate('/');
        }
      } else {
        setStatusMessage(json.message);
        toast.error(json.message, { position: 'top-center', theme: 'dark' });
        if (json.message === 'Token Expired!') {
          localStorage.setItem(`cart-${localStorage.getItem('userId')}`, JSON.stringify(cartData));
          localStorage.clear();
          dispatch({ type: 'SET_CART', payload: [] });
          dispatchUser({ type: 'LOGOUT' }); // Reset user context
          navigate('/');
        }
      }
    } catch (error) {
      setStatusMessage(error.message);
      toast.error(error.message, { position: 'top-center', theme: 'dark' });
    }
  };

  return (
    <div className="account-management">
      <h2>Account Management</h2>
      {statusMessage && <p className="status-message error-message">{statusMessage} *</p>}
      
      <div className="section">
        <button onClick={() => setActiveSection('changePassword')} className="toggle-button">
          Change Password
        </button>
        {activeSection === 'changePassword' && (
          <div className="details">
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleInputChange}
              placeholder="Old password"
            />
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="New password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
            />
            <button onClick={handleChangePassword}>Change Password</button>
          </div>
        )}
      </div>

      <div className="section">
        <button onClick={() => setActiveSection('deactivateAccount')} className="toggle-button">
          Deactivate Account
        </button>
        {activeSection === 'deactivateAccount' && (
          <div className="details">
            <textarea
              name="deleteAccountReason"
              value={formData.deleteAccountReason}
              onChange={handleInputChange}
              placeholder="Reason for account deactivation (optional)"
            />
            <button onClick={handleDeleteAccount} className="delete-button">
              Deactivate Account
            </button>
          </div>
        )}
        {isPopUpOpen && <PopUp data={popInfo} onCancel={() => setIsPopUpOpen(false)} onProceed={() => handleProceedClick(popInfo.proceed)} />}
      </div>
    </div>
  );
}

export default AccountManagement;
