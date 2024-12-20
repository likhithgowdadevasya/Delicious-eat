import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./OrderPage.css";

// Sample menu items (replace with actual data or fetch from an API)
const foodItems = [
  { id: 1, name: "Vegan Biryani", category: "Main Course", price: 400, image: "https://example.com/vegan-biryani.jpg" },
  { id: 2, name: "Paneer Butter Masala", category: "Main Course", price: 350, image: "https://example.com/paneer-butter-masala.jpg" },
  { id: 3, name: "Pepperoni Pizza", category: "Main Course", price: 450, image: "https://example.com/pepperoni-pizza.jpg" },
  { id: 4, name: "Vegan Pizza", category: "Main Course", price: 400, image: "https://example.com/vegan-pizza.jpg" },
  { id: 5, name: "Chocolate Cake", category: "Dessert", price: 300, image: "https://example.com/chocolate-cake.jpg" },
  { id: 6, name: "Gluten-Free Cheesecake", category: "Dessert", price: 350, image: "https://example.com/gluten-free-cheesecake.jpg" },
];

const ingredients = [
  { name: "Mushrooms", price: 30 },
  { name: "Olives", price: 20 },
  { name: "Extra Cheese", price: 50 },
  { name: "Spinach", price: 40 },
];

const OrderPage = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [quantity, setQuantity] = useState(1); // State to manage the quantity
  const [size, setSize] = useState("Medium"); // State to manage size
  const [selectedIngredients, setSelectedIngredients] = useState([]); // State for selected ingredients
  const [totalPrice, setTotalPrice] = useState(0); // State to manage the total price
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []); // Load cart from localStorage

  // Find the selected food item based on the id from the URL
  const selectedItem = foodItems.find(item => item.id === parseInt(id));

  if (!selectedItem) {
    return <div>Item not found!</div>;
  }

  useEffect(() => {
    // Update the total price whenever quantity, size, or ingredients change
    const sizeMultiplier = size === "Large" ? 1.5 : size === "Small" ? 0.75 : 1;
    const ingredientsPrice = selectedIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
    const basePrice = selectedItem.price * sizeMultiplier;
    setTotalPrice((basePrice + ingredientsPrice) * quantity);
  }, [quantity, size, selectedIngredients, selectedItem]);

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients(prevState => {
      if (prevState.includes(ingredient)) {
        return prevState.filter(i => i !== ingredient);
      } else {
        return [...prevState, ingredient];
      }
    });
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    const itemInCart = cart.find(item => item.id === selectedItem.id && item.size === size && item.selectedIngredients === selectedIngredients);
    
    if (itemInCart) {
      // Update existing cart item
      const updatedCart = cart.map(item =>
        item.id === selectedItem.id && item.size === size && item.selectedIngredients === selectedIngredients
          ? { ...item, quantity: item.quantity + quantity, totalPrice: item.totalPrice + totalPrice }
          : item
      );
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([
        ...cart,
        { ...selectedItem, size, quantity, selectedIngredients, totalPrice },
      ]);
    }
  };

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item)); // Storing the dragged item data
  };

  const handleDrop = (e) => {
    const draggedItem = JSON.parse(e.dataTransfer.getData("item"));
    setCart(prevCart => [...prevCart, draggedItem]);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow dropping
  };

  return (
    <div className="order-page">
      {/* Item details */}
      <div className="item-details" onDragOver={handleDragOver} onDrop={handleDrop}>
        <img src={selectedItem.image} alt={selectedItem.name} />
        <div className="item-info">
          <h2>{selectedItem.name}</h2>
          <p>Category: {selectedItem.category}</p>
          <p>Price: ₹{selectedItem.price}</p>

          {/* Size selection */}
          <div className="size">
            <label>Size:</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          {/* Ingredients selection */}
          <div className="ingredients">
            <h4>Ingredients (Add your toppings):</h4>
            {ingredients.map((ingredient) => (
              <label key={ingredient.name}>
                <input
                  type="checkbox"
                  onChange={() => handleIngredientChange(ingredient)}
                />
                {ingredient.name} (+₹{ingredient.price})
              </label>
            ))}
          </div>

          {/* Quantity selection */}
          <div className="quantity">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>

          <div className="total-price">
            <h3>Total: ₹{totalPrice}</h3>
          </div>

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

      {/* Cart Section */}
      <div className="cart">
        <h3>Cart (Drag items here to add)</h3>
        {cart.length > 0 ? (
          <div>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} (x{item.quantity}) - ₹{item.totalPrice} - Size: {item.size} - Ingredients: {item.selectedIngredients.map(i => i.name).join(", ")}
                </li>
              ))}
            </ul>
            <Link to="/checkout">
              <button className="checkout-button">Proceed to Checkout</button>
            </Link>
          </div>
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
