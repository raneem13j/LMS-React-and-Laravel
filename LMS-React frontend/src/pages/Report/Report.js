import React, { useEffect, useState } from "react";
import "./Report.css";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Header from "../../components/Header/Header";
import { Navbar, MenuBar } from "../../components/NavBar-pages/Navbar-pages";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function Report() {

const [menubar, setMenuBar] = useState(false);
const [name, setName] = useState([]);
const [grade, setGrade] = useState("");
const [section, setSection] = useState("");
const [compare, setCompare] = useState("");
const [pieChartData,setPieChartData]= useState({})
const [isPieChartVisible,setIsPieChartVisible] = useState(false)
const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token') && window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);
  
useEffect(() => {
    axios
    .get(`http://localhost:8000/api/getReport`)
    .then((response) => {
        setName(response.data);
    
    })
    .catch((error) => {
        console.log(error);
    });
},[]);

useEffect(() => {
    let present = 0
    let absent = 0
    let late = 0

    if(grade !== null && grade !== '' && section !== null && section !== ''){
        name.filter((item) => {
            if(item.grade !== null && item.grade !== '' && item.section !== '' && item.section !== null){
                if(item.grade.toLowerCase() === grade && item.section.toLowerCase() === section){
                    return item;
                }
            }else{
                return null
            }
        }).map((student,index) => {
            if(student.status === 'present'){
                present += 1
            }else if(student.status === 'absent'){
                absent += 1
            }else if(student.status === 'late'){
                late += 1
            }
        })
    }

    setPieChartData({labels:['present','absent','late'],'datasets':[{label:'Pie Chart',data:[present,absent,late],backgroundColor:['#2599BD','#f96b00','#D6A982']}]})

    if(present || late || absent){
        setIsPieChartVisible(true)
    }
},[grade,section])


return (
    <>
    <div>
      <Header/>
      <div className="app-body">
        <Navbar setMenuBar={setMenuBar} menubar={menubar} />
        <MenuBar menubar={menubar} />
    <div className="background">
    <div className="search">
        <div className="searchName">
        <input
            placeholder="Search By Name"
            onChange={(event) => setCompare(event.target.value)}
        />
        </div>
        <div className="searchSection">
        <div>
            <input
            placeholder="Search By Grade"
            onChange={(event) => setGrade(event.target.value)}
            />
        </div>
        <div>
            <input
            placeholder="Search By Section"
            onChange={(event) => setSection(event.target.value)}
            />
        </div>
        </div>
    </div>

    <div className="report">
        <div className="status">
        {
            name !== null && name.length  ? 
            name.filter((Name) => {
                if (compare === "" || Name.role === 'teacher') {
                    return null;
                } else if (Name.firstName.toLowerCase().includes(compare.toLowerCase())) {
                    return name;
                }
                })
                .map((name, index) => (
                <div className="statusByName">
                    <div className="boxStatus" key={index}>
                    <h5>
                        {name.firstName} {name.lastName}
                    </h5>
                    <h5>{name.status}</h5>
                    </div>
                </div>
                ))
            : null
        }
        </div>
        <div className='status'>
            {name.filter((Attendance) => {
                if(grade === '' || section === '' || grade === null || section === null || Attendance.grade === '' || Attendance.section === '' || Attendance.grade === null || Attendance.section === null){
                    return null;
                }
                else if (Attendance.grade.toLowerCase()===(grade.toLowerCase()) && Attendance.section.toLowerCase()===(section.toLowerCase()) ){
                    return Attendance;
                }
            })
            .map((attendance, index)=>(
            <div className='statusByName'>
                <div className='boxStatus1' key={index}>
                    <h5>{attendance.firstName} {attendance.lastName}</h5>
                    <h5>{attendance.status}</h5>
            </div>
            </div>
            
            ))}
            
        </div>

    </div>
    {
    isPieChartVisible ? (
        <div className="pie">
            <Pie data={pieChartData} />
        </div>
    )
    : null
}
    </div>
    </div>
    </div>
    </>
);
}

export default Report;
