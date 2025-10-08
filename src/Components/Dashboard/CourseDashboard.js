import React from 'react'
import { Link } from 'react-router-dom'

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

    {/* <script>
      function updateDateTime() {
        const now = new Date();
        document.getElementById("currentDate").textContent = now.toLocaleDateString("en-US", {
          weekday: "short", year: "numeric", month: "short", day: "numeric"
        });
        document.getElementById("currentTime").textContent = now.toLocaleTimeString();
      }
      setInterval(updateDateTime, 1000);
      updateDateTime();

      // Chart.js Attendance Graph
      const ctx = document.getElementById('attendanceChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['20 Apr', '21 Apr', '22 Apr', '23 Apr', '24 Apr', '25 Apr', '26 Apr'],
          datasets: [{
            label: 'Attendance %',
            data: [10, 40, 60, 45, 30, 35, 20],
            borderColor: 'rgb(59,130,246)',
            fill: false,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, max: 100 }
          }
        }
      });
    </script> */}
  </div>
  <script src="../sidebar/sidebar.js"></script>
</div>
    </div>
  )
}

export default CourseDashboard
