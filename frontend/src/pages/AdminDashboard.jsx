// import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar.jsx"; // Import Sidebar component
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   FaTachometerAlt,
//   FaChartBar,
//   FaUserAlt,
//   FaEye,
//   FaTh,
// } from "react-icons/fa"; // Import React Icons
// import { LineChart, Line } from "recharts"; // Import LineChart for wave view
// import axios from "axios";

// function AdminDashboard() {
//   const [summaryData, setSummaryData] = useState([]);
//   const [designCounts, setDesignCounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedDesign, setSelectedDesign] = useState("total");

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/uploads/summary")
//       .then((response) => {
//         setSummaryData(response.data.summary);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching summary data:", err);
//         setError("Failed to fetch data");
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/uploads/count")
//       .then((response) => {
//         setDesignCounts(response.data.design_counts);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching design counts:", err);
//         setError("Failed to fetch data");
//         setLoading(false);
//       });
//   }, []);

//   const filterDataByDesign = (designType) => {
//     if (designType === "total") {
//       return summaryData;
//     } else {
//       return summaryData.filter((item) => item.design === designType);
//     }
//   };

//   const graphData = filterDataByDesign(selectedDesign).map((item) => ({
//     design: item.design,
//     front_depth: item.front_depth,
//     upload_count: item.upload_count,
//   }));

//   const CustomTooltip = ({ payload, label, active }) => {
//     if (active && payload && payload.length) {
//       const { design, front_depth, upload_count } = payload[0].payload;
//       return (
//         <div className="bg-white border p-3 shadow-xl rounded-lg max-w-xs">
//           <p className="font-semibold text-gray-800">Design: {design}</p>
//           <p className="text-gray-600">Front Depth: {front_depth}</p>
//           <p className="text-gray-600">Upload Count: {upload_count}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const handleDesignClick = (designType) => {
//     setSelectedDesign(designType);
//   };

//   const sideOpenCounts = {
//     oneSideOpen:
//       designCounts.find((item) => item.design === "1 side open")
//         ?.upload_count || 0,
//     twoSideOpen:
//       designCounts.find((item) => item.design === "2 side open")
//         ?.upload_count || 0,
//     threeSideOpen:
//       designCounts.find((item) => item.design === "3 side open")
//         ?.upload_count || 0,
//     fourSideOpen:
//       designCounts.find((item) => item.design === "4 side open")
//         ?.upload_count || 0,
//   };

//   const totalDesign = summaryData.length;

//   if (loading) {
//     return (
//       <div className="text-center mt-10 text-xl text-blue-500 animate-pulse">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center mt-10 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-blue-200 to-purple-400">
//       {/* Sidebar */}
//       <div className="w-64 bg-indigo-600 text-white fixed top-0 left-0 h-full shadow-xl z-50">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 ml-64 space-y-6 overflow-y-auto">
//         {/* Dashboard Heading */}
//         <h1 className="text-4xl font-extrabold text-center text-white mb-6 drop-shadow-lg flex items-center justify-center gap-2">
//           Admin Dashboard <FaTachometerAlt />
//         </h1>

//         {/* Design Type Buttons */}
//         <div className="flex justify-between sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
//           {[
//             {
//               label: "Total Design",
//               count: totalDesign,
//               type: "total",
//               icon: <FaTh />,
//             },
//             {
//               label: "1 Side Open",
//               count: sideOpenCounts.oneSideOpen,
//               type: "1 side open",
//               icon: <FaEye />,
//             },
//             {
//               label: "2 Side Open",
//               count: sideOpenCounts.twoSideOpen,
//               type: "2 side open",
//               icon: <FaEye />,
//             },
//             {
//               label: "3 Side Open",
//               count: sideOpenCounts.threeSideOpen,
//               type: "3 side open",
//               icon: <FaEye />,
//             },
//             {
//               label: "4 Side Open",
//               count: sideOpenCounts.fourSideOpen,
//               type: "4 side open",
//               icon: <FaEye />,
//             },
//           ].map(({ label, count, type, icon }) => (
//             <div
//               key={type}
//               className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg w-full text-center cursor-pointer"
//               onClick={() => handleDesignClick(type)}
//             >
//               <div className="text-3xl mb-2">{icon}</div>
//               <h3 className="text-xl font-semibold">{label}</h3>
//               <p className="text-2xl">{count}</p>
//             </div>
//           ))}
//         </div>

//         {/* Graph and Admin Photo View */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//           {/* Left: Wave View Graph (Line Chart) */}
//           <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center justify-center">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
//               Wave View (Line Chart) <FaChartBar />
//             </h2>
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart
//                 data={graphData}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="design" />
//                 <YAxis />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="upload_count"
//                   stroke="#FF6347" // Different color (tomato red)
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Right: Bar Chart (Graph View) */}
//           <div className="bg-white shadow-xl rounded-lg p-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center flex justify-center items-center gap-2">
//               Upload Summary (Bar Chart View) <FaChartBar />
//             </h2>
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart
//                 data={graphData}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="design" />
//                 <YAxis />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Bar
//                   dataKey="upload_count"
//                   fill="#8884d8"
//                   name="Upload Count"
//                   barSize={30}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Table View */}
//         <div className="bg-white shadow-xl rounded-lg p-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center flex justify-center items-center gap-2">
//             Upload Summary (Table View) <FaTh />
//           </h2>
//           <div className="overflow-x-auto rounded-lg shadow-sm">
//             <table className="min-w-full table-auto text-sm text-gray-700">
//               <thead>
//                 <tr className="bg-indigo-600 text-white">
//                   <th className="px-6 py-3 text-left font-medium uppercase">
//                     Design
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium uppercase">
//                     Front Depth
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium uppercase">
//                     Upload Count
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterDataByDesign(selectedDesign).map((item, index) => (
//                   <tr
//                     key={index}
//                     className="transition-colors duration-200 hover:bg-indigo-100"
//                   >
//                     <td className="px-6 py-4 border-b">{item.design}</td>
//                     <td className="px-6 py-4 border-b">{item.front_depth}</td>
//                     <td className="px-6 py-4 border-b">{item.upload_count}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar.jsx";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   FaTachometerAlt,
//   FaChartBar,
//   FaUserAlt,
//   FaEye,
//   FaTh,
// } from "react-icons/fa";
// import { LineChart, Line } from "recharts";
// import axios from "axios";

// function AdminDashboard() {
//   const [summaryData, setSummaryData] = useState([]);
//   const [designCounts, setDesignCounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedDesign, setSelectedDesign] = useState("total");

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/uploads/summary")
//       .then((response) => {
//         setSummaryData(response.data.summary);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching summary data:", err);
//         setError("Failed to fetch data");
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/uploads/count")
//       .then((response) => {
//         setDesignCounts(response.data.design_counts);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching design counts:", err);
//         setError("Failed to fetch data");
//         setLoading(false);
//       });
//   }, []);

//   // Filter summaryData only for selectedDesign when displaying in table
//   const filterDataByDesign = (designType) => {
//     if (designType === "total") {
//       return summaryData;
//     } else {
//       return summaryData.filter((item) => item.design === designType);
//     }
//   };

//   // For graphs, always show the total data (all designs)
//   const graphData = summaryData.map((item) => ({
//     design: item.design,
//     front_depth: item.front_depth,
//     upload_count: item.upload_count,
//   }));

//   const CustomTooltip = ({ payload, label, active }) => {
//     if (active && payload && payload.length) {
//       const { design, front_depth, upload_count } = payload[0].payload;
//       return (
//         <div className="bg-white border p-3 shadow-xl rounded-lg max-w-xs">
//           <p className="font-semibold text-gray-800">Design: {design}</p>
//           <p className="text-gray-600">Front Depth: {front_depth}</p>
//           <p className="text-gray-600">Upload Count: {upload_count}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const handleDesignClick = (designType) => {
//     setSelectedDesign(designType);
//   };

//   const sideOpenCounts = {
//     oneSideOpen:
//       designCounts.find((item) => item.design === "1 side open")
//         ?.upload_count || 0,
//     twoSideOpen:
//       designCounts.find((item) => item.design === "2 side open")
//         ?.upload_count || 0,
//     threeSideOpen:
//       designCounts.find((item) => item.design === "3 side open")
//         ?.upload_count || 0,
//     fourSideOpen:
//       designCounts.find((item) => item.design === "4 side open")
//         ?.upload_count || 0,
//   };

//   const totalDesign = summaryData.length;

//   if (loading) {
//     return (
//       <div className="text-center mt-10 text-xl text-blue-500 animate-pulse">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center mt-10 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-blue-200 to-purple-400">
//       {/* Sidebar */}
//       <div className="w-64 bg-indigo-600 text-white fixed top-0 left-0 h-full shadow-xl z-50">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 ml-64 space-y-6 overflow-y-auto">
//         {/* Dashboard Heading */}
//         <h1 className="text-4xl font-extrabold text-center text-white mb-6 drop-shadow-lg flex items-center justify-center gap-2">
//           Admin Dashboard <FaTachometerAlt />
//         </h1>

//         {/* Design Type Buttons */}
//         <div className="flex justify-between sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
//           {[
//             {
//               label: "Total Design",
//               count: totalDesign,
//               type: "total",
//               icon: <FaTh />,
//             },
//             {
//               label: "1 Side Open",
//               count: sideOpenCounts.oneSideOpen,
//               type: "1 side open",
//               icon: <FaEye />,
//             },
//             {
//               label: "2 Side Open",
//               count: sideOpenCounts.twoSideOpen,
//               type: "2 side open",
//               icon: <FaEye />,
//             },
//             {
//               label: "3 Side Open",
//               count: sideOpenCounts.threeSideOpen,
//               type: "3 side open",
//               icon: <FaEye />,
//             },
//             {
//               label: "4 Side Open",
//               count: sideOpenCounts.fourSideOpen,
//               type: "4 side open",
//               icon: <FaEye />,
//             },
//           ].map(({ label, count, type, icon }) => (
//             <div
//               key={type}
//               className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg w-full text-center cursor-pointer"
//               onClick={() => handleDesignClick(type)}
//             >
//               <div className="text-3xl mb-2">{icon}</div>
//               <h3 className="text-xl font-semibold">{label}</h3>
//               <p className="text-2xl">{count}</p>
//             </div>
//           ))}
//         </div>

//         {/* Graph and Admin Photo View */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//           {/* Left: Wave View Graph (Line Chart) */}
//           <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center justify-center">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
//               Wave View (Line Chart) <FaChartBar />
//             </h2>
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart
//                 data={graphData} // Always using total data
//                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="design" />
//                 <YAxis />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="upload_count"
//                   stroke="#FF6347" // Different color (tomato red)
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Right: Bar Chart (Graph View) */}
//           <div className="bg-white shadow-xl rounded-lg p-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center flex justify-center items-center gap-2">
//               Upload Summary (Bar Chart View) <FaChartBar />
//             </h2>
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart
//                 data={graphData} // Always using total data
//                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="design" />
//                 <YAxis />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Bar
//                   dataKey="upload_count"
//                   fill="#8884d8"
//                   name="Upload Count"
//                   barSize={30}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Table View */}
//         <div className="bg-white shadow-xl rounded-lg p-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center flex justify-center items-center gap-2">
//             Upload Summary (Table View) <FaTh />
//           </h2>
//           <div className="overflow-x-auto rounded-lg shadow-sm">
//             <table className="min-w-full table-auto text-sm text-gray-700">
//               <thead>
//                 <tr className="bg-indigo-600 text-white">
//                   <th className="px-6 py-3 text-left font-medium uppercase">
//                     Design
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium uppercase">
//                     Front Depth
//                   </th>
//                   <th className="px-6 py-3 text-left font-medium uppercase">
//                     Upload Count
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filterDataByDesign(selectedDesign).map((item, index) => (
//                   <tr
//                     key={index}
//                     className="transition-colors duration-200 hover:bg-indigo-100"
//                   >
//                     <td className="px-6 py-4 border-b">{item.design}</td>
//                     <td className="px-6 py-4 border-b">{item.front_depth}</td>
//                     <td className="px-6 py-4 border-b">{item.upload_count}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaTachometerAlt,
  FaChartBar,
  FaUserAlt,
  FaEye,
  FaTh,
} from "react-icons/fa";
import { LineChart, Line } from "recharts";
import axios from "axios";

function AdminDashboard() {
  const [summaryData, setSummaryData] = useState([]); // Used for Table View
  const [designCounts, setDesignCounts] = useState([]); // Used for Graph and Wave Views
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState("total");
  const [totalDesign, setTotalDesign] = useState(0); // New state for total design count

  useEffect(() => {
    // Fetch summary data for the table view
    axios
      .get("http://localhost:8080/uploads/summary")
      .then((response) => {
        setSummaryData(response.data.summary);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching summary data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch design counts for graph and wave view
    axios
      .get("http://localhost:8080/uploads/count")
      .then((response) => {
        setDesignCounts(response.data.design_counts);
        // Get the total upload count from the response
        const totalUploads = response.data.total_uploads || 0;
        setTotalDesign(totalUploads); // Set total design count
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching design counts:", err);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  // Graph data should be based on designCounts (for the graph and wave views)
  const graphData = designCounts.map((item) => ({
    design: item.design,
    upload_count: item.upload_count,
  }));

  // Filter summaryData only for selectedDesign when displaying in table
  const filterDataByDesign = (designType) => {
    if (designType === "total") {
      return summaryData;
    } else {
      return summaryData.filter((item) => item.design === designType);
    }
  };

  const CustomTooltip = ({ payload, label, active }) => {
    if (active && payload && payload.length) {
      const { design, upload_count } = payload[0].payload;
      return (
        <div className="bg-white border p-3 shadow-xl rounded-lg max-w-xs">
          <p className="font-semibold text-gray-800">Design: {design}</p>
          <p className="text-gray-600">Upload Count: {upload_count}</p>
        </div>
      );
    }
    return null;
  };

  const handleDesignClick = (designType) => {
    setSelectedDesign(designType);
  };

  const sideOpenCounts = {
    oneSideOpen:
      designCounts.find((item) => item.design === "1 side open")
        ?.upload_count || 0,
    twoSideOpen:
      designCounts.find((item) => item.design === "2 side open")
        ?.upload_count || 0,
    threeSideOpen:
      designCounts.find((item) => item.design === "3 side open")
        ?.upload_count || 0,
    fourSideOpen:
      designCounts.find((item) => item.design === "4 side open")
        ?.upload_count || 0,
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl text-blue-500 animate-pulse">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-200 to-purple-400">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white fixed top-0 left-0 h-full shadow-xl z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64 space-y-6 overflow-y-auto">
        {/* Dashboard Heading */}
        <h1 className="text-4xl font-extrabold text-center text-white mb-6 drop-shadow-lg flex items-center justify-center gap-2">
          Admin Dashboard <FaTachometerAlt />
        </h1>

        {/* Design Type Buttons */}
        <div className="flex justify-between sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {[
            {
              label: "Total Design",
              count: totalDesign, // Show the total uploads count here
              type: "total",
              icon: <FaTh />,
            },
            {
              label: "1 Side Open",
              count: sideOpenCounts.oneSideOpen,
              type: "1 side open",
              icon: <FaEye />,
            },
            {
              label: "2 Side Open",
              count: sideOpenCounts.twoSideOpen,
              type: "2 side open",
              icon: <FaEye />,
            },
            {
              label: "3 Side Open",
              count: sideOpenCounts.threeSideOpen,
              type: "3 side open",
              icon: <FaEye />,
            },
            {
              label: "4 Side Open",
              count: sideOpenCounts.fourSideOpen,
              type: "4 side open",
              icon: <FaEye />,
            },
          ].map(({ label, count, type, icon }) => (
            <div
              key={type}
              className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg w-full text-center cursor-pointer"
              onClick={() => handleDesignClick(type)}
            >
              <div className="text-3xl mb-2">{icon}</div>
              <h3 className="text-xl font-semibold">{label}</h3>
              <p className="text-2xl">{count}</p>
            </div>
          ))}
        </div>

        {/* Graph and Admin Photo View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Left: Wave View Graph (Line Chart) */}
          <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Wave View (Line Chart) <FaChartBar />
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={graphData} // Always using total data from the design counts
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="design" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="upload_count"
                  stroke="#FF6347" // Different color (tomato red)
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Right: Bar Chart (Graph View) */}
          <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center flex justify-center items-center gap-2">
              Upload Summary (Bar Chart View) <FaChartBar />
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={graphData} // Always using total data from the design counts
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="design" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="upload_count"
                  fill="#8884d8"
                  name="Upload Count"
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center flex justify-center items-center gap-2">
            Upload Summary (Table View) <FaTh />
          </h2>
          <div className="overflow-x-auto rounded-lg shadow-sm">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="px-6 py-3 text-left font-medium uppercase">
                    Design
                  </th>
                  <th className="px-6 py-3 text-left font-medium uppercase">
                    Front Depth
                  </th>
                  <th className="px-6 py-3 text-left font-medium uppercase">
                    Upload Count
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterDataByDesign(selectedDesign).map((item, index) => (
                  <tr
                    key={index}
                    className="transition-colors duration-200 hover:bg-indigo-100"
                  >
                    <td className="px-6 py-4 border-b">{item.design}</td>
                    <td className="px-6 py-4 border-b">{item.front_depth}</td>
                    <td className="px-6 py-4 border-b">{item.upload_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
