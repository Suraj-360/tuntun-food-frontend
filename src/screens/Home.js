import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.js';
import Card from '../components/Card.js';
import './Home.css';
import noDataImage from '../assets/3009287.jpg';
import Footer from '../components/Footer.js'

function Home() {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shuffleArray = (array) => {
    if (!Array.isArray(array) || array.length < 2) return;
  
    const shuffledArray = [...array];
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    return shuffledArray;
  };
  

  const loadData = async () => {
    try {
      console.log(process.env.BACKEND_URL);
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/app/v1/foodData/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Network response was not ok' + response.status);

      const jsonResponse = await response.json();
      const shuffledArray = shuffleArray(jsonResponse.data[1] || []);
      setFoodCategory(shuffledArray || []);
      setFoodItems(jsonResponse.data[0] || []);
      
    } catch (error) {
      setError('Failed to load data' + error.message);
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
        {foodCategory.length > 0 ? (
          foodCategory.map((category) => (
            <div key={category._id}>
              <div className="type-container">
                <h2>{category.categoryName}</h2>
              </div>
              <hr />
              <div className="grid-container">
                {foodItems.length > 0 ? (
                  foodItems
                    .filter((item) => item.categoryName.includes(category.categoryName))
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
                  <h3>No items available</h3>
                )}

              </div>
            </div>
          ))
        ) : (
          <div className="no-data-available">
            <img src={noDataImage} alt="No Data" />
            <h2>No data available</h2>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
