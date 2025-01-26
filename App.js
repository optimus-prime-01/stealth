import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Upload from "./pages/Upload"
import Analysis from "./pages/Analysis"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

