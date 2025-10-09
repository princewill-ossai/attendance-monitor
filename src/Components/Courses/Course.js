import React from 'react'
import { useNavigate } from 'react-router-dom'

const Course = ({ course }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/course/${course.id}`, { state: { course } })
    }

    return (
        <div onClick={handleClick}>
            <div className="">
                <div className="bg-[#0707418c] p-6 rounded-xl shadow-md">
                    <p className="text-gray-500 text-xl font-bold">{course.name}</p>
                    <p className="text-gray-400 text-[12px] pt-3">{course.code}</p>
                </div>
            </div>
        </div>
    )
}

export default Course
