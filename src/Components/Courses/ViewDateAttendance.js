import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { get, getJsonHeader } from '../Utilities/HttpClientUtil'
import { attendanceUrl } from '../Utilities/Endpoints'
import Loader from '../Loader/Loader'
import EmptyFolder from '../EmptyFolder/Index'
import PaginationUtil from '../Pagination/Index'
import SessionAttendanceList from './SessionAttendanceList'

const ViewDateAttendance = () => {
    const location = useLocation()
    const { session } = location.state || {}
    const [students, setStudents] = useState(0)

    const [render, setRender] = useState({
        loader: true,
        table: false,
        emptyFolder: false
    });
    const [pageRequest, setPageRequest] = useState({ page: 1, size: 10 });
    const [totalPages, setTotalPages] = useState(0);
    const fetchStudentAttendance = useCallback(async (page, size) => {
        setRender({
            loader: true,
            table: false,
            emptyFolder: false
        })

        const response = await get(`${attendanceUrl}?sessionId=${session.id}&page=${page}&size=${size}`, getJsonHeader())

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
    }, []);

    useEffect(() => {
        fetchStudentAttendance(pageRequest.page, pageRequest.size);
    }, [pageRequest.page, pageRequest.size, fetchStudentAttendance])

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
                <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-start gap-4 mt-3 mb-10">
                </div>
                <div className="py-1 px-4 sm:px-6 rounded-xl w-full max-w-[30rem] mx-auto sm:mx-0 mb-6">
                    <p className="text-gray-300 text-xl sm:text-2xl font-bold">
                        {session.date} | Attendance</p>
                </div>
                <div className="bg-[#0A0A2A] p-4 sm:p-6 rounded-xl mb-10 overflow-x-auto shadow-lg">
                    <div className="min-w-full text-white">
                        {[
                            <Loader shouldDisplay={render.loader} key="loader" />,
                            <SessionAttendanceList shouldDisplay={render.table} students={students} key="session-list" />,
                            <EmptyFolder shouldDisplay={render.emptyFolder} key="empty-folder" />,
                            <PaginationUtil
                                key="pagination"
                                setPageRequestFxn={setPageRequest}
                                fetchItemsFxn={fetchStudentAttendance}
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

export default ViewDateAttendance

/* 

    this is the initial state for course attendance
    const [students, setStudents] = useState(0)
    
    this is the initial state of the component, so while data is fetching, the loader will be set to true amd others false
    const [render, setRender] = useState({
        loader: true,
        table: false,
        emptyFolder: false
    });

    const fetchStudentAttendance = useCallback(async (page, size) => {
        setRender({
            loader: true,
            table: false,
            emptyFolder: false
        })

        const response = await get(`${attendanceUrl}?sessionId=${session.id}&page=${page}&size=${size}`, getJsonHeader())

        if the data is fetched successfully, set loader and empty folder to false and display the table
        if (response.code === '00' && response.data.content.length !== 0) {
            setRender({
                loader: false,
                table: true,
                emptyFolder: false
            })
            setStudents(response.data.content) this will update the student state with fetched data
            setTotalPages(response.data.totalElements)
        } else {
            if data is not fetched or empty:
            setRender({
                loader: false,
                table: false,
                emptyFolder: true  SHOW THE EMPTY FOLDER
            });
        }
    }, []);

    USEEFFECT WILL CALL THE FNCTION WHEN COMPONENT RENDERS, AND WE PASSED THE PAGE SIZE AS THE DEPENDENCY SO IF IT CHANGES, THE FUNCTION WILL RUN AGAIN
    useEffect(() => {
        fetchStudentAttendance(pageRequest.page, pageRequest.size);
    }, [pageRequest.page, pageRequest.size, fetchStudentAttendance])
*/
