
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Upload, BarChart, X } from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Upload, label: "Upload", href: "/upload" },
  { icon: BarChart, label: "Analysis", href: "/analysis" },
]

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  return (
    <nav
      className={`
      lg:w-64 bg-gray-100 h-full fixed lg:static
      transition-all duration-300 ease-in-out z-30
      ${isOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-64"}
    `}
    >
      <div className="flex items-center justify-between p-4 lg:justify-start">
        <h2 className="text-xl font-bold text-black">Ad Analysis</h2>
        <button onClick={onClose} className="text-gray-500 lg:hidden hover:text-gray-600">
          <X size={24} />
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className={`flex items-center gap-2 px-4 py-2 text-sm ${
                location.pathname === item.href ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={onClose}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar

