import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { coursesUrl, getLecturersList } from "../Utilities/Endpoints";
import { get, getJsonHeader } from "../Utilities/HttpClientUtil";
import { useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import EmptyFolder from "../EmptyFolder/Index";
import PaginationUtil from "../Pagination/Index";
import StudentCourseList from "./StudentCourseList";

const ViewCourseStudents = () => {
  const location = useLocation()
  const { course } = location.state || {}
  const [students, setStudents] = useState([{
        id: null,
        firstname: "",
        lastname: "",
        regNo: "",
        dept: "",
        email: "",
        category: "",
        faceMatchPath: ""
      }
  ]);

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
    const [render, setRender] = useState({
      loader: true,
      table: false,
      emptyFolder: false
    });
    const [pageRequest, setPageRequest] = useState({ page: 1, size: 10 });
    const [totalPages, setTotalPages] = useState(0);

      const fetchStudents = useCallback(async (page, size) => {
        setRender({
          loader: true,
          table: false,
          emptyFolder: false
        })
    
        const response = await get(`${coursesUrl}/${course.id}/students?page=${page}&size=${size}`, getJsonHeader())
    
        if (response.code === '00' && response.data.content.length !== 0) {
          setRender({
            loader: false,
            table: true,
            emptyFolder: false
          })
    
          setStudents(response.data.content)
          setTotalPages(response.data.totalElements)
        } else {
          setRender({
            loader: false,
            table: false,
            emptyFolder: true
          });
        }
      }, [course.id])

      useEffect(() => {
        fetchStudents(pageRequest.page, pageRequest.size)
      }, [pageRequest.page, pageRequest.size, fetchStudents])


  return (
    <div className="bg-[#020221] w-full text-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row h-screen">
        <div id="sidebar-root"></div>

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow">
          <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-semibold">{course.name} Students</h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-[#0f1b28] text-sm px-3 py-2 rounded-md border border-[rgba(255,255,255,0.03)] w-full sm:w-auto"
              />

              <input
                type="text"
                placeholder="Search by name or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#0f1b28] text-sm px-3 py-2 rounded-md border border-[rgba(255,255,255,0.03)] w-full sm:w-64"
              />

              <div className="w-10 h-10 rounded-full bg-[#0f1724] flex items-center justify-center">
                👤
              </div>
            </div>
          </header>

    <div className='w-full'>
      <div className="bg-[#020221] text-white font-sans flex flex-col md:flex-row">

        <div className="flex-1 min-h-screen pt-6 flex flex-col">
          <section className="px-6">
            <h2 className="text-2xl font-bold mb-6">Courses</h2>

            {
              [
                <Loader shouldDisplay={render.loader} />,
                <StudentCourseList shouldDisplay={render.table} students={students} />,
                <EmptyFolder shouldDisplay={render.emptyFolder} />,
                <PaginationUtil
                  setPageRequestFxn={setPageRequest}
                  fetchItemsFxn={fetchStudents}
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
        </main>
      </div>
    </div>
  );
};

export default ViewCourseStudents;
