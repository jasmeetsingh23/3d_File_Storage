import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import colors from "colors";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

app.post("/signup", async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Check if all fields are provided
  if (!email || !username || !password) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }

  // Check if user already exists (email or username)
  const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(checkQuery, [email, username], (err, results) => {
    if (err) {
      console.error("Error checking user existence:", err);
      return res.status(500).json({ error: "Error checking user existence" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: "Email or username already exists" });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: "Error hashing password" });
      }

      // Insert new user into the database
      const insertQuery =
        "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
      db.query(
        insertQuery,
        [email, username, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Error inserting new user into MySQL:", err);
            return res.status(500).json({ error: "Error inserting new user" });
          }

          // Respond with a success message (no token is sent)
          res.status(201).json({
            message: "User registered successfully",
            // No token is sent now
          });
        }
      );
    });
  });
});

// POST route to handle user login
app.post("/login", (req, res) => {
  const { email, username, password } = req.body;

  // Check if either email or username is provided
  if (!email && !username) {
    return res.status(400).json({ error: "Email or Username is required." });
  }

  // Check if password is provided
  if (!password) {
    return res.status(400).json({ error: "Password is required." });
  }

  // Check if user exists by email or username
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(query, [email, username], async (err, results) => {
    if (err) {
      console.error("Error fetching user from DB:", err);
      return res.status(500).json({ error: "Error logging in." });
    }

    // If no user is found
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const user = results[0]; // Assuming we only get one user (email or username is unique)

    try {
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username }, // Payload
        process.env.JWT_SECRET, // Secret key for signing the token (set this in .env)
        { expiresIn: "1h" } // Token expiration time (1 hour)
      );

      // Send the token to the client
      res.status(200).json({
        message: "Login successful",
        token, // Send the generated token in the response
      });
    } catch (error) {
      console.error("Error comparing password:", error);
      res.status(500).json({ error: "Error logging in." });
    }
  });
});

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
  const { design, front_depth, industry } = req.query; // Get query parameters from the request

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

  // If industry is provided, add it to the query
  if (industry) {
    query += " AND industry = ?";
    queryParams.push(industry);
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

// GET route to get the number of uploaded files grouped by design and front_depth
app.get("/uploads/summary", (req, res) => {
  const query = `
    SELECT 
      design, 
      front_depth, 
      COUNT(*) AS upload_count
    FROM uploads
    GROUP BY design, front_depth
    ORDER BY upload_count DESC;  -- Optional: Order by number of uploads in descending order
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching summary from MySQL:", err);
      return res
        .status(500)
        .json({ error: "Error fetching summary from MySQL" });
    }

    res.status(200).json({ summary: results });
  });
});

// GET route to get the design count list and the total count of all uploads
app.get("/uploads/count", (req, res) => {
  // Query to get the count of uploads for each design
  const query = `
    SELECT 
      design, 
      COUNT(*) AS upload_count
    FROM uploads
    GROUP BY design
    ORDER BY upload_count DESC;
  `;

  db.query(query, (err, designCounts) => {
    if (err) {
      console.error("Error fetching design count from MySQL:", err);
      return res.status(500).json({ error: "Error fetching design count" });
    }

    // Query to get the total count of all uploads
    const totalQuery = "SELECT COUNT(*) AS total_uploads FROM uploads";

    db.query(totalQuery, (err, totalCountResults) => {
      if (err) {
        console.error("Error fetching total upload count:", err);
        return res
          .status(500)
          .json({ error: "Error fetching total upload count" });
      }

      const totalUploads = totalCountResults[0].total_uploads;

      // Return both the design count list and the total upload count
      res.status(200).json({
        design_counts: designCounts,
        total_uploads: totalUploads,
      });
    });
  });
});

// GET route to fetch all unique industries
app.get("/industries", (req, res) => {
  const query = "SELECT DISTINCT industry FROM uploads";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching industries from MySQL:", err);
      return res
        .status(500)
        .json({ error: "Error fetching industries from MySQL" });
    }

    // Extract only the industry names from results
    const industries = results.map((row) => row.industry);

    res.status(200).json({ industries });
  });
});

// PUT route to edit an existing upload entry
app.put(
  "/uploads/:fileNumber",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  (req, res) => {
    const { fileNumber } = req.params; // Get the unique file number from URL parameter
    const { design, front_depth, industry } = req.body; // Get data from the request body

    // Validate and process the fields (if not provided, set to undefined)
    const updatedDesign = design !== undefined ? design : null;
    const updatedFrontDepth = front_depth !== undefined ? front_depth : null;
    const updatedIndustry = industry !== undefined ? industry : null;

    // Check if new files are uploaded and generate file URLs
    const fileUrl1 = req.files.file1
      ? `http://localhost:8080/uploads/${req.files.file1[0].filename}`
      : null;
    const fileUrl2 = req.files.file2
      ? `http://localhost:8080/uploads/${req.files.file2[0].filename}`
      : null;

    // First, check if the record exists
    const checkQuery = "SELECT * FROM uploads WHERE file_number = ?";
    db.query(checkQuery, [fileNumber], (err, results) => {
      if (err) {
        console.error("Error fetching data from MySQL:", err);
        return res
          .status(500)
          .json({ error: "Error fetching data from MySQL" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Record not found" });
      }

      // Get the current values from the database to avoid overwriting with NULL
      const currentRecord = results[0];
      const currentDesign = currentRecord.design;
      const currentFrontDepth = currentRecord.front_depth;
      const currentIndustry = currentRecord.industry;
      const currentFileUrl1 = currentRecord.file_url_1;
      const currentFileUrl2 = currentRecord.file_url_2;

      // If no new file is provided, keep the current file URL
      const finalFileUrl1 = fileUrl1 || currentFileUrl1;
      const finalFileUrl2 = fileUrl2 || currentFileUrl2;

      // Build the SQL query to update only the fields that are provided
      const query = `
      UPDATE uploads
      SET 
        design = IFNULL(?, design),
        front_depth = IFNULL(?, front_depth),
        industry = IFNULL(?, industry),
        file_url_1 = IFNULL(?, file_url_1),
        file_url_2 = IFNULL(?, file_url_2)
      WHERE file_number = ?
    `;

      const queryParams = [
        updatedDesign, // Update design if provided, else keep the current value
        updatedFrontDepth, // Update front_depth if provided, else keep the current value
        updatedIndustry, // Update industry if provided, else keep the current value
        finalFileUrl1, // Update file_url_1 if a new file is uploaded, else keep current
        finalFileUrl2, // Update file_url_2 if a new file is uploaded, else keep current
        fileNumber, // The unique file number to identify which record to update
      ];

      db.query(query, queryParams, (err, result) => {
        if (err) {
          console.error("Error updating data in MySQL:", err);
          return res
            .status(500)
            .json({ error: "Error updating data in MySQL" });
        }

        res.status(200).json({
          message: "Data updated successfully",
          fileUrls: { file1: finalFileUrl1, file2: finalFileUrl2 },
        });
      });
    });
  }
);

// DELETE route to delete an upload by its unique file number

// Get the directory name using import.meta.url (for ESM compatibility)

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.delete("/uploads/:fileNumber", (req, res) => {
  const { fileNumber } = req.params; // Get the unique file number from URL parameter

  // First, check if the record exists
  const checkQuery = "SELECT * FROM uploads WHERE file_number = ?";
  db.query(checkQuery, [fileNumber], (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      return res.status(500).json({ error: "Error fetching data from MySQL" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    // Get the file URLs from the database record
    const record = results[0];
    const file1Path = path.join(
      __dirname,
      "uploads",
      path.basename(record.file_url_1)
    );
    const file2Path = path.join(
      __dirname,
      "uploads",
      path.basename(record.file_url_2)
    );

    // Delete files from the server
    const deleteFiles = [];
    if (record.file_url_1) deleteFiles.push(file1Path);
    if (record.file_url_2) deleteFiles.push(file2Path);

    // Remove files if they exist
    deleteFiles.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Error deleting file ${filePath}:`, err);
        });
      }
    });

    // Delete the record from the database
    const deleteQuery = "DELETE FROM uploads WHERE file_number = ?";
    db.query(deleteQuery, [fileNumber], (err, result) => {
      if (err) {
        console.error("Error deleting record from MySQL:", err);
        return res
          .status(500)
          .json({ error: "Error deleting record from MySQL" });
      }

      res.status(200).json({
        message: "Record and files deleted successfully",
      });
    });
  });
});

// API to handle form submission
// app.post(
//   "/submit-inquiry",
//   upload.fields([
//     { name: "floorPlan", maxCount: 1 },
//     { name: "logoFiles", maxCount: 1 },
//   ]),
//   (req, res) => {
//     const {
//       companyName,
//       contactPerson,
//       contactEmail,
//       contactNumber,
//       website,
//       eventName,
//       venueCity,
//       eventDate,
//       stallSize,
//       sidesOpenStall,
//       brandColor,
//       meetingRoomRequired,
//       storeRoomRequired,
//       tvLedWallRequired,
//       productDisplay,
//       seatingRequirements,
//       numberOfProducts,
//       sizeOfProducts,
//       weightOfProducts,
//       deadline,
//       specificInformation,
//       suggestedBudget,
//     } = req.body;

//     const floorPlanUrl = req.files["floorPlan"]
//       ? `/uploads/${req.files["floorPlan"][0].filename}`
//       : "";
//     const logoFilesUrl = req.files["logoFiles"]
//       ? `/uploads/${req.files["logoFiles"][0].filename}`
//       : "";

//     // Insert form data into MySQL database
//     const query = `INSERT INTO inquiry_form (
//     company_name,
//     contact_person,
//     contact_email,
//     contact_number,
//     website,
//     event_name,
//     venue_city,
//     event_date,
//     stall_size,
//     sides_open_stall,
//     floor_plan_url,
//     logo_files_url,
//     brand_color,
//     meeting_room_required,
//     store_room_required,
//     tv_led_wall_required,
//     product_display,
//     seating_requirements,
//     number_of_products,
//     size_of_products,
//     weight_of_products,
//     deadline,
//     specific_information,
//     suggested_budget
//   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     const values = [
//       companyName,
//       contactPerson,
//       contactEmail,
//       contactNumber,
//       website,
//       eventName,
//       venueCity,
//       eventDate,
//       stallSize,
//       sidesOpenStall,
//       floorPlanUrl,
//       logoFilesUrl,
//       brandColor,
//       meetingRoomRequired,
//       storeRoomRequired,
//       tvLedWallRequired,
//       productDisplay,
//       JSON.stringify(seatingRequirements), // Storing seating requirements as a JSON string
//       numberOfProducts,
//       sizeOfProducts,
//       weightOfProducts,
//       deadline,
//       specificInformation,
//       suggestedBudget,
//     ];

//     db.query(query, values, (err, results) => {
//       if (err) {
//         console.error("Error inserting data into the database:", err);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
//       res
//         .status(200)
//         .json({ message: "Form submitted successfully", data: results });
//     });
//   }
// );

// Create a transporter using SMTP or Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like 'smtp.mailtrap.io' if you prefer
  auth: {
    user: "expobuddy.in@gmail.com", // Your email address (Admin email)
    pass: "expobuddy@2212", // Your email password (use environment variables in production)
  },
});

app.post(
  "/submit-inquiry",
  upload.fields([
    { name: "floorPlan", maxCount: 1 },
    { name: "logoFiles", maxCount: 1 },
  ]),
  (req, res) => {
    const {
      companyName,
      contactPerson,
      contactEmail,
      contactNumber,
      website,
      eventName,
      venueCity,
      eventDate,
      stallSize,
      sidesOpenStall,
      brandColor,
      meetingRoomRequired,
      storeRoomRequired,
      tvLedWallRequired,
      productDisplay,
      seatingRequirements,
      numberOfProducts,
      sizeOfProducts,
      weightOfProducts,
      deadline,
      specificInformation,
      suggestedBudget,
    } = req.body;

    const floorPlanUrl = req.files["floorPlan"]
      ? `/uploads/${req.files["floorPlan"][0].filename}`
      : "";
    const logoFilesUrl = req.files["logoFiles"]
      ? `/uploads/${req.files["logoFiles"][0].filename}`
      : "";

    // Insert form data into MySQL database
    const query = `INSERT INTO inquiry_form (
      company_name,
      contact_person,
      contact_email,
      contact_number,
      website,
      event_name,
      venue_city,
      event_date,
      stall_size,
      sides_open_stall,
      floor_plan_url,
      logo_files_url,
      brand_color,
      meeting_room_required,
      store_room_required,
      tv_led_wall_required,
      product_display,
      seating_requirements,
      number_of_products,
      size_of_products,
      weight_of_products,
      deadline,
      specific_information,
      suggested_budget
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      companyName,
      contactPerson,
      contactEmail,
      contactNumber,
      website,
      eventName,
      venueCity,
      eventDate,
      stallSize,
      sidesOpenStall,
      floorPlanUrl,
      logoFilesUrl,
      brandColor,
      meetingRoomRequired,
      storeRoomRequired,
      tvLedWallRequired,
      productDisplay,
      JSON.stringify(seatingRequirements), // Storing seating requirements as a JSON string
      numberOfProducts,
      sizeOfProducts,
      weightOfProducts,
      deadline,
      specificInformation,
      suggestedBudget,
    ];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting data into the database:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // After successful form submission, send an email to the admin
      const mailOptions = {
        from: "expobuddy.in@gmail.com", // Sender email
        to: "expobuddy.in@gmail.com", // Admin email
        subject: "New Inquiry Form Submission", // Email subject
        text: `
          A new inquiry form has been submitted with the following details:

          Company Name: ${companyName}
          Contact Person: ${contactPerson}
          Contact Email: ${contactEmail}
          Contact Number: ${contactNumber}
          Website: ${website}
          Event Name: ${eventName}
          Venue City: ${venueCity}
          Event Date: ${eventDate}
          Stall Size: ${stallSize}
          Sides Open Stall: ${sidesOpenStall}
          Brand Color: ${brandColor}
          Meeting Room Required: ${meetingRoomRequired}
          Store Room Required: ${storeRoomRequired}
          TV/LED Wall Required: ${tvLedWallRequired}
          Product Display: ${productDisplay}
          Number of Products: ${numberOfProducts}
          Size of Products: ${sizeOfProducts}
          Weight of Products: ${weightOfProducts}
          Deadline: ${deadline}
          Specific Information: ${specificInformation}
          Suggested Budget: ${suggestedBudget}
          
          Floor Plan URL: ${floorPlanUrl}
          Logo Files URL: ${logoFilesUrl}
          
          Seating Requirements: ${JSON.stringify(seatingRequirements)}

          Thank you.
        `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
          return res.status(500).json({ error: "Error sending email" });
        }
        console.log("Email sent:", info.response);
      });

      res
        .status(200)
        .json({ message: "Form submitted successfully", data: results });
    });
  }
);

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(port, () =>
  console.log(`Server running on port ${port}🚀`.bgCyan.white)
);
