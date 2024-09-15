import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { FaShoppingCart } from "react-icons/fa";
import { useCart, useDispatchCart } from './ContextReducer';
import Model from '../Model';
import Cart from '../screens/Cart';
import tuntun from '../assets/tuntun.svg';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { MdOutlineFactCheck } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiSolidLogOut } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import Profile from './Profile';
import { useDispatchUser, useUser } from './UserContextProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NavBar() {
    const navigate = useNavigate();
    const data = useCart();
    const [animationKey, setAnimationKey] = useState(0);
    const cartLength = data ? data.length : 0;
    const [highlight, setHighlight] = useState(false);
    const [cartView, setCartView] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isFineWidth, setIsFineWidth] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dispatch = useDispatchCart();
    const [profileView, setProfileView] = useState(false);
    const user = useUser();
    const dispatchUser = useDispatchUser();

    console.log(user);

    const handleLogoutClick = () => {
        // Dispatch the logout action to update user context
        dispatchUser({ type: 'LOGOUT' });

        const userId = localStorage.getItem('userId');
        if (userId) {
            localStorage.setItem(`cart-${userId}`, JSON.stringify(data));
        }
        localStorage.removeItem("token");
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        // Clear cart data in the Cart context
        dispatch({ type: 'SET_CART', payload: [] });

        toast.success('Logged out successfully!', { position: 'top-center', theme: 'colored' });
        navigate("/");
    };

    useEffect(() => {
        const handleResize = () => {
            setIsFineWidth(window.innerWidth > 1190);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setProfileView(false);
    }, [])


    useEffect(() => {
        if (cartLength > 0) {
            setAnimationKey(prev => prev + 1);
            setHighlight(true);

            const timer = setTimeout(() => {
                setHighlight(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [data]);

    useEffect(() => {
        if (isDrawerOpen) {
            document.body.classList.add('no-scroll');
        }
        else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isDrawerOpen]);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(prev => !prev);
    };

    const handleCartView = () => {
        setCartView(prev => !prev);
    }

    const handleProfileView = () => {
        setProfileView(prev => !prev);
    }

    const handleCategoryClick = (category) => {
        navigate(`/category?category=${category}`);
    }


    return (
        <div className={`navbar-container ${cartView ? 'unclickable-background' : ''}`}>
            <div className='nav-list'>

                <div className='tuntun-logo-container-nav'>
                    <img src={tuntun} className='tuntun-logo-nav' alt="Tuntun's Logo" />
                    <Link className='tuntun-logo-link' to="/"><h1>Tuntun's Food</h1></Link>
                </div>

                {isFineWidth && (
                    <ul>
                        <li>
                            <Link className='list-link nav-list-name' to="/"><FaHome className='svg-icon' /> Home</Link>
                        </li>
                        <li>
                            <Link className='list-link nav-list-name' to="/about"> <MdOutlineFactCheck className='svg-icon' /> About</Link>
                        </li>
                        <li
                            className='drop-box-food-nav'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            to="#"
                        >
                            <Link className='list-link nav-list-name drop-food'>
                                <FaBowlFood className='svg-icon' /> Foods {isDropdownVisible ? <IoIosArrowUp className='svg-icon' /> : <IoIosArrowDown className='svg-icon' />}
                            </Link>
                            {isDropdownVisible && (
                                <div className='drop-box-food'>
                                    <ul>
                                        <li onClick={() => handleCategoryClick("Veg")}>Veg
                                            <hr />
                                        </li>

                                        <li onClick={() => handleCategoryClick("Non Veg")}>Non Veg
                                            <hr />
                                        </li>

                                        <li onClick={() => handleCategoryClick("Pizza")}>Pizza
                                            <hr />
                                        </li>

                                        <li onClick={() => handleCategoryClick("Drinks")}>Drinks
                                            <hr />
                                        </li>
                                    </ul>
                                    <ul>
                                        <li onClick={() => handleCategoryClick("Starter")}>Starter
                                            <hr />
                                        </li>
                                        <li onClick={() => handleCategoryClick("Main Course")}>Main
                                            <hr />
                                        </li>
                                        <li onClick={() => handleCategoryClick("Paneer")}>Paneer
                                            <hr />
                                        </li>
                                        <li onClick={() => handleCategoryClick("Burgers")}>Burgers
                                            <hr />
                                        </li>
                                    </ul>
                                    <ul>
                                        <li onClick={() => handleCategoryClick("Korean")}>Korean
                                            <hr />
                                        </li>
                                        <li onClick={() => handleCategoryClick("Italian")}>Italian
                                            <hr />
                                        </li>
                                        <li onClick={() => handleCategoryClick("French")}>French
                                            <hr />
                                        </li>
                                        <li onClick={() => handleCategoryClick("Indian")}>Indian
                                            <hr />
                                        </li>
                                    </ul>
                                </div>

                            )}
                        </li>
                        {localStorage.getItem("token") && (
                            <>
                                <li>
                                    <Link className='list-link nav-list-name' to="/my-order"><FaHistory className='svg-icon' />My Orders</Link>
                                </li>

                                <li onClick={() => setProfileView(true)}>
                                    <Link className='list-link nav-list-name'><FaUserCircle className='svg-icon' />Profile</Link>
                                </li>

                                {profileView && <Model onClose={() => setProfileView(false)}><Profile /></Model>}
                            </>
                        )}
                    </ul>
                )}

                {isFineWidth && (
                    <ul>
                        {!localStorage.getItem("token") ? (
                            <>
                                <li className='light-btn'>
                                    <Link className='list-link nav-list-name' to="/login"><IoLogIn className='svg-icon' /> Login</Link>
                                </li>
                                <li className='light-btn'>
                                    <Link className='list-link' to="/signup"> <FaUserPlus className='svg-icon' />Signup</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='carts'>
                                    <Link className={`list-link ${highlight ? 'highlight' : ''}`} onClick={() => setCartView(true)}>
                                        <FaShoppingCart />
                                    </Link>
                                    {cartLength > 0 && <p className='cart-number' key={animationKey}>{cartLength}</p>}
                                </li>
                                {cartView && <Model onClose={() => setCartView(false)}><Cart /></Model>}
                                <li className='light-btn'>
                                    <Link className='list-link' onClick={handleLogoutClick}><BiSolidLogOut className='svg-icon' /> Logout</Link>
                                </li>

                            </>
                        )}
                    </ul>
                )}
                {
                    !isFineWidth && <GiHamburgerMenu className='hamburger-menu-icon' onClick={toggleDrawer} />
                }
            </div>

            {/* Fullscreen Drawer */}
            {isDrawerOpen && (
                <div className='drawer'>
                    <IoMdClose className='drawer-close-icon' onClick={toggleDrawer} />
                    <ul className='drawer-list'>
                        <li className='drawer-list-nav-bar'>
                            <Link className='drawer-link' to="/" onClick={toggleDrawer}><FaHome className='svg-icon' /> Home</Link>
                        </li>
                        <li className='drawer-list-nav-bar'>
                            <Link className='drawer-link' to="/about" onClick={toggleDrawer}> <MdOutlineFactCheck className='svg-icon' /> About</Link>
                        </li>
                        <li className='drawer-list-nav-bar'>
                            <Link className='drawer-link' to="/about" onClick={toggleDrawer}> <MdOutlineFactCheck className='svg-icon' /> Foods</Link>
                        </li>

                        {!localStorage.getItem("token") ? (
                            <>
                                <li className='drawer-list-nav-bar'>
                                    <Link className='drawer-link' to="/login" onClick={toggleDrawer}>Login</Link>
                                </li>
                                <li className='drawer-list-nav-bar'>
                                    <Link className='drawer-link' to="/signup" onClick={toggleDrawer}>SignUp</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='drawer-list-nav-bar'>
                                    <Link className='drawer-link' to="/my-order" onClick={toggleDrawer}><FaHistory className='svg-icon' /> My Orders</Link>
                                </li>

                                <li className='drawer-list-nav-bar' onClick={handleProfileView}>
                                    <Link className='drawer-link'><FaUserCircle className='svg-icon' /> Profile</Link>
                                </li>
                                {profileView && <Model onClose={() => setProfileView(false)}><Profile /></Model>}
                                <li className='drawer-list-nav-bar carts'>
                                    <Link className={`drawer-link`} onClick={handleCartView}>Carts</Link>
                                </li>
                                {cartView && <Model onClose={handleCartView}><Cart /></Model>}
                                <li className='drawer-list-nav-bar'>
                                    <Link className='drawer-link' onClick={handleLogoutClick}><BiSolidLogOut className='svg-icon' />Logout</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default NavBar;
