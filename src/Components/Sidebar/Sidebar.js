import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) setIsOpen(false)
  }

  return (
    <div className="flex">
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        ></div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-3 text-white bg-[#020217] fixed top-4 left-4 z-50 rounded-md shadow-lg"
      >
        {isOpen ? "✖" : "☰"}
      </button>
      <aside
        id="global-sidebar"
        className={`fixed top-0 left-0 min-h-screen w-64 bg-[#020217] text-gray-200 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out z-50
        lg:translate-x-0 lg:static lg:block overflow-y-auto`}
      >
        <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.03)] sticky top-0 bg-[#020217] z-10">
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold">Smart Attendance</div>
          </div>
        </div>
        <nav className="flex flex-col gap-7 px-2 py-4 space-y-1">
          {[
            { to: '/', icon: 'fa-th-large', label: 'Dashboard' },
            { to: '/registerAdmin', icon: 'fa-user', label: 'Add Lecturer' },
            { to: '/addCourse', icon: 'fa-clipboard-list', label: 'Add Course' },
            { to: '/registerStudent', icon: 'fa-graduation-cap', label: 'Add New Student' },
          ].map((item, index) => (
            <Link to={item.to}>
              <div
                key={index}
                onClick={handleLinkClick}
                className="side-link flex gap-4 items-center flex-col py-3 rounded-lg mx-7 cursor-pointer hover:bg-[rgba(255,255,255,0.05)]"
              >
                <i className={`fa-solid text-[2.5rem] ${item.icon}`}></i>
                <p>{item.label}</p>
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-6 rounded-xl">
          <Link to='/newSession' onClick={handleLinkClick}>
            <div className='side-link flex gap-4 items-center flex-col py-3 rounded-lg mx-7 cursor-pointer hover:bg-[rgba(255,255,255,0.05)]'>
              <i className="fa-solid text-[3rem] fa-chalkboard-user"></i>
              <span className="text-center py-2">
                Start Session
              </span>
            </div>
          </Link>
        </div>
        <div className="mt-auto px-4 border-t border-[rgba(255,255,255,0.03)] sticky bottom-0 bg-[#020217]">
          <Link
            to=""
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[rgba(255,255,255,0.03)]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 3v4M8 3v4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </div >
  )
}

export default Sidebar
