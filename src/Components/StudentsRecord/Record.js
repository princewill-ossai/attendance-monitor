import React, { useEffect, useState } from "react";
import axios from "axios";

const Record = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    // Fetch from public/Prototype.json
    axios
      .get("/Prototype.json")
      .then((response) => {
        setStudents(response.data.student); // JSON root key is "student"
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  // ✅ Filtering logic
  const filteredStudents = students.filter((student) => {
    return (
      (search === "" ||
        student.fullName.toLowerCase().includes(search.toLowerCase()) ||
        student.registrationNumber.toLowerCase().includes(search.toLowerCase())) &&
      (dateFilter === "" || student.date === dateFilter)
    );
  });

  // ✅ CSV export
  const downloadCSV = () => {
    const headers = ["Full Name", "Registration Number", "Date", "Status"];
    const rows = filteredStudents.map((s) =>
      [s.fullName, s.registrationNumber, s.date, s.status].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#020221] w-full text-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row h-screen">
        <div id="sidebar-root"></div>

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow">
          {/* ✅ Header with title + controls */}
          <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-semibold">Attendance Records</h1>
              <p className="text-sm text-gray-400 mt-1">
                Review and export attendance history
              </p>
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

              <button
                onClick={downloadCSV}
                className="bg-[#1f2937] hover:bg-[#2b3642] px-4 py-2 rounded-md text-sm w-full sm:w-auto"
              >
                Download CSV
              </button>

              <div className="w-10 h-10 rounded-full bg-[#0f1724] flex items-center justify-center">
                👤
              </div>
            </div>
          </header>

          {/* ✅ Table section */}
          <section className="bg-[rgba(255,255,255,0.02)] p-4 sm:p-6 rounded-2xl shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="text-gray-300 text-sm">
                    <th className="px-4 sm:px-6 py-3 w-2/5">Student Name</th>
                    <th className="px-4 sm:px-6 py-3 w-1/5">
                      Registration Number
                    </th>
                    <th className="px-4 sm:px-6 py-3 w-1/5">Date</th>
                    <th className="px-4 sm:px-6 py-3 w-1/5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.03)]">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <tr key={index} className="">
                        <td className="border border-gray-800 px-4 py-2">
                          {student.fullName}
                        </td>
                        <td className="border border-gray-800 px-4 py-2">
                          {student.registrationNumber}
                        </td>
                        <td className="border border-gray-800 px-4 py-2">
                          {student.date}
                        </td>
                        <td className="border border-gray-800 px-4 py-2">
                          <span
                            className={
                              student.status === "present"
                                ? "text-green-600 font-semibold"
                                : "text-red-600 font-semibold"
                            }
                          >
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-4 text-gray-500"
                      >
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Record;
