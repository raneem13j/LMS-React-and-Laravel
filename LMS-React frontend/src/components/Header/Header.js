import React from "react";
import "./Header.css";
import logo from "./image/logo.png";

function Header() {
  return (
    <div className="header">
    <div className="header_page">
      <div className="main_logo">
        <img className="logo" src={logo} alt="logo" />
      </div>

      <div className="header_title">
        <div className="header_text">
          <h2>Learning Management System</h2>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Header;