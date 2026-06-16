import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home({
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

    useEffect(() => {
  const interval = setInterval(() => {
    document.querySelector(".btn-next")?.click();
  }, 3000);

  return () => clearInterval(interval);
}, []);
  return (
    <div
      className={`min-h-screen ${darkMode
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

      <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img
      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000&q=80"
      className="w-full h-96 object-cover"
      alt=""
    />

    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle btn-next">❯</a>
    </div>
  </div>

  <div id="slide2" className="carousel-item relative w-full">
    <img
      src="https://images.unsplash.com/photo-1601802126876-6a3575905ab1?w=2000&auto=format&fit=crop&q=100"
      className="w-full h-96 object-cover"
      alt=""
    />

    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle btn-next">❯</a>
    </div>
  </div>

  <div id="slide3" className="carousel-item relative w-full">
    <img
      src="https://images.unsplash.com/photo-1559563458-527698bf5295?w=2400&auto=format&fit=crop&q=100"
      className="w-full h-96 object-cover"
      alt=""
    />

    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide4" className="btn btn-circle btn-next">❯</a>
    </div>
  </div>
  <div id="slide4" className="carousel-item relative w-full">
    <img
      src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=2400&auto=format&fit=crop&q=100"
      className="w-full h-96 object-cover"
      alt=""
    />

    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle btn-next">❯</a>
    </div>
  </div>
</div>



      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <h2 className="text-3xl font-bold mb-8">
          Featured Products
        </h2>

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

export default Home;