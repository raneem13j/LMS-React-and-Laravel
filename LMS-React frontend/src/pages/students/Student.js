import "./Student.css";
import "./image/student.png";
import Header from "../../components/Header/Header";
import { Navbar, MenuBar } from "../../components/NavBar-pages/Navbar-pages";
import studen from "./image/student.png";
import Dropdown from "react-multilevel-dropdown";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Student() {
  const [menubar, setMenuBar] = useState(false);
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);
  const dropdownStyles = {
    fontSize: "26px",
  };

  
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/levels`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleGetStudent = (levelName, sectionName) => {
    axios
      .get(`http://localhost:8000/api/listStudent/${levelName}/${sectionName}`)
      .then((response) => {
        setStudents(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <Header />
        <div className="app-body">
          <Navbar setMenuBar={setMenuBar} menubar={menubar} />
          <MenuBar menubar={menubar} />
          <div className="class-body-s">
            <h2 className="class-headline-s">Students</h2>
          <div className="lol">
            <div className="first-buttons">
            <Dropdown
                className="dropdownSection button  coll-btn-select"
                title=" Select Sections"
                position="bottom"
                buttonVariant="primary"
                style={dropdownStyles}
              >
                {data.map((card) => (
                  <Dropdown.Item key={card.id} className="childSection">
                    {card.levelName}
                    <Dropdown.Submenu position="right">
                      {card.sections.map((section) => (
                        <Dropdown.Item key={card.id}>
                          <h3
                            onClick={() =>
                              handleGetStudent(
                                card.levelName,
                                section.sectionName
                              )
                            }
                          >
                            Section {section.sectionName}
                          </h3>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Submenu>
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <div className="mappingdata">
            {students.map((item, index) => {
                // {console.log("temmm",item.levelName, item.sectionName)}
                return item ? (
                  <div key={index}>
                    <div className="infopartt">
                      <img className="student-img" src={studen} alt="img" />
                      <hr />
                      <br />
                      <div className="align-info">
                        Name:
                        {item.firstName} {item.lastName}
                        <br />
                        Email:
                        {item.email}
                        <br />
                        Phone Number:
                        {item.phoneNumber}
                        <br />
                        <br />
                      </div>
                      
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Student;
