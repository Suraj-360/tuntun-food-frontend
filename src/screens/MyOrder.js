import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './MyOrder.css';
import Order from '../components/Order';
import historySvg from '../assets/history.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Model from '../Model';
import { useNavigate } from 'react-router-dom';
import { useCart, useDispatchCart } from '../components/ContextReducer';

function MyOrder() {
  const [orderHistoryData, setOrderHistoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  let dispatch = useDispatchCart();
  let data = useCart();

  const handleOrderDetailsClick = (order) => {
    // Calculate total price and quantity for the selected order
    const totalPrice = calculateTotalPrice(order.orderData);
    const totalQuantity = order.orderData.reduce((total, item) => total + item.quantity, 0);

    // Set selected order with additional details
    setSelectedOrder({
      ...order,
      totalPrice,
      totalQuantity
    });

    setIsModalOpen(true);
  };

  const fetchOrderData = async () => {
    try {
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/v1/fetch-order-history/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const json = await response.json();
      if (response.status === 200) {
        setOrderHistoryData(json.orderData);
      }
      else {
        if (json.message === "Token Expired!") {
          toast(`${json.message}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          const userId = localStorage.getItem('userId');
          localStorage.setItem(`cart-${userId}`, JSON.stringify(data));
          localStorage.removeItem("token");
          localStorage.removeItem('userId');
          localStorage.removeItem('tokenExpiration');
          dispatch({ type: 'SET_CART', payload: [] });
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
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
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  // Helper function to calculate total price for an order
  const calculateTotalPrice = (orderData) => {
    return orderData.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div className='myorder-main-container'>
      <NavBar />
      {
        (orderHistoryData.length > 0) ? <div className='order-history-container'>
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>ORDER ID</th>
                <th>ORDER DATE</th>
                <th>DELIVERY STATUS</th>
                <th>PAYMENT TYPE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>MORE</th>
              </tr>
            </thead>
            <tbody>
              {orderHistoryData.map((order, index) => {
                // Extract total price
                const totalPrice = calculateTotalPrice(order.orderData);
                const totalQuantity = order.orderData.reduce((total, item) => total + item.quantity, 0);

                return (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>{order.orderId}</td>
                    <td>{order.orderDate || 'NA'}</td>
                    <td>{order.deliveryStatus || 'NA'}</td>
                    <td>{order.paymentType || 'NA'}</td>
                    <td>{totalQuantity || 'NA'}</td>
                    <td>{totalPrice ? `$${totalPrice}` : 'NA'}</td>
                    <td>
                      <button onClick={() => handleOrderDetailsClick(order)}>Details</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {isModalOpen && <Model onClose={() => setIsModalOpen(false)}><Order order={selectedOrder} /></Model>}
        </div> :
          <div className='empty-my-order-container'>
            <img src={historySvg} className='empty-order-history-svg-icon'></img>
            <p>No Order History Found!!</p>
          </div>
      }
    </div>
  );
}

export default MyOrder;