 import './TeacherSuperAdmin.css';
import './images/student.png'
import teacher from "./images/teacher.png"
import  Dropdown from "react-multilevel-dropdown"
import { useState,useEffect } from "react";
import axios from 'axios';
import {Multiselect} from "multiselect-react-dropdown";
import Header from "../../components/Header/Header";
import { Navbar, MenuBar } from "../../components/NavBar/Navbar";
import { useNavigate } from "react-router-dom";

function TeacherSuperAdmin(){


  const token = localStorage.getItem('token');

  const [menubar, setMenuBar] = useState(false);
  const [levSec,setlevSec]=useState([]);
  const [levelName, setLevel] = useState('');
  const [sectionName, setSection] = useState('');
  const [search,setSearch]=useState("");
  const [editTeacher,setEditTeacher]=useState(false);
  const [addTeacher,setAddTeacher]=useState(false);
  const [teachers,setTeachers]=useState([]);
  const [teacherCollection, postTeacher] = useState("");
const [firstName,setFirstName]=useState("");
const [lastName,setLastName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [phoneNumber,setPhoneNumber]=useState("");

const [idd, setidd] = useState("");
const [options, setOptions] = useState([]);
const [optionsLevel, setOptionsLevel] = useState([]);
const [optionsSubject, setOptionsSubject] = useState([]);
const [selectedValuesSubject, setSelectedValuesSubject] = useState([]);
const [selectedValues, setSelectedValues] = useState([]);
const [selectedValuesLevel, setSelectedValuesLevel] = useState([]);


const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);

const config2= {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  }
}



  const getterbyname=async(name)=>{
    const responsew= await axios.get(`http://localhost:8000/api/userLMS/getUserbyName/${name}`)
    console.log( responsew.data[0])
   if(responsew.data[0].role==="teacher"){
    setTeachers(responsew.data)}
    else{
      alert("This teacher doesn't exist")
    }
   }

   useEffect(()=>{
    // selectedTeacher()
  },[]);
  useEffect(()=>{  
    loadLevelSEction()
    
       },[] );


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
      },[]);

      useEffect(() => {
        axios
          .get("http://localhost:8000/api/course")
          .then((response) => {
            setOptionsSubject(response.data); // assuming response is an array of objects with a name property
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      

  const loadLevelSEction=(()=>{
  
    axios.get('http://localhost:8000/api/levels')
    .then((response)=> {
              setlevSec(response.data);
                  }) 
                      .catch((error)=>{ 
                               console.log(error);
                                  })
  });


  const handleEditTeacher= async(id)=>{
    // e.preventDefault();
    console.log("student",teacherCollection);
    const updateForm= document.getElementById('second-formm1');
    updateForm&& window.scrollTo({ top: updateForm.offsetTop, behavior: "smooth" });
    setAddTeacher(false);
    setEditTeacher(true);
   
      const respond = await axios.get(`http://localhost:8000/api/userLMS/${id}`)
     
      console.log(respond);
      
      setFirstName(respond.data.message.firstName);
     
      setLastName(respond.data.message.lastName);
      setEmail(respond.data.message.email);
      setPassword(respond.data.message.password);
      setPhoneNumber(respond.data.message.phoneNumber);
      setidd(respond.data.message.id)
     
  };

  const updateTeacherINfo=async(e)=>{
    e.preventDefault();
    let postupdate = { firstName, lastName, email, password, phoneNumber };
    console.log("nftcollection ", firstName, lastName, email,password, phoneNumber);
    try {
      console.log("iddd",idd)
      const response = await axios.put(`http://localhost:8000/api/userLMS/${idd}`,{
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      },config2);
      alert("You have updated the student info!")
      window.location.reload(true);
      console.log("response ", response)
    } catch (err) {
      console.log("error", err);
    }
   }

  const handleAddTeacher= async (e) => {
    e.preventDefault();
    
    const addForm = document.getElementById('firstt-formm1');
    
    addForm && window.scrollTo({ top: addForm.offsetTop, behavior: "smooth" });
    setEditTeacher(false)
    setAddTeacher(true);
  
    const form = e.target;
      const formData = new FormData(form);
      const newUser = {
        
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: "teacher",
        phoneNumber: formData.get("phoneNumber"),
        levelName: selectedValuesLevel[0].levelName,
        sectionName: selectedValues[0].sectionName,
        subject:selectedValuesSubject[0].subject,

      };
      console.log("newleve",levelName)
      console.log("newsec",sectionName)
      console.log("userbody ",newUser);
    
      axios
        .post("http://localhost:8000/api/userLMS", newUser)
        .then((response) => {
          console.log("New student added: ", response.data);
          postTeacher([...teachers, response.data]);
          setAddTeacher(false);
          alert("gftf")
        })
        .catch((error) => {
          console.log(error);
        });
    
   
        // window.location.reload(true);
  }

  const changingParams=(e)=>{
    e.preventDefault();
    postTeacher({ ...teacherCollection, [e.target.name]: e.target.value });
  }

  const onSelectLevel = (selectedListLevel, selectedItem) => {
    setSelectedValuesLevel(selectedListLevel);
  };
  
  const onRemoveLevel = (selectedListLevel, removedItem) => {
    setSelectedValuesLevel(selectedListLevel);
  };
  const onSelectSubject = (selectedListSubject, selectedItem) => {
    setSelectedValuesSubject(selectedListSubject);
  };
  
  const onRemoveSubject = (selectedListSubject, removedItem) => {
    setSelectedValuesSubject(selectedListSubject);
  };
  
  const onSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
  };
  
  const onRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
  };

   const selectedTeacher = async(e,sectionName, levelName) => {
    e.preventDefault();
   
    setLevel(levelName);
    setSection(sectionName);
      const res = await axios.get(`http://localhost:8000/api/listTeacher/${levelName}/${sectionName}`)
      console.log("dataaa ",res.data);
      setTeachers(res.data);
  
  
  }

  const deleteTeacher = async (id) => {
  
    const url = `http://localhost:8000/api/userLMS/${id}`;
    
    try{
      const response = await axios.delete(url,config2)
      
      selectedTeacher();
      alert("You have delete it!")
      window.location.reload(true);
    }
    catch(error){
      console.log("error ",error)
    }
  }




    return (
        <>
          
          <div>
        <Header />
        <div className="app-body">
          <Navbar setMenuBar={setMenuBar} menubar={menubar} />
          <MenuBar menubar={menubar} />
          <div className="class-body-R">
            <h2 className="class-headline-R">Teachers</h2>
          <div className='lolTeacher'>
          <div className='first-buttons'>  

<Dropdown
  className="dropdownSection button1  coll-btn-select1"
  title=" Select Sections"
  position="bottom"
  buttonVariant="primary"
  
  >
  {levSec.map((card,key) => (
  
    <Dropdown.Item key={key}  name={levelName} className="childSection1" value={card.id}>
     
      {card.levelName} 
    
  <Dropdown.Submenu position="right">
    {card.sections.map((section,key2)=>

  <Dropdown.Item className="childSection" key={key2} onClick={(e)=>selectedTeacher(e,section.sectionName, card.levelName)} value={section.id}>
  <h3 name='sectionName'>Sections {section.sectionName}</h3>
  
  
  </Dropdown.Item>)}
  </Dropdown.Submenu>
    </Dropdown.Item>
      ))}
    </Dropdown>


    <input
            type="text"
            id="header-search1"
            placeholder="Search for Teacher"
            name="searchStudent" value={search} onChange={(e) => setSearch(e.target.value)}
            />
        
        <button type="submit"  className='button1 search-btns1' onClick={()=>getterbyname(search)}>Search</button>
        <button className='button1  coll-btns1' id='add-btn'  onClick={handleAddTeacher}
                          >Add</button>
    
    </div>
    <div className='levseccR'>
                        {levelName} {sectionName}
                        
                        </div>


                        <div className='mappingdata'>
              
                        
              {teachers.map((item, index) => {
                
                return (
                  item ? 
                    <div key={index}>

                    <div className='infopart'>
                    <img className="teacher-img" src={teacher} alt="img" />
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
                      <div className='add-updatebtn'>
                      <button className='button1 collection-button' onClick={()=>handleEditTeacher(item.id)} >Update</button>
                        <br/>
                        {/* {console.log("idss",item ? item.id :null)} */}
                      <button className=' button1 collection-button del' onClick={() => deleteTeacher(item.id)} >Delete</button>
                      </div>
                    </div>
  
                  </div>
                  : null
                
                )
              })}
            </div>
    
            <div  className='formm' >
            
            {addTeacher &&(
            <form className='firstt-formm1' id='firstt-formm1' onSubmit={handleAddTeacher}>
            <br />
            <legend className='legendd'>Add Teacher Info</legend>
            <br />
  
            <label className='alignForm'>First name:<input className='textForm1 ' type='text' value={teacherCollection.firstName} name="firstName" onChange={changingParams} required></input></label>
            <br/>
            <label className='alignForm'>Last name <input className='textForm2 ' type='text' name="lastName" value={teacherCollection.lastName} onChange={changingParams} required></input></label>
            <br />
            <label className='alignForm'>Email <input className='textForm3 ' type='email' name="email" value={teacherCollection.email} onChange={changingParams} required></input></label>
            <br />
            <label className='alignForm'>Password <input className='textForm4 ' type='text' name="password" value={teacherCollection.password} onChange={changingParams} required></input></label>
            <br />
            
            <label className='alignForm'>Phone num <input className='textForm5 ' type='text' name="phoneNumber" value={teacherCollection.phoneNumber} onChange={changingParams} required></input></label>
            <br />
            <label for="type" className='alignForm'>Teacher Level:
           
            <Multiselect id="typee" name="levelName"  options={optionsLevel} selectedValues={selectedValuesLevel} onSelect={onSelectLevel}
            onRemove={onRemoveLevel}
            displayValue="levelName" selectionLimit={1}
          ></Multiselect>
           {console.log("sections",selectedValuesLevel[0])}
  
            
        </label>
            <br/>
            <label for="type" className='alignForm'>Teacher Section:
            <Multiselect id="typee" name="sectionName"  options={options} selectedValues={selectedValues} onSelect={onSelect}
            onRemove={onRemove}
            displayValue="sectionName" selectionLimit={1}
            >-</Multiselect>
            {console.log("sections",selectedValues[0])}
          
          </label>
  
          <br/>
            <label for="type" className='alignForm'>Subject:
            <Multiselect id="typee" name="subject"  options={optionsSubject} selectedValues={selectedValuesSubject} onSelect={onSelectSubject}
            onRemove={onRemoveSubject}
            displayValue="subject" selectionLimit={1}
            >-</Multiselect>
            {console.log("subject",selectedValuesSubject[0])}
          
          </label>
  
            
  
            <br />
          
            
            <input type="submit" className='button1 colle-btn'  ></input>
            <input type="submit" value='close' onClick={()=>(window.location.reload())} className='button colle-btn'></input>
            <br />
          </form>)}


          {editTeacher &&(
        <form className='second-formm1' id='second-formm1' >
          <br />
          <legend className='legendd' id='update-btn'>Update Student Info</legend>
          <br />

          <label className='alignForm'>Enter student first name:<input className="afterAlign"type='text' value={firstName} name="firstName" onChange={(e) => setFirstName(e.target.value)} required></input></label>
          <br />
          <label className='alignForm'>Enter student last name <input type='text' className="afterAlign" value={lastName} name="lastName" onChange={(e) => setLastName(e.target.value)} required></input></label>
          <br />
          <label className='alignForm'>Enter student Email <input type='email' className="afterAlign" value={email} name="email" onChange={(e) => setEmail(e.target.value)} required></input></label>
          <br />
          <label className='alignForm'>Enter student password <input type='text' className="afterAlign" value={password} name="password" onChange={(e) => setPassword(e.target.value)} required></input></label>
          <br />
          <label className='alignForm'>Enter student phone number <input type='text' className="afterAlign" value={phoneNumber} name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} required></input></label>
          <br />
         
          
          
          <input type="submit"value="submit" className='button1 colle-btn' id="submit" onClick={updateTeacherINfo}></input>
          <input type="submit" value='close' onClick={()=>(window.location.reload())} className='button1 colle-btn'></input>
          <br />
          
        </form>
        )}
          </div>
          </div>
          </div>
        </div>
        
        </div>
          
        </>
      )
    
}

export default TeacherSuperAdmin;