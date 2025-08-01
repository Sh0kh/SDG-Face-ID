import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute"; // Импорт компонента защиты маршрутов
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Profile from "./Components/Profile/Profile";
import Groups from "./Components/Groups/Groups";
import Tasks from "./Components/Tasks/Tasks";
import Role from "./Components/Role/Role";
import Attendance from "./Components/Attendance/Attendance";
import Users from "./Components/Users/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route
            element={
              // <ProtectedRoute>
              <AdminLayout />
              //  </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/role" element={<Role />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profil" element={<Profile />} />
          </Route>
          <Route element={<MainLayout />}>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
