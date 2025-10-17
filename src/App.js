import Dashboard from "./Components/Dashboard/Dashboard";
import AdminLogin from "./Components/Login/AdminLogin";
import Sidebar from "./Components/Sidebar/Sidebar";
import AddCourse from "./Components/Courses/AddCourse";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import RegisterStudent from "./Components/Register/RegisterStudent";
import RegisterAdmin from "./Components/Register/RegisterAdmin";
import Sessions from "./Components/Register/Sessions";
import CourseView from "./Components/Courses/CourseView";
import NewSession from "./Components/Courses/NewSession";
import ViewCourseStudents from "./Components/Courses/ViewCourseStudents";
import MarkAttendance from "./Components/Courses/MarkAttendance";
import ViewDateAttendance from "./Components/Courses/ViewDateAttendance";

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

        {/* All pages with sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/registerAdmin" element={<RegisterAdmin />} />
          <Route path="/registerStudent" element={<RegisterStudent />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/course/:id" element={<CourseView />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/newSession" element={<NewSession />} />
          <Route path="/course/students" element={<ViewCourseStudents />} />
          <Route path="/mark-attendance/:id" element={<MarkAttendance />} />
          <Route path="/view-attendance/:id" element={<ViewDateAttendance />} />
          {/* <Route path="*" element={<NotFound/>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
