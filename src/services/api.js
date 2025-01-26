// import axios from "axios"

// const API_URL = "http://localhost:3000" // Replace with your actual API URL

// export const uploadCSV = async (formData) => {
//   try {
//     const response = await axios.post(`${API_URL}/upload`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     return response.data
//   } catch (error) {
//     throw new Error(error.response?.data?.error || "An error occurred while uploading the file")
//   }
// }

// export const getAnalysis = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/analyze`)
//     return response.data
//   } catch (error) {
//     throw new Error(error.response?.data?.error || "An error occurred while fetching the analysis")
//   }
// }

