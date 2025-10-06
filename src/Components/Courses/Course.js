import React from 'react'

const Course = ({courseName, courseCode}) => {

    return (
        <div>
            <div className="">

                <div className="bg-[#0707418c] p-6 rounded-xl shadow-md">
                    <p className="text-gray-500 text-xl font-bold">{courseName}</p>
                    <p className="text-gray-400 text-[12px] pt-3">{courseCode}</p>
                </div>
            </div>
        </div>
    )
}

export default Course
