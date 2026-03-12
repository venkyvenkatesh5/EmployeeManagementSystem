import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;