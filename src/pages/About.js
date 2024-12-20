import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <div className="about-content">
        <p>
          Welcome to <strong>Delicious Eats</strong>! We are passionate about crafting mouth-watering dishes
          that bring joy to your table. Our mission is to deliver not just food but an unforgettable dining experience.
        </p>
        <h2>Our Story</h2>
        <p>
          Established in 2024, Delicious Eats began as a small family-owned restaurant. Over the years, we’ve
          grown into a beloved destination for food lovers. Thanks to our loyal customers, we continue to expand and innovate.
        </p>
        <h2>Meet Our Team</h2>
        <p>
          Behind every dish is a team of talented chefs and friendly staff who work tirelessly to make your experience special. 
          We believe in the power of food to bring people together, and we’re honored to serve you.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our goal is simple: to provide delicious, high-quality food that satisfies every craving, from comfort classics to 
          innovative new flavors. Whether dining in or ordering from the comfort of your home, we strive to make every meal memorable.
        </p>
      </div>
    </div>
  );
};

export default About;
