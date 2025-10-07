import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCategories, getCourseList, registerStudentUrl, studentRegistrationPostUrl } from "../Utilities/Endpoints";
import { get, getJsonHeader } from "../Utilities/HttpClientUtil";
import { toSentenceCase } from "../Utilities/StringUtils";
import ConfirmationModal from "../Modal/ConfirmationModal";

const Register = () => {

  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([{}])

  const [userData, setUserData] = useState({
    regNo: "",
    firstname: "",
    lastname: "",
    dept: "",
    category: "",
    courses: [],
    email: "",
    facialImage: null,
  });

  const fetchCategories = useCallback(async () => {
    const response = await get(`${getCategories}`, getJsonHeader())

    if (response.code === '00' && response.data.length !== 0)
      setCategories(response.data)
    else
      alert('Unable to fetch categories. Kindly refresh')
  }, [])

  const fetchCourses = useCallback(async () => {
    const response = await get(`${getCourseList}`, getJsonHeader())

    if (response.code === '00' && response.data.length !== 0)
      setCourses(response.data)
    else
      alert('Unable to fetch courses. Kindly refresh')
  }, [])

  const [confirmationDialog, setConfirmationDialog] = useState({
    showDialog: false,
    processing: false,
    successful: false,
    parent: false,
    error: false,
    request: null,
    endpoint: `${registerStudentUrl}`,
    method: "POST_FORM_DATA",
    landingPage: "/dashboard"
  });

  const handleChange = (event) => {
    const { name, value, type, files, multiple, options } = event.target;

    // if (type === 'select-one') {
    //   setUserData((prev) => ({
    //     ...prev,
    //     [name]: value,
    //   }));
    // } else 

    if (multiple) {
      const selectedValues = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.id);

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

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, [fetchCategories, fetchCourses]);

  // const  = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const form = new FormData();
  //     form.append("regNo", formData.regNo.trim());
  //     form.append("firstName", formData.firstName.trim());
  //     form.append("lastName", formData.lastName.trim());
  //     form.append("courses", formData.courses.trim());
  //     form.append("dept", formData.dept.trim());
  //     form.append("studentEmail", formData.studentEmail.trim());
  //     form.append("date", new Date().toLocaleDateString());
  //     form.append("status", "Registered");

  //     form.append("category", formData.category.toUpperCase());

  //     const courseList = formData.courses
  //       .split(',')
  //       .map((c) => c.trim())
  //       .filter((c) => c !== "");

  //     courseList.forEach((course) => form.append("courses", JSON.stringify(courseList)))

  //     if (formData.facialImage) {
  //       form.append("facialImage", formData.facialImage);
  //     }

  //     const response = await axios.post(studentRegistrationPostUrl, form
  //       //   , {
  //       //   headers: { "Content-Type": "multipart/form-data" },
  //       // }
  //     );

  //     alert("Student registered successfully!");
  //     console.log("Server response:", response.data);

  //     // redirect
  //     navigate("");
  //   } catch (error) {
  //     console.error("Error registering student:", error);
  //     if (error.response) {
  //       console.error("Response data:", error.response.data);
  //     }
  //     alert("Failed to register student. Please try again.");
  //   }
  // };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log('THDBDBB')

    const request = new FormData();
    request.append("regNo", userData.regNo.trim());
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
    <div className="overflow-y bg-gray-100 dark:bg-[#020217] flex items-center font-bold justify-center h-screen">
      <div className="bg-white relative dark:bg-[#020221] text-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md">
        <button className="bg-gray-800 absolute right-5 px-4 py-2 rounded-lg">
          &lArr; Dashboard
        </button>
        <h1 className="text-2xl pt-16 font-bold mb-6">Add New Student</h1>

        <form onSubmit={handleOnSubmit}>
          <label className="block mb-2 font-medium">First Name</label>
          <input
            name="firstName"
            type="text"
            onChange={handleChange}
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />

          <label className="block mb-2 font-medium">Last Name</label>
          <input
            name="lastName"
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

          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category"
            onChange={handleChange}
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          >
            {
              categories.map(category => (
                <option value={category}>{toSentenceCase(category)}</option>
              ))
            }
          </select>

          <label className="block mb-2 font-medium">Department</label>
          <input
            name="department"
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
                <option value={course.id}>{`${course.code} - ${course.name}`}</option>
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
          <a
            href="../attebdance-record/attendanceResord.html"
            className="text-blue-500 hover:underline"
          >
            Back to Dashboard
          </a>
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
