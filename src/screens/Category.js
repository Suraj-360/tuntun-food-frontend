import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.js';
import Card from '../components/Card.js';
import './Home.css';
import noDataImage from '../assets/3009287.jpg';
import Footer from '../components/Footer.js'
import { useLocation } from 'react-router-dom';

function Category() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const [error, setError] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const category = queryParams.get('category');

    const loadData = async () => {
        try {
            
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/v1/foodData/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const jsonResponse = await response.json();
            setFoodItems(jsonResponse.data[0] || []);

        } catch (error) {
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="loader-main">
                <div className="loader-home-page"></div>
                <div className="loading-child">
                    <h4>Loading</h4>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{":-( "}Error: {error}</div>;
    }

    return (
        <div className="home-container">
            <NavBar />
            <div className="main-items-container">
                <div className="grid-container">
                    {
                        foodItems.length > 0 ? (
                            foodItems
                                .filter((item) => item.categoryName.includes(category))
                                .map((filteredItem) => (
                                    <Card
                                        key={filteredItem._id}
                                        id={filteredItem._id}
                                        name={filteredItem.name}
                                        img={filteredItem.img}
                                        options={filteredItem.options}
                                        description={filteredItem.description}
                                    />
                                ))
                        ) : (
                            <div className="no-data-available">
                                <img src={noDataImage} alt="No Data" />
                                <h2>No data available</h2>
                            </div>
                        )}

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Category