import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute"; // Импорт компонента защиты маршрутов
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";


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
          </Route>
          <Route element={<MainLayout />}>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
