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

//this whole code is just how we pass the course name and code as props

//THIS IS THE NAVIGATE ONcLICK FUNCTION
// const handleClick = () => {
    //HERE WE PASS THE COURSE ID IN THE NAVIGATION URL, SO THE NEXT COMPONENT WILL GIVE US DATA BASED ON THE ID OF THE COURSE IT GOT FROM THE URL 
//     navigate(`/course/${course.id}`, { state: { course } })
// }