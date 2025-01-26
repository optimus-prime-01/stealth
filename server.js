

// const express = require("express")
// const multer = require("multer")
// const path = require("path")
// const app = express()
// const upload = multer({ dest: "uploads/" })

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.json({ message: "File uploaded successfully" })
// })

// app.get("/api/analyze", (req, res) => {
//   const mockAnalysis = `
//     The ad campaign shows promising results with a high click-through rate (CTR) of 3.5%.
//     Keywords "product X" and "best Y" are performing exceptionally well, with ROAS above 4.
//     However, "generic term Z" has a high ACOS and may need optimization.
//     Overall, the campaign's ROAS is 2.8, which is above the industry average.
//     Consider allocating more budget to high-performing keywords and pausing or adjusting bids for underperforming ones.
//   `
//   res.json({ summary: mockAnalysis })
// })

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


// import express from "express";
// import multer from "multer";
// import path from "path";
// import { fileURLToPath } from "url";

// // Necessary for __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const upload = multer({ dest: "uploads/" });

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//   res.json({ message: "File uploaded successfully", file: req.file });
// });

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("/api/analyze", (req, res) => {
//   const mockAnalysis = `
//     The ad campaign shows promising results with a high click-through rate (CTR) of 3.5%.
//     Keywords "product X" and "best Y" are performing exceptionally well, with ROAS above 4.
//     However, "generic term Z" has a high ACOS and may need optimization.
//     Overall, the campaign's ROAS is 2.8, which is above the industry average.
//     Consider allocating more budget to high-performing keywords and pausing or adjusting bids for underperforming ones.
//   `;
//   res.json({ summary: mockAnalysis });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Import necessary modules
// import express from "express";
// import multer from "multer";
// import path from "path";
// import axios from "axios"; 
// import { fileURLToPath } from "url";

// // Configure __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// const app = express();


// const upload = multer({ dest: "uploads/" });


// app.post("/api/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//   res.json({
//     message: "File uploaded successfully",
//     file: req.file,
//   });
// });


// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// app.get("/api/analyze", async (req, res) => {
//   try {
    
//     const response = await axios.get("http://127.0.0.1:5000/api/analyze");
   
//     res.json(response.data);
//   } catch (error) {
   
//     res.status(500).json({ error: "Failed to fetch analysis", details: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));




import express from "express";
import multer from "multer";
import path from "path";
import axios from "axios"; 
import { fileURLToPath } from "url";

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set up file upload configuration
const upload = multer({ dest: "uploads/" });

// Handle file upload
app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // You can add your logic to process the file here. 
    // For example, you can send the file to an analysis service.

    // Simulating analysis based on uploaded file
    const analysisResponse = await axios.get("http://127.0.0.1:5000/api/analyze");
    
    // Sample analysis data (You can replace this with the actual analysis)
    const analysisData = {
      summary: {
        totalSales: "$0.00",
        orders: 15,
        clickThroughRate: "50.00%",
        impressions: 2974,
        clicks: 149,
        roas: 1.81,
        acoss: "55.27%",
      },
      bestPerformingKeywords: [
        { keyword: "face mask covid acne prone skin", ctr: "5000%" },
        { keyword: "covid and flu mask", ctr: "5000%" },
        { keyword: "mask for covid 4 layers", ctr: "5000%" },
      ],
      worstPerformingKeywords: [
        { keyword: "face masks for covid", ctr: "16.00%" },
        { keyword: "face mask covid-19 protection", ctr: "192.00%" },
      ],
      keywordsToKeep: [
        "masks disposable 100 pack", 
        "mascarillas desechables", 
        "covid masks for women",
        "4ply disposable face mask individually wrapped black"
      ],
      keywordsToRemove: ["black covid mask", "covid mask"],
    };

    // Respond with the file and analysis data
    res.json({
      message: "File uploaded and analyzed successfully",
      file: req.file,
      analysis: analysisData,
    });
  } catch (error) {
    // Handle any error that occurs during the analysis process
    res.status(500).json({ error: "Failed to fetch analysis", details: error.message });
  }
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
