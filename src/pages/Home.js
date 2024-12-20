import React, { useState } from "react";
import "./Home.css";

// Sample menu items (replace with your actual data)
const foodItems = [
  { id: 1, name: "Vegan Biryani", price: 400, image: "https://yummyindiankitchen.com/wp-content/uploads/2018/01/quick-vegetable-biryani-veg-biryani-in-cooker-pressure-cooker-biryani-easy-biryani-1024x683.jpg" },
  { id: 2, name: "Paneer Butter Masala", price: 350, image: "https://tse1.mm.bing.net/th?id=OIP.VMubogAQMrrpCuVPkoNQggAAAA&pid=Api&P=0&h=180" },
  { id: 3, name: "Pepperoni Pizza", price: 450, image: "https://tse1.mm.bing.net/th?id=OIP.EQd-T0B2jyUkL_hHcQUfgAHaE8&pid=Api&P=0&h=180" },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items state
  const [cart, setCart] = useState([]); // Cart state
  const [orderPlaced, setOrderPlaced] = useState(false); // Order status state

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query) {
      const results = foodItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  };

  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const handlePlaceOrder = () => {
    if (cart.length > 0) {
      setOrderPlaced(true);
      setCart([]);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Delicious Eats!</h1>
        <p>Your go-to place for mouth-watering dishes and exceptional service.</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for your favorite dish..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Filtered Menu Section */}
      {searchTerm && (
        <div className="filtered-menu">
          <h2>Search Results</h2>
          <div className="menu-items">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="menu-item">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </div>
              ))
            ) : (
              <p>No items found matching "{searchTerm}".</p>
            )}
          </div>
        </div>
      )}

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="cart-section">
          <h2>Cart</h2>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <p>{item.name} - ₹{item.price}</p>
              </div>
            ))}
          </div>
          <p>Total: ₹{cart.reduce((total, item) => total + item.price, 0)}</p>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}

      {/* Order Confirmation */}
      {orderPlaced && (
        <div className="order-confirmation">
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for ordering with Delicious Eats. Your food will be delivered shortly!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
