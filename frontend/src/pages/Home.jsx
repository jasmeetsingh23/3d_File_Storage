import React from "react";
import { FaCloudUploadAlt, FaSave } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "./Header";
import Footer from "./Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-body">
      <Header />

      <main className="flex-grow flex flex-col justify-center items-center text-center p-8">
        <h2 className="text-5xl font-heading font-bold mb-5 animate__animated animate__fadeIn animate__delay-1s">
          Store Your 3D Models Effortlessly
        </h2>
        <p className="text-lg mb-8 animate__animated animate__fadeIn animate__delay-1s">
          Secure cloud storage to upload, store, and manage your 3D models with
          ease.
        </p>

        <div className="flex space-x-10">
          <Link to="/upload">
            {/* Upload button */}
            <div className="flex flex-col items-center cursor-pointer">
              <FaCloudUploadAlt
                size={80}
                className="text-black mb-4 animate__animated animate__zoomIn animate__delay-2s"
              />
              <h3 className="text-2xl font-heading font-bold">Upload</h3>
              <p className="mt-2">Easily upload and share your models</p>
            </div>
          </Link>

          <Link to="/store">
            {/* Store button, now links to the store page */}
            <div className="flex flex-col items-center cursor-pointer">
              <FaSave
                size={80}
                className="text-black mb-4 animate__animated animate__zoomIn animate__delay-2s"
              />
              <h3 className="text-2xl font-heading font-bold">Store</h3>
              <p className="mt-2">Store and manage your 3D models securely</p>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
