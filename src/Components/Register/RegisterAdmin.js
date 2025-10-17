import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerLecturerUrl } from "../Utilities/Endpoints";
import ConfirmationModal from "../Modal/ConfirmationModal";

const RegisterAdmin = () => {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        dept: "",
        category: "STAFF",
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
        landingPage: "/"
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
        <div className="overflow-y bg-gray-100 dark:bg-[#020217] flex items-center font-bold justify-center min-h-screen">
            <div className="bg-white relative dark:bg-[#020221] text-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md">
                <button className="bg-gray-800 absolute right-5 px-4 py-2 rounded-lg">
                    &lArr; Dashboard
                </button>
                <h1 className="text-2xl pt-16 font-bold mb-6">Add New Lecturer</h1>
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
                    {/* <label className="block mb-2 font-medium">Category</label> */}
                    {/* <select
                        name="category"
                        onChange={handleChange}
                        className="w-full border dark:bg-transparent dark:border-gray-900 rounded px-3 py-2 mb-4"
                        required
                    >
                        <option className="text-black" value="" disabled>--select category--</option>
                        <option className="text-black font-bold" value="STAFF">STAFF</option>
                    </select> */}

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
                    <Link to="/">
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

/*
THE INITIAL STATE OF THE FORM
const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    dept: "",
    category: "STAFF",
    email: "",
    facialImage: null,
});

THE CONFIRMATION DIALOG STATE THAT DOES THE FORM SUBMISSION
const [confirmationDialog, setConfirmationDialog] = useState({
    showDialog: false,
    processing: false,
    successful: false,
    parent: false,
    error: false,
    request: null,
    endpoint: `${registerLecturerUrl}`, ENDPOINT URL TO POST TO
    method: "POST_FORM_DATA", METHOD TO USE
    landingPage: "/" WHERE TO REDIRECT AFTER SUCCESSFUL SUBMISSION
});

THE HANDLECHANGE FUNCTION TO HANDLE FORM INPUT CHANGES
const handleChange = (event) => {
    const { name, value, files, multiple, options } = event.target; TARGET THE INPUT FIELD THAT FIRED THE EVENT, THEN GET THE NAME, VALUE, FILES, MULTIPLE AND OPTIONS IF IT IS A SELECT FIELD

    if (multiple) { IF THE INPUT FIELD ALLOWS MULTIPLE SELECTIONS
        const selectedValues = Array.from(options) CONVERT THE OPTIONS TO AN ARRAY
            .filter(opt => opt.selected)   FILTER THE SELECTED OPTIONS
            .map(opt => parseInt(opt.value));   MAP THE SELECTED OPTIONS TO THEIR INTEGER VALUES

            THEN UPDATE THE PREVIOUS USERDATA STATE WITH THE SELECTED VALUES
        setUserData((prev) => ({ 
            ...prev,
            [name]: selectedValues,
        }));

    } else { IF IT IS A SINGLE INPUT FIELD
        setUserData((prev) => ({ 
            ...prev,
            [name]: files ? files[0] : value, IF IT HAS FILES, TAKE THE FIRST FILE, ELSE TAKE THE VALUE
        }));
    }
};

THE HANDLEONSUBMIT FUNCTION TO HANDLE FORM SUBMISSION
const handleOnSubmit = (event) => {
    event.preventDefault(); PREVENT THE DEFAULT BEHAVIOUR OF THE FORM WHEN SUBMITTED, SO IT WON'T RELOAD THE WHOLE PAGE

    const request = new FormData(); CREATE A NEW FORM DATA OBJECT
    request.append("firstname", userData.firstname.trim()); APPEND FIRSTNAME TO THE FORMDATA
    request.append("lastname", userData.lastname.trim());
    request.append("dept", userData.dept.trim());
    request.append("email", userData.email.trim());
    request.append("category", userData.category);
    request.append("facialImage", userData.facialImage);

    Set THE CONFIRMATIONDIALOG STATE TO SHOW THE DIALOG AND SET THE REQUEST TO THE FORMDATA CREATED ABOVE
    setConfirmationDialog(prev => ({
        ...prev, THIS MEANS THAT WE ARE KEEPING THE PREVIOUS STATE VALUES AND ASSIGNING NEW VALUES TO SOME OF THEM
        showDialog: true,
        parent: true,
        request: request
    }));
}
*/

