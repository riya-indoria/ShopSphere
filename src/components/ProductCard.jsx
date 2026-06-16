import { Link } from "react-router-dom";

function ProductCard({
  product,
  wishlist,
  setWishlist,
  darkMode
}) {

 function addToWishlist() {

  const exists = wishlist.find(
    item => item.id === product.id
  );

  if (exists) {
    
    alert("Item already added in cart")
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
    <div
      className={`
        rounded-2xl
        shadow-md
        hover:shadow-xl
        transition
        duration-300
        p-5
        flex
        flex-col
        items-center
        ${darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"}
      `}
    >

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="
          h-52
          object-contain
          mb-5
        "
      />

      {/* Title */}
      <h3
        className={`
          text-lg
          font-semibold
          text-center
          line-clamp-2
          h-14
          ${darkMode
            ? "text-white"
            : "text-gray-800"}
        `}
      >
        {product.title}
      </h3>

      {/* Price */}
      <p
        className="
          text-2xl
          font-bold
          text-green-600
          mt-4
        "
      >
       Price: ${product.price}
      </p>

      {/* Rating */}
      <p
        className="
          text-yellow-500
          mt-2
          mb-5
        "
      >
        Ratings:⭐ {product.rating.rate}
      </p>

      {/* Buttons */}
      <div className="flex gap-3 mt-auto">

        <button
          onClick={addToWishlist}
          className="
            bg-green-500
            hover:bg-green-600
            text-white
            px-4
            py-2
            rounded-lg
            transition
            cursor-pointer
          "
        >
          ❤️ Wishlist
        </button>

        <Link
          to={`/product/${product.id}`}
        >
          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4
              py-2
              rounded-lg
              transition
              cursor-pointer
            "
          >
            Details
          </button>
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;