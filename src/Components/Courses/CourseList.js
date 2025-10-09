import React from 'react'
import Course from './Course'

const CourseList = ({ courses, shouldDisplay }) => {
    return (
        shouldDisplay &&
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10 px-[10px] gap-[20px]'>
            {
                courses.map(course => (
                    <Course className="w-[10rem]"
                        course={course}
                    />
                ))
            }
        </div>
    )
}

export default CourseList
