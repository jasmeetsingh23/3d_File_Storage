// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaFileImage, FaCube, FaArrowRight, FaDesktop } from "react-icons/fa";
// import Header from "./Header";
// import Footer from "./Footer";

// function ViewFiles() {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [industries, setIndustries] = useState([]); // State to store industries
//   const [searchParams, setSearchParams] = useState({
//     design: "",
//     front: "",
//     depth: "",
//     industry: "",
//   });
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searched, setSearched] = useState(false);

//   const designs = [
//     { label: "1 side open", icon: <FaArrowRight size={24} /> },
//     { label: "2 side open", icon: <FaCube size={24} /> },
//     { label: "3 side open", icon: <FaFileImage size={24} /> },
//     { label: "4 side open", icon: <FaDesktop size={24} /> },
//   ];

//   useEffect(() => {
//     const fetchIndustries = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/industries");
//         setIndustries(response.data.industries);
//       } catch (error) {
//         console.error("Error fetching industries:", error);
//         setErrorMessage("Error fetching industries.");
//       }
//     };
//     fetchIndustries();
//   }, []);

//   const handleSearch = async () => {
//     const { design, front, depth, industry } = searchParams;
//     const front_depth = front && depth ? `${front} X ${depth}` : "";

//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8080/uploads", {
//         params: { design, front_depth, industry },
//       });
//       setFiles(response.data.uploads);
//     } catch (error) {
//       setErrorMessage("Error fetching files.");
//     } finally {
//       setLoading(false);
//       setSearched(true);
//     }
//   };

//   const mainFile = files.length > 0 ? files[0] : null;
//   const recentFiles = files.length > 1 ? files.slice(1) : [];

//   return (
//     <div className="flex flex-col min-h-screen bg-white text-black font-body">
//       <Header />
//       <main className="flex-grow flex items-center justify-center p-8">
//         <div className="w-full max-w-7xl p-6 border rounded-lg shadow-lg bg-white">
//           <div className="mb-6">
//             <div className="flex items-center space-x-4">
//               <div className="w-[25%]">
//                 <h2 className="text-xl font-semibold text-black mb-2">
//                   Select Stall Layout
//                 </h2>
//                 <div
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className="cursor-pointer block w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <div className="flex items-center">
//                     {searchParams.design ? (
//                       <>
//                         {
//                           designs.find(
//                             (design) => design.label === searchParams.design
//                           )?.icon
//                         }
//                         <span className="ml-2">{searchParams.design}</span>
//                       </>
//                     ) : (
//                       <span>Select Design</span>
//                     )}
//                   </div>
//                 </div>
//                 {isDropdownOpen && (
//                   <div className="absolute mt-2 w-[20%] border-2 border-gray-300 bg-white shadow-lg z-10 rounded-md">
//                     {designs.map((design, index) => (
//                       <div
//                         key={index}
//                         onClick={() => {
//                           setSearchParams({
//                             ...searchParams,
//                             design: design.label,
//                           });
//                           setIsDropdownOpen(false);
//                         }}
//                         className="flex items-center p-3 cursor-pointer hover:bg-blue-500 hover:text-white"
//                       >
//                         {design.icon}
//                         <span className="ml-2">{design.label}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="w-[25%]">
//                 <h2 className="text-xl font-semibold text-black mb-2">
//                   Enter Stall Size (In Meters)
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     placeholder="Front"
//                     value={searchParams.front}
//                     onChange={(e) =>
//                       setSearchParams({
//                         ...searchParams,
//                         front: e.target.value,
//                       })
//                     }
//                     className="border-2 p-3 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <span className="text-xl font-bold text-black">X</span>
//                   <input
//                     type="text"
//                     placeholder="Depth"
//                     value={searchParams.depth}
//                     onChange={(e) =>
//                       setSearchParams({
//                         ...searchParams,
//                         depth: e.target.value,
//                       })
//                     }
//                     className="border-2 p-3 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="w-[25%]">
//                 <h2 className="text-xl font-semibold text-black mb-2">
//                   Select Industry (Optional)
//                 </h2>
//                 <select
//                   value={searchParams.industry}
//                   onChange={(e) =>
//                     setSearchParams({
//                       ...searchParams,
//                       industry: e.target.value,
//                     })
//                   }
//                   className="border-2 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select Industry</option>
//                   {industries.map((industry, index) => (
//                     <option key={index} value={industry}>
//                       {industry}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="w-[20%] mt-9">
//                 <button
//                   onClick={handleSearch}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition duration-300"
//                 >
//                   Search
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="mb-6">
//             {loading && (
//               <p className="mt-4 text-center text-black">Loading files...</p>
//             )}
//             {errorMessage && (
//               <p className="text-red-600 mt-4">{errorMessage}</p>
//             )}
//           </div>
//         </div>
//       </main>

//       {searched && mainFile && (
//         <div className="p-8">
//           <h3 className="text-2xl font-bold mb-4 text-center text-black">
//             Search Result
//           </h3>
//           {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 "> */}
//           <div style={{ width: "1000px", marginRight: "100px" }}>
//             <div
//               key={mainFile.file_number}
//               className="border-2 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row-reverse mb-6 bg-white transition transform hover:scale-105 hover:shadow-xl"
//             >
//               <div className="sm:w-2/3 sm:pl-6">
//                 <h4 className="font-semibold text-xl mb-2 text-blue-600">
//                   {mainFile.design}
//                 </h4>
//                 <p className="text-gray-500">
//                   File Number: {mainFile.file_number}
//                 </p>
//                 <p className="text-gray-500">Industry: {mainFile.industry}</p>
//                 <p className="text-gray-500">
//                   Front/Depth: {mainFile.front_depth}
//                 </p>
//                 {/* Buttons for Download and View */}
//                 <div className="mt-4 flex space-x-4">
//                   <a
//                     href={mainFile.file_url_1}
//                     download
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
//                   >
//                     Download
//                   </a>
//                   <a
//                     href={mainFile.file_url_2}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
//                   >
//                     View
//                   </a>
//                 </div>
//               </div>

//               {/* Image Thumbnail */}
//               {mainFile.file_url_2 &&
//                 mainFile.file_url_2.match(/\.(jpeg|jpg)$/i) && (
//                   <div className="sm:w-1/3 mt-4 sm:mt-0">
//                     <img
//                       src={mainFile.file_url_2}
//                       alt={mainFile.file_number}
//                       className="w-full h-auto rounded-lg shadow-md"
//                     />
//                   </div>
//                 )}
//             </div>
//           </div>
//         </div>
//       )}

//       {searched && recentFiles.length > 0 && (
//         <div className="p-8">
//           <h3 className="text-2xl font-bold mb-4 text-center text-black">
//             Recent Files
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//             {recentFiles.map((file, index) => (
//               <div
//                 key={index}
//                 className="border-2  rounded-lg shadow-lg flex justify-center mb-6 bg-white transition transform hover:scale-105 hover:shadow-xl"
//               >
//                 {/* Display image only if the file matches jpeg/jpg */}
//                 {file.file_url_2 && file.file_url_2.match(/\.(jpeg|jpg)$/i) && (
//                   <div className="w-full h-auto">
//                     <img
//                       src={file.file_url_2}
//                       alt={file.file_number}
//                       className="w-full h-auto rounded-lg shadow-md"
//                     />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }

// export default ViewFiles;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFileImage, FaCube, FaArrowRight, FaDesktop } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

function ViewFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [industries, setIndustries] = useState([]); // State to store industries
  const [searchParams, setSearchParams] = useState({
    design: "",
    front: "",
    depth: "",
    industry: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searched, setSearched] = useState(false);
  const [clickedFile, setClickedFile] = useState(null); // Track clicked file

  const designs = [
    { label: "1 side open", icon: <FaArrowRight size={24} /> },
    { label: "2 side open", icon: <FaCube size={24} /> },
    { label: "3 side open", icon: <FaFileImage size={24} /> },
    { label: "4 side open", icon: <FaDesktop size={24} /> },
  ];

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await axios.get("http://localhost:8080/industries");
        setIndustries(response.data.industries);
      } catch (error) {
        console.error("Error fetching industries:", error);
        setErrorMessage("Error fetching industries.");
      }
    };
    fetchIndustries();
  }, []);

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
      setClickedFile(null); // Reset clicked file state on new search
    }
  };

  const mainFile = files.length > 0 ? files[0] : null;
  const recentFiles = files.length > 1 ? files.slice(1) : [];

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-body">
      <Header />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-7xl p-6 border rounded-lg shadow-lg bg-white mx-auto">
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-[25%]">
                <h2 className="text-xl font-semibold text-black mb-2">
                  Select Stall Layout
                </h2>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="cursor-pointer block w-full mt-2 p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="flex items-center">
                    {searchParams.design ? (
                      <>
                        {
                          designs.find(
                            (design) => design.label === searchParams.design
                          )?.icon
                        }
                        <span className="ml-2">{searchParams.design}</span>
                      </>
                    ) : (
                      <span>Select Design</span>
                    )}
                  </div>
                </div>
                {isDropdownOpen && (
                  <div className="absolute mt-2 w-[20%] border-2 border-gray-300 bg-white shadow-lg z-10 rounded-md">
                    {designs.map((design, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSearchParams({
                            ...searchParams,
                            design: design.label,
                          });
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center p-3 cursor-pointer hover:bg-blue-500 hover:text-white"
                      >
                        {design.icon}
                        <span className="ml-2">{design.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-[25%]">
                <h2 className="text-xl font-semibold text-black mb-2">
                  Enter Stall Size (In Meters)
                </h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Front"
                    value={searchParams.front}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        front: e.target.value,
                      })
                    }
                    className="border-2 p-3 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-xl font-bold text-black">X</span>
                  <input
                    type="text"
                    placeholder="Depth"
                    value={searchParams.depth}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        depth: e.target.value,
                      })
                    }
                    className="border-2 p-3 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="w-[25%]">
                <h2 className="text-xl font-semibold text-black mb-2">
                  Select Industry (Optional)
                </h2>
                <select
                  value={searchParams.industry}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      industry: e.target.value,
                    })
                  }
                  className="border-2 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry, index) => (
                    <option key={index} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[20%] mt-9">
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition duration-300"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            {loading && (
              <p className="mt-4 text-center text-black">Loading files...</p>
            )}
            {errorMessage && (
              <p className="text-red-600 mt-4">{errorMessage}</p>
            )}
          </div>
        </div>
      </main>

      {(clickedFile || (searched && mainFile)) && (
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-4 text-center text-black">
            {clickedFile ? "File Details" : "Search Result"}
          </h3>
          <div
            style={{ width: "1000px", marginLeft: "auto", marginRight: "auto" }}
            className="mx-auto"
          >
            <div
              key={clickedFile ? clickedFile.file_number : mainFile.file_number}
              className="border-2 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row-reverse mb-6 bg-white"
            >
              <div className="sm:w-2/3 sm:pl-6">
                <h4 className="font-semibold text-xl mb-2 text-blue-600">
                  {clickedFile ? clickedFile.design : mainFile.design}
                </h4>
                <p className="text-gray-500">
                  File Number:{" "}
                  {clickedFile ? clickedFile.file_number : mainFile.file_number}
                </p>
                <p className="text-gray-500">
                  Industry:{" "}
                  {clickedFile ? clickedFile.industry : mainFile.industry}
                </p>
                <p className="text-gray-500">
                  Front/Depth:{" "}
                  {clickedFile ? clickedFile.front_depth : mainFile.front_depth}
                </p>
                <div className="mt-4 flex space-x-4">
                  <a
                    href={
                      clickedFile ? clickedFile.file_url_1 : mainFile.file_url_1
                    }
                    download
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Download
                  </a>
                </div>
              </div>

              {(clickedFile ? clickedFile.file_url_2 : mainFile.file_url_2) && (
                <div className="w-full mt-6 sm:mt-0">
                  {" "}
                  {/* Removed the width constraint on the div */}
                  <img
                    src={
                      clickedFile ? clickedFile.file_url_2 : mainFile.file_url_2
                    }
                    alt={
                      clickedFile
                        ? clickedFile.file_number
                        : mainFile.file_number
                    }
                    className="w-full object-cover rounded-lg shadow-md" // Increased height and width is now full
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {recentFiles.length > 0 && (
        <section className="px-6">
          <h2 className="text-2xl font-semibold text-center text-black mb-6">
            Recent Files
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {" "}
            {/* Decreased from 5 columns to 4 */}
            {recentFiles.map((file, index) => (
              <div
                key={index}
                className="border-2 rounded-lg shadow-lg flex justify-center mb-6 bg-white transition transform hover:scale-105 hover:shadow-xl"
                onClick={() => setClickedFile(file)} // Set clicked file when a recent file is clicked
              >
                {file.file_url_2 && file.file_url_2.match(/\.(jpeg|jpg)$/i) && (
                  <div className="w-full h-[250px] relative overflow-hidden">
                    {" "}
                    {/* Decreased height of thumbnail */}
                    <img
                      src={file.file_url_2}
                      alt={file.file_number}
                      className="w-full h-full object-cover absolute top-0 left-0"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default ViewFiles;
