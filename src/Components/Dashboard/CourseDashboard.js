import React from 'react'

const CourseDashboard = () => {
  return (
    <div className='w-full'>
      <div className="bg-[#020221] text-white font-sans flex flex-col md:flex-row">
        <div id="sidebar-root" className=""></div>

        <div className="flex-1 min-h-screen flex flex-col">

          <header className="flex flex-wrap items-center justify-between gap-4 p-6">
            <h1 className="text-xl font-semibold">✅ Smart Attendance</h1>
            <div className="flex items-center space-x-6">
              <div>
                <p id="currentDate" className="text-gray-400 text-sm"></p>
                <p id="currentTime" className="text-lg font-bold"></p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="material-icons">person</span>
              </div>
            </div>
          </header>
          <section className="px-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-[#0707418c] p-6 rounded-xl shadow-md">
                <p className="text-3xl font-bold" id="totalStudents">250</p>
                <p className="text-gray-400">Students</p>
              </div>
              <div className="bg-[#0707418c] p-6 rounded-xl shadow-md">
                <p className="text-3xl font-bold text-green-400" id="presentToday">197</p>
                <p className="text-gray-400">Present Today</p>
              </div>
              <div className="bg-[#0707418c] p-6 rounded-xl shadow-md">
                <p className="text-3xl font-bold text-blue-400" id="attendancePercent">78.8%</p>
                <p className="text-gray-400">Attendance</p>
              </div>
              <div className="bg-[#0707418c] p-6 rounded-xl shadow-md">
                <p className="text-3xl font-bold text-purple-400" id="classNameesToday">5</p>
                <p className="text-gray-400">classes Today</p>
              </div>
            </div>
            <div className="bg-[#0707418c] p-6 rounded-xl shadow-md mb-10 overflow-x-auto">
              <h3 className="text-lg font-semibold mb-4">Attendance</h3>
              <canvas id="attendanceChart" height="100"></canvas>
            </div>

          </section>
        </div>
      </div>
    </div>
  )
}

export default CourseDashboard
