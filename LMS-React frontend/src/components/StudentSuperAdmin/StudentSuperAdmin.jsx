import "./StudentSuperAdmin.css";
import "./images/student.png";
import student from "./images/student.png";
import Dropdown from "react-multilevel-dropdown";
import { Component, useState, useEffect } from "react";
import axios from "axios";
import { Multiselect } from "multiselect-react-dropdown";
import { Select } from "@material-ui/core";
import Header from "../../components/Header/Header";
import { Navbar, MenuBar } from "../../components/NavBar/Navbar";
import { useNavigate } from "react-router-dom";
function StudentSuperAdmin() {
  const [menubar, setMenuBar] = useState(false);
  const token = localStorage.getItem("token");

  const [levelName, setLevel] = useState("");
  const [sectionName, setSection] = useState("");
  const [editStudent, setEditStudent] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [levSec, setlevSec] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentCollection, postStudent] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("student");
  const [updatee, postUpdate] = useState("");
  const [idd, setidd] = useState("");
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [optionsLevel, setOptionsLevel] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValuesLevel, setSelectedValuesLevel] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token") && window.location.pathname !== "/") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sections")
      .then((response) => {
        setOptions(response.data); // assuming response is an array of objects with a name property
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/levels")
      .then((response) => {
        setOptionsLevel(response.data); // assuming response is an array of objects with a name property
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    loadLevelSEction();
  }, []);

  useEffect(() => {
    selectedStudent();
  }, []);

  const config1 = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const onSelectLevel = (selectedListLevel, selectedItem) => {
    setSelectedValuesLevel(selectedListLevel);
  };

  const onRemoveLevel = (selectedListLevel, removedItem) => {
    setSelectedValuesLevel(selectedListLevel);
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
  };

  const handleEditStudent = async (id) => {
    // e.preventDefault();
    console.log("student", studentCollection);
    const updateForm = document.getElementById("second-formm");
    updateForm &&
      window.scrollTo({ top: updateForm.offsetTop, behavior: "smooth" });
    setAddStudent(false);
    setEditStudent(true);

    const respond = await axios.get(`http://localhost:8000/api/userLMS/${id}`);

    console.log(respond);

    setFirstName(respond.data.message.firstName);

    setLastName(respond.data.message.lastName);
    setEmail(respond.data.message.email);
    setPassword(respond.data.message.password);
    setPhoneNumber(respond.data.message.phoneNumber);
    setidd(respond.data.message.id);
  };

  const updateStudentINfo = async (e) => {
    e.preventDefault();
    let postupdate = { firstName, lastName, email, password, phoneNumber };
    console.log(
      "nftcollection ",
      firstName,
      lastName,
      email,
      password,
      phoneNumber
    );
    try {
      console.log("iddd", idd);
      const response = await axios.put(
        `http://localhost:8000/api/userLMS/${idd}`,
        {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
        },
        config1
      );
      alert("You have updated the student info!");
      window.location.reload(true);
      console.log("response ", response);
    } catch (err) {
      console.log("error", err);
    }
  };

  //delete student

  const deleteStudent = async (id) => {
    const url = `http://localhost:8000/api/userLMS/${id}`;

    try {
      const response = await axios.delete(url, config1);

      selectedStudent();
      alert("You have delete it!");
      window.location.reload(true);
    } catch (error) {
      console.log("error ", error);
    }
  };

  //get level section
  const loadLevelSEction = () => {
    axios
      .get("http://localhost:8000/api/levels")
      .then((response) => {
        setlevSec(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getterbyname = async (firstName) => {
    const responsee = await axios.get(
      `http://localhost:8000/api/userLMS/getUserbyName/${firstName}`
    );
    //  console.log( responsee.data[0])
    if (responsee.data[0].role === "student") {
      setStudents(responsee.data);
    } else {
      alert("This student doesn't exist");
    }
  };

  const changingParams = (e) => {
    e.preventDefault();
    postStudent({ ...studentCollection, [e.target.name]: e.target.value });
  };
  const handleAddStudent = async (e) => {
    e.preventDefault();
    console.log("student", studentCollection);
    const addForm = document.getElementById("firstt-formm");

    addForm && window.scrollTo({ top: addForm.offsetTop, behavior: "smooth" });
    setEditStudent(false);
    setAddStudent(true);

    const form = e.target;
    const formData = new FormData(form);

    const newUser = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: "student",
      phoneNumber: formData.get("phoneNumber"),
      levelName: selectedValuesLevel[0].levelName,
      sectionName: selectedValues[0].sectionName,
    };

    console.log("userbody ", newUser);

    axios
      .post("http://localhost:8000/api/userLMS", newUser)
      .then((response) => {
        console.log("New student added: ", response.data);
        postStudent([...students, response.data]);
        setAddStudent(false);
        alert("You have added a student")
      })
      .catch((error) => {
        console.log(error);
      });

    
  };

  const selectedStudent = async (e, sectionName, levelName) => {
    e.preventDefault();

    console.log("section ", sectionName);
    console.log("course ", levelName);

    setLevel(levelName);
    setSection(sectionName);
    const res = await axios.get(
      `http://localhost:8000/api/listStudent/${levelName}/${sectionName}`
    );
    console.log("dataaa ", res.data);
    setStudents(res.data);
  };

  return (
    <>
      <div>
        <Header />
        <div className="app-body">
          <Navbar setMenuBar={setMenuBar} menubar={menubar} />
          <MenuBar menubar={menubar} />
          <div className="class-body-RR">
            <h2 className="class-headline-RR">Students</h2>
          <div className="lol">
            <div className="first-buttons">
              <Dropdown
                className="dropdownSection button  coll-btn-select"
                title=" Select Sections"
                position="bottom"
                buttonVariant="primary"
              >
                {levSec.map((card, key) => (
                  <Dropdown.Item
                    key={key}
                    name={levelName}
                    className="childSection"
                    value={card.id}
                  >
                    {card.levelName}

                    <Dropdown.Submenu position="right">
                      {card.sections.map((section, key2) => (
                        <Dropdown.Item
                          className="childSection"
                          key={key2}
                          onClick={(e) =>
                            selectedStudent(
                              e,
                              section.sectionName,
                              card.levelName
                            )
                          }
                          value={section.id}
                        >
                          <h3 name="sectionName">
                            Sections {section.sectionName} {section.id}
                          </h3>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Submenu>
                  </Dropdown.Item>
                ))}
              </Dropdown>

              <input
                type="text"
                id="header-search"
                placeholder="Search for Student"
                name="searchStudent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                type="submit"
                className="button search-btns"
                onClick={() => getterbyname(search)}
              >
                Search
              </button>

              <button
                className="button  coll-btns"
                id="add-btn"
                onClick={handleAddStudent}
              >
                Add
              </button>
            </div>
            <div className="levsecc">
              {levelName}
              {sectionName}
            </div>
            <div className="mappingdata">
              {students.map((item, index) => {
                // {console.log("temmm",item.levelName, item.sectionName)}
                return item ? (
                  <div key={index}>
                    <div className="infopart">
                      <img className="student-img" src={student} alt="img" />
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
                      <div className="add-updatebtn">
                        <button
                          className="button collection-button"
                          onClick={() => handleEditStudent(item.id)}
                        >
                          Update
                        </button>
                        <br />
                        {/* {console.log("idss",item ? item.id :null)} */}
                        <button
                          className=" button collection-button del"
                          onClick={() => deleteStudent(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>

            <div className="formm">
              {addStudent && (
                <form
                  className="firstt-formm"
                  id="firstt-formm"
                  onSubmit={handleAddStudent}
                >
                  <br />
                  <legend className="legendd">Add Student Info</legend>
                  <br />

                  <label className="alignForm">
                    First name:
                    <input
                      className="textForm1 "
                      type="text"
                      value={studentCollection.firstName}
                      name="firstName"
                      onChange={changingParams}
                      required
                    ></input>
                  </label>
                  <br />
                  <label className="alignForm">
                    Last name{" "}
                    <input
                      className="textForm2 "
                      type="text"
                      name="lastName"
                      value={studentCollection.lastName}
                      onChange={changingParams}
                      required
                    ></input>
                  </label>
                  <br />
                  <label className="alignForm">
                    Email{" "}
                    <input
                      className="textForm3 "
                      type="email"
                      name="email"
                      value={studentCollection.email}
                      onChange={changingParams}
                      required
                    ></input>
                  </label>
                  <br />
                  <label className="alignForm">
                    Password{" "}
                    <input
                      className="textForm4 "
                      type="text"
                      name="password"
                      value={studentCollection.password}
                      onChange={changingParams}
                      required
                    ></input>
                  </label>
                  <br />

                  <label className="alignForm">
                    Phone num{" "}
                    <input
                      className="textForm5 "
                      type="text"
                      name="phoneNumber"
                      value={studentCollection.phoneNumber}
                      onChange={changingParams}
                      required
                    ></input>
                  </label>
                  <br />
                  <label for="type" className="alignForm">
                    Student Level:
                    {console.log("levelll", selectedValuesLevel[0])}
                    <Multiselect
                      id="typee"
                      name="levelName"
                      options={optionsLevel}
                      selectedValues={selectedValuesLevel}
                      onSelect={onSelectLevel}
                      onRemove={onRemoveLevel}
                      displayValue="levelName"
                      selectionLimit={1}
                    ></Multiselect>
                  </label>
                  <br />
                  <label for="type" className="alignForm">
                    Student Section:
                    {console.log("sections", selectedValues[0])}
                    <Multiselect
                      id="typee"
                      name="sectionName"
                      options={options}
                      selectedValues={selectedValues}
                      onSelect={onSelect}
                      onRemove={onRemove}
                      displayValue="sectionName"
                      selectionLimit={1}
                    >
                      -
                    </Multiselect>
                    {/* {console.log("sectionn",selectedValues[0])} */}
                  </label>

                  <br />

                  <input type="submit" className="button colle-btn"></input>
                  <input
                    type="submit"
                    value="close"
                    onClick={() => window.location.reload()}
                    className="button colle-btn"
                  ></input>
                  <br />
                </form>
              )}

              {editStudent && (
                <form className="second-formm" id="second-formm">
                  <br />
                  <legend className="legendd" id="update-btn">
                    Update Student Info
                  </legend>
                  <br />

                  <label className="alignForm">
                    Enter student first name:
                    <input
                      className="afterAlign"
                      type="text"
                      value={firstName}
                      name="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    ></input>
                  </label>
                  <br />
                  <label className="alignForm">
                    Enter student last name{" "}
                    <input
                      type="text"
                      className="afterAlign"
                      value={lastName}
                      name="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    ></input>
                  </label>
                  <br />
                  <label className="alignForm">
                    Enter student Email{" "}
                    <input
                      type="email"
                      className="afterAlign"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></input>
                  </label>
                  <br />
                  <label className="alignForm">
                    Enter student password{" "}
                    <input
                      type="text"
                      className="afterAlign"
                      value={password}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    ></input>
                  </label>
                  <br />
                  <label className="alignForm">
                    Enter student phone number{" "}
                    <input
                      type="text"
                      className="afterAlign"
                      value={phoneNumber}
                      name="phoneNumber"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    ></input>
                  </label>
                  <br />

                  <input
                    type="submit"
                    value="submit"
                    className="button colle-btn"
                    id="submit"
                    onClick={updateStudentINfo}
                  ></input>
                  <input
                    type="submit"
                    value="close"
                    onClick={() => window.location.reload()}
                    className="button colle-btn"
                  ></input>
                  <br />
                </form>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentSuperAdmin;
