import { NavLink } from "react-router-dom";
import { FaUsers, FaBuilding, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        EMS Admin
      </div>

      <nav className="sidebar-menu">

        <NavLink to="/dashboard" className={({isActive}) =>
  isActive ? "sidebar-link active" : "sidebar-link"
}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/employees" className="sidebar-link">
          <FaUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/departments" className="sidebar-link">
          <FaBuilding />
          <span>Departments</span>
        </NavLink>

      </nav>

      <button onClick={logout} className="sidebar-logout">
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </div>
  );
}