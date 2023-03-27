import React, { useState, useEffect, useRef } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import "./sections.css";
import delet from "./image/icons8-trash-can-30.png";
import edit from "./image/icons8-pencil-64.png";
import add from "./image/icons8-add-new-64.png";
import close from "./image/icons8-close-window-48.png";
import axios from "axios";
import Header from "../Header/Header";
import { Navbar, MenuBar } from "../NavBar/Navbar";
import { useNavigate } from "react-router-dom";


const Sections = () => {
  const [menubar, setMenuBar] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const url = `http://localhost:8000/api/sections`;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);

  const [formData, setFormData] = useState({
    sectionName: "",
    capacity: "",
    levelIds: [],
    
     });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const form = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/sections`)
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
      const sectionName = response.data.sectionName;
      setFormData({ sectionName });
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
      setFormData({ sectionName: "" });
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
      .get("http://localhost:8000/api/levels")
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
    const levelIds = selectedValues.map((level) => level.id);
    console.log(levelIds);
    const { sectionName, capacity } = formData;

    try {
      const response = await axios.post(`${url}`, {
        sectionName,
        capacity,
        levelIds,
      });
      
      setData([...data, response.data]);
      setFormData({ sectionName: "", capacity: "" });
      setSelectedValues([]);
      setAddMode(false);
      window.location.reload(); 
    } catch (error) {
      console.error(error);
    }
    window.location.reload(true);
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
    <div className="section-body">
      <h1 className="section-headline">Sections</h1>
      <div className="head-div">
        <h2 className="section-headline1">Add Section</h2>
        <div>
          <button id="add" className="section-button" onClick={handleAdd}>
            <img src={add} alt="" className="section-image" />
          </button>
        </div>
      </div>
      <div className='section-form'>
      {addMode && (
          <form onSubmit={handleAddItem} ref={form}>
            <input
              className="section-input"
              type="text"
              placeholder="Section Name"
              name="sectionName"
              value={formData.sectionName}
              onChange={handleChange}
            ></input>
            <input
              className="section-input"
              type="text"
              placeholder="Capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
            ></input>

            <Multiselect
              className="section-inputR"
              options={options}
              selectedValues={selectedValues}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="levelName"
             
            />
            <button type="submit" className="section-buttonRR">
              SAVE
            </button>
            <button className="class-button-close" onClick={handleClose} >
              <img src={close} alt="" className="class-image" />
              </button>
          </form>
          )}
           {editMode && (
          <form onSubmit={handleUpdate} ref={form} >
          <input className='section-input' type='text' placeholder='Section Name' name="sectionName" value={formData.sectionName}
                onChange={handleChange}></input>
                <button type="submit" className="section-buttonR">
                  SAVE
                </button>
                <button className="class-button-close" onClick={handleClose} >
                 <img src={close} alt="" className="class-image" />
                </button>
          </form>   
           )}
        </div> 
      <div className="section-section">
        <table className="section-table">
          <thead>
            <tr className="section-tr">
              <th className="section-th nameR">Section</th>
              <th className="section-th">Edit</th>
              <th className="section-th">Delete</th>
            </tr>
          </thead>
          {data.map((card) => (
            <tbody key={card.id}>
              <tr className="section-tr row row1">
                <td className="section-td nameR1">{card.sectionName}</td>

                <td className="section-td icon">
                  <button className="section-button" onClick={() => handleEditItem(card.id)} >
                    <img src={edit} className="class-image" alt="" />
                  </button>
                </td>
                <td className="section-td icon">
                  <button className="section-button">
                    <img
                      src={delet}
                      alt=""
                      className="section-image"
                      onClick={() => handleDelete(card.id)}
                    />
                  </button>
                </td>
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

export default Sections;


