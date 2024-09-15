import React, { useState, useEffect } from 'react';
import './Card.css';
import { useCart, useDispatchCart } from './ContextReducer';
import { FaCartPlus } from "react-icons/fa";

function Card(props) {
    const { id, name, img, description, options = [{}] } = props;

    const initialType = Object.keys(options[0])[0];
    const initialPrice = parseFloat(options[0][initialType]) || 0;

    const [selectedType, setSelectedType] = useState(initialType);
    const [pricePerUnit, setPricePerUnit] = useState(initialPrice);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(initialPrice * selectedQuantity);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatchCart();
    const data = useCart();

    const handleAddToCart = async () => {
        setIsLoading(true);
        const existingItemIndex = data.findIndex(item => item.id === id && item.stype === selectedType);

        if (existingItemIndex !== -1) {
            const updatedQuantity = parseInt(data[existingItemIndex].quantity) + selectedQuantity;
            const updatedTotalPrice = (parseFloat(data[existingItemIndex].price) + parseFloat(totalPrice)).toFixed(2);

            await dispatch({
                type: "UPDATE",
                index: existingItemIndex,
                quantity: updatedQuantity,
                price: updatedTotalPrice
            });
        } else {
            await dispatch({
                type: "ADD",
                id: id,
                name: name,
                stype: selectedType,
                quantity: selectedQuantity,
                price: parseFloat(totalPrice).toFixed(2)
            });
        }
        setTimeout(() => {
            setIsLoading(false);
          }, 100);
    };


    useEffect(() => {
        if (selectedType) {
            const price = parseFloat(options[0][selectedType]) || 0;
            setPricePerUnit(price);
            updateTotalPrice(price, selectedQuantity);
        }
    }, [selectedType, options]);

    useEffect(() => {
        updateTotalPrice(pricePerUnit, selectedQuantity);
    }, [selectedQuantity]);

    const types = Object.keys(options[0] || {});

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setSelectedQuantity(parseInt(event.target.value));
    };

    const updateTotalPrice = (pricePerUnit, quantity) => {
        const total = parseFloat(pricePerUnit) * parseInt(quantity);
        setTotalPrice(total.toFixed(2));
    };

    const quantityOptions = [1, 2, 3, 5, 6, 7].map(num => (
        <option key={num} value={num}>
            {num}
        </option>
    ));

    return (
        <div className='card-container'>
            <div className='image-container'>
                <img src={img} alt={name} />
            </div>
            <div className='item-options items-name'>
                <h2>{name}</h2>
            </div>
            <div className='item-options'>
                <p>{description}</p>
            </div>
            <div className='item-options'>
                <div className='item-type opt'>
                    <h4>Type:</h4>
                    <select id='type' onChange={handleTypeChange} value={selectedType}>
                        {types.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='item-quantity opt'>
                    <h4>Price: &#8377;</h4>
                    <span id='price'> {totalPrice}</span>
                </div>
            </div>
            <div className='item-options'>
                <h4>Quantity:</h4>
                <select value={selectedQuantity} onChange={handleQuantityChange}>
                    {quantityOptions}
                </select>
            </div>
            <button className='add-to-cart-btn' onClick={handleAddToCart} disabled={isLoading}>
                {isLoading ? <span className="card-add-item-icon-loader"><FaCartPlus /></span> :<>Add To Cart <FaCartPlus /></> }
            </button>
        </div>
    );
}

export default Card;
