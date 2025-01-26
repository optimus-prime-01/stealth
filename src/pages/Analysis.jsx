

// import React, { useState, useEffect } from "react"

// function Analysis() {
//   const [analysis, setAnalysis] = useState(null)
//   const [loading, setLoading] = useState(false)

//   const fetchAnalysis = async () => {
//     setLoading(true)
//     try {
//       const response = await fetch("/analyze")
//       if (response.ok) {
//         const data = await response.json()
//         setAnalysis(data.summary)
//       } else {
//         console.error("Analysis failed")
//       }
//     } catch (error) {
//       console.error("Error fetching analysis:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchAnalysis()
//   }, [])

//   return (
//     <div className="space-y-6 md:space-y-8">
//       <h1 className="text-3xl font-bold text-black md:text-4xl">Ad Performance Analysis</h1>
//       {loading ? (
//         <p className="text-gray-600">Loading analysis...</p>
//       ) : analysis ? (
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <h2 className="mb-2 text-xl font-semibold text-black">Performance Summary</h2>
//           <p className="mb-4 text-gray-600">Based on the uploaded ad data, here's a summary of the ad's performance:</p>
//           <p className="text-sm text-black whitespace-pre-line md:text-base">{analysis}</p>
//         </div>
//       ) : (
//         <p className="text-gray-600">No analysis available. Please upload ad data first.</p>
//       )}
//       <button
//         onClick={fetchAnalysis}
//         disabled={loading}
//         className={`w-full md:w-auto px-4 py-2 rounded ${
//           loading ? "bg-gray-200 text-gray-600 cursor-not-allowed" : "bg-black text-white"
//         }`}
//       >
//         Refresh Analysis
//       </button>
//     </div>
//   )
// }

// export default Analysis


// import React, { useState, useEffect } from "react";

// function Analysis() {
//   const [analysis, setAnalysis] = useState(null); // Stores the analysis data
//   const [loading, setLoading] = useState(false); // Indicates loading state
//   const [error, setError] = useState(null); // Stores any error message

//   // Fetch analysis data from the server
//   const fetchAnalysis = async () => {
//     setLoading(true);
//     setError(null); // Reset any previous errors
//     try {
//       const response = await fetch("/analyze");

//       if (!response.ok) {
//         throw new Error(`Server returned status ${response.status}`);
//       }

//       const data = await response.json();

//       if (data && data.summary) {
//         setAnalysis(data.summary); // Update analysis state
//       } else {
//         throw new Error("Unexpected response structure");
//       }
//     } catch (err) {
//       console.error("Error fetching analysis:", err);
//       setError(err.message); // Set the error message for the user
//     } finally {
//       setLoading(false); // End the loading state
//     }
//   };

//   // Fetch analysis when the component mounts
//   useEffect(() => {
//     fetchAnalysis();
//   }, []);

//   return (
//     <div className="space-y-6 md:space-y-8">
//       {/* Title */}
//       <h1 className="text-3xl font-bold text-black md:text-4xl">Ad Performance Analysis</h1>

//       {/* Loading Spinner */}
//       {loading ? (
//         <div className="flex items-center space-x-2">
//           <div className="inline-block w-6 h-6 border-4 border-gray-500 rounded-full spinner-border animate-spin"></div>
//           <p className="text-gray-600">Loading analysis...</p>
//         </div>
//       ) : error ? (
//         // Error Message
//         <p className="text-red-500">Error: {error}</p>
//       ) : analysis ? (
//         // Analysis Summary
//         <div className="p-4 border border-gray-200 rounded-lg">
//           <h2 className="mb-2 text-xl font-semibold text-black">Performance Summary</h2>
//           <p className="mb-4 text-gray-600">
//             Based on the uploaded ad data, here's a summary of the ad's performance:
//           </p>
//           <p className="text-sm text-black whitespace-pre-line md:text-base">{analysis}</p>
//         </div>
//       ) : (
//         // No Data Message
//         <p className="text-gray-600">No analysis available. Please upload ad data first.</p>
//       )}

//       {/* Refresh Button */}
//       <button
//         onClick={fetchAnalysis}
//         disabled={loading}
//         className={`w-full md:w-auto px-4 py-2 rounded ${
//           loading
//             ? "bg-gray-200 text-gray-600 cursor-not-allowed"
//             : "bg-black text-white hover:bg-gray-800"
//         }`}
//       >
//         Refresh Analysis
//       </button>
//     </div>
//   );
// }

// export default Analysis;



import React, { useState, useEffect } from "react";

function Analysis() {
  const [analysis, setAnalysis] = useState(null); // Stores the analysis data
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(null); // Tracks any errors

  // Fetch analysis data
  const fetchAnalysis = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch("http://localhost:3000/analyze"); // Update backend URL
  
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (data && data.analysis) {
            setAnalysis(data.analysis);
          } else {
            throw new Error("Unexpected response structure.");
          }
        } else {
          throw new Error("Server returned a non-JSON response.");
        }
      } else {
        throw new Error(`Analysis failed with status ${response.status}.`);
      }
    } catch (error) {
      console.error("Error fetching analysis:", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="text-3xl font-bold text-black md:text-4xl">Ad Performance Analysis</h1>
      {loading ? (
        <p className="text-gray-600">Loading analysis...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : analysis ? (
        <div className="p-4 border border-gray-200 rounded-lg">
          <h2 className="mb-2 text-xl font-semibold text-black">Performance Summary</h2>
          <p className="mb-4 text-gray-600">
            Based on the uploaded ad data, here's a summary of the ad's performance:
          </p>
          <p className="text-sm text-black whitespace-pre-line md:text-base">{analysis}</p>
        </div>
      ) : (
        <p className="text-gray-600">No analysis available. Please upload ad data first.</p>
      )}
      <button
        onClick={fetchAnalysis}
        disabled={loading}
        className={`w-full md:w-auto px-4 py-2 rounded ${
          loading ? "bg-gray-200 text-gray-600 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        Refresh Analysis
      </button>
    </div>
  );
}

export default Analysis;


///////////

