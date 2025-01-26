

import React, { useState } from "react"
import Sidebar from "./Sidebar.jsx"
import { Menu } from "lucide-react"

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center p-4 bg-white border-b border-gray-200 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-600">
            <Menu size={24} />
          </button>
          <h1 className="ml-4 text-xl font-bold text-black">Ad Analysis</h1>
        </header>
        <main className="flex-1 p-4 overflow-x-hidden overflow-y-auto md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export default Layout

