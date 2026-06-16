import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Products({
  darkMode,
  setDarkMode,
  wishlist,
  setWishlist,
}) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(
        "https://fakestoreapi.com/products"
      );

      const data = await response.json();

      setProducts(data);
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
  <div
    className={`min-h-screen ${
      darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-black"
    }`}
  >
    <Navbar
      search={search}
      setSearch={setSearch}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      wishlist={wishlist}
    />

    {/* Header */}
    <section className="text-center py-12 px-6">

      <h1 className="text-4xl font-bold mb-4">
        All Products
      </h1>

      <p
        className={`text-lg ${
          darkMode
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      >
        Explore our collection of premium products.
      </p>

    </section>

    {/* Products Grid */}
    <section className="max-w-7xl mx-auto px-6 pb-16">

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
        "
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        ))}
      </div>

    </section>

    <Footer />
  </div>
);
}

export default Products;