import React from "react";
import "./Navbar-pages.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import attendance from "./image/attendance.png";
import classroom from "./image/classroom.png";
import monitor from "./image/monitor.png";
import power from "./image/power.png";
import presentation from "./image/presentation.png";
import section from "./image/sections.png";
import course from "./image/courses.png";
import menu from "./image/Menu.png";
import repor from "./image/report.png"

const Navbar = ({ setMenuBar, menubar }) => {
  const navigate = useNavigate();
  const logOut = () => {
    window.location.href = "/";
    window.localStorage.clear();
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <div className="container">
      <div className="navbar-container">
        <div className="navbar">
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={monitor} alt="" />
              <div className="text">
                <Link to="/home">Dashboard</Link>
              </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={presentation} alt="" />
              <div className="text">
                <Link to="/teachers">Teachers</Link>
              </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={presentation} alt="" />
              <div className="text">
                <Link to="/students">Students</Link>
              </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={classroom} alt="" />
              <div className="text">
                <Link to="/levels">Classes</Link>
              </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={section} alt="" />
              <div className="text">
                <Link to="/sections">Sections</Link>
              </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={course} alt="" />
              <div className="text">
                <Link to="/Course">Courses</Link>
              </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={attendance} alt="" />
              <div className="text">
                <Link to="/attendances">Attendances</Link>
              </div>
            </div>
          </div>
          <div className="dashboard_main">
            <div className="dashboard">
              <img className="img_dashboard" src={repor} alt="" />
              <div className="text">
                <Link to="/report">Report</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard_main">
          <div className="dashboard">
            <img className="img_dashboard" src={power} alt="" />
            <div className="text" onClick={logOut}>
              <Link to="/" >Log out</Link>
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
        <Link to="/home">Dashboard</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/teachers">Teachers</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/students">Students</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/levels">Classes</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/sections">Sections</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/Course">Courses</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/attendances">Attendances</Link>
      </button>
      <button className="navmenu-menu">
        <Link to="/report">Report</Link>
      </button>
    </div>
  );
};
export { Navbar, MenuBar };
