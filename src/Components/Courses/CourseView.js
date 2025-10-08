import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
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
    <div className='w-full'>
      <div className="bg-[#020221] text-white font-sans flex flex-col md:flex-row">

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
              <div className="py-2 px-6 w-[30rem] rounded-xl">
                <p className="text-gray-500 text-2xl font-bold">{course?.name || "Unknown Course"}</p>
                <p className="text-gray-400 text-[12px] pt-2">{course?.code || "N/A"}</p>
              </div>

              <div className="flex gap-4 flex-wrap mt-10 mb-10">
                <div onClick={handleClick} className="bg-[#0707418c] cursor-pointer p-6 w-[20rem] rounded-xl shadow-md">
                  <p className="text-gray-500 text-xl font-bold">{studentCount}</p>
                  <p className="text-gray-400 text-[12px] pt-3">Students Registered</p>
                </div>
                <div className="bg-[#0707418c] p-6 w-[20rem] rounded-xl shadow-md">
                  <p className="text-gray-500 text-xl font-bold">70</p>
                  <p className="text-gray-400 text-[12px] pt-3">Students Present</p>
                </div>
              </div>
            </div>


            <div className="py-2 px-6 w-[30rem] rounded-xl">
              <p className="text-gray-500 text-2xl font-bold">Class Sessions</p>
            </div>
            <div className="bg-[#020221] p-6 rounded-xl mb-10 overflow-x-auto">
              {/* <h3 className="text-lg font-semibold mb-4">Class Sessions</h3> */}
              {/* <canvas id="attendanceChart" height="100"></canvas> */}
              <div className='w-full'>
                <div className="bg-[#020221] text-white font-sans flex flex-col md:flex-row">

                  <div className="flex-1 min-h-screen pt-6 flex flex-col">
                    <section className="px-6">
                      {
                        [
                          <Loader shouldDisplay={render.loader} />,
                          <SessionList shouldDisplay={render.table} sessions={sessions} />,
                          <EmptyFolder shouldDisplay={render.emptyFolder} />,
                          <PaginationUtil
                            setPageRequestFxn={setPageRequest}
                            fetchItemsFxn={fetchSessions}
                            totalPages={totalPages}
                            pageRequest={pageRequest}
                            render={setRender}
                          />
                        ]
                      }
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CourseView
