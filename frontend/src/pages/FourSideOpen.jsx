import React, { useState, useEffect } from "react";
import { FaFolderOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function FourSideOpen() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/uploads")
      .then((response) => {
        // Filter uploads to include only those with the design "4 Side Open"
        const filteredUploads = response.data.uploads.filter(
          (upload) => upload.design === "4 side open"
        );
        setUploads(filteredUploads);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data from the server");
        setLoading(false);
      });
  }, []);

  const isImage = (fileUrl) => {
    return fileUrl && (fileUrl.endsWith(".jpeg") || fileUrl.endsWith(".jpg"));
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-white text-black font-body">
      <Header />
      <main className="flex flex-col justify-center items-center text-center p-8">
        <h2 className="text-4xl font-heading font-bold mb-5">
          4 Side Open 3D Model
        </h2>
        <p className="text-lg mb-8">
          You are now viewing your 3D model with four sides open.
        </p>

        {loading && <p>Loading uploads...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="w-40 h-40 bg-gray-200 rounded-lg flex justify-center items-center flex-col p-4 mb-8"
            >
              <FaFolderOpen size={60} className="text-blue-500 mb-2" />
              <p className="font-bold text-sm">{upload.design}</p>
              <p className="text-sm">{upload.file_number}</p>
              {isImage(upload.file_url) ? (
                <img
                  src={upload.file_url}
                  alt={upload.design}
                  className="w-full h-auto object-contain mt-2 cursor-pointer"
                  onClick={() => openModal(upload.file_url)}
                />
              ) : (
                <a
                  href={upload.file_url}
                  download
                  className="text-blue-500 mt-2"
                >
                  Download {upload.file_number}
                </a>
              )}
            </div>
          ))}
        </div>

        <Link to="/store" className="mt-10">
          <button className="bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all">
            Back to Store
          </button>
        </Link>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Image Viewer"
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        >
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </Modal>
      </main>
    </div>
  );
}

export default FourSideOpen;
