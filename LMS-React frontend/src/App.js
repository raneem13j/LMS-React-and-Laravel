import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./components/Login/Login";
import Login from "./components/Login/Login";
import StudentSuperAdmin from "./components/StudentSuperAdmin/StudentSuperAdmin";
import TeacherSuperAdmin from "./components//TeacherSuperAdmin/TeacherSuperAdmin";
import CourseSuperAdmin from "./components/course";
import MainPic from "./components/Dashboard-pic/MainPic";
import Levels from "../src/pages/levels/levels";
import Sections from "../src/pages/sections/sections";
import Attendances from "./pages/attendance/Attendance";
import Students from "./pages/students/Student";
import Teacheres from "./pages/teachers/Teacher";
import Report from "./pages/Report/Report";
import ReportSuperAdmin from "./components/Report/Report";
import SectionSuperAdmin from "./components/sections/sections";
import LevelSuperAdmin from "./components/Levels/levels";
import AttendanceSuperAdmin from "./components/attendance/Attendance";
import Course from "./pages/courses/course";
function App() {
  return (
    <>
      <div className="all">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/StudentSuperAdmin" element={<StudentSuperAdmin />} />
            <Route path="/TeacherSuperAdmin" element={<TeacherSuperAdmin />} />
            <Route path="/ReportSuperAdmin" element={<ReportSuperAdmin />} />
            <Route path="/sectionsSuperAdmin" element={<SectionSuperAdmin />} />
            <Route path="/levelSuperAdmin" element={<LevelSuperAdmin />} />
            <Route path="/AttendanceSuperAdmin" element={<AttendanceSuperAdmin />}/>
            <Route path="/CourseSuperAdmin" element={<CourseSuperAdmin />} />
            
          </Routes>
        </Router>

        <Router>
          <Routes>
            <Route exact path="/home" element={<MainPic />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/attendances" element={<Attendances />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teacheres />} />
            <Route path="/report" element={<Report />} />
            <Route path="/Course" element={<Course />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
