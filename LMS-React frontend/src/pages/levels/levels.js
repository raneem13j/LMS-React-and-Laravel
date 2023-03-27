import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { Navbar, MenuBar } from "../../components/NavBar-pages/Navbar-pages";
import { Multiselect } from "multiselect-react-dropdown";
import "./levels.css";
import delet from "./image/icons8-trash-can-30.png";

import edit from "./image/icons8-pencil-64.png";
import add from "./image/icons8-add-new-64.png";
import close from "./image/icons8-close-window-48.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Levels = () => {
  const [menubar, setMenuBar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const url = `http://localhost:8000/api/levels`;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);
  const [formData, setFormData] = useState({
    levelName: "",
    capacity: "",
    sectionIds: [],
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const form = useRef();

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

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) {
      return;
    }
    try {
      await axios.delete(`${url}/${id}`);
      setData(data.filter((card) => card._id !== id));
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditItem = async (id) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      const levelName = response.data.levelName;
      setFormData({ levelName });
      setId(id);
      setEditMode(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setAddMode(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${url}/${id}`, formData);
      setEditMode(false);
      setId("");
      setFormData({ levelName: "" });
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
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
  const onSelect = (selectedList, selectedItem) => { 
    setSelectedValues(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
  };

  const handleAddItem = async (event) => {
    event.preventDefault();
    const sectionIds = selectedValues.map((section) => section.id);
    console.log(sectionIds);
    const { levelName, capacity } = formData;

    try {
      const response = await axios.post(`${url}`, {
        levelName,
        capacity,
        sectionIds,
      });

      setData([...data, response.data]);
      setFormData({ levelName: "", capacity: "" });
      setSelectedValues([]);
      setAddMode(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    setAddMode(false);
    setEditMode(false);
  };

  return (
    <>
      <div>
        <Header />
        <div className="app-body">
          <Navbar setMenuBar={setMenuBar} menubar={menubar} />
          <MenuBar menubar={menubar} />
          <div className="class-body">
            <h2 className="class-headline">Classes</h2>
            <div className="head-div">
              <h2 className="class-headline1">Add Class</h2>
              <div>
                <button className="class-button" onClick={handleAdd}>
                  <img src={add} alt="" className="class-image" />
                </button>
              </div>
            </div>
            <div className="class-form">
              {addMode && (
                <form onSubmit={handleAddItem} ref={form}>
                  <input
                    className="class-input"
                    type="text"
                    placeholder="Class Name"
                    name="levelName"
                    value={formData.levelName}
                    onChange={handleChange}
                  ></input>
                  <input
                    className="class-input"
                    type="text"
                    placeholder="Capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                  ></input>

                  <Multiselect
                    className="class-inputR"
                    options={options}
                    selectedValues={selectedValues}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    displayValue="sectionName"
                  />
                  <button type="submit" className="class-buttonRR">
                    SAVE
                  </button>
                  <button className="class-button-close" onClick={handleClose}>
                    <img src={close} alt="" className="class-image" />
                  </button>
                </form>
              )}
              {editMode && (
                <form onSubmit={handleUpdate} ref={form}>
                  <input
                    className="class-input"
                    type="text"
                    placeholder="Class Name"
                    name="levelName"
                    value={formData.levelName}
                    onChange={handleChange}
                  ></input>
                  <button type="submit" className="class-buttonR">
                    SAVE
                  </button>
                  <button className="class-button-close" onClick={handleClose}>
                    <img src={close} alt="" className="class-image" />
                  </button>
                </form>
              )}
            </div>
            <div className="class-section">
              <table className="class-table">
                <thead>
                  <tr className="class-tr">
                    <th className="class-th name">Class</th>
                    <th className="class-th">Edit</th>
                    <th className="class-th">Delete</th>
                    <th
                      className="class-th name2"
                      colSpan={data.reduce(
                        (acc, card) => acc + card.sections.length,
                        1
                      )}
                    >
                      Section
                    </th>
                  </tr>
                </thead>
                {data.map((card) => (
                  <tbody key={card.id}>
                    <tr className="class-tr row row1">
                      <td
                        className="class-td name1"
                        rowSpan={card.sections.length}
                      >
                        {card.levelName}
                      </td>
                      <td className="class-td icon">
                        <button
                          className="class-button"
                          onClick={() => handleEditItem(card.id)}
                        >
                          <img src={edit} className="class-image" alt="" />
                        </button>
                      </td>
                      <td className="class-td icon">
                        <button className="class-button">
                          <img
                            src={delet}
                            alt=""
                            className="class-image"
                            onClick={() => handleDelete(card.id)}
                          />
                        </button>
                      </td>
                      {card.sections.map((section, index) => (
                        <React.Fragment key={section.id}>
                          {index > 0 && <tr className="class-tr row row1" />}
                          <td className="class-td name1">
                            {section.sectionName}
                          </td>
                        </React.Fragment>
                      ))}
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Levels;
