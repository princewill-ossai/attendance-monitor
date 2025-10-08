import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get, getJsonHeader, handleError, post } from "../Utilities/HttpClientUtil";
import { getLecturersList, registerCourse } from "../Utilities/Endpoints";
import { toSentenceCase } from "../Utilities/StringUtils";
import ConfirmationModal from "../Modal/ConfirmationModal";

const AddCourse = () => {
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState([]);
  const [courseData, setCourseData] = useState({
    name: "",
    code: "",
    handlerId: null,
  });

  const fetchLecturers = useCallback(async () => {
    const response = await get(`${getLecturersList}`, getJsonHeader());

    if (response.code === "00" && response.data.length !== 0)
      setLecturers(response.data);
    else alert("Unable to fetch lecturers. Kindly refresh.");
  }, []);

  useEffect(() => {
    fetchLecturers();
  }, [fetchLecturers]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === 'select-one') {
      setCourseData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setCourseData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [confirmationDialog, setConfirmationDialog] = useState({
    showDialog: false,
    processing: false,
    successful: false,
    parent: false,
    error: false,
    request: null,
    endpoint: `${registerCourse}`,
    method: "POST",
    landingPage: "/dashboard",
  });

  const handleSubmit = async (event) => { 
    event.preventDefault();

      setConfirmationDialog((prev) => ({
        ...prev,
        showDialog: true,
        parent: true,
        request: courseData,
      }));
  };

  return (
    <div className="bg-gray-100 dark:bg-[#020217] flex items-center font-bold justify-center h-screen">
      <div className="bg-white relative dark:bg-[#020221] text-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-800 absolute right-5 px-4 py-2 rounded-lg"
        >
          &larr; Dashboard
        </button>
        <h1 className="text-2xl pt-16 font-bold mb-6">Add New Course</h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Course Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />

          <label className="block mb-2 font-medium">Course Code</label>
          <input
            name="code"
            type="text"
            onChange={handleChange}
            className="w-full dark:bg-transparent border dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />

          <label className="block mb-2 font-medium">Course Handler</label>
          <select
            name="handlerId"
            onChange={handleChange}
            className="w-full dark:bg-transparent border dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          >
            <option value="" disabled selected>
              --select handler--
            </option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>
                {`${toSentenceCase(lecturer.firstname)} ${toSentenceCase(
                  lecturer.lastname
                )}`}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </form>
      </div>

      <ConfirmationModal
        data={confirmationDialog}
        dataStateFunction={setConfirmationDialog}
      />
    </div>
  );
};

export default AddCourse;
