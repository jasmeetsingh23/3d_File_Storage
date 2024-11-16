import React from "react";
// import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-red-600 text-white p-5 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-3xl font-heading font-bold">3D Model Storage</div>
        <nav className="space-x-5">
          {/* <Link to="/upload"> */}
          <button className="bg-white text-red-600 px-6 py-2 rounded-full font-body font-medium hover:bg-red-700 hover:text-white transition-colors">
            Home
          </button>
          {/* </Link> */}
          {/* <Link to="/about"> */}
          <button className="border-2 border-white text-white px-6 py-2 rounded-full font-body font-medium hover:bg-red-700 transition-colors">
            About
          </button>
          {/* </Link> */}
        </nav>
      </div>
    </header>
  );
}

export default Header;
