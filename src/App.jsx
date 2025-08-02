import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import { routes } from "./Routes/Routes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>

          <Route
            element={
              // <ProtectedRoute>
                <AdminLayout />
              // </ProtectedRoute>
            }
          >
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;