import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const CourseView = () => {
    const location = useLocation()
    const { course } = location.state || {}

  return (
    <div className='w-full'>
      <div className="bg-[#020221] text-white font-sans flex flex-col md:flex-row">
  <div id="sidebar-root" className=""></div>

  <div className="flex-1 min-h-screen flex flex-col">
    
    <header className="flex flex-wrap items-center justify-between gap-4 p-6">
      <div className="flex items-center space-x-6">
        <div>
          <p id="currentDate" className="text-gray-400 text-sm"></p>
          <p id="currentTime" className="text-lg font-bold"></p>
        </div>
      </div>
    </header>

    <section className="px-6">
    <div>
      <div className="bg-[#0707418c] m-auto text-center py-2 px-6 w-[30rem] rounded-xl">
          <p className="text-gray-500 text-xl font-bold">{course?.name || "Unknown Course"}</p>
          <p className="text-gray-400 text-[12px] pt-2">{course?.code || "N/A"}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-10 mb-10 px-[10px]">
        <Link to="/courseStudent">
          <div className="bg-[#0707418c] p-6 w-[20rem] rounded-xl shadow-md">
          <p className="text-gray-500 text-xl font-bold">100</p>
          <p className="text-gray-400 text-[12px] pt-3">Students Registered</p>
          </div>
        </Link>
        <div className="bg-[#0707418c] p-6 w-[20rem] rounded-xl shadow-md">
          <p className="text-gray-500 text-xl font-bold">70</p>
          <p className="text-gray-400 text-[12px] pt-3">Students Present</p>
        </div>
        <div className="bg-[#0707418c] p-6 w-[20rem] rounded-xl shadow-md">
          <p className="text-gray-500 text-xl font-bold">70</p>
          <p className="text-gray-400 text-[12px] pt-3">Students Present</p>
        </div>
      </div>
    </div>

       <div className="bg-[#0707418c] p-6 rounded-xl shadow-md mb-10 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Attendance</h3>
        <canvas id="attendanceChart" height="100"></canvas>
      </div> 
       <div className="bg-[#0707418c] p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to='/newSession'><span className="block bg-blue-600 hover:bg-blue-700 text-center py-2 rounded-lg">Start Session</span></Link>
          <a href="records.html" className="block bg-green-600 hover:bg-green-700 text-center py-2 rounded-lg">View Records</a>
          <Link to='/addCourse'><span className="block bg-purple-600 hover:bg-purple-700 text-center py-2 rounded-lg">Add Course</span></Link>
        </div>
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
</div>
    </div>
  )
}

export default CourseView
