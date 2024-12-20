import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ toggleTheme, currentTheme }) {
  return (
    <header className="header">
      <h1>Delicious Eats</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
      <button className="theme-toggle" onClick={toggleTheme}>
        {currentTheme === "light" ? "Dark Mode 🌙" : "Light Mode ☀️"}
      </button>
    </header>
  );
}

export default Header;
