import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    regNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    department: "",
    studentEmail: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("regNumber", formData.regNumber.trim());
      form.append("firstName", formData.firstName.trim());
      form.append("middleName", formData.middleName.trim());
      form.append("lastName", formData.lastName.trim());
      form.append("department", formData.department.trim());
      form.append("studentEmail", formData.studentEmail.trim());
      form.append("date", new Date().toLocaleDateString());
      form.append("status", "Registered");

      if (formData.photo) {
        form.append("photo", formData.photo);
      }

      const response = await axios.post("backend endpoinr url", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Student registered successfully!");
      console.log("Server response:", response.data);

      // redirect
      navigate("../attebdance-record/attendanceResord.html");
    } catch (error) {
      console.error("Error registering student:", error);
      alert("Failed to register student. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-[#020217] flex items-center font-bold justify-center h-screen">
      <div className="bg-white relative dark:bg-[#020221] text-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md">
        <button className="bg-gray-800 absolute right-5 px-4 py-2 rounded-lg">
          &lAarr; Dashboard
        </button>
        <h1 className="text-2xl pt-16 font-bold mb-6">Add new student</h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Registration number</label>
          <input
            name="regNumber"
            value={formData.regNumber}
            onChange={handleChange}
            type="text"
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />

          <label className="block mb-2 font-medium">First Name</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            type="text"
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />

          <label className="block mb-2 font-medium">Middle Name</label>
          <input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            type="text"
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
          />

          <label className="block mb-2 font-medium">Last Name</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />

          <label className="block mb-2 font-medium">Department</label>
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            type="text"
            className="w-full dark:bg-transparent border dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />

          <label className="block mb-2 font-medium">Student Email</label>
          <input
            name="studentEmail"
            value={formData.studentEmail}
            onChange={handleChange}
            type="email"
            autoComplete="email"
            className="w-full dark:bg-transparent border dark:border-gray-900 rounded px-3 py-2 mb-4"
            required
          />

          <label className="block mb-2 font-medium">Upload Photo</label>
          <input
            name="photo"
            onChange={handleChange}
            type="file"
            accept="image/*"
            className="w-full dark:bg-transparent border dark:border-gray-900 rounded px-3 py-2 mb-6"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Register
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
    </div>
  );
};

export default Register;
