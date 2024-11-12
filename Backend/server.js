// import express from "express";
// import mysql from "mysql2";
// import cors from "cors";
// import multer from "multer";
// import dotenv from "dotenv";
// import path from "path";
// import colors from "colors";

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 8080;

// // Middleware for CORS and parsing JSON
// app.use(cors());
// app.use(express.json());

// // MySQL connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: process.env.DB_PASSWORD,
//   database: "3d_model_storage",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("MySQL connected🎉".bgMagenta.white);
// });

// // Setup multer for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads"); // Save files in 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as the filename
//   },
// });

// const upload = multer({ storage });

// // Function to generate a unique file number like JH7878J (6 characters minimum)
// function generateUniqueFileNumber() {
//   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Uppercase letters
//   const digits = "0123456789"; // Digits
//   let uniqueFileNumber = "";

//   // Generate 2 random letters
//   for (let i = 0; i < 2; i++) {
//     uniqueFileNumber += letters.charAt(
//       Math.floor(Math.random() * letters.length)
//     );
//   }

//   // Generate 4 random digits
//   for (let i = 0; i < 4; i++) {
//     uniqueFileNumber += digits.charAt(
//       Math.floor(Math.random() * digits.length)
//     );
//   }

//   // Generate 1 random letter at the end
//   uniqueFileNumber += letters.charAt(
//     Math.floor(Math.random() * letters.length)
//   );

//   return uniqueFileNumber;
// }

// // Route to handle form submission and file upload
// app.post("/upload", upload.single("file"), (req, res) => {
//   const { design, front_depth, industry } = req.body;
//   const uniqueFileNumber = generateUniqueFileNumber(); // Generate a unique file number
//   const fileUrl = req.file
//     ? `http://localhost:8080/uploads/${req.file.filename}`
//     : null; // File URL

//   const query =
//     "INSERT INTO uploads (design, front_depth, industry, file_number, file_url) VALUES (?, ?, ?, ?, ?)";
//   db.query(
//     query,
//     [design, front_depth, industry, uniqueFileNumber, fileUrl],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting data into MySQL:", err);
//         return res
//           .status(500)
//           .json({ error: "Error inserting data into MySQL" });
//       }
//       console.log("Data inserted into MySQL:", result);
//       res.status(200).json({
//         message: "Data submitted successfully",
//         fileUrl,
//         uniqueFileNumber,
//       });
//     }
//   );
// });

// // GET route to fetch uploaded files' details
// app.get("/uploads", (req, res) => {
//   const query = "SELECT * FROM uploads"; // SQL query to get all the uploaded files

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching data from MySQL:", err);
//       return res.status(500).json({ error: "Error fetching data from MySQL" });
//     }

//     res.status(200).json({ uploads: results });
//   });
// });

// // GET route to fetch all front × depth configurations
// app.get("/front_depths", (req, res) => {
//   const query = "SELECT DISTINCT front_depth FROM uploads"; // Fetch all distinct front × depth values

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching front_depth values from MySQL:", err);
//       return res
//         .status(500)
//         .json({ error: "Error fetching front × depth values" });
//     }

//     res.status(200).json({ front_depths: results });
//   });
// });

// // GET route to fetch full data (design, file_number, file_url) for a specific front × depth value
// app.get("/front_depth/:front_depth", (req, res) => {
//   const { front_depth } = req.params; // Extract front_depth from URL parameters

//   const query =
//     "SELECT design, file_number, file_url, industry FROM uploads WHERE front_depth = ?"; // Include industry in the query

//   db.query(query, [front_depth], (err, results) => {
//     if (err) {
//       console.error("Error fetching data from MySQL:", err);
//       return res
//         .status(500)
//         .json({ error: "Error fetching data for front × depth" });
//     }

//     // Respond with the data for the specified front × depth value
//     if (results.length > 0) {
//       res.status(200).json({ data: results });
//     } else {
//       res.status(404).json({ message: "No data found for this front × depth" });
//     }
//   });
// });

// // Serve static files from the 'uploads' folder
// app.use("/uploads", express.static("uploads"));

// // Start the server
// app.listen(port, () =>
//   console.log(`Server running on port ${port}🚀`.bgCyan.white)
// );

import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import colors from "colors";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// Middleware for CORS and parsing JSON
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "3d_model_storage",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("MySQL connected🎉".bgMagenta.white);
});

// Setup multer for file upload (multiple files)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp as the filename
  },
});

const upload = multer({ storage });

// Function to generate a unique file number like JH7878J (6 characters minimum)
function generateUniqueFileNumber() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  let uniqueFileNumber = "";

  for (let i = 0; i < 2; i++) {
    uniqueFileNumber += letters.charAt(
      Math.floor(Math.random() * letters.length)
    );
  }

  for (let i = 0; i < 4; i++) {
    uniqueFileNumber += digits.charAt(
      Math.floor(Math.random() * digits.length)
    );
  }

  uniqueFileNumber += letters.charAt(
    Math.floor(Math.random() * letters.length)
  );

  return uniqueFileNumber;
}

// // Route to handle form submission and two file uploads
// app.post(
//   "/upload",
//   upload.fields([{ name: "file1" }, { name: "file2" }]),
//   (req, res) => {
//     const { design, front_depth, industry } = req.body;
//     const uniqueFileNumber = generateUniqueFileNumber(); // Generate a unique file number

//     const fileUrl1 = req.files.file1
//       ? `http://localhost:8080/uploads/${req.files.file1[0].filename}`
//       : null;
//     const fileUrl2 = req.files.file2
//       ? `http://localhost:8080/uploads/${req.files.file2[0].filename}`
//       : null;

//     const query =
//       "INSERT INTO uploads (design, front_depth, industry, file_number, file_url_1, file_url_2) VALUES (?, ?, ?, ?, ?, ?)";
//     db.query(
//       query,
//       [design, front_depth, industry, uniqueFileNumber, fileUrl1, fileUrl2],
//       (err, result) => {
//         if (err) {
//           console.error("Error inserting data into MySQL:", err);
//           return res
//             .status(500)
//             .json({ error: "Error inserting data into MySQL" });
//         }
//         console.log("Data inserted into MySQL:", result);
//         res.status(200).json({
//           message: "Data submitted successfully",
//           fileUrls: { file1: fileUrl1, file2: fileUrl2 },
//           uniqueFileNumber,
//         });
//       }
//     );
//   }
// );

// // GET route to fetch uploaded files' details
// app.get("/uploads", (req, res) => {
//   const query = "SELECT * FROM uploads";

//   db.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching data from MySQL:", err);
//       return res.status(500).json({ error: "Error fetching data from MySQL" });
//     }

//     res.status(200).json({ uploads: results });
//   });
// });

// POST route to upload files
app.post(
  "/upload",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  (req, res) => {
    const { design, front_depth, industry } = req.body;
    const uniqueFileNumber = generateUniqueFileNumber(); // Generate a unique file number

    const fileUrl1 = req.files.file1
      ? `http://localhost:8080/uploads/${req.files.file1[0].filename}`
      : null;
    const fileUrl2 = req.files.file2
      ? `http://localhost:8080/uploads/${req.files.file2[0].filename}`
      : null;

    const query =
      "INSERT INTO uploads (design, front_depth, industry, file_number, file_url_1, file_url_2) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [design, front_depth, industry, uniqueFileNumber, fileUrl1, fileUrl2],
      (err, result) => {
        if (err) {
          console.error("Error inserting data into MySQL:", err);
          return res
            .status(500)
            .json({ error: "Error inserting data into MySQL" });
        }
        console.log("Data inserted into MySQL:", result);
        res.status(200).json({
          message: "Data submitted successfully",
          fileUrls: { file1: fileUrl1, file2: fileUrl2 },
          uniqueFileNumber,
        });
      }
    );
  }
);

// GET route to fetch uploaded files' details with filtering
app.get("/uploads", (req, res) => {
  const { design, front_depth } = req.query; // Get query parameters from the request

  // Start building the SQL query
  let query = "SELECT * FROM uploads WHERE 1=1"; // "WHERE 1=1" is a simple way to always return true for flexible conditions

  const queryParams = [];

  // If design is provided, add it to the query
  if (design) {
    query += " AND design = ?";
    queryParams.push(design);
  }

  // If front_depth is provided, add it to the query
  if (front_depth) {
    query += " AND front_depth = ?";
    queryParams.push(front_depth);
  }

  // Execute the query with parameters
  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      return res.status(500).json({ error: "Error fetching data from MySQL" });
    }

    res.status(200).json({ uploads: results });
  });
});

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(port, () =>
  console.log(`Server running on port ${port}🚀`.bgCyan.white)
);
