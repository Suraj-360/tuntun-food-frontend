import React, { useState } from 'react';
import './SignUp.css';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineStreetview } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { TbNumber123 } from "react-icons/tb";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { TiWorld } from "react-icons/ti";
import { MdPlace } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdDoneAll } from "react-icons/io";


function SignUp() {

    const [signupForm, setSignupForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        postal: "",
        country: "",
        dob: "",
        gender: "",
        password: "",
        cpassword: ""
    });

    const [message, setMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setSignupForm({
            ...signupForm,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        try {
            setIsLoading(true);
            event.preventDefault();
            setMessage("");

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/v1/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupForm)
            });

            const json = await response.json();
            setMessage(json.message);

            if (response.status === 200) {
                toast(<span><IoMdDoneAll style={{ color: 'green' }} /> {json.message}</span>, { position: 'top-center', theme: 'colored' });
                setIsLoading(false);
                navigate("/login")
            }
            else {
                toast(json.message, { position: 'top-center', theme: 'colored' });
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(`Something went wrong ${error.message} please try again later`, { position: 'top-center', theme: 'dark' });
        }
    };

    const handleConfirmPasswordVisible = () => {
        setConfirmPasswordVisible(prev => !prev)
    }

    const handlePasswordVisible = () => {
        setPasswordVisible(prev => !prev)
    }

    return (
        <div className='signup-container'>
            <div className='signup-form'>
                <h1>Tuntun's Food</h1>
                <h2>User Registration</h2>
                <p><Link to="/login">Already have account?</Link></p>
                <br />
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='input-box-container'>
                        <div className='input-icon-container'>
                            <label htmlFor='firstName'>First Name</label>
                            <FaUserCircle className='input-icon' />
                            <input
                                type='text'
                                name='firstName'
                                id='firstName'
                                value={signupForm.firstName}
                                onChange={onChangeHandler}
                                placeholder='Enter First Name'
                                required
                            />
                        </div>
                        <div className='input-icon-container'>
                            <label htmlFor='lastName'>Last Name</label>
                            <FaUserCircle className='input-icon' />
                            <input
                                type='text'
                                name='lastName'
                                id='lastName'
                                value={signupForm.lastName}
                                onChange={onChangeHandler}
                                placeholder='Enter Last Name'
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div className='input-icon-container'>
                        <label htmlFor='email'>Email</label>
                        <MdEmail className='input-icon' />
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={signupForm.email}
                            onChange={onChangeHandler}
                            placeholder='Enter email'
                            required
                        />
                    </div>
                    <br />
                    <div className='input-icon-container'>
                        <label htmlFor='street'>Street</label>
                        <MdOutlineStreetview className='input-icon' />
                        <input
                            type='text'
                            name='street'
                            id='street'
                            value={signupForm.street}
                            onChange={onChangeHandler}
                            placeholder='Enter Street Address'
                        />
                    </div>
                    <br />
                    <div className='input-icon-container'>
                        <label htmlFor='city'>City</label>
                        <FaCity className='input-icon' />
                        <input
                            type='text'
                            name='city'
                            id='city'
                            value={signupForm.city}
                            onChange={onChangeHandler}
                            placeholder='Enter City'
                        />
                    </div>
                    <br />
                    <div className='input-icon-container'>
                        <label htmlFor='state'>State</label>
                        <MdPlace className='input-icon' />
                        <input
                            type='text'
                            name='state'
                            id='state'
                            value={signupForm.state}
                            onChange={onChangeHandler}
                            placeholder='Enter State'
                        />
                    </div>
                    <br />
                    <div className='input-icon-container'>
                        <label htmlFor='postal'>Postal Code</label>
                        <TbNumber123 className='input-icon' />
                        <input
                            type='text'
                            name='postal'
                            id='postal'
                            value={signupForm.postal}
                            onChange={onChangeHandler}
                            placeholder='Enter Postal Code'
                        />
                    </div>
                    <br />
                    <div className='input-icon-container'>
                        <label htmlFor='country'>Country</label>
                        <TiWorld className='input-icon' />
                        <input
                            type='text'
                            name='country'
                            id='country'
                            value={signupForm.country}
                            onChange={onChangeHandler}
                            placeholder='Enter Country'
                        />
                    </div>
                    <br />
                    <div className='input-icon-container'>
                        <label htmlFor='dob'>Date of Birth</label>
                        <BsFillCalendarDateFill className='input-icon' />
                        <input
                            type='date'
                            name='dob'
                            id='dob'
                            value={signupForm.dob}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <br />
                    <div className='input-icon-container'>
                        <label htmlFor='gender'>Gender</label>
                        <FaPeopleGroup className='input-icon' />
                        <select
                            name='gender'
                            id='gender'
                            value={signupForm.gender}
                            onChange={onChangeHandler}
                        >
                            <option value=''>Select Gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='other'>Other</option>
                        </select>
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
                                value={signupForm.password}
                                onChange={onChangeHandler}
                                placeholder='Enter password'
                                required
                            />
                            {(passwordVisible) ? (<FaEyeSlash className='input-icon-right' onClick={handlePasswordVisible} />) : (<FaEye className='input-icon-right' onClick={handlePasswordVisible} />)}
                        </div>
                        <div className='input-icon-container'>
                            <label htmlFor='cpassword'>Confirm Password</label>
                            <RiLockPasswordFill className='input-icon' />
                            <input
                                type={(confirmPasswordVisible) ? 'text' : 'password'}
                                name='cpassword'
                                id='cpassword'
                                value={signupForm.cpassword}
                                onChange={onChangeHandler}
                                placeholder='Confirm password'
                                required
                            />
                            {(confirmPasswordVisible) ? (<FaEyeSlash className='input-icon-right' onClick={handleConfirmPasswordVisible} />) : (<FaEye className='input-icon-right' onClick={handleConfirmPasswordVisible} />)}
                        </div>
                    </div>
                    <br />
                    <button type='submit' disabled={isLoading} className='signup-wala-btn'>
                        {isLoading ? <span className="loader-signup-wala"></span> : 'Register'}
                    </button>
                </form>
            </div >
        </div >
    );
}

export default SignUp;