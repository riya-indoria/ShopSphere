function Footer({ darkMode }) {
  return (
    <footer
      className={`mt-16 py-10 px-6 ${
        darkMode
          ? "bg-gray-800 text-gray-300"
          : "bg-white text-gray-600"
      }`}
    >
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-blue-600">
              ShopSphere
            </h2>

            <p className="mt-2">
              Discover premium products with style.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">

            <a
              href="#"
              className="hover:text-blue-500 transition"
            >
              Home
            </a>

            <a
              href="#"
              className="hover:text-blue-500 transition"
            >
              Products
            </a>

            <a
              href="#"
              className="hover:text-blue-500 transition"
            >
              Contact
            </a>

          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-sm">
          © 2026 ShopSphere. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;