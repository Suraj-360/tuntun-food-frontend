import React from 'react'
import NotFoundImage from '../assets/2451354.jpg'
import './NotFound.css';
import { useNavigate } from 'react-router-dom';


function NotFound() {

    const navigate = useNavigate();

    const submitHandler = ()=>{
        navigate("/")
    }

  return (
    <div className='page-not-found-main-container'>
        <img src={NotFoundImage}></img>
        <button onClick={submitHandler}>Back To HomePage</button>
        <div class="loader"></div>
    </div>
  )
}

export default NotFound