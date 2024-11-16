// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaFileImage, FaCube, FaArrowRight, FaDesktop } from "react-icons/fa";
// import Header from "./Header";
// import Footer from "./Footer";

// function ViewFiles() {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [industries, setIndustries] = useState([]);
//   const [searchParams, setSearchParams] = useState({
//     design: "",
//     front: "",
//     depth: "",
//     industry: "",
//   });
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [clickedFile, setClickedFile] = useState(null);

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
//       setClickedFile(null);
//     }
//   };

//   const mainFile = files.length > 0 ? files[0] : null;
//   const recentFiles = files.length > 1 ? files.slice(1) : [];

//   return (
//     <div className="flex flex-col min-h-screen bg-white text-black font-body">
//       <Header />
//       <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
//         <div className="w-full max-w-7xl p-4 sm:p-6 border rounded-lg shadow-lg bg-white mx-auto">
//           <div className="mb-6">
//             <div className="flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
//               <div className="w-full sm:w-[25%]">
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
//                   <div className="absolute mt-2 w-full sm:w-[20%] border-2 border-gray-300 bg-white shadow-lg z-10 rounded-md">
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

//               <div className="w-full sm:w-[25%]">
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

//               <div className="w-full sm:w-[25%]">
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

//               <div className="w-full sm:w-[20%] mt-4 sm:mt-9">
//                 <button
//                   onClick={handleSearch}
//                   className="bg-blue-500 text-white px-4 py-2 mt-9 rounded-md w-full hover:bg-blue-600 transition duration-300"
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

//       {(clickedFile || (searched && mainFile)) && (
//         <div className="p-4 sm:p-8">
//           <h3 className="text-2xl font-bold mb-4 text-center text-black">
//             {clickedFile ? "File Details" : "Search Result"}
//           </h3>
//           <div
//             style={{ width: "100%", maxWidth: "1000px" }}
//             className="mx-auto"
//           >
//             <div
//               key={clickedFile ? clickedFile.file_number : mainFile.file_number}
//               className="border-2 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row-reverse mb-6 bg-white"
//             >
//               <div className="sm:w-2/3 sm:pl-6">
//                 <h4 className="font-semibold text-xl mb-2 text-blue-600">
//                   {clickedFile ? clickedFile.design : mainFile.design}
//                 </h4>
//                 <p className="text-gray-500">
//                   File Number:{" "}
//                   {clickedFile ? clickedFile.file_number : mainFile.file_number}
//                 </p>
//                 <p className="text-gray-500">
//                   Industry:{" "}
//                   {clickedFile ? clickedFile.industry : mainFile.industry}
//                 </p>
//                 <p className="text-gray-500">
//                   Front/Depth:{" "}
//                   {clickedFile ? clickedFile.front_depth : mainFile.front_depth}
//                 </p>
//                 <div className="mt-4 flex space-x-4">
//                   <a
//                     href={
//                       clickedFile ? clickedFile.file_url_1 : mainFile.file_url_1
//                     }
//                     download
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
//                   >
//                     Download
//                   </a>
//                 </div>
//               </div>

//               {(clickedFile ? clickedFile.file_url_2 : mainFile.file_url_2) && (
//                 <div className="w-full mt-6 sm:mt-0">
//                   <img
//                     src={
//                       clickedFile ? clickedFile.file_url_2 : mainFile.file_url_2
//                     }
//                     alt={
//                       clickedFile
//                         ? clickedFile.file_number
//                         : mainFile.file_number
//                     }
//                     className="w-full object-cover rounded-lg shadow-md"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {recentFiles.length > 0 && (
//         <section className="px-4 sm:px-6">
//           <h2 className="text-2xl font-semibold text-center text-black mb-6">
//             Recent Files
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 ">
//             {" "}
//             {/* Increased lg:grid-cols-4 to lg:grid-cols-5 and gap-6 to gap-8 */}
//             {recentFiles.map((file, index) => (
//               <div
//                 key={index}
//                 className="border-2 rounded-lg shadow-lg flex justify-center mb-6 bg-white transition transform hover:scale-105 hover:shadow-xl w-full" // Ensure w-full is set to control width
//                 onClick={() => setClickedFile(file)}
//               >
//                 {file.file_url_2 && file.file_url_2.match(/\.(jpeg|jpg)$/i) && (
//                   <div className="w-full h-[200px] relative overflow-hidden">
//                     <img
//                       src={file.file_url_2}
//                       alt={file.file_number}
//                       className="w-full h-full absolute top-0 left-0 right-0 bottom-0"
//                     />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
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
  const [industries, setIndustries] = useState([]);
  const [searchParams, setSearchParams] = useState({
    design: "",
    front: "",
    depth: "",
    industry: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searched, setSearched] = useState(false);
  const [clickedFile, setClickedFile] = useState(null);

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
        // Store industries in localStorage
        localStorage.setItem(
          "industries",
          JSON.stringify(response.data.industries)
        );
      } catch (error) {
        console.error("Error fetching industries:", error);
        setErrorMessage("Error fetching industries.");
      }
    };

    // Check if industries are in localStorage
    const storedIndustries = localStorage.getItem("industries");
    if (storedIndustries) {
      setIndustries(JSON.parse(storedIndustries));
    } else {
      fetchIndustries();
    }

    // Check if searchParams exist in localStorage
    const storedSearchParams = localStorage.getItem("searchParams");
    if (storedSearchParams) {
      setSearchParams(JSON.parse(storedSearchParams));
    }

    // Check if files exist in localStorage
    const storedFiles = localStorage.getItem("files");
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles));
    }
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
      // Store files in localStorage
      localStorage.setItem("files", JSON.stringify(response.data.uploads));
    } catch (error) {
      setErrorMessage("Error fetching files.");
    } finally {
      setLoading(false);
      setSearched(true);
      setClickedFile(null);
    }
  };

  const mainFile = files.length > 0 ? files[0] : null;
  const recentFiles = files.length > 1 ? files.slice(1) : [];

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-body">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-7xl p-4 sm:p-6 border rounded-lg shadow-lg bg-white mx-auto">
          <div className="mb-6">
            <div className="flex flex-wrap items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-full sm:w-[25%]">
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
                  <div className="absolute mt-2 w-full sm:w-[20%] border-2 border-gray-300 bg-white shadow-lg z-10 rounded-md">
                    {designs.map((design, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          const updatedSearchParams = {
                            ...searchParams,
                            design: design.label,
                          };
                          setSearchParams(updatedSearchParams);
                          // Store updated searchParams in localStorage
                          localStorage.setItem(
                            "searchParams",
                            JSON.stringify(updatedSearchParams)
                          );
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

              <div className="w-full sm:w-[25%]">
                <h2 className="text-xl font-semibold text-black mb-2">
                  Enter Stall Size (In Meters)
                </h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Front"
                    value={searchParams.front}
                    onChange={(e) => {
                      const updatedSearchParams = {
                        ...searchParams,
                        front: e.target.value,
                      };
                      setSearchParams(updatedSearchParams);
                      // Store updated searchParams in localStorage
                      localStorage.setItem(
                        "searchParams",
                        JSON.stringify(updatedSearchParams)
                      );
                    }}
                    className="border-2 p-3 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-xl font-bold text-black">X</span>
                  <input
                    type="text"
                    placeholder="Depth"
                    value={searchParams.depth}
                    onChange={(e) => {
                      const updatedSearchParams = {
                        ...searchParams,
                        depth: e.target.value,
                      };
                      setSearchParams(updatedSearchParams);
                      // Store updated searchParams in localStorage
                      localStorage.setItem(
                        "searchParams",
                        JSON.stringify(updatedSearchParams)
                      );
                    }}
                    className="border-2 p-3 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="w-full sm:w-[25%]">
                <h2 className="text-xl font-semibold text-black mb-2">
                  Select Industry (Optional)
                </h2>
                <select
                  value={searchParams.industry}
                  onChange={(e) => {
                    const updatedSearchParams = {
                      ...searchParams,
                      industry: e.target.value,
                    };
                    setSearchParams(updatedSearchParams);
                    // Store updated searchParams in localStorage
                    localStorage.setItem(
                      "searchParams",
                      JSON.stringify(updatedSearchParams)
                    );
                  }}
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

              <div className="w-full sm:w-[20%] mt-4 sm:mt-9">
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-4 py-2 mt-9 rounded-md w-full hover:bg-blue-600 transition duration-300"
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
        <div className="p-4 sm:p-8">
          <h3 className="text-2xl font-bold mb-4 text-center text-black">
            {clickedFile ? "File Details" : "Search Result"}
          </h3>
          <div
            style={{ width: "100%", maxWidth: "1000px" }}
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
                  <img
                    src={
                      clickedFile ? clickedFile.file_url_2 : mainFile.file_url_2
                    }
                    alt={
                      clickedFile
                        ? clickedFile.file_number
                        : mainFile.file_number
                    }
                    className="w-full object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {recentFiles.length > 0 && (
        <section className="px-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-center text-black mb-6">
            Recent Files
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 ">
            {" "}
            {/* Increased lg:grid-cols-4 to lg:grid-cols-5 and gap-6 to gap-8 */}
            {recentFiles.map((file, index) => (
              <div
                key={index}
                className="border-2 rounded-lg shadow-lg flex justify-center mb-6 bg-white transition transform hover:scale-105 hover:shadow-xl w-full" // Ensure w-full is set to control width
                onClick={() => setClickedFile(file)}
              >
                {file.file_url_2 && file.file_url_2.match(/\.(jpeg|jpg)$/i) && (
                  <div className="w-full h-[200px] relative overflow-hidden">
                    <img
                      src={file.file_url_2}
                      alt={file.file_number}
                      className="w-full h-full absolute top-0 left-0 right-0 bottom-0"
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
