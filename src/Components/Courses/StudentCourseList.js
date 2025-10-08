import React from 'react'

const StudentCourseList = ({students, shouldDisplay}) => {
  return (
    shouldDisplay &&
    <div>
       <section className="bg-[rgba(255,255,255,0.02)] p-4 sm:p-6 rounded-2xl shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="text-gray-300 text-sm">
                    <th className="px-4 sm:px-6 py-3">First Name</th>
                    <th className="px-4 sm:px-6 py-3">Last Name</th>
                    <th className="px-4 sm:px-6 py-3">
                      Registration Number
                    </th>
                    <th className="px-4 sm:px-6 py-3">Department</th>
                    <th className="px-4 sm:px-6 py-3">Email</th>
                    <th className="px-4 sm:px-6 py-3">Facial Image</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.03)]">
                    {
                        students.map(student => (
                            <tr className="text-gray-300 text-sm">
                              <td className="px-4 sm:px-6 py-3">{student.firstname}</td>
                              <td className="px-4 sm:px-6 py-3">{student.lastname}</td>
                              <td className="px-4 sm:px-6 py-3">
                              {student.regNo}
                              </td>
                              <td className="px-4 sm:px-6 py-3">{student.dept}</td>
                              <td className="px-4 sm:px-6 py-3">{student.email}</td>
                              <td className="px-4 sm:px-6 py-3">
                                  <img src={student.faceMatchPath} width='50' height='50' alt='Student'/>
                              </td>
                          </tr>
                        ))
                    }
                 

                </tbody>
              </table>
            </div>
          </section>
    </div>
  )
}

export default StudentCourseList
