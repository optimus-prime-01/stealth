import React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Upload from "./pages/Upload.jsx"
import Analysis from "./pages/Analysis.jsx"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Layout>
  )
}

export default App

