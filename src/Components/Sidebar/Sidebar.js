import React from 'react'
import { Link } from 'react-router-dom'
import faceImg from "../../asset/faceIcon.jpeg"

const Sidebar = () => {
    return (
        <div>
            <aside id="global-sidebar" className="w-65 bg-[#020217] min-h-screen text-gray-200">
                <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.03)]">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-800 w-9 h-9 rounded-md flex items-center justify-center text-2xl">✔️</div>
                        <div className="text-lg font-semibold">Smart Attendance</div>
                    </div>
                </div>

                <nav className="flex flex-col gap-14 px-2 py-4 space-y-1">
                    <p className="side-link flex gap-4 items-center flex-col py-3 rounded-lg mx-7"><i className="fa-solid fa-th-large fa-2x"></i>
                        <Link to='/dashboard'><span>Dashboard</span></Link>
                    </p>
                    <a className="side-link flex gap-4 items-center flex-col py-3 rounded-lg mx-7" href="../attebdance-record/attendanceResord.html">
                        <i className="fa-solid text-[2.5rem] fa-clipboard-list"></i>
                        <Link to='/register'><p>Add new student</p></Link>
                    </a>
                    <a className="side-link flex gap-4 items-center flex-col py-3 rounded-lg mx-7" href="#">
                        <i className="fa-solid text-[2.5rem] fa-database"></i>
                        <Link to="/record"><p>Record</p></Link>
                    </a>
                    <a class="side-link flex gap-4 items-center flex-col py-3 rounded-lg mx-7" href="#">
                        <i class="fa-solid text-[2.5rem] fa-user"></i>
                        <p>Students</p>
                    </a>
                    <a class="side-link flex gap-4 items-center flex-col py-3 rounded-lg mx-7" href="#">
                        <img className='w-[5rem] h-[5rem] rounded-full' src={faceImg} alt=''/>
                        <p>Face Verification</p>
                    </a>
                </nav>

                <div className="mt-auto px-4 pt-[] border-t border-[rgba(255,255,255,0.03)]">
                    <a href="../index.html" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[rgba(255,255,255,0.03)]">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M16 3v4M8 3v4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <Link to="/adminLogin"><span>Logout</span></Link>
                    </a>
                </div>
            </aside>

        </div>
    )
}

export default Sidebar;
