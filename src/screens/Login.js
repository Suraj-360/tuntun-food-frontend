import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatchCart } from '../components/ContextReducer';
import { useDispatchUser } from '../components/UserContextProvider';  // Adjust the import path as necessary
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [loginMessage, setLoginMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatchCart();
    const dispatchUser = useDispatchUser(); // Ensure this is correctly imported and used

    const onChangeHandler = (event) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoginMessage("");

        try {
            setIsLoading(true);
            
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/v1/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginForm)
            });

            const json = await response.json();

            if (response.status === 200) {
                const { token, userId, expiresIn } = json;

                if (!token || !userId || !expiresIn) {
                    setLoginMessage('Invalid response from server');
                    return;
                }

                const expirationTime = new Date().getTime() + expiresIn * 1000;

                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
                localStorage.setItem("tokenExpiration", expirationTime);

                // Fetch user data
                const userResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/v1/fetch-user-data/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const userData = await userResponse.json();

                console.log('User Data:', userData); // Log userData for debugging

                // Update the user context with the fetched user data
                dispatchUser({ type: 'SET_USER', payload: userData.user });

                // Handle cart
                const userCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
                dispatch({ type: 'SET_CART', payload: userCart });

                toast.success('Login successful!', { position: 'top-center', theme: 'colored' });
                setIsLoading(false);
                navigate('/');
            } else {
                setLoginMessage(json.message || 'Login failed');
                setIsLoading(false);
            }
        } catch (error) {
            setLoginMessage('An error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    const handlePasswordVisible = () => {
        setPasswordVisible(prev => !prev);
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h1>Tuntun's Food</h1>
                <h2>User Login</h2>
                {loginMessage && <p className='login-message'>{loginMessage}</p>}
                <form onSubmit={handleSubmit}>

                    <div className='input-box-container'>
                        <div className='input-icon-container'>
                            <label htmlFor='email'>Email</label>
                            <MdEmail className='input-icon' />
                            <input
                                type='email'
                                name='email'
                                id='email'
                                value={loginForm.email}
                                onChange={onChangeHandler}
                                placeholder='Enter email'
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div className='input-box-container'>
                        <div className='input-icon-container'>
                            <label htmlFor='password'>Password</label>
                            <RiLockPasswordFill className='input-icon' />
                            <input
                                type={(passwordVisible) ? 'text' : 'password'}
                                name='password'
                                id='password'
                                value={loginForm.password}
                                onChange={onChangeHandler}
                                placeholder='Enter password'
                                required
                            />
                            {(passwordVisible) ? (<FaEyeSlash className='input-icon-right' onClick={handlePasswordVisible} />) : (<FaEye className='input-icon-right' onClick={handlePasswordVisible} />)}
                        </div>
                    </div>
                    <br />
                    <button type='submit' disabled={isLoading} className='login-wala-btn'>
                        {isLoading ? <span className="loader-login-wala"></span> : 'Login'}
                    </button>
                </form>
                <p><Link to="/signup" className='dont-have-account-link'>I don't have an account</Link></p>
            </div>
        </div>
    );
}

export default Login;
