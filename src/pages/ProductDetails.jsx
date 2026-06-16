import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
function ProductDetails({
  darkMode,
  setDarkMode,
  wishlist,
  setWishlist,
}) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(
        `https://fakestoreapi.com/products/${id}`
      );

      const data = await response.json();

      setProduct(data);
    }

    fetchProduct();
  }, [id]);

  function addToWishlist() {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      alert("Already in wishlist");
      return;
    }

    setWishlist([
      ...wishlist,
      product,
    ]);
  }

  if (!product) {
    return <h1>Loading...</h1>;
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
      wishlist={wishlist}
    />

    <div className="max-w-6xl mx-auto px-6 py-12">
      <div
        className={`flex flex-col md:flex-row gap-10 rounded-2xl shadow-lg p-8 ${
          darkMode
            ? "bg-gray-800"
            : "bg-white"
        }`}
      >
        {/* Image */}
        <div className="flex justify-center md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-2xl font-semibold text-green-600 mb-3">
           Price: ${product.price}
          </p>

          <p className="text-yellow-500 mb-4">
            Ratings:⭐ {product.rating.rate}
          </p>

          <p className="leading-7 mb-6">
            {product.description}
          </p>

          <Link to="/cart">
          <button
            onClick={addToWishlist}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg w-fit transition cursor-pointer"
          >
            🛒 Add to Cart
          </button>
          </Link>
        </div>
      </div>
    </div>

    <Footer />
  </div>
  );
}

export default ProductDetails;