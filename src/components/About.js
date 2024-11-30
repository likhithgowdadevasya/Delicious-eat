import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <div className="about-content">
        <p>
          Welcome to <strong>Delicious Eats</strong>! We are passionate about
          crafting mouth-watering dishes that bring joy to your table. Our mission is
          to deliver not just food but an unforgettable dining experience, whether
          you’re visiting us or enjoying our meals at home.
        </p>
        <p>
          At Delicious Eats, we pride ourselves on using the freshest ingredients
          and the most innovative recipes to serve you. From classic favorites to
          creative new dishes, every item on our menu is made with love and care.
        </p>
        <h2>Our Story</h2>
        <p>
          Established in 2024, Delicious Eats began as a small family-owned
          restaurant. Over the years, we’ve grown into a beloved destination for
          food lovers in the community. Thanks to our loyal customers, we continue
          to expand and innovate.
        </p>
        <h2>Meet the Team</h2>
        <p>
          Behind the scenes, our dedicated chefs and friendly staff work tirelessly
          to make every meal special. We believe in the power of good food to bring
          people together, and we’re thrilled to share our passion with you.
        </p>
      </div>
    </div>
  );
};

export default About;
