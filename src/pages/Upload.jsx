

// import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { UploadIcon } from "lucide-react"

// function Upload() {
//   const [file, setFile] = useState(null)
//   const navigate = useNavigate()

//   const handleFileChange = (event) => {
//     if (event.target.files) {
//       setFile(event.target.files[0])
//     }
//   }

//   const handleUpload = async () => {
//     if (!file) return

//     const formData = new FormData()
//     formData.append("file", file)

//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       })

//       if (response.ok) {
//         navigate("/analysis")
//       } else {
//         console.error("Upload failed")
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error)
//     }
//   }

//   return (
//     <div className="space-y-6 md:space-y-8">
//       <h1 className="text-3xl font-bold text-black md:text-4xl">Upload Ad Data</h1>
//       <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
//         <input
//           type="file"
//           accept=".csv"
//           onChange={handleFileChange}
//           className="w-full p-2 border border-gray-300 rounded md:w-auto"
//         />
//         <button
//           onClick={handleUpload}
//           disabled={!file}
//           className={`w-full md:w-auto px-4 py-2 rounded flex items-center justify-center ${
//             file ? "bg-black text-white" : "bg-gray-200 text-gray-600 cursor-not-allowed"
//           }`}
//         >
//           {file ? "Analyze" : "Upload"}
//           <UploadIcon className="w-4 h-4 ml-2" />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Upload

// import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { UploadIcon } from "lucide-react"

// function Upload() {
//   const [file, setFile] = useState(null)
//   const [uploading, setUploading] = useState(false)
//   const [error, setError] = useState(null)
//   const navigate = useNavigate()

//   const handleFileChange = (event) => {
//     if (event.target.files) {
//       setFile(event.target.files[0])
//       setError(null)
//     }
//   }

//   const handleUpload = async () => {
//     if (!file) return

//     setUploading(true)
//     setError(null)

//     const formData = new FormData()
//     formData.append("file", file)

//     try {
//       const response = await fetch("/analyze", {
//         method: "POST",
//         body: formData,
//       })

//       if (response.ok) {
//         navigate("/analysis")
//       } else {
//         const errorData = await response.json()
//         setError(errorData.error || "Upload failed. Please try again.")
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error)
//       setError("An unexpected error occurred. Please try again.")
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <div className="space-y-6 md:space-y-8">
//       <h1 className="text-3xl font-bold text-black md:text-4xl">Upload Ad Data</h1>
//       <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
//         <input
//           type="file"
//           accept=".csv"
//           onChange={handleFileChange}
//           className="w-full p-2 border border-gray-300 rounded md:w-auto"
//           disabled={uploading}
//         />
//         <button
//           onClick={handleUpload}
//           disabled={!file || uploading}
//           className={`w-full md:w-auto px-4 py-2 rounded flex items-center justify-center ${
//             file && !uploading ? "bg-black text-white" : "bg-gray-200 text-gray-600 cursor-not-allowed"
//           }`}
//         >
//           {uploading ? "Uploading..." : file ? "Analyze" : "Upload"}
//           {!uploading && <UploadIcon className="w-4 h-4 ml-2" />}
//         </button>
//       </div>
//       {error && <p className="text-red-500">{error}</p>}
//     </div>
//   )
// }

// export default Upload


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadIcon, Loader } from "lucide-react";

function Upload() {
  const [file, setFile] = useState(null); // Stores the uploaded file
  const [uploading, setUploading] = useState(false); // Tracks the upload state
  const [error, setError] = useState(null); // Tracks any errors
  const navigate = useNavigate();

  // Handles file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;

    if (selectedFile) {
      if (!selectedFile.name.endsWith(".csv")) {
        setError("Please upload a valid .csv file.");
        setFile(null);
      } else {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
  
    setUploading(true);
    setError(null);
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:3000/analyze", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (data.analysis) {
            navigate("/analysis");
          } else {
            throw new Error("Unexpected response structure.");
          }
        } else {
          throw new Error("Server returned a non-JSON response.");
        }
      } else {
        const errorData = await response.json().catch(() => null);
        if (response.status === 500) {
          setError("Server error occurred. Please try again later.");
        } else if (response.status === 400) {
          setError(errorData?.error || "Invalid file or data. Please check and try again.");
        } else {
          setError(errorData?.error || `Upload failed with status ${response.status}.`);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="text-3xl font-bold text-black md:text-4xl">Upload Ad Data</h1>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        {/* File Input */}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded md:w-auto"
          disabled={uploading}
        />
        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`w-full md:w-auto px-4 py-2 rounded flex items-center justify-center ${
            file && !uploading
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-600 cursor-not-allowed"
          }`}
        >
          {uploading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : file ? (
            <>
              Analyze <UploadIcon className="w-4 h-4 ml-2" />
            </>
          ) : (
            "Upload"
          )}
        </button>
      </div>
      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Upload;
