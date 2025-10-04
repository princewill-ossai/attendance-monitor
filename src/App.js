import Dashboard from "./Components/Dashboard/Dashboard";
import AdminLogin from "./Components/Login/AdminLogin";
import Sidebar from "./Components/Sidebar/Sidebar";
import Record from "./Components/StudentsRecord/Record";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Register from "./Components/Register/Register";

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
        <Route path="/" element={<AdminLogin />} />

        {/* All pages with sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/record" element={<Record />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
