import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'
import Loader from '../Loader/Loader'
import CourseList from '../Courses/CourseList'
import EmptyFolder from '../EmptyFolder/Index'
import PaginationUtil from '../Pagination/Index'
import { get, getJsonHeader } from '../Utilities/HttpClientUtil'
import { coursesUrl } from '../Utilities/Endpoints'


const Dashboard = () => {
  const [render, setRender] = useState({
    loader: true,
    table: false,
    emptyFolder: false
  });
  const [courses, setCourses] = useState([]);
  const [pageRequest, setPageRequest] = useState({ page: 1, size: 10 });
  const [totalPages, setTotalPages] = useState(0);
  const fetchCourses = useCallback(async (page, size) => {
    setRender({
      loader: true,
      table: false,
      emptyFolder: false
    })
    const response = await get(`${coursesUrl}?page=${page}&size=${size}`, getJsonHeader())
    if (response.code === '00' && response.data.content.length !== 0) {
      setRender({
        loader: false,
        table: true,
        emptyFolder: false
      })
      setCourses(response.data.content)
      setTotalPages(response.data.totalElements)
    } else {
      setRender({
        loader: false,
        table: false,
        emptyFolder: true
      });
    }
  }, [])

  useEffect(() => {
    fetchCourses(pageRequest.page, pageRequest.size)
  }, [pageRequest.page, pageRequest.size, fetchCourses])

  return (
    <div className='w-full'>
      <div className="bg-[#020221] text-white font-sans flex flex-col md:flex-row">
        <div className="flex-1 min-h-screen pt-6 flex flex-col">
          <section className="px-6">
            <h2 className="text-2xl font-bold mb-6">Courses</h2>

            {
              [
                <Loader shouldDisplay={render.loader} />,
                <CourseList shouldDisplay={render.table} courses={courses} />,
                <EmptyFolder shouldDisplay={render.emptyFolder} />,
                <PaginationUtil
                  setPageRequestFxn={setPageRequest}
                  fetchItemsFxn={fetchCourses}
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
  )
}

export default Dashboard

/*
const fetchCourses = useCallback(async (page, size) => { USING CALLBACK TO MEMOISE THE FUNCTION SO IT ONLY RE-CREATES WHEN THE DEPENDENCY CHANGES

INITIAL STATE OF THE COMPONENT ONMOUNT
  setRender({
    loader: true,
    table: false,
    emptyFolder: false
  })
  const response = await get(`${coursesUrl}?page=${page}&size=${size}`, getJsonHeader()) WE USE QUERY PARAMETERS TO PASS EXTRA DATA LIKE THE PAGE AND SIZE, SO WE CAM FILTER THE DATA WE WANT.

  if (response.code === '00' && response.data.content.length !== 0) {
    setRender({
      loader: false,
      table: true,
      emptyFolder: false
    })
    UPDATES THE COURSE STATE WITH FETCHED DATA
    setCourses(response.data.content)
    setTotalPages(response.data.totalElements)

  } else {
    setRender({
      loader: false,
      table: false,
      emptyFolder: true
    });
  }
}, [])

CALLING THE FUNCTION IN USEEFFECT ENSURES IT ONLY RUNS WHEN THE DEPENDENCY CHANGES
useEffect(() => {
  fetchCourses(pageRequest.page, pageRequest.size)
}, [pageRequest.page, pageRequest.size, fetchCourses])
 */
