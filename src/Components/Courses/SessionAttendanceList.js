
const SessionAttendanceList = ({ students, shouldDisplay }) => {

    // fxn to fecth student

    // fxn to fetch session

    // useEffefct to load students and session

    return (
        shouldDisplay && 
        <div>
            <section className="bg-[transparent] p-4 sm:p-6 rounded-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left">
                        <thead>
                            <tr className="text-gray-300 text-sm">
                                <th className="px-4 sm:px-6 py-3">Firstaname</th>
                                    <th className="px-4 sm:px-6 py-3">Lastname</th>
                                    <th className="px-4 sm:px-6 py-3">Department</th>
                                <th className="px-4 sm:px-6 py-3">Attendance</th>
                                <th className="px-4 sm:px-6 py-3">Picture</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#020221]">
                            {
                                students.map(student => (
                                    <tr className="text-gray-300 text-sm cursor-pointer">
                                        <td className="px-4 sm:px-6 py-3">{student.user.firstname}</td>
                                        <td className="px-4 sm:px-6 py-3">{student.user.lastname}</td>
                                        <td className="px-4 sm:px-6 py-3">{student.user.dept}</td>
                                        <td className="px-4 sm:px-6 py-3">{student.present ? 'Present' : 'Absent'}</td>
                                        <td className="px-4 sm:px-6 py-3">
                                            <img src={student.user.faceMatchPath} width='50' height='50' alt='Student' />
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

export default SessionAttendanceList;