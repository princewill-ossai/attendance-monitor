// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Sessions = () => {
//     const [courseHandler, setCourseHandler] = useState([]);
//     const [dateFilter, setDateFilter] = useState("");
//     const navigate = useNavigate()

//     const [formData, setFormData] = useState({
//         courseName: "",
//         courseCode: "",
//         handler: "",
//     });

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: files ? files[0] : value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const form = new FormData();
//             form.append("courseCode", formData.courseCode.trim());
//             form.append("handler", formData.handler.trim());
//             form.append("date", new Date().toLocaleDateString());
//             form.append("status", "Registered");

//             const response = await axios.post("backend endpoinr url", form, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             alert("Course registered successfully!");
//             console.log("Server response:", response.data);

//             // redirect
//             navigate("");
//         } catch (error) {
//             console.error("Error creating session:", error);
//             alert("Failed creating session. Please try again.");
//         }

//         const log = (key, value) => {
//             console.log(key, value)
//         }

//         const get = async (endpoint, requestHeaders) => {
//             try {
//                 const response = await axios.get("/Prototype.json", {
//                     withCredentials: false,
//                     headers: requestHeaders
//                 })
//                     .then((response) => {
//                         setCourseHandler(response.data.student)
//                     })
//                 log(endpoint, response.data);

//                 return response.data;
//             } catch (error) {
//                 if (error.response && error.response.data) {
//                     return error.response.data;
//                 }

//                 const errorObject = handleError(error.message);
//                 log(`ERROR: ${endpoint}`, errorObject);

//                 return errorObject;
//             }
//         };
//         const handleError = (error) => ({
//             data: null,
//             message: error,
//             status: '99'
//         });
//     };

//     return (
//         <div className="bg-gray-100 dark:bg-[#020217] flex items-center font-bold justify-center h-screen">
//             <div className="bg-white relative dark:bg-[#020221] text-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md">
//                 <button className="bg-gray-800 absolute right-5 px-4 py-2 rounded-lg">
//                     &lAarr; Dashboard
//                 </button>
//                 <h1 className="text-2xl pt-16 font-bold mb-6">Create new session</h1>

//                 <form onSubmit={handleSubmit}>
//                     <label className="block mb-2 font-medium">Course code</label>
//                     <input
//                         name="department"
//                         value={formData.courseCode}
//                         onChange={handleChange}
//                         type="text"
//                         className="w-full dark:bg-transparent border dark:border-gray-900 rounded px-3 py-2 mb-4"
//                         required
//                     />

//                     <label className="block mb-2 font-medium">Course handler</label>
//                     {
//                         courseHandler > 0 ? (
//                             courseHandler.map((han))
//                         ) : ()
//                     }
//                     <button
//                         type="submit"
//                         className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//                     >
//                         Create session
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Sessions;
