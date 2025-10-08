import Dashboard from "./Components/Dashboard/Dashboard";
import AdminLogin from "./Components/Login/AdminLogin";
import Sidebar from "./Components/Sidebar/Sidebar";
import Record from "./Components/StudentsRecord/Record";
import AddCourse from "./Components/Courses/AddCourse";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import RegisterStudent from "./Components/Register/RegisterStudent";
import RegisterAdmin from "./Components/Register/RegisterAdmin";
import Indexdb from "./Components/Studentdb.js/Indexdb";
import Sessions from "./Components/Register/Sessions";
import CourseView from "./Components/Courses/CourseView";
import NewSession from "./Components/Courses/NewSession";
import ViewCourseStudents from "./Components/Courses/ViewCourseStudents";
// import NotFound from "./Components/ErrorPage/NotFound";

// Layout with sidebar
function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {/* Nested routes render here */}
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />} />

        {/* All pages with sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registerAdmin" element={<RegisterAdmin />} />
          <Route path="/record" element={<Record />} />
          <Route path="/registerStudent" element={<RegisterStudent />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/course/:id" element={<CourseView />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/indexdb" element={<Indexdb />} />
          <Route path="/newSession" element={<NewSession />} />
          <Route path="/course/students" element={<ViewCourseStudents />} />
          {/* <Route path="*" element={<NotFound/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
