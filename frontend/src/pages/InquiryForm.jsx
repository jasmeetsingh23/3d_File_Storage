import React, { useState } from "react";
import axios from "axios";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    // Company Info
    companyName: "",
    contactPerson: "",
    contactEmail: "",
    contactNumber: "",
    website: "",

    // Event Info
    eventName: "",
    venueCity: "",
    eventDate: "",
    stallSize: "",
    sidesOpenStall: "",

    // File Uploads
    floorPlan: null,
    logoFiles: null,

    // Stand Requirements
    brandColor: "",
    meetingRoomRequired: "",
    storeRoomRequired: "",
    tvLedWallRequired: "",
    productDisplay: "",
    seatingRequirements: [],

    // Product Info
    numberOfProducts: "",
    sizeOfProducts: "",
    weightOfProducts: "",
    deadline: "",
    specificInformation: "",
    suggestedBudget: "",
  });

  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? value : "",
      }));
    } else if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProductDisplayChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      productDisplay: checked ? value : "",
    }));
  };

  const handleSeatingRequirementsChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      seatingRequirements: checked
        ? [...prev.seatingRequirements, value]
        : prev.seatingRequirements.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to send both form data and files
    const formDataToSubmit = new FormData();

    // Append the form fields to FormData
    for (const [key, value] of Object.entries(formData)) {
      if (value && key !== "floorPlan" && key !== "logoFiles") {
        formDataToSubmit.append(key, value);
      }
    }

    // Append files to FormData
    if (formData.floorPlan) {
      formDataToSubmit.append("floorPlan", formData.floorPlan);
    }
    if (formData.logoFiles) {
      formDataToSubmit.append("logoFiles", formData.logoFiles);
    }

    try {
      // Replace the URL with your actual API endpoint
      const response = await axios.post(
        "http://localhost:8080/submit-inquiry",
        formDataToSubmit
      );
      // Handle the response from the server
      console.log(response.data);

      // Show the popup upon successful submission
      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md border border-gray-300">
        {/* Top Image and Google Account Info */}
        <div className="text-center p-6 border-b border-gray-300">
          <img
            src="https://lh4.googleusercontent.com/W2xlqLpK69CLDw5GwIORuSavOtzhmaQJuEpYjAWitJmuVn5vzbUbiqBpkh-T7S8-w5llGsoUJSJsPHsmD3FL1wXIVGKVv90ga7blio1vS0rpuaIAwY7YKu_Mh2zT7doJpA=w1529" // Replace with logo URL
            alt="Logo"
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Inquiry Form</h1>
        </div>

        {/* Full Form on One Page */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Company Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Person <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Enter contact person name"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website URL
            </label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter website URL"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Event Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exhibition/Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Enter event name"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Venue/City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="venueCity"
              value={formData.venueCity}
              onChange={handleChange}
              placeholder="Enter event venue or city"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stall Size (mtr X mtr) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="stallSize"
              value={formData.stallSize}
              onChange={handleChange}
              placeholder="Enter stall size"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              How many sides open stall? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="sidesOpenStall"
              value={formData.sidesOpenStall}
              onChange={handleChange}
              placeholder="Enter number of open sides"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Floor Plan (Please Attach) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="floorPlan"
              onChange={(e) =>
                setFormData({ ...formData, floorPlan: e.target.files[0] })
              }
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Logo Files (Please Attach) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="logoFiles"
              onChange={(e) =>
                setFormData({ ...formData, logoFiles: e.target.files[0] })
              }
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Stand Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand Color <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="brandColor"
              value={formData.brandColor}
              onChange={handleChange}
              placeholder="Enter brand colors"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Meeting Room Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Meeting Room Required?
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="meetingRoomRequired"
                  value="Yes"
                  checked={formData.meetingRoomRequired === "Yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="meetingRoomRequired"
                  value="No"
                  checked={formData.meetingRoomRequired === "No"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {/* Store Room Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Store Room Required?
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="storeRoomRequired"
                  value="Yes"
                  checked={formData.storeRoomRequired === "Yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="storeRoomRequired"
                  value="No"
                  checked={formData.storeRoomRequired === "No"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {/* TV / LED Wall Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              TV / LED Wall Required?
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tvLedWallRequired"
                  value="Yes"
                  checked={formData.tvLedWallRequired === "Yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="tvLedWallRequired"
                  value="No"
                  checked={formData.tvLedWallRequired === "No"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {/* Product Display Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What Type of Product Display Required?
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="productDisplay"
                  value="No Need"
                  checked={formData.productDisplay === "No Need"}
                  onChange={handleProductDisplayChange}
                  className="form-radio"
                />
                <span className="ml-2">No Need</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="productDisplay"
                  value="Glass/ Wooden Shelves"
                  checked={formData.productDisplay === "Glass/ Wooden Shelves"}
                  onChange={handleProductDisplayChange}
                  className="form-radio"
                />
                <span className="ml-2">Glass/ Wooden Shelves</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="productDisplay"
                  value="Podiums"
                  checked={formData.productDisplay === "Podiums"}
                  onChange={handleProductDisplayChange}
                  className="form-radio"
                />
                <span className="ml-2">Podiums</span>
              </label>
            </div>
          </div>

          {/* Seating Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seating Requirement (Multiple Choice Options)
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="seatingRequirements"
                  value="Round Table with Chairs"
                  checked={formData.seatingRequirements.includes(
                    "Round Table with Chairs"
                  )}
                  onChange={handleSeatingRequirementsChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Round Table with Chairs</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="seatingRequirements"
                  value="Sofa Seating"
                  checked={formData.seatingRequirements.includes(
                    "Sofa Seating"
                  )}
                  onChange={handleSeatingRequirementsChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Sofa Seating</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="seatingRequirements"
                  value="Height Table with Bar Chair"
                  checked={formData.seatingRequirements.includes(
                    "Height Table with Bar Chair"
                  )}
                  onChange={handleSeatingRequirementsChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Height Table with Bar Chair</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="seatingRequirements"
                  value="Mocktails Bar Table with Seating"
                  checked={formData.seatingRequirements.includes(
                    "Mocktails Bar Table with Seating"
                  )}
                  onChange={handleSeatingRequirementsChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Mocktails Bar Table with Seating</span>
              </label>
            </div>
          </div>

          {/* Additional Product and Design Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Products
            </label>
            <input
              type="text"
              name="numberOfProducts"
              value={formData.numberOfProducts}
              onChange={handleChange}
              placeholder="Enter the number of products"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Size of Products
            </label>
            <input
              type="text"
              name="sizeOfProducts"
              value={formData.sizeOfProducts}
              onChange={handleChange}
              placeholder="Enter the size of products"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weight of Products
            </label>
            <input
              type="text"
              name="weightOfProducts"
              value={formData.weightOfProducts}
              onChange={handleChange}
              placeholder="Enter the weight of products"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deadline for Design to be Needed
            </label>
            <input
              //   type="text"
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              placeholder="Enter deadline for design"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Anything Specific Information You Want to Share for Designing?
            </label>
            <textarea
              name="specificInformation"
              value={formData.specificInformation}
              onChange={handleChange}
              placeholder="Share any specific design details"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Please Suggest Your Budget (Important)
            </label>
            <textarea
              name="suggestedBudget"
              value={formData.suggestedBudget}
              onChange={handleChange}
              placeholder="Enter suggested budget"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
      {/* Popup (Modal) */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold text-center text-green-600">
              Form Submitted Successfully!
            </h2>
            <p className="mt-4 text-center text-gray-700">
              Your inquiry has been submitted. Our team will get back to you
              soon.
            </p>
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryForm;
