

import React from "react"

function Dashboard() {
  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="text-3xl font-bold text-black md:text-4xl">Welcome to Ad Analysis Dashboard</h1>
      <p className="text-lg text-gray-600 md:text-xl">Optimize your ad performance with our powerful analysis tools.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {["Total Campaigns", "Active Keywords", "Average ROAS"].map((title, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-black">{title}</h2>
            <p className="text-2xl font-bold text-black md:text-3xl">
              {index === 0 ? "12" : index === 1 ? "1,234" : "3.5x"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard

