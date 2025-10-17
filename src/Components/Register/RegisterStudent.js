import React, { useCallback, useEffect, useState } from "react";
import { getCategories, getCourseList, registerStudentUrl } from "../Utilities/Endpoints";
import { get, getJsonHeader } from "../Utilities/HttpClientUtil";
import { toSentenceCase } from "../Utilities/StringUtils";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { Link } from "react-router-dom";

const Register = () => {
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([{}])
  const [userData, setUserData] = useState({
    regNo: "",
    firstname: "",
    lastname: "",
    dept: "",
    category: "STUDENT",
    courses: [],
    email: "",
    facialImage: null,
  });

  const fetchCourses = useCallback(async () => {
    const response = await get(`${getCourseList}`, getJsonHeader())

    if (response.code === '00' && response.data.length !== 0)
      setCourses(response.data)
    else
      alert('Unable to fetch courses. Kindly refresh')
  }, [])

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);
  const [confirmationDialog, setConfirmationDialog] = useState({
    showDialog: false,
    processing: false,
    successful: false,
    parent: false,
    error: false,
    request: null,
    endpoint: `${registerStudentUrl}`,
    method: "POST_FORM_DATA",
    landingPage: "/"
  });

  const handleChange = (event) => {
    const { name, value, files, multiple, options } = event.target;

    if (multiple) {
      const selectedValues = Array.from(options)
        .filter(opt => opt.selected)
        .map(opt => parseInt(opt.value));

      console.log("Courses value", selectedValues)
      setUserData((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();

    const request = new FormData();
    request.append("regNo", userData.regNo.trim().toUpperCase());
    request.append("firstname", userData.firstname.trim());
    request.append("lastname", userData.lastname.trim());
    request.append("courses", userData.courses);
    request.append("dept", userData.dept.trim());
    request.append("email", userData.email.trim());
    request.append("category", userData.category);
    request.append("facialImage", userData.facialImage);
    setConfirmationDialog(prev => ({
      ...prev,
      showDialog: true,
      parent: true,
      request: request
    }));
  }

  return (
    <div className="overflow-y bg-gray-100 dark:bg-[#020217] flex items-center font-bold justify-center min-h-screen">
      <div className="bg-white relative dark:bg-[#020221] text-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-5">Add New Student</h1>
        <form onSubmit={handleOnSubmit}>
          <label className="block mb-2 font-medium">First Name</label>
          <input
            name="firstname"
            type="text"
            onChange={handleChange}
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />
          <label className="block mb-2 font-medium">Last Name</label>
          <input
            name="lastname"
            type="text"
            onChange={handleChange}
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />
          <label className="block mb-2 font-medium">Registration number</label>
          <input
            name="regNo"
            type="text"
            onChange={handleChange}
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
            pattern="^[A-Z0-9]{12}$"
            title="Must be exactly 12 uppercase alphanumeric characters"
          />
          <label className="block mb-2 font-medium">Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            autoComplete="email"
            className="w-full dark:bg-transparent border dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />
          {/* <label className="block mb-2 font-medium">Category</label> */}
          {/* <select
            name="category"
            onChange={handleChange}
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          >
            <option value="" disabled>--select category--</option>
            <option className="text-black font-bold">Student</option>
          </select> */}
          <label className="block mb-2 font-medium">Department</label>
          <input
            name="dept"
            type="text"
            onChange={handleChange}
            className="w-full dark:bg-transparent border dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />
          <label className="block mb-2 font-medium">Courses</label>
          <select
            name="courses"
            multiple
            type="text"
            onChange={handleChange}
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
          >
            {
              courses.map(course => (
                <option className="font-bold" value={course.id}>{`${course.code} - ${course.name}`}</option>
              ))
            }
          </select>
          <div className="relative">
            <input
              id="facialImage"
              name="facialImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="facialImage"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-center cursor-pointer inline-block"
            >
              Upload Facial Image
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white my-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          <Link to="/">
            <span
              className="text-blue-500 hover:underline"
            >
              Back to Dashboard
            </span>
          </Link>
        </p>
      </div>

      <ConfirmationModal
        data={confirmationDialog}
        dataStateFunction={setConfirmationDialog}
      />
    </div>
  );
};

export default Register;

/* 
const [courses, setCourses] = useState([{}]) INITIALIZE COURSES STATE
  const [userData, setUserData] = useState({ INITIALIZE FORM STATE
    regNo: "",
    firstname: "",
    lastname: "",
    dept: "",
    category: "STUDENT",
    courses: [],
    email: "",
    facialImage: null,
  });

  FUNCTION TO FETCH COURSES FROM THE BACKEND
  const fetchCourses = useCallback(async () => { USECALLBACK TO MEMOISE THE FUNCTION AND AVOID RE-RENDERING

    const response = await get(`${getCourseList}`, getJsonHeader()) FETCH COURSES USING GET REQUEST

    if (response.code === '00' && response.data.length !== 0) // IF RESPONSE IS SUCCESSFUL
      setCourses(response.data) UPDATES THE COURSES STATE WITH THE FETCHED DATA
    else
      alert('Unable to fetch courses. Kindly refresh') ALERT IF FETCHING FAILS
  }, [])

  WE CALL FETCHCOURSES IN USEEFFECT WHEN THE COMPONENT MOUNTS
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  INITIALIZE CONFIRMATION DIALOG STATE FOR FORM SUBMISSION
  const [confirmationDialog, setConfirmationDialog] = useState({
    showDialog: false,
    processing: false,
    successful: false,
    parent: false,
    error: false,
    request: null,
    endpoint: `${registerStudentUrl}`, ENDPOINT TO POST TO
    method: "POST_FORM_DATA", METHOD TO USE
    landingPage: "/" WHERE TO REDIRECT AFTER SUCCESSFUL SUBMISSION
  });

  THE HANDLECHANGE FUNCTION TO HANDLE FORM INPUT CHANGES
  const handleChange = (event) => {
    const { name, value, files, multiple, options } = event.target; TARGET THE INPUT FIELD THAT FIRED THE EVENT, THEN GET THE NAME, VALUE, FILES, MULTIPLE AND OPTIONS IF IT IS A SELECT FIELD

    if (multiple) { IF THE INPUT FIELD ALLOWS MULTIPLE SELECTIONS
      const selectedValues = Array.from(options) CONVERT THE OPTIONS TO AN ARRAY
        .filter(opt => opt.selected)  FILTER THE SELECTED OPTIONS
        .map(opt => parseInt(opt.value)); MAP THE SELECTED OPTIONS TO THEIR INTEGER VALUES

      console.log("Courses value", selectedValues) LOG THE SELECTED COURSES
      THEN UPDATE THE PREVIOUS USERDATA STATE WITH THE SELECTED VALUES
      setUserData((prev) => ({
        ...prev,
        [name]: selectedValues,
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value, IF IT HAS FILES, TAKE THE FIRST FILE, ELSE TAKE THE VALUE
      }));
    }
  };

  HANDLE FORM SUBMISSION
  const handleOnSubmit = (event) => {
    event.preventDefault();

    const request = new FormData(); CREATE A NEW FORMDATA OBJECT TO HOLD THE FORM DATA AND APPEND EACH FIELD TO IT
    request.append("regNo", userData.regNo.trim().toUpperCase());
    request.append("firstname", userData.firstname.trim());
    request.append("lastname", userData.lastname.trim());
    request.append("courses", userData.courses);
    request.append("dept", userData.dept.trim());
    request.append("email", userData.email.trim());
    request.append("category", userData.category);
    request.append("facialImage", userData.facialImage);

    SET THE CONFIRMATION DIALOG STATE TO SHOW THE DIALOG AND PASS THE FORMDATA REQUEST
    setConfirmationDialog(prev => ({
      ...prev, PRESERVE PREVIOUS STATE
      showDialog: true,
      parent: true,
      request: request
    }));
  }
*/
