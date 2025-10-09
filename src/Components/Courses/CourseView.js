import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { get, getJsonHeader } from '../Utilities/HttpClientUtil'
import { coursesUrl, sessionUrl } from '../Utilities/Endpoints'
import Loader from '../Loader/Loader'
import EmptyFolder from '../EmptyFolder/Index'
import PaginationUtil from '../Pagination/Index'
import SessionList from './SessionList'

const CourseView = () => {
  const location = useLocation()
  const { course } = location.state || {}
  const [studentCount, setStudentCount] = useState(0)
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/course/students`, { state: { course } })
  }
  const [render, setRender] = useState({
    loader: true,
    table: false,
    emptyFolder: false
  });
  const [sessions, setSessions] = useState([]);
  const [pageRequest, setPageRequest] = useState({ page: 1, size: 10 });
  const [totalPages, setTotalPages] = useState(0);

  const fetchStudentCount = useCallback(async () => {
    const response = await get(`${coursesUrl}/${course.id}/count`, getJsonHeader())
    if (response.code === '00')
      setStudentCount(response.data)
    else
      alert('Unable to fetch categories. Kindly refresh')
  }, [course.id]);

  const fetchSessions = useCallback(async (page, size) => {
    setRender({
      loader: true,
      table: false,
      emptyFolder: false
    })
    const response = await get(`${sessionUrl}/${course.id}/list?page=${page}&size=${size}`, getJsonHeader())
    if (response.code === '00' && response.data.content.length !== 0) {
      setRender({
        loader: false,
        table: true,
        emptyFolder: false
      })
      setSessions(response.data.content)
      setTotalPages(response.data.totalElements)
    } else {
      setRender({
        loader: false,
        table: false,
        emptyFolder: true
      });
    }
  }, [course.id]);

  useEffect(() => {
    fetchStudentCount();
    fetchSessions(pageRequest.page, pageRequest.size);
  }, [pageRequest.page, pageRequest.size, fetchStudentCount, fetchSessions])

  return (
    <div className="w-full bg-[#020221] text-white font-sans min-h-screen flex flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6 border-b border-[#1c1c3b]">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div>
            <p id="currentDate" className="text-gray-400 text-xs sm:text-sm"></p>
            <p id="currentTime" className="text-lg sm:text-xl font-bold"></p>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col px-4 sm:px-6 py-6">
        <div className="py-3 px-4 sm:px-6 rounded-xl w-full max-w-[22rem] mx-auto sm:mx-0">
          <p className="text-gray-300 text-xl sm:text-2xl font-bold break-words">
            {course?.name || "Unknown Course"}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm pt-2">{course?.code || "N/A"}</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-start gap-4 mt-3 mb-10">
          <div
            onClick={handleClick}
            className="bg-[#0707418c] cursor-pointer p-5 sm:p-6 w-[22rem] rounded-xl shadow-md sm:text-left"
          >
            <p className="text-gray-300 text-2xl sm:text-xl font-bold">{studentCount}</p>
            <p className="text-gray-400 text-xs sm:text-sm pt-3">Students Registered</p>
          </div>

          <div className="bg-[#0707418c] p-5 sm:p-6 w-[22rem] rounded-xl shadow-md sm:text-left">
            <p className="text-gray-300 text-2xl sm:text-xl font-bold">70</p>
            <p className="text-gray-400 text-xs sm:text-sm pt-3">Students Present</p>
          </div>
        </div>
        <div className="py-1 px-4 sm:px-6 rounded-xl w-full max-w-[30rem] mx-auto sm:mx-0 mb-6">
          <p className="text-gray-300 text-xl sm:text-2xl font-bold">Class Sessions</p>
        </div>
        <div className="bg-[#0A0A2A] p-4 sm:p-6 rounded-xl mb-10 overflow-x-auto shadow-lg">
          <div className="min-w-full text-white">
            {[
              <Loader shouldDisplay={render.loader} key="loader" />,
              <SessionList shouldDisplay={render.table} sessions={sessions} key="session-list" />,
              <EmptyFolder shouldDisplay={render.emptyFolder} key="empty-folder" />,
              <PaginationUtil
                key="pagination"
                setPageRequestFxn={setPageRequest}
                fetchItemsFxn={fetchSessions}
                totalPages={totalPages}
                pageRequest={pageRequest}
                render={setRender}
              />,
            ]}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CourseView
