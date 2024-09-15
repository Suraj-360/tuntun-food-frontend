import React from 'react';
import './Order.css';
import { FaCircleDot } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
// import { FcShipped } from "react-icons/fc";
import { MdOutlinePending } from "react-icons/md";
import { FaTruckLoading } from "react-icons/fa";
import { LuBoxes } from "react-icons/lu";

function Order({ order }) {
    // Helper function to calculate total price
    const calculateTotalPrice = (orderData) => {
        if (Array.isArray(orderData)) {
            return orderData.reduce((total, item) => total + (item.quantity || 0) * (item.price || 0), 0);
        }
        return 0;
    };

    const totalPrice = order ? calculateTotalPrice(order.orderData || []) : 0;

    // Define statuses with colors and icons
    const statuses = [
        { key: "Pending", color: "#FF5722", icon: <MdOutlinePending /> },
        { key: "Shipped", color: "#FFC107", icon: <LuBoxes /> },
        { key: "Out of Delivery", color: "#4CAF50", icon: <FaTruckLoading /> },
        { key: "Delivered", color: "#2196F3", icon: <TbTruckDelivery /> }
    ];

    // Find the index of the current delivery status
    const currentStatusIndex = statuses.findIndex(status => status.key === order.deliveryStatus);

    return (
        <div className='order-model-details-container'>
            <h2>Order Details</h2>
            {order ? (
                <div className='order-histroy-details-container'>
                    <div className='order-histroy-table-container'>
                        <h3>Order Items</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Name</th>
                                    <th>Category Name</th>
                                    <th>Quantity</th>
                                    <th>Price per Unit</th>
                                    <th>Type</th> {/* Added column for sType */}
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(order.orderData || []).map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.food.name || 'NA'}</td>
                                        <td>{item.food.categoryName || 'NA'}</td>
                                        <td>{item.quantity || 'NA'}</td>
                                        <td>${item.price || 'NA'}</td>
                                        <td>{item.stype || 'NA'}</td> {/* Added display for sType */}
                                        <td>${(item.quantity * item.price).toFixed(2) || 'NA'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='order-details'>
                        <span className='order-detail'><strong>Order ID:</strong> {order.orderId}</span>
                        <p className='order-detail'><strong>Order Date:</strong> {order.orderDate || 'NA'}</p>
                        <p className='order-detail'><strong>Delivery Date:</strong> {order.deliveryDate || 'NA'}</p>
                        <p className='order-detail'><strong>Delivery Status:</strong> {order.deliveryStatus || 'NA'}</p>
                        <p className='order-detail order-total-price'><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                    </div>

                    <br />
                    <div className='delivery-status-order-history'>
                        {statuses.map((status, index) => (
                            <React.Fragment key={status.key}>
                                <div
                                    className={`delivery-status-order-point ${currentStatusIndex === index ? 'active' : ''}`}
                                    style={{ color: status.color }}
                                >
                                    {status.icon}
                                    <center><p>{status.key}</p></center>
                                </div>
                                {index < statuses.length - 1 && (
                                    <div
                                        className='delivery-status-horizontal-line delivery-status-default-line'
                                        style={{ backgroundColor: currentStatusIndex >= index ? status.color : '#ccc' }}
                                    ></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No order selected.</p>
            )}
        </div>
    );
}

export default Order;
