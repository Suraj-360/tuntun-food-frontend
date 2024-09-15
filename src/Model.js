import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IoIosCloseCircle } from "react-icons/io";


const MODEL_STYLES = {
    position: 'fixed',
    top: '4rem',
    left: '1rem',
    right: '1rem',
    bottom: '1rem',
    backgroundColor: 'white',
    zIndex: 1000,
    padding: '0.2rem 0.2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    overflowY: 'auto',
    overflowX: 'hidden'
};

const OVERLAY_STYLES = {
    position: 'fixed',
    top: '1rem',
    left: '0.5rem',
    right: '0.5rem',
    bottom: '1rem',
    width: 'calc(100vw - 1rem)',
    height: 'calc(100vh - 2rem)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
    zIndex: 1000,
    boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
};

const CLOSE_BTN_STYLES = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    color: 'red',
    cursor: 'pointer',
    zIndex: 1100,
};

const CLOSE_BTN_SVG = {
    width: '2rem',
    height: 'auto',
};

function Model({ children, onClose }) {

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES}>
                <button style={CLOSE_BTN_STYLES} onClick={onClose}>
                    <IoIosCloseCircle style={CLOSE_BTN_SVG} />
                </button>
                <div style={MODEL_STYLES}>
                {React.cloneElement(children, { onClose })}
                </div>
            </div>
        </>,
        document.getElementById('cart-root')
    );
}

export default Model;
