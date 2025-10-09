import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerLecturerUrl } from "../Utilities/Endpoints";
import ConfirmationModal from "../Modal/ConfirmationModal";

const RegisterAdmin = () => {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        dept: "",
        category: "",
        email: "",
        facialImage: null,
    });
    const [confirmationDialog, setConfirmationDialog] = useState({
        showDialog: false,
        processing: false,
        successful: false,
        parent: false,
        error: false,
        request: null,
        endpoint: `${registerLecturerUrl}`,
        method: "POST_FORM_DATA",
        landingPage: "/dashboard"
    });
    const handleChange = (event) => {
        const { name, value, files, multiple, options } = event.target;
        if (multiple) {
            const selectedValues = Array.from(options)
                .filter(opt => opt.selected)
                .map(opt => parseInt(opt.value));
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
        request.append("firstname", userData.firstname.trim());
        request.append("lastname", userData.lastname.trim());
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
                <h1 className="text-2xl pt-16 font-bold mb-6">Add New Admin</h1>
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
                        <option className="text-black" value="" selected disabled>--select category--</option>
                        <option className="text-black font-bold" value="STAFF">STAFF</option>
                    </select>

                    <label className="block mb-2 font-medium">Department</label>
                    <input
                        name="dept"
                        type="text"
                        onChange={handleChange}
                        className="w-full dark:bg-transparent border dark:border-gray-900 rounded px-3 py-2 mb-4"
                        required
                    />
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
                    <Link to="/dashboard">
                        <span
                            href="../attebdance-record/attendanceResord.html"
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

export default RegisterAdmin;

