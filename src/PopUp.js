import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { IoIosCloseCircle } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import { MdOutlineDoneOutline } from "react-icons/md";
import './PopUp.css';  // Import the CSS file

function PopUp({ onCancel, onProceed, data }) {
    const [isLoading, setIsLoading] = useState(false);
    const { message, cancel, proceed } = data;

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const handleProceedClick = () => {
        setIsLoading(true);
        onProceed(proceed); // Call the onProceed function
    };

    return ReactDOM.createPortal(
        <>
            <div className="pop-up-overlay">
                <div className="pop-up-modal" onClick={handleModalClick}>
                    <p>{message}</p>
                    <div className="pop-up-btn-container">
                        <button className='pop-up-btn red' onClick={onCancel}>
                            <FcCancel className='pop-up-btn-svg' />{cancel}
                        </button>
                        <button
                            className={`pop-up-btn green ${isLoading ? 'loading' : ''}`}
                            onClick={handleProceedClick}
                            disabled={isLoading}
                        >
                            {isLoading ? <span className="loader-popup"></span> : <MdOutlineDoneOutline className='pop-up-btn-svg' />}
                            {proceed}
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('cart-root')
    );
}

export default PopUp;
