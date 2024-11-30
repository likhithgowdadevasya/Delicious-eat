import React, { useState } from "react";
import "./Menu.css";

const Menu = () => {
  const [menuItems] = useState([
    { id: 1, name: "Margherita Pizza", price: 8.99, category: "Main Course" },
    { id: 2, name: "Cheeseburger", price: 6.99, category: "Main Course" },
    { id: 3, name: "Caesar Salad", price: 5.99, category: "Starters" },
  ]);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="menu">
      <h2>Menu</h2>
      <div className="menu-items">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
