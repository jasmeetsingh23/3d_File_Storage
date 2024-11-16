// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   FaFileImage,
//   FaCube,
//   FaArrowRight,
//   FaDesktop,
//   FaTrashAlt,
//   FaEdit,
//   FaUserCircle,
//   FaSearch,
//   FaTimesCircle,
// } from "react-icons/fa";
// import Header from "./Header";
// import Footer from "./Footer";

// function AdminPanel() {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [searchParams, setSearchParams] = useState({
//     design: "",
//     front: "",
//     depth: "",
//   });
//   const [searched, setSearched] = useState(false);
//   const [newFile1, setNewFile1] = useState(null);
//   const [newFile2, setNewFile2] = useState(null);
//   const [editingFile, setEditingFile] = useState(null); // State for the file being edited

//   // Fetching files for the admin view
//   const fetchFiles = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8080/uploads");
//       setFiles(response.data.uploads);
//     } catch (error) {
//       setErrorMessage("Error fetching files.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle file deletion
//   const handleDelete = async (fileId) => {
//     try {
//       await axios.delete(`http://localhost:8080/uploads/${fileId}`);
//       setFiles(files.filter((file) => file.id !== fileId));
//       alert("File deleted successfully!");
//     } catch (error) {
//       setErrorMessage("Error deleting file.");
//     }
//   };

//   // Function to handle search
//   const handleSearch = async () => {
//     const { design, front, depth } = searchParams;
//     const front_depth = front && depth ? `${front} X ${depth}` : "";

//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8080/uploads", {
//         params: { design, front_depth },
//       });
//       setFiles(response.data.uploads);
//     } catch (error) {
//       setErrorMessage("Error fetching files.");
//     } finally {
//       setLoading(false);
//       setSearched(true);
//     }
//   };

//   // Reset search filters
//   const handleReset = () => {
//     setSearchParams({
//       design: "",
//       front: "",
//       depth: "",
//     });
//     setSearched(false);
//     fetchFiles();
//   };

//   // Handle the edit functionality
//   const handleEdit = async (file) => {
//     const updatedData = {
//       design: searchParams.design || file.design,
//       front_depth:
//         `${searchParams.front} X ${searchParams.depth}` || file.front_depth,
//       industry: file.industry, // Keep the current industry unless changed
//     };

//     const formData = new FormData();
//     formData.append("design", updatedData.design);
//     formData.append("front_depth", updatedData.front_depth);
//     formData.append("industry", updatedData.industry);
//     // Append new files if selected
//     if (newFile1) formData.append("file1", newFile1);
//     if (newFile2) formData.append("file2", newFile2);

//     try {
//       const response = await axios.put(
//         `http://localhost:8080/uploads/${file.file_number}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       alert("File updated successfully!");
//       fetchFiles(); // Re-fetch the files after updating
//       setEditingFile(null); // Close the edit modal/form
//     } catch (error) {
//       setErrorMessage("Error updating file.");
//     }
//   };

//   // Handle setting the file to edit
//   const handleOpenEdit = (file) => {
//     setEditingFile(file);
//     setSearchParams({
//       design: file.design,
//       front: file.front_depth.split(" X ")[0], // Assuming format "front X depth"
//       depth: file.front_depth.split(" X ")[1],
//     });
//   };

//   useEffect(() => {
//     fetchFiles(); // Initial fetch of files
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50 text-black font-body">
//       <Header />

//       <div className="w-full p-6 text-center shadow-lg">
//         <div className="flex justify-center items-center">
//           <FaUserCircle size={60} />
//           <div className="ml-4">
//             <h1 className="text-2xl font-semibold">Admin Panel</h1>
//             <p className="text-sm">Welcome, Admin</p>
//           </div>
//         </div>
//       </div>

//       <main className="flex-grow flex items-center justify-center p-8">
//         <div className="w-full max-w-2xl p-6 border rounded-lg shadow-lg bg-gray-100">
//           <h2 className="text-4xl font-heading font-bold mb-5 text-center text-blue-600">
//             Search Files
//           </h2>

//           {/* Design Selection with Icons */}
//           <div className="flex justify-between mb-6">
//             {["1 side open", "2 side open", "3 side open", "4 side open"].map(
//               (design, index) => (
//                 <div
//                   key={index}
//                   onClick={() => setSearchParams({ ...searchParams, design })}
//                   className={`cursor-pointer p-4 text-center rounded-md border transition duration-200 ease-in-out transform hover:scale-105 ${
//                     searchParams.design === design
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   {index === 0 && <FaArrowRight size={40} />}
//                   {index === 1 && <FaCube size={40} />}
//                   {index === 2 && <FaFileImage size={40} />}
//                   {index === 3 && <FaDesktop size={40} />}
//                   <p className="mt-2">{design}</p>
//                 </div>
//               )
//             )}
//           </div>

//           {/* Front and Depth Inputs */}
//           <div className="flex justify-center items-center mb-6">
//             <input
//               type="text"
//               placeholder="Front"
//               value={searchParams.front}
//               onChange={(e) =>
//                 setSearchParams({ ...searchParams, front: e.target.value })
//               }
//               className="border p-2 rounded-md w-1/3 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <span className="text-xl font-bold">X</span>
//             <input
//               type="text"
//               placeholder="Depth"
//               value={searchParams.depth}
//               onChange={(e) =>
//                 setSearchParams({ ...searchParams, depth: e.target.value })
//               }
//               className="border p-2 rounded-md w-1/3 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Search and Reset Buttons */}
//           <div className="flex justify-between items-center mb-6">
//             <button
//               onClick={handleSearch}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition duration-300"
//             >
//               <FaSearch className="mr-2 inline" /> Search
//             </button>
//             <button
//               onClick={handleReset}
//               className="bg-gray-400 text-white px-4 py-2 rounded-md ml-4"
//             >
//               <FaTimesCircle className="mr-2 inline" /> Reset
//             </button>
//           </div>

//           {loading && <p className="mt-4 text-center">Loading files...</p>}
//           {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
//         </div>
//       </main>

//       {/* List of uploaded files */}
//       {searched && (
//         <div className="p-8">
//           <h3 className="text-2xl font-bold mb-4 text-center">
//             Uploaded Files
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {files.length > 0 ? (
//               files.map((file, index) => (
//                 <div
//                   key={index}
//                   className="border p-4 rounded-lg shadow-lg flex flex-col transition transform hover:scale-105"
//                 >
//                   {/* Display file image 1 */}
//                   {file.file_url_1 &&
//                     file.file_url_1.match(/\.(jpeg|jpg)$/i) && (
//                       <div className="w-full mb-4">
//                         <img
//                           src={file.file_url_1}
//                           alt={file.file_number}
//                           className="w-full h-auto rounded-lg shadow-md"
//                         />
//                       </div>
//                     )}

//                   {/* Display file image 2 (thumbnail) */}
//                   {file.file_url_2 &&
//                     file.file_url_2.match(/\.(jpeg|jpg)$/i) && (
//                       <div className="w-full mb-4">
//                         <img
//                           src={file.file_url_2}
//                           alt={`${file.file_number}_thumbnail`}
//                           className="w-full h-auto rounded-lg shadow-md"
//                         />
//                       </div>
//                     )}

//                   {/* Display file details */}
//                   <p className="font-semibold">{file.design}</p>
//                   <p className="text-gray-500">
//                     Front x Depth: {file.front_depth}
//                   </p>

//                   {/* Edit and Delete buttons */}
//                   <div className="flex mt-4 justify-between">
//                     <button
//                       onClick={() => handleOpenEdit(file)}
//                       className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center"
//                     >
//                       <FaEdit className="mr-2" /> Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(file.id)}
//                       className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
//                     >
//                       <FaTrashAlt className="mr-2" /> Delete
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No files found.</p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Edit Modal (if editing) */}
//       {editingFile && (
//         <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-2xl font-bold mb-4">Edit File</h3>
//             {/* Design and Front Depth Inputs */}
//             <input
//               type="text"
//               placeholder="Design"
//               value={searchParams.design}
//               onChange={(e) =>
//                 setSearchParams({ ...searchParams, design: e.target.value })
//               }
//               className="border p-2 rounded-md w-full mb-4"
//             />
//             <input
//               type="text"
//               placeholder="Front"
//               value={searchParams.front}
//               onChange={(e) =>
//                 setSearchParams({ ...searchParams, front: e.target.value })
//               }
//               className="border p-2 rounded-md w-full mb-4"
//             />
//             <input
//               type="text"
//               placeholder="Depth"
//               value={searchParams.depth}
//               onChange={(e) =>
//                 setSearchParams({ ...searchParams, depth: e.target.value })
//               }
//               className="border p-2 rounded-md w-full mb-4"
//             />
//             <input
//               type="text"
//               placeholder="industry"
//               value={searchParams.industry}
//               onChange={(e) =>
//                 setSearchParams({ ...searchParams, industry: e.target.value })
//               }
//               className="border p-2 rounded-md w-full mb-4"
//             />
//             {/* File Inputs for new files */}
//             <input
//               type="file"
//               onChange={(e) => setNewFile1(e.target.files[0])}
//               className="mb-4"
//             />
//             <input
//               type="file"
//               onChange={(e) => setNewFile2(e.target.files[0])}
//               className="mb-4"
//             />
//             <div className="flex justify-between mt-4">
//               <button
//                 onClick={() => handleEdit(editingFile)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setEditingFile(null)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded-md"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }

// export default AdminPanel;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaFileImage,
  FaCube,
  FaArrowRight,
  FaDesktop,
  FaTrashAlt,
  FaEdit,
  FaUserCircle,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

function AdminPanel() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchParams, setSearchParams] = useState({
    design: "",
    front: "",
    depth: "",
  });
  const [searched, setSearched] = useState(false);
  const [newFile1, setNewFile1] = useState(null);
  const [newFile2, setNewFile2] = useState(null);
  const [editingFile, setEditingFile] = useState(null); // State for the file being edited
  const [industries, setIndustries] = useState([]); // New state for industries

  // Fetching files for the admin view
  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/uploads");
      setFiles(response.data.uploads);
    } catch (error) {
      setErrorMessage("Error fetching files.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch unique industries for the dropdown
  const fetchIndustries = async () => {
    try {
      const response = await axios.get("http://localhost:8080/industries");
      setIndustries(response.data.industries);
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  };

  useEffect(() => {
    fetchFiles(); // Initial fetch of files
    fetchIndustries(); // Fetch industries for the dropdown
  }, []);

  // Handle file deletion by fileNumber
  const handleDelete = async (fileNumber) => {
    try {
      await axios.delete(`http://localhost:8080/uploads/${fileNumber}`);
      setFiles(files.filter((file) => file.file_number !== fileNumber)); // Filter by file_number
      alert("File deleted successfully!");
    } catch (error) {
      setErrorMessage("Error deleting file.");
    }
  };

  const handleSearch = async () => {
    const { design, front, depth, industry } = searchParams;
    const front_depth = front && depth ? `${front} X ${depth}` : "";

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/uploads", {
        params: { design, front_depth, industry },
      });
      setFiles(response.data.uploads);
    } catch (error) {
      setErrorMessage("Error fetching files.");
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  // Reset search filters
  const handleReset = () => {
    setSearchParams({
      design: "",
      front: "",
      depth: "",
    });
    setSearched(false);
    fetchFiles();
  };

  // Handle the edit functionality
  const handleEdit = async (file) => {
    const updatedData = {
      design: searchParams.design || file.design,
      front_depth:
        `${searchParams.front} X ${searchParams.depth}` || file.front_depth,
      industry: searchParams.industry || file.industry, // Ensure the industry is included in the update
    };

    const formData = new FormData();
    formData.append("design", updatedData.design);
    formData.append("front_depth", updatedData.front_depth);
    formData.append("industry", updatedData.industry); // Add industry to formData
    // Append new files if selected
    if (newFile1) formData.append("file1", newFile1);
    if (newFile2) formData.append("file2", newFile2);

    try {
      const response = await axios.put(
        `http://localhost:8080/uploads/${file.file_number}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("File updated successfully!");
      fetchFiles(); // Re-fetch the files after updating
      setEditingFile(null); // Close the edit modal/form
    } catch (error) {
      setErrorMessage("Error updating file.");
    }
  };

  // Handle setting the file to edit
  const handleOpenEdit = (file) => {
    setEditingFile(file);
    setSearchParams({
      design: file.design,
      front: file.front_depth.split(" X ")[0], // Assuming format "front X depth"
      depth: file.front_depth.split(" X ")[1],
      industry: file.industry,
    });
  };

  useEffect(() => {
    fetchFiles(); // Initial fetch of files
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black font-body">
      <Header />

      {/* Left side upload files */}
      <div className="w-full p-6 text-center shadow-lg">
        <div className="flex justify-between items-center">
          {/* center content (User icon and admin text) */}
          <div className="ml-4">
            <Link
              to="/upload" // Path to the signup page
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Upload files
            </Link>
          </div>
          <div className="flex items-center">
            <FaUserCircle size={60} />
            <div className="ml-4">
              <h1 className="text-2xl font-semibold">Admin Panel</h1>
              <p className="text-sm">Welcome, Admin</p>
            </div>
          </div>

          {/* Right content (Create New User button) */}
          <div className="ml-4">
            <Link
              to="/signup" // Path to the signup page
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Create New User
            </Link>
          </div>
        </div>
      </div>
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-2xl p-6 border rounded-lg shadow-lg bg-gray-100">
          <h2 className="text-4xl font-heading font-bold mb-5 text-center text-blue-600">
            Search Files
          </h2>

          {/* Design Selection with Icons */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Design
            </label>
            <div className="flex justify-between">
              {["1 side open", "2 side open", "3 side open", "4 side open"].map(
                (design, index) => (
                  <div
                    key={index}
                    onClick={() => setSearchParams({ ...searchParams, design })}
                    className={`cursor-pointer p-4 text-center rounded-md border transition duration-200 ease-in-out transform hover:scale-105 ${
                      searchParams.design === design
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {index === 0 && <FaArrowRight size={40} />}
                    {index === 1 && <FaCube size={40} />}
                    {index === 2 && <FaFileImage size={40} />}
                    {index === 3 && <FaDesktop size={40} />}
                    <p className="mt-2">{design}</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Front Input */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Front
            </label>
            <input
              type="text"
              placeholder="Front"
              value={searchParams.front}
              onChange={(e) =>
                setSearchParams({ ...searchParams, front: e.target.value })
              }
              className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Depth Input */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Depth
            </label>
            <input
              type="text"
              placeholder="Depth"
              value={searchParams.depth}
              onChange={(e) =>
                setSearchParams({ ...searchParams, depth: e.target.value })
              }
              className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Industry Dropdown */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Industry
            </label>
            <select
              value={searchParams.industry}
              onChange={(e) =>
                setSearchParams({ ...searchParams, industry: e.target.value })
              }
              className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Industry</option>
              {industries.map((industry, index) => (
                <option key={index} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          {/* Search and Reset Buttons */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition duration-300"
            >
              <FaSearch className="mr-2 inline" /> Search
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-400 text-white px-4 py-2 rounded-md ml-4"
            >
              <FaTimesCircle className="mr-2 inline" /> Reset
            </button>
          </div>

          {loading && <p className="mt-4 text-center">Loading files...</p>}
          {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        </div>
      </main>

      {/* List of uploaded files */}
      {searched && (
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Uploaded Files
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {files.length > 0 ? (
              files.map((file, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow-lg flex flex-col transition transform hover:scale-105"
                >
                  {/* Display file image 1 */}
                  {file.file_url_1 &&
                    file.file_url_1.match(/\.(jpeg|jpg)$/i) && (
                      <div className="w-full mb-4">
                        <img
                          src={file.file_url_1}
                          alt={file.file_number}
                          className="w-full h-auto rounded-lg shadow-md"
                        />
                      </div>
                    )}

                  {/* Display file image 2 (thumbnail) */}
                  {file.file_url_2 &&
                    file.file_url_2.match(/\.(jpeg|jpg)$/i) && (
                      <div className="w-full mb-4">
                        <img
                          src={file.file_url_2}
                          alt={`${file.file_number}_thumbnail`}
                          className="w-full h-auto rounded-lg shadow-md"
                        />
                      </div>
                    )}

                  {/* Display file details */}
                  <p className="font-semibold">{file.design}</p>
                  <p className="text-gray-500">
                    Front x Depth: {file.front_depth}
                  </p>

                  {/* Edit and Delete buttons */}
                  <div className="flex mt-4 justify-between">
                    <button
                      onClick={() => handleOpenEdit(file)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(file.file_number)} // Pass file_number to handleDelete
                      className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
                    >
                      <FaTrashAlt className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No files found.</p>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal (if editing) */}
      {editingFile && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 max-w-lg transform transition-all">
            <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">
              Edit File
            </h3>

            {/* Design Input with Heading */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Stall Layout
              </label>
              <input
                type="text"
                placeholder="Design"
                value={searchParams.design}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, design: e.target.value })
                }
                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Front Input with Heading */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Front Size
              </label>
              <input
                type="text"
                placeholder="Front"
                value={searchParams.front}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, front: e.target.value })
                }
                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Depth Input with Heading */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Depth Size
              </label>
              <input
                type="text"
                placeholder="Depth"
                value={searchParams.depth}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, depth: e.target.value })
                }
                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Industry Input with Heading */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Industry
              </label>
              <input
                type="text"
                placeholder="Industry"
                value={searchParams.industry}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, industry: e.target.value })
                }
                className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* File Inputs with Heading */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                3D File
              </label>
              <input
                type="file"
                accept=".max"
                onChange={(e) => setNewFile1(e.target.files[0])}
                className="mb-4"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Jpeg File
              </label>
              <input
                type="file"
                accept="image/jpeg"
                onChange={(e) => setNewFile2(e.target.files[0])}
                className="mb-4"
              />
            </div>

            {/* Save and Cancel buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => handleEdit(editingFile)}
                className="bg-blue-500 text-white px-6 py-3 rounded-md w-full sm:w-auto hover:bg-blue-600 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setEditingFile(null)}
                className="bg-gray-400 text-white px-6 py-3 rounded-md w-full sm:w-auto hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default AdminPanel;
