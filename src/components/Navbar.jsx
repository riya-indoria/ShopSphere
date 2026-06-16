import { Link } from "react-router-dom";

function Navbar({
  search,
  setSearch,
  darkMode,
  setDarkMode,
  wishlist
}) {
  function addToWishlist() {

  const exists = wishlist.find(
    item => item.id === product.id
  );

  if (exists) {

    setWishlist(
      wishlist.map(item =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

  } else {

    setWishlist([
      ...wishlist,
      {
        ...product,
        quantity: 1
      }
    ]);

  }

}
  return (
    <nav className="sticky z-10 top-0 bg-white shadow-md px-8 py-4 flex items-center justify-between gap-6 flex-wrap">

      {/* Logo */}
      <Link to="/">
        <h1 className="text-3xl font-bold text-blue-600">
          ShopSphere
        </h1>
      </Link>

      {/* Search Bar */}
     <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className={`
    px-5
    py-2
    w-80
    rounded-full
    outline-none
    transition
    border border-gray-800
    ${
      darkMode
        ? "bg-gray-700 text-white border border-gray-500 placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
        : "bg-white text-black border border-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
    }
  `}
/>

      {/* Buttons */}
      <div className="flex items-center gap-4">
<Link to="/cart">
        <button onClick={addToWishlist}
          className="
            bg-green-500
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-green-600
            transition
            cursor-pointer
          "
        >
          ❤️ {wishlist.length}
        </button>
          </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
            bg-gray-800
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-black
            transition
            cursor-pointer
          "
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

       <Link to="/auth">
  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
    Sign In
  </button>
</Link>
      </div>
    </nav>
  );
}

export default Navbar;