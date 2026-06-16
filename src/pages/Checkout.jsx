import { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Checkout({
  darkMode,
  setDarkMode,
  wishlist,
}) {
    const navigate = useNavigate();
    
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
}

  function handleSubmit() {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Details",
        text: "Please fill all fields.",
      });
      return;
    }

    // Save data to localStorage
    localStorage.setItem(
      "checkoutData",
      JSON.stringify(formData)
    );
    Swal.fire({
  icon: "success",
  title: "Order Placed Successfully!",
  text: "Thank you for shopping with ShopSphere.",
}).then(() => {

  // Save order details
  localStorage.setItem(
    "checkoutData",
    JSON.stringify(formData)
  );

  // Clear form
  setFormData({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Clear cart
  localStorage.removeItem("cart");

  // Redirect to Home page
  navigate("/");
});
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-white"
      }`}
    >
      <Navbar
        search=""
        setSearch={() => {}}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        wishlist={wishlist}
      />

      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Checkout
        </h1>

        <div
          className={`p-8 rounded-xl shadow space-y-5 ${
            darkMode ? "bg-white-800" : "bg-white"
          }`}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded text-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded text-black"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded text-black"
          />

          <textarea
            name="address"
            rows="4"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded text-black"
          />

          <button
            onClick={handleSubmit}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              cursor-pointer
            "
          >
            Place Order
          </button>
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Checkout;