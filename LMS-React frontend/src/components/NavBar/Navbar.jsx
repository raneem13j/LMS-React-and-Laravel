import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import attendance from "./image/attendance.png";
import classroom from "./image/classroom.png";
import monitor from "./image/monitor.png";
import power from "./image/power.png";
import presentation from "./image/presentation.png";
import section from "./image/sections.png";
import course from "./image/courses.png";
import menu from "./image/Menu.png";
import { useNavigate } from "react-router-dom";
import repor from "./image/report.png";
const Navbar = ({ setMenuBar, menubar }) => {
  const navigate = useNavigate();

  const logOut = () => {
    window.location.href = "/";
    window.localStorage.clear();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container1">
      <div className="navbar-container">
        <div className="navbar">
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={presentation} alt="" />
               <div className="text">
                <Link to="/TeacherSuperAdmin">Teachers</Link>
               </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={presentation} alt="" />
              <div className="text">
                <Link to="/StudentSuperAdmin">Students</Link>
              </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={classroom} alt="" />
              <div className="text">
                <Link to="/levelSuperAdmin">Classes</Link>
              </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={section} alt="" />
              <div className="text">
                <Link to="/sectionsSuperAdmin">Sections</Link>
              </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={course} alt="" />

              <div className="text">
                <Link to="/CourseSuperAdmin">Courses</Link>
              </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={attendance} alt="" />

              <div className="text">
                <Link to="/AttendanceSuperAdmin">Attendances</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard_main">
          <div className="dashboard">
            <img className="img_dashboard" src={repor} alt="" />
            <div className="text">
              <Link to="/ReportSuperAdmin">Report</Link>
            </div>
          </div>
        </div>

        <div className="dashboard_main">
          <div className="dashboard">
            <img className="img_dashboard" src={power} alt="" />

            <div className="text" onClick={logOut}>
              <Link>Log out</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="navnavbar-menu">
        <button className="navmenu-button" id="navmenuButton">
          <img
            src={menu}
            alt="menu"
            className="navmenu"
            onClick={() => setMenuBar(!menubar)}
          />
        </button>
      </div>
    </div>
  );
};

const MenuBar = ({ menubar }) => {
  return (
    <div className={!menubar ? "navhidden_hidden" : "navhidden_show"}>
      
      <button className="navmenu-menu">
        <Link to="/TeacherSuperAdmin">Teachers</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/StudentSuperAdmin">Students</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/levelSuperAdmin">Classes</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/sectionsSuperAdmin">Sections</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/CourseSuperAdmin">Courses</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/AttendanceSuperAdmin">Attendances</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/ReportSuperAdmin">Report</Link>
      </button>
    </div>
  );
};
export { Navbar, MenuBar };
