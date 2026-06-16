import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import Checkout from "./pages/Checkout";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [wishlist, setWishlist] = useState(
  JSON.parse(localStorage.getItem("cart")) || []
);

useEffect(() => {

  localStorage.setItem(
    "cart",
    JSON.stringify(wishlist)
  );

}, [wishlist]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            }
          />

          <Route
            path="/products"
            element={
              <Products
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProductDetails
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            }
          />
        <Route path="/auth" element={<Auth 
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                wishlist={wishlist}
                setWishlist={setWishlist}
        />}></Route>

        <Route
  path="/cart"
  element={
    <Cart
      cartItems={wishlist}
      setCartItems={setWishlist}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  }
/>
        <Route
  path="/checkout"
  element={
    <Checkout
      cartItems={wishlist}
      setCartItems={setWishlist}
      wishlist={wishlist}
      setWishlist={setWishlist}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  }
/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;