import { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Auth({
  darkMode,
  setDarkMode,
  wishlist
}) {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.name)
    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Details",
        text: "Please fill all fields.",
      });
      return;
    }

    if (isLogin) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (
  user &&
  user.email === formData.email &&
  user.password === formData.password
) {
  Swal.fire({
    icon: "success",
    title: "Login Successful!",
  }).then(() => {

    const redirectPage =
      localStorage.getItem("redirectAfterLogin");

    if (redirectPage) {
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectPage);
    } else {
      navigate("/");
    }

  });
} else {
  Swal.fire({
    icon: "error",
    title: "Invalid Email or Password",
  });
}
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify(formData)
      );

      Swal.fire({
        icon: "success",
        title: "Account Created Successfully!",
      });

      setIsLogin(true);
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  }
  const navigate = useNavigate();
  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <Navbar
        search=""
        setSearch={() => {}}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        wishlist={wishlist}
      />

      <div className="max-w-md mx-auto p-8">
        <div
          className={`rounded-xl shadow-lg p-8 ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            {isLogin ? "Sign In" : "Sign Up"}
          </h1>

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4 text-black"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 text-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-6 text-black"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg cursor-pointer"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>

          <p className="text-center mt-6">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 ml-2 font-semibold cursor-pointer"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Auth;