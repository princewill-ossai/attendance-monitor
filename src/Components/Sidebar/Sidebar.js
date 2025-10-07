import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex">
      {/* Hamburger Button  */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="lg:hidden p-4 text-white bg-[#020217] fixed top-4 left-4 z-50 rounded-md"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <aside
        id="global-sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-[#020217] text-gray-200 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block`}
      >
        <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.03)]">
          <div className="flex items-center gap-3">
            
            <div className="text-lg font-semibold">Smart Attendance</div>
          </div>
        </div>

        <nav className="flex flex-col gap-14 px-2 py-4 space-y-1">
          <p className="side-link flex gap-4 items-center flex-col py-3 rounded-lg mx-7">
            <i className="fa-solid fa-th-large fa-2x"></i>
            <Link to='/dashboard'><span>Dashboard</span></Link>
          </p>
          <div className="side-link flex gap-4 items-center flex-col py-3 rounded-lg mx-7">
            <i className="fa-solid text-[2.5rem] fa-clipboard-list"></i>
            <Link to='/registerStudent'><p>Add New Student</p></Link>
          </div>
          <div className="side-link flex gap-4 items-center flex-col py-3 rounded-lg mx-7">
            <i className="fa-solid text-[2.5rem] fa-database"></i>
            <Link to="/record"><p>Record</p></Link>
          </div>
          <div className="side-link flex gap-4 items-center flex-col py-3 rounded-lg mx-7">
            <i className="fa-solid text-[2.5rem] fa-user"></i>
            <Link to="/indexdb"><p>Students</p></Link>
          </div>
          
        </nav>

        <div className="mt-auto px-4 pt-[10rem] border-t border-[rgba(255,255,255,0.03)]">
          <Link to="/adminLogin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[rgba(255,255,255,0.03)]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
