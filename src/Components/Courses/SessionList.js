import React from 'react'

const SessionList = ({sessions}) => {


    const handleOnClick = () => {

    }







  return (
    <div>
       <section className="bg-[#0707418c] p-4 sm:p-6 rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="text-gray-300 text-sm">
                    <th className="px-4 sm:px-6 py-3">Date</th>
                    <th className="px-4 sm:px-6 py-3">Lecture</th>
                    <th className="px-4 sm:px-6 py-3">Closed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.03)]">
                    {
                        sessions.map(session => (
                            <tr onClick={handleOnClick} className="text-gray-300 text-sm">
                                <td className="px-4 sm:px-6 py-3">{session.date}</td>
                                <td className="px-4 sm:px-6 py-3">{session.handlerName}</td>
                                <td className="px-4 sm:px-6 py-3">{session.status}</td>
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

export default SessionList