import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        courseName: "",
        courseCode: "",
        handler: "",
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
            form.append("courseName", formData.courseName.trim());
            form.append("courseCode", formData.courseCode.trim());
            form.append("handler", formData.handler.trim());
            form.append("date", new Date().toLocaleDateString());
            form.append("status", "Registered");

            const response = await axios.post("backend endpoinr url", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Course registered successfully!");
            console.log("Server response:", response.data);

            // redirect
            navigate("");
        } catch (error) {
            console.error("Error adding course:", error);
            alert("Failed to add course. Please try again.");
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-[#020217] flex items-center font-bold justify-center h-screen">
            <div className="bg-white relative dark:bg-[#020221] text-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md">
                <button className="bg-gray-800 absolute right-5 px-4 py-2 rounded-lg">
                    &lAarr; Dashboard
                </button>
                <h1 className="text-2xl pt-16 font-bold mb-6">Add new course</h1>

                <form onSubmit={handleSubmit}>

                    <label className="block mb-2 font-medium">Course Name</label>
                    <input
                        name="lastName"
                        value={formData.courseName}
                        onChange={handleChange}
                        type="text"
                        className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
                        required
                    />

                    <label className="block mb-2 font-medium">Course code</label>
                    <input
                        name="department"
                        value={formData.courseCode}
                        onChange={handleChange}
                        type="text"
                        className="w-full dark:bg-transparent border dark:border-gray-900 rounded px-3 py-2 mb-4"
                        required
                    />

                    <label className="block mb-2 font-medium">Course handler</label>
                    <input
                        name="adminEmail"
                        value={formData.handler}
                        onChange={handleChange}
                        type="email"
                        autoComplete="email"
                        className="w-full dark:bg-transparent border dark:border-gray-900 rounded px-3 py-2 mb-4"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCourse;
