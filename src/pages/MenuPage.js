import React, { useState } from "react";
import "./MenuPage.css";

const menuData = [
  {
    id: 1,
    name: "Chocolate Cake",
    price: 12.99,
    category: "Desserts",
    image: "https://stephaniessweets.com/wp-content/uploads/2020/05/IMG_0243.jpg",
  },
  {
    id: 2,
    name: "Vanilla Cheesecake",
    price: 10.99,
    category: "Desserts",
    image: "https://tse1.mm.bing.net/th?id=OIP.Uv4vFEOyAldfzaIsuMsI7gHaE8&pid=Api&P=0&h=180",
  },
  {
    id: 3,
    name: "Strawberry Shortcake",
    price: 9.99,
    category: "Desserts",
    image: "https://tse3.mm.bing.net/th?id=OIP.AYPqM2dNyWb0W7ep8fPbWgHaJ4&pid=Api&P=0&h=180",
  },
  {
    id: 4,
    name: "Carrot Cake",
    price: 8.99,
    category: "Desserts",
    image: "https://charlotteslivelykitchen.com/wp-content/uploads/2019/11/carrot-cake-3.jpg",
  },
];

const MenuPage = () => {
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState([]);

  // Filtered menu items based on the selected category
  const filteredMenu = filter === "All" ? menuData : menuData.filter((item) => item.category === filter);

  // Add item to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to the cart!`);
  };

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>
      <div className="filter-section">
        <label>Filter by Category:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Desserts">Desserts</option>
        </select>
      </div>

      <div className="menu-items">
        {filteredMenu.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <h3>{item.name}</h3>
            <p>Price: ${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
