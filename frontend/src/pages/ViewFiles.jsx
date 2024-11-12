import React, { useState } from "react";
import axios from "axios";
import { FaFileImage, FaCube, FaArrowRight, FaDesktop } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";

function ViewFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchParams, setSearchParams] = useState({
    design: "",
    front: "",
    depth: "",
  });

  const [searched, setSearched] = useState(false);

  // Function to handle search
  const handleSearch = async () => {
    const { design, front, depth } = searchParams;

    // Combine front and depth with "X"
    const front_depth = front && depth ? `${front} X ${depth}` : "";

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/uploads", {
        params: { design, front_depth },
      });
      setFiles(response.data.uploads); // Setting the fetched files in the state
    } catch (error) {
      setErrorMessage("Error fetching files.");
    } finally {
      setLoading(false);
      setSearched(true); // Set searched to true after completing the search
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-body">
      <Header />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-2xl p-6 border rounded-lg shadow-lg bg-gray-100">
          <h2 className="text-4xl font-heading font-bold mb-5 text-center">
            Search Files
          </h2>

          {/* Design Selection with Icons */}
          <div className="flex justify-between mb-6">
            {["1 side open", "2 side open", "3 side open", "4 side open"].map(
              (design, index) => (
                <div
                  key={index}
                  onClick={() => setSearchParams({ ...searchParams, design })}
                  className={`cursor-pointer p-4 text-center rounded-md border ${
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

          {/* Front and Depth Inputs in Single Row Centered with "X" Symbol */}
          <div className="flex justify-center items-center mb-6">
            <input
              type="text"
              placeholder="Front"
              value={searchParams.front}
              onChange={(e) =>
                setSearchParams({ ...searchParams, front: e.target.value })
              }
              className="border p-2 rounded-md w-1/3 mr-2"
            />
            <span className="text-xl font-bold">X</span>
            <input
              type="text"
              placeholder="Depth"
              value={searchParams.depth}
              onChange={(e) =>
                setSearchParams({ ...searchParams, depth: e.target.value })
              }
              className="border p-2 rounded-md w-1/3 ml-2"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          >
            Search
          </button>

          {/* Show loading state */}
          {loading && <p className="mt-4 text-center">Loading files...</p>}

          {/* Show error message */}
          {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        </div>
      </main>

      {/* List of uploaded files - This section is outside the search box */}
      {searched && (
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Uploaded Files
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {files.length > 0 ? (
              files.map((file, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow-lg flex flex-col sm:flex-row mb-4"
                >
                  {/* Left side: Image display for file_url_1 */}
                  {file.file_url_1 &&
                    file.file_url_1.match(/\.(jpeg|jpg)$/i) && (
                      <div className="sm:w-1/3 mb-4 sm:mb-0">
                        <img
                          src={file.file_url_1}
                          alt={file.file_number}
                          className="w-full h-auto rounded-lg shadow-md"
                        />
                      </div>
                    )}

                  {/* Right side: File details and file_url_2 */}
                  <div className="sm:w-2/3 sm:pl-6">
                    <h4 className="font-semibold text-xl mb-2">
                      {file.design}
                    </h4>
                    <p className="text-gray-500">
                      File Number: {file.file_number}
                    </p>
                    <p className="text-gray-500">Industry: {file.industry}</p>
                    <p className="text-gray-500">
                      Front/Depth: {file.front_depth}
                    </p>

                    {/* Show file_url_2 (image or file) */}
                    {file.file_url_2 &&
                      file.file_url_2.match(/\.(jpeg|jpg)$/i) && (
                        <div className="mt-4">
                          <img
                            src={file.file_url_2}
                            alt={file.file_number}
                            className="w-full h-auto rounded-lg shadow-md"
                          />
                        </div>
                      )}

                    {/* Link to open file_url_2 in a new tab */}
                    {file.file_url_2 && (
                      <div className="mt-4">
                        <a
                          href={file.file_url_2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                          View File
                        </a>
                      </div>
                    )}

                    {/* Download Button for 3D file */}
                    {file.file_url_3d && (
                      <div className="mt-4">
                        <a
                          href={file.file_url_3d}
                          download
                          className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                          Download 3D File
                        </a>
                      </div>
                    )}

                    {/* Download Button for file_url_1 */}
                    {file.file_url_1 && (
                      <div className="mt-4">
                        <a
                          href={file.file_url_1}
                          download
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                          {/* Download File 1 */}
                          Download 3D File
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No files found for the given search criteria.</p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ViewFiles;
