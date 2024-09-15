import React, { useState } from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import './Cart.css'
import { MdRemoveShoppingCart } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import PopUp from '../PopUp';
import cartSvg from '../assets/cart.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Cart({ onClose }) {
    let data = useCart();
    let dispatch = useDispatchCart();
    const navigate = useNavigate();
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popInfo, setPopInfo] = useState({ message: "", cancel: "", proceed: "" });

    if (data.length === 0) {
        return (
            <div className='cart-container'>
                <img src={cartSvg} className='cart-svg-in-cart-container' alt="Empty Cart" />
                <h2 className='empty-cart'>Cart is empty</h2>
            </div>
        );
    }

    const handleUpdateQuantity = (index, quantity, unitPrice) => {
        if (quantity === 0) {
            dispatch({ type: "DELETE", index });
        } else {
            const updatedPrice = parseFloat(unitPrice) * quantity;
            dispatch({ type: "UPDATE", index, quantity, price: updatedPrice.toFixed(2) });
        }
    };

    const orderSubmit = async (OrderData, pay, paymentData) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/v1/order-food/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ orderData: OrderData, paymentType: pay ,paymentData: (pay==="Online")?paymentData:[]})
            });

            const json = await response.json();
            if (response.status === 200) {
                toast.success(`${json.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                const userId = localStorage.getItem('userId');
                localStorage.removeItem(`cart-${userId}`, JSON.stringify(data));
                dispatch({ type: 'SET_CART', payload: [] });
                setIsPopUpOpen(false);
                onClose(); // Close the Model
                navigate("/");
            } else {
                toast.error(`${json.message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                if (json.message === "Token Expired!") {
                    const userId = localStorage.getItem('userId');
                    localStorage.setItem(`cart-${userId}`, JSON.stringify(data));
                    localStorage.removeItem("token");
                    localStorage.removeItem('userId');
                    localStorage.removeItem('tokenExpiration');
                    dispatch({ type: 'SET_CART', payload: [] });
                    setIsPopUpOpen(false);
                    onClose(); // Close the Model
                    navigate("/");
                }
            }
        } catch (error) {
            toast.error(`${error.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setIsPopUpOpen(false);
            onClose(); // Close the Model
        }
    };

    const handleRazorpayPayment = async (orderData) => {
        try {
            // Make API call to create an order
            console.log(orderData);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/v1/payment/create-order/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ amount: roundedTotal }) // Pass total amount
            });

            const order = await response.json();

            if (response.status !== 200) {
                throw new Error('Failed to create Razorpay order');
            }

            const options = {
                key: process.env.REACT_APP_ROZER_KEY, // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount in smallest currency unit
                currency: order.currency,
                name: 'Tuntun\'s Food',
                description: 'Food Delivery',
                order_id: order.id,
                handler: async function (response) {
                    // Handle successful payment
                    const paymentData = {
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature
                    };

                    console.log(orderData);
                    // Send payment data to backend for verification
                    await orderSubmit(orderData, "Online", paymentData);
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '9999999999'
                },
                theme: {
                    color: '#F37254'
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            toast.error(`Payment failed: ${error.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };


    const handleProceedClick = (proceed) => {
        const updatedData = data.map(item => {
            const { name, price, ...rest } = item;
            return rest;
        });

        const pay = "Cash On Delivery";
        if (proceed === "Order It!") {
            orderSubmit(updatedData, pay, []);
        }
        if (proceed === "Proceed to Payment") {
            setIsPopUpOpen(false);
            handleRazorpayPayment(updatedData);
        }

    };

    const total = data.reduce((total, food) => total + parseFloat(food.price), 0);
    const gstAmount = total * 0.05;
    const deliveryFee = 30.00;
    const totalWithGST = total + gstAmount + deliveryFee;
    const roundedTotal = Math.round(totalWithGST);

    const handleOrderClick = ({ message, cancel, proceed }) => {
        setPopInfo({ message, cancel, proceed });
        setIsPopUpOpen(true);
    };

    return (
        <div className='cart-container'>
            <hr />
            <br />
            <table>
                <thead>
                    <tr>
                        <th><p>#</p></th>
                        <th><p>Name</p></th>
                        <th><p>Quantity</p></th>
                        <th><p>Option</p></th>
                        <th><p>Unit Price</p></th>
                        <th><p>Amount</p></th>
                        <th><p>Remove</p></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const unitPrice = parseFloat(item.price) / item.quantity;
                        return (
                            <tr key={index}>
                                <td><p>{index + 1}</p></td>
                                <td>
                                    <p>{item.name}</p>
                                </td>
                                <td>
                                    <div className='cart-quantity-btn'>
                                        <button className='cart-btns' onClick={() => handleUpdateQuantity(index, item.quantity - 1, unitPrice)}><FaMinusCircle className='dec-cart-svg' /></button>
                                        <p>{item.quantity}</p>
                                        <button className='cart-btns' onClick={() => handleUpdateQuantity(index, item.quantity + 1, unitPrice)}><FaPlusCircle className='inc-cart-svg' /></button>
                                    </div>
                                </td>
                                <td>{item.stype}</td>
                                <td><p>&#8377; {unitPrice.toFixed(2)}</p></td>
                                <td><p>&#8377; {parseFloat(item.price).toFixed(2)}</p></td>
                                <td>
                                    <button className='cart-btns cart-remove-item' onClick={() => dispatch({ type: "DELETE", index })}>
                                        <MdRemoveShoppingCart className='remove-cart-svg' />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br />
            <hr />
            <br />
            <div className='cart-info-container'>
                <div className='summary'>
                    <div>Subtotal: <span className='subtotal'>&#8377; {parseFloat(total).toFixed(2)}</span></div>
                    <div>GST (5%): <span className='gst'>&#8377; {parseFloat(gstAmount).toFixed(2)}</span></div>
                    <div>Delivery Fee: <span className='delivery-fee'>&#8377; {parseFloat(deliveryFee).toFixed(2)}</span></div>
                    <div className='total-amount'>Total (Rounded): <span className='rounded-total'>&#8377; {parseFloat(totalWithGST).toFixed(2)}</span></div>
                </div>
                <div className='payment-buttons'>
                    <button className='checkout-btn btn-delivery' onClick={() => handleOrderClick({ message: "Are you sure you want to proceed to payment?", cancel: "Cancel", proceed: "Proceed to Payment" })}><GiTakeMyMoney className='remove-cart-svg' /> Proceed to Payment</button>
                    <button className='cash-on-delivery-btn btn-delivery' onClick={() => handleOrderClick({ message: "Are you sure you want to order with cash on delivery?", cancel: "Cancel", proceed: "Order It!" })}><CiDeliveryTruck className='remove-cart-svg' /> Cash on Delivery</button>
                </div>
            </div>
            {isPopUpOpen && <PopUp data={popInfo} onCancel={() => setIsPopUpOpen(false)} onProceed={(proceed) => handleProceedClick(proceed)} />}
        </div>
    );
}

export default Cart;
