import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import social1 from '../assets/social1.svg';
import social2 from '../assets/social2.svg';

function Footer() {
    return (
        <div className='footer-main-container'>
            <footer>
                <div className="wrapper">
                    <div className="links-container">
                        <div className="links">
                            <h3>Quick Links</h3>
                            <ul>
                                <li>
                                    <Link to="/about">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact Us</Link>
                                </li>
                                <li>
                                    <Link to="/privacy-policy">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/terms-and-conditions">Terms & Conditions</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="links">
                            <h3>Food Menu</h3>
                            <ul>
                                <li>
                                    <Link to="/menu">All Food</Link>
                                </li>
                                <li>
                                    <Link to="/offers">Special Offers</Link>
                                </li>
                                <li>
                                    <Link to="/recipes">Recipes</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="links">
                            <h3>Contact Us</h3>
                            <ul>
                                <li>
                                    <a href="mailto:info@tuntunsfood.com">info@tuntunsfood.com</a>
                                </li>
                                <li>
                                    <a href="tel:+1234567890">+1 234 567 890</a>
                                </li>
                            </ul>

                            <div className="social">
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <img src={social1} alt="Facebook" />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <img src={social2} alt="Instagram" />
                                </a>
                            </div>

                            <form action="#" method="post">
                                <input type="email" placeholder="Your Email Address" required />
                                <button className="submit-btn" type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <p className="copyright">
                        &copy; 2024 Tuntun's Food. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
