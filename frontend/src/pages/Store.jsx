// import React from "react";
// import { FaFolder, FaFolderOpen, FaFolderPlus } from "react-icons/fa"; // Import folder icons
// import { Link } from "react-router-dom";
// import Header from "./Header"; // Make sure the Header is correctly imported

// function Store() {
//   return (
//     <div className="min-h-screen bg-white text-black font-body">
//       <Header />
//       <main className="flex flex-col justify-center items-center text-center p-8">
//         <h2 className="text-4xl font-heading font-bold mb-5">Your 3D Models</h2>
//         <p className="text-lg mb-8">
//           Here you can manage and store your 3D models securely.
//         </p>

//         {/* Folder Types */}
//         <div className="flex flex-wrap justify-center gap-10">
//           {/* Folder with 1 side open */}
//           <Link to="/1-side-open">
//             <div className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center flex-col p-4 cursor-pointer">
//               <FaFolderOpen size={60} className="text-blue-500 mb-2" />
//               <p className="font-bold text-sm">1 Side Open</p>
//             </div>
//           </Link>

//           {/* Folder with 2 sides open */}
//           <div className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center flex-col p-4">
//             <FaFolderOpen size={60} className="text-green-500 mb-2" />
//             <p className="font-bold text-sm">2 Sides Open</p>
//           </div>

//           {/* Folder with 3 sides open */}
//           <div className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center flex-col p-4">
//             <FaFolderPlus size={60} className="text-yellow-500 mb-2" />
//             <p className="font-bold text-sm">3 Sides Open</p>
//           </div>

//           {/* Folder with 4 sides open */}
//           <div className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center flex-col p-4">
//             <FaFolder size={60} className="text-red-500 mb-2" />
//             <p className="font-bold text-sm">4 Sides Open</p>
//           </div>
//         </div>

//         {/* Go Home Button */}
//         <Link to="/" className="mt-10">
//           <button className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all">
//             Go Home
//           </button>
//         </Link>
//       </main>
//     </div>
//   );
// }

// export default Store;

import React from "react";
import { FaFolder, FaFolderOpen, FaFolderPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "./Header";

function Store() {
  return (
    <div className="min-h-screen bg-white text-black font-body">
      <Header />
      <main className="flex flex-col justify-center items-center text-center p-8">
        <h2 className="text-4xl font-heading font-bold mb-5">Your 3D Models</h2>
        <p className="text-lg mb-8">
          Here you can manage and store your 3D models securely.
        </p>

        {/* Folder Types */}
        <div className="flex flex-wrap justify-center gap-10">
          {/* Folder with 1 side open */}
          <Link to="/1-side-open">
            <div className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center flex-col p-4 cursor-pointer">
              <FaFolderOpen size={60} className="text-blue-500 mb-2" />
              <p className="font-bold text-sm">1 Side Open</p>
            </div>
          </Link>

          {/* Folder with 2 sides open */}
          <Link to="/2-side-open">
            <div className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center flex-col p-4 cursor-pointer">
              <FaFolderOpen size={60} className="text-green-500 mb-2" />
              <p className="font-bold text-sm">2 Sides Open</p>
            </div>
          </Link>

          {/* Folder with 3 sides open */}
          <Link to="/3-side-open">
            <div className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center flex-col p-4 cursor-pointer">
              <FaFolderPlus size={60} className="text-yellow-500 mb-2" />
              <p className="font-bold text-sm">3 Sides Open</p>
            </div>
          </Link>

          {/* Folder with 4 sides open */}
          <Link to="/4-side-open">
            <div className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center flex-col p-4 cursor-pointer">
              <FaFolder size={60} className="text-red-500 mb-2" />
              <p className="font-bold text-sm">4 Sides Open</p>
            </div>
          </Link>
        </div>

        {/* Go Home Button */}
        <Link to="/" className="mt-10">
          <button className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all">
            Go Home
          </button>
        </Link>
      </main>
    </div>
  );
}

export default Store;
