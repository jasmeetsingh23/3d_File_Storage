// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // if you are using React Router for navigation
// import {
//   FaTachometerAlt,
//   FaImage,
//   FaUpload,
//   FaCog,
//   FaFileAlt,
// } from "react-icons/fa"; // Importing icons from React Icons

// const Sidebar = () => {
//   const [isPagesOpen, setIsPagesOpen] = useState(false);

//   const togglePagesDropdown = () => {
//     setIsPagesOpen(!isPagesOpen);
//   };

//   return (
//     <div className="bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 w-64 min-h-screen p-6 text-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500">
//         Admin Panel
//       </h2>
//       <div className="flex flex-col space-y-6">
//         <Link
//           to="/"
//           className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
//         >
//           <FaTachometerAlt size={20} />
//           <span className="text-lg font-semibold">Dashboard</span>
//         </Link>
//         <Link
//           to="/designs"
//           className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
//         >
//           <FaImage size={20} />
//           <span className="text-lg font-semibold">Designs</span>
//         </Link>
//         <Link
//           to="/uploads"
//           className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
//         >
//           <FaUpload size={20} />
//           <span className="text-lg font-semibold">Uploads</span>
//         </Link>
//         <Link
//           to="/settings"
//           className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
//         >
//           <FaCog size={20} />
//           <span className="text-lg font-semibold">Settings</span>
//         </Link>

//         {/* Pages Dropdown */}
//         <div className="relative">
//           <button
//             onClick={togglePagesDropdown}
//             className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 w-full"
//           >
//             <FaFileAlt size={20} />
//             <span className="text-lg font-semibold">Pages</span>
//           </button>

//           {isPagesOpen && (
//             <div className="absolute left-0 w-full mt-2 bg-indigo-700 rounded-lg shadow-lg">
//               <Link
//                 to="/about"
//                 className="block text-white hover:bg-indigo-600 p-3 rounded-lg transition-all duration-300"
//               >
//                 About Us
//               </Link>
//               <Link
//                 to="/contact"
//                 className="block text-white hover:bg-indigo-600 p-3 rounded-lg transition-all duration-300"
//               >
//                 Contact Us
//               </Link>
//               <Link
//                 to="/faq"
//                 className="block text-white hover:bg-indigo-600 p-3 rounded-lg transition-all duration-300"
//               >
//                 FAQ
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="absolute bottom-6 left-6 text-sm">
//         <p className="text-gray-300">© 2024 Design Bullz</p>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link } from "react-router-dom"; // if you are using React Router for navigation
import {
  FaTachometerAlt,
  FaImage,
  FaUpload,
  FaCog,
  FaFileAlt,
} from "react-icons/fa"; // Importing icons from React Icons

const Sidebar = () => {
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  const togglePagesDropdown = () => {
    setIsPagesOpen(!isPagesOpen);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-900 w-64 min-h-screen p-6 text-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center mb-8">
        {/* Avatar section */}
        <img
          src="https://www.w3schools.com/w3images/avatar2.png" // Replace with your admin avatar image
          alt="Admin Avatar"
          className="w-20 h-20 rounded-full border-4 border-pink-400 mb-4"
        />
        <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500">
          Admin Panel
        </h2>
      </div>
      <div className="flex flex-col space-y-6">
        <Link
          to="/"
          className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaTachometerAlt size={20} />
          <span className="text-lg font-semibold">Dashboard</span>
        </Link>
        <Link
          to="/designs"
          className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaImage size={20} />
          <span className="text-lg font-semibold">Designs</span>
        </Link>
        <Link
          to="/uploads"
          className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaUpload size={20} />
          <span className="text-lg font-semibold">Uploads</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaCog size={20} />
          <span className="text-lg font-semibold">Settings</span>
        </Link>

        {/* Pages Dropdown */}
        <div className="relative">
          <button
            onClick={togglePagesDropdown}
            className="flex items-center space-x-3 hover:bg-indigo-600 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 w-full"
          >
            <FaFileAlt size={20} />
            <span className="text-lg font-semibold">Pages</span>
          </button>

          {isPagesOpen && (
            <div className="absolute left-0 w-full mt-2 bg-indigo-700 rounded-lg shadow-lg">
              <Link
                to="/about"
                className="block text-white hover:bg-indigo-600 p-3 rounded-lg transition-all duration-300"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block text-white hover:bg-indigo-600 p-3 rounded-lg transition-all duration-300"
              >
                Contact Us
              </Link>
              <Link
                to="/faq"
                className="block text-white hover:bg-indigo-600 p-3 rounded-lg transition-all duration-300"
              >
                FAQ
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-6 left-6 text-sm">
        <p className="text-gray-300">© 2024 Design Bullz</p>
      </div>
    </div>
  );
};

export default Sidebar;
