import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Cart({
  cartItems,
  setCartItems,
  darkMode,
  setDarkMode,
}) {

  const navigate = useNavigate();

  function removeItem(id) {
    setCartItems(
      cartItems.filter(
        (item) => item.id !== id
      )
    );
  }

  function increaseQty(id) {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQty(id) {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * (item.quantity || 1),
    0
  );

  function handleCheckout() {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {

      localStorage.setItem(
        "redirectAfterLogin",
        "/checkout"
      );

      Swal.fire({
        icon: "warning",
        title: "Please Sign In First",
        text: "You need to sign in to continue.",
      }).then(() => {
        navigate("/auth");
      });

    } else {

      navigate("/checkout");

    }

  }

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
        wishlist={cartItems}
      />

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (

          <h2>Your cart is empty.</h2>

        ) : (

          <>
            {cartItems.map((item) => (

              <div
                key={item.id}
                className={`flex items-center gap-6 p-5 rounded-xl shadow mb-6 ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-white"
                }`}
              >

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 object-contain"
                />

                <div className="flex-1">

                  <h2 className="font-semibold">
                    {item.title}
                  </h2>

                  <p className="text-green-600 text-xl mt-2">
                    ${item.price}
                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <button
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                    className="
                      bg-gray-300
                      px-3
                      py-1
                      rounded
                      text-black
                      cursor-pointer
                    "
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQty(item.id)
                    }
                    className="
                      bg-gray-300
                      px-3
                      py-1
                      rounded
                      text-black
                      cursor-pointer
                    "
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    cursor-pointer
                  "
                >
                  Remove
                </button>

              </div>

            ))}

            <div className="mt-10 text-right">

              <h2 className="text-3xl font-bold">
                Total: ${total.toFixed(2)}
              </h2>

              <button
                onClick={handleCheckout}
                className="
                  mt-6
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-8
                  py-3
                  rounded-xl
                  cursor-pointer
                "
              >
                Checkout
              </button>

            </div>

          </>

        )}

      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Cart;