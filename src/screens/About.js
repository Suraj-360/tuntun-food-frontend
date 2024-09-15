import React from 'react'
import NavBar from '../components/NavBar.js'
import './About.css';
import mangal from '../assets/mangal.png'
import kirmada from '../assets/kirmada.png'
import chipkali from '../assets/chipkali.png'
import chudail from '../assets/chudail.png'
import chutki from '../assets/chutki.png'
import kalia from '../assets/kalia.png'
import tuntun from '../assets/team.png'
import Footer from '../components/Footer.js';


function About() {
  return (
    <div className='about-main-container'>
      <NavBar />
      <div className="about-us">
        <header className="about-us-header">
          <h1>Welcome to Tuntuns Food</h1>
          <p>Where Tradition Meets Taste</p>
        </header>
        <section className="about-us-content">
          <div className="about-us-text">
            <h2>Our Story</h2>
            <p>
              Tuntuns Food began with a simple mission: to bring the authentic
              flavors of traditional cuisine to your table. Our journey started
              in a small kitchen with recipes passed down through generations.
              Today, we continue to honor our heritage by using the freshest
              ingredients and time-tested cooking methods to create dishes that
              are as rich in flavor as they are in history.
            </p>
            <h2>Our Values</h2>
            <p>
              At Tuntuns Food, we believe in the power of food to bring people
              together. Whether it's a family dinner or a festive celebration,
              our dishes are crafted with love and care to ensure every bite
              is a moment to savor. We are committed to sustainability,
              sourcing our ingredients locally, and supporting our community.
            </p>
            <h2>Why Choose Us?</h2>
            <ul>
              <li>Authentic flavors from traditional recipes</li>
              <li>Fresh, high-quality ingredients</li>
              <li>Commitment to sustainability and community</li>
              <li>Exceptional customer service</li>
            </ul>
          </div>
          <div className="about-us-image">
            <img src={tuntun} alt="Our Team" />
          </div>
        </section>
      </div>

      <div className='cards-container-about-us'>

        <div className='card-about-us'>
          <div>
            <p>"Hey, Bheem has ruined me by eating Tuntun Mausi's ladoos! I don't even have time to be a daku anymore. He beats me
              up and eats all the ladoos, and now everyone wants Tuntun's ladoos. Someone, please stop Bheem!"</p>
            <br />
            <h4>Daku Mangal Singh</h4>
          </div>
          <img src={mangal}></img>
        </div>

        <div className='card-about-us'>
          <div>
            <p>"As the Asura king, my strength has always been my pride. But Bheem, empowered by Tuntun Mausi's ladoos, has repeatedly
              challenged and defeated me. Each loss chips away at my honor. How long can I endure this struggle against him?"</p>
            <br />
            <h4>Kirmada</h4>
          </div>
          <img src={kirmada}></img>
        </div>

        <div className='card-about-us'>
          <div>
            <p>"Chip dama dam dam! Bheem has outsmarted me at every turn. Not only did he foil my plans, but after eating Tuntun Mausi's
              ladoos, he's become even stronger. Now, even my ‘Chip dama dam dam’ has lost its power against him!"</p>
            <br />
            <h4>Chipkali</h4>
          </div>
          <img src={chipkali}></img>
        </div>

        <div className='card-about-us'>
          <div>
            <p>"Bheem’s strength is my greatest challenge. Even with my dark magic, I can’t defeat him. Since he started eating Tuntun
              Mausi’s ladoos, his power has only grown. How do I overpower someone so invincible?"</p>
            <br />
            <h4>Chandramukhi Chudail</h4>
          </div>
          <img src={chudail}></img>
        </div>

        <div className='card-about-us'>
          <div>
            <p>"I keep Bheem well-fed with Tuntun Mausi’s ladoos so he stays strong and, of course, by my side. After all, I’d rather he’s
              full of ladoos and thinking of me than getting distracted by Rani Indumati!"</p>
            <br />
            <h4>Chutki</h4>
          </div>
          <img src={chutki}></img>
        </div>

        <div className='card-about-us'>
          <div>
            <p>“I tried to steal Tuntun Mausi’s ladoos once. Big mistake! I ended up with a bellyache and a very angry Mausi on my tail.
              Her ladoos are so delicious that even my worst plans can’t compete with them. Note to self: Never mess with ladoos or Mausi!”</p>
            <br />
            <h4>Kalia</h4>
          </div>
          <img src={kalia}></img>
        </div>

      </div>

      <div className="zigzag">
        <div className="zigzag-container">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#00f', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#0ff', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path
              d="M0 30 Q 20 0, 40 30 T 80 30 T 120 30 T 160 30 T 200 30 T 240 30 T 280 30 T 320 30 T 360 30 T 400 30 T 440 30 T 480 30 T 520 30 T 560 30 T 600 30 T 640 30 T 680 30 T 720 30 T 760 30 T 800 30 T 840 30 T 880 30 T 920 30 T 960 30 T 1000 30 T 1040 30 T 1080 30 T 1120 30 T 1160 30 T 1200 30"
              stroke="url(#blue-gradient)"
              fill="transparent"
              strokeWidth="15"
            />
          </svg>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default About