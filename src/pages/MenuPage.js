import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./MenuPage.css";

// Define foodItems and itemsPerPage at the top
const foodItems = [
  
    { id: 1, name: "Vegan Biryani", category: "Main Course", price: 400, isVeg: true, isVegan: true, isGlutenFree: false, popularity: 4, recipe: "Cook rice, add veggies and spices.", image: "https://yummyindiankitchen.com/wp-content/uploads/2018/01/quick-vegetable-biryani-veg-biryani-in-cooker-pressure-cooker-biryani-easy-biryani-1024x683.jpg", speciality: "Spicy" },
    { id: 2, name: "Paneer Butter Masala", category: "Main Course", price: 350, isVeg: true, isVegan: false, isGlutenFree: true, popularity: 5, recipe: "Cook paneer in rich gravy.", image: "https://tse1.mm.bing.net/th?id=OIP.VMubogAQMrrpCuVPkoNQggAAAA&pid=Api&P=0&h=180", speciality: "Mild" },
    { id: 3, name: "Pepperoni Pizza", category: "Main Course", price: 450, isVeg: false, isVegan: false, isGlutenFree: false, popularity: 3, recipe: "Prepare dough, add pepperoni, bake.", image: "https://tse1.mm.bing.net/th?id=OIP.EQd-T0B2jyUkL_hHcQUfgAHaE8&pid=Api&P=0&h=180", speciality: "Spicy" },
    { id: 4, name: "Vegan Pizza", category: "Main Course", price: 400, isVeg: true, isVegan: true, isGlutenFree: true, popularity: 4, recipe: "Prepare dough, add veggies, bake.", image: "https://tse2.mm.bing.net/th?id=OIP.CITwoW7PX8TdSXyeTFNr6QHaFj&pid=Api&P=0&h=180", speciality: "Mild" },
    { id: 5, name: "Chocolate Cake", category: "Dessert", price: 300, isVeg: true, isVegan: false, isGlutenFree: false, popularity: 5, recipe: "Mix chocolate and flour, bake.", image: "https://www.labonelfinebaking.shop/wp-content/uploads/2021/02/CLASSIC-CHOCOLATE-CAKE-600x600.jpg", speciality: "Sweet" },
    { id: 6, name: "Gluten-Free Cheesecake", category: "Dessert", price: 350, isVeg: true, isVegan: false, isGlutenFree: true, popularity: 4, recipe: "Make cheesecake with gluten-free base.", image: "https://thetoastedpinenut.com/wp-content/uploads/2019/08/cheesecake-4.jpg", speciality: "Sweet" },
    { id: 7, name: "Mushroom Risotto", category: "Main Course", price: 380, isVeg: true, isVegan: false, isGlutenFree: true, popularity: 4, recipe: "Cook rice with mushrooms and spices.", image: "https://hips.hearstapps.com/del.h-cdn.co/assets/17/35/1504128527-delish-mushroom-risotto.jpg", speciality: "Savory" },
    { id: 8, name: "Veg Burger", category: "Main Course", price: 250, isVeg: true, isVegan: false, isGlutenFree: false, popularity: 5, recipe: "Grill veggies, assemble in a bun.", image: "http://www.archanaskitchen.com/images/archanaskitchen/World_Sandwiches_Burgers_Wraps/Roasted_Vegetable_Burger_Recipe_with_Hummus-1.jpg", speciality: "Savory" },
    { id: 9, name: "Spaghetti Aglio e Olio", category: "Main Course", price: 350, isVeg: true, isVegan: true, isGlutenFree: false, popularity: 5, recipe: "Cook spaghetti with garlic, chili, and olive oil.", image: "https://theplantbasedschool.com/wp-content/uploads/2021/06/aglio-olio-1.jpg", speciality: "Spicy" },
    { id: 10, name: "Vegan Tacos", category: "Main Course", price: 270, isVeg: true, isVegan: true, isGlutenFree: false, popularity: 4, recipe: "Prepare tacos with veggie fillings.", image: "https://media.self.com/photos/5f1eef2914b005b8d8eba4d0/master/pass/30-Minute-Roasted-Vegetable-Tacos-with-Chimichurri-BIG-flavor-satisfying-HEALTHY-vegan-glutenfree-plantbased-tacos-chimichurri-cauliflower-minimalistbaker-recipe-6.jpg", speciality: "Mild" }
  ];
  

const itemsPerPage = 10;

const MenuPage = () => {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterVeg, setFilterVeg] = useState("All");
  const [filterVegan, setFilterVegan] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [itemsToShow, setItemsToShow] = useState(itemsPerPage);
  const [cart, setCart] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [priceError, setPriceError] = useState("");

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory =
      filterCategory === "All" || item.category === filterCategory;
    const matchesVeg =
      filterVeg === "All" ||
      (filterVeg === "Veg" && item.isVeg) ||
      (filterVeg === "Non-Veg" && !item.isVeg);
    const matchesVegan = !filterVegan || item.isVegan;
    const matchesGlutenFree = !filterGlutenFree || item.isGlutenFree;
    const matchesPrice =
      item.price >= priceRange[0] && item.price <= priceRange[1];

    return (
      matchesCategory &&
      matchesVeg &&
      matchesVegan &&
      matchesGlutenFree &&
      matchesPrice
    );
  });

  const loadMoreItems = () => {
    if (itemsToShow < filteredItems.length) {
      setItemsToShow((prev) => prev + itemsPerPage);
    }
  };

  const handleOrder = (item) => {
    const confirmOrder = window.confirm(
      `Do you want to order ${item.name}?`
    );
    if (confirmOrder) {
      setCart((prevCart) => [...prevCart, item]);
      setConfirmationMessage(`${item.name} has been added to the cart!`);
      setTimeout(() => {
        setConfirmationMessage("");
      }, 2000);
    }
  };

  const handleAddToCart = (item) => {
    const confirmAddToCart = window.confirm(
      `Do you want to add ${item.name} to your cart?`
    );
    if (confirmAddToCart) {
      setCart((prevCart) => [...prevCart, item]);
      setConfirmationMessage(`${item.name} added to cart!`);
      setTimeout(() => {
        setConfirmationMessage("");
      }, 2000);
    }
  };

  const openModal = (item) => {
    setModalData(item);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value, 10);
  
    if (type === "min") {
      if (value > priceRange[1]) {
        setPriceError("Min price cannot be greater than Max price.");
      } else {
        setPriceError("");
        setPriceRange([value, priceRange[1]]);
      }
    } else if (type === "max") {
      if (value < priceRange[0]) {
        // Automatically adjust maxPrice to be equal to minPrice
        setPriceRange([priceRange[0], priceRange[0]]);
        setPriceError("Max price cannot be less than Min price.");
      } else {
        setPriceError("");
        setPriceRange([priceRange[0], value]);
      }
    }
  };
  

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>

      {/* Filters Section */}
      <div className="filters">
        <div>
          <label>Category:</label>
          <select
            onChange={(e) => setFilterCategory(e.target.value)}
            value={filterCategory}
          >
            <option value="All">All</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        <div>
          <label>Type:</label>
          <select
            onChange={(e) => setFilterVeg(e.target.value)}
            value={filterVeg}
          >
            <option value="All">All</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        <div>
          <label>Vegan:</label>
          <input
            type="checkbox"
            checked={filterVegan}
            onChange={(e) => setFilterVegan(e.target.checked)}
          />
        </div>

        <div>
          <label>Gluten-Free:</label>
          <input
            type="checkbox"
            checked={filterGlutenFree}
            onChange={(e) => setFilterGlutenFree(e.target.checked)}
          />
        </div>

        <div>
          <label>Price Range:</label>
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, "min")}
          />
          -
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, "max")}
          />
        </div>

        {priceError && <div className="price-error">{priceError}</div>}
      </div>

      {/* Menu Items with Lazy Loading */}
      <InfiniteScroll
        dataLength={itemsToShow}
        next={loadMoreItems}
        hasMore={itemsToShow < filteredItems.length}
        loader={<h4>Loading more items...</h4>}
      >
        <div className="menu-items">
          {filteredItems.slice(0, itemsToShow).map((item) => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price.toFixed(2)}</p>

              <div className="buttons">
                <button
                  className="order-button"
                  onClick={() => handleOrder(item)}
                >
                  Order
                </button>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>

              {/* More Details Link */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openModal(item);
                }}
                style={{ color: "blue", textDecoration: "underline" }}
              >
                More Details
              </a>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      {/* Confirmation Message */}
      {confirmationMessage && (
        <div className="confirmation-message">{confirmationMessage}</div>
      )}

      {/* Place Order Button */}
      <button className="place-order" onClick={() => alert("Order placed!")}>
        Place Order
      </button>

      {/* Modal for More Details */}
      {modalData && (
        <div className="modal">
          <div className="modal-content">
            <h3>{modalData.name}</h3>
            <p>Price: ₹{modalData.price}</p>
            <p>Recipe: {modalData.recipe}</p>
            <p>Speciality: {modalData.speciality}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
