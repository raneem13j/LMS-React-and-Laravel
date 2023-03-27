import "./Teacher.css";
import "./image/teacher.png";
import Header from "../../components/Header/Header";
import { Navbar, MenuBar } from "../../components/NavBar-pages/Navbar-pages";
import teache from "./image/teacher.png";
import Dropdown from "react-multilevel-dropdown";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Teacher() {
  const [menubar, setMenuBar] = useState(false);
  const [data, setData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token") && window.location.pathname !== "/") {
      navigate("/");
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

  const handleGetStudent = async (levelName, sectionName) => {
    console.log(levelName, sectionName)
    try {
      const response = await axios.get(`http://localhost:8000/api/listTeacher/${levelName}/${sectionName}`);
      setTeachers(response.data);
      console.log(teachers)
    } catch (error) {
      console.log(error);
    }
  };
  

  // const handleGetStudent = (levelName, sectionName) => {
  //   axios
  //     .get(`http://localhost:8000/api/listTeacher/${levelName}/${sectionName}`)
  //     .then((response) => {
  //       setTeachers(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <div>
        <Header />
        <div className="app-body">
          <Navbar setMenuBar={setMenuBar} menubar={menubar} />
          <MenuBar menubar={menubar} />
          <div className="class-body-t">
            <h2 className="class-headline-t">Teachers</h2>
            <div className="lol">
              <div>
                <Dropdown
                  className="dropdownSection button  coll-btn-select"
                  title="Select Sections"
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
                            <h3 name="sectionName"
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
              {teachers.map((item, index) => {
                
                return (
                  item ? 
                    <div key={index}>

                    <div className='infopartt'>
                    <img className="teacher-img" src={teache} alt="img" />
                    <hr/>
                  <br />
                  <div className='align-info'>
                      Name:
                      {item.firstName}
                      {" "}
                      {item.lastName}
                      <br/>
                      
                      Email:
                      {item.email}
                      
                      <br/>
                     
                      Phone Number:
                      {item.phoneNumber}

                      
                     
                      <br/>
                      <br/>
                     </div>
                      
                    </div>
  
                  </div>
                  : null
                
                )
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacher;
