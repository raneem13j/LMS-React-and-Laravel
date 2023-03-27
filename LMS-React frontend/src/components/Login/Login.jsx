import './login.css'
import React from 'react';
import { Component, useState , useEffect } from "react";
import '../StudentSuperAdmin/StudentSuperAdmin'
import swal from 'sweetalert'
import axios from 'axios';
import TeacherSuperAdmin from '../StudentSuperAdmin/StudentSuperAdmin';

function Login(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

 



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/userLMS/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
      console.log(data)
      
      if (response.ok) {
        swal({
          title: "Login successful",
          icon: "success",
        }).then(() => {
          window.localStorage.setItem("token", data.token);
          console.log("tok",data.token)
          if (data.role === "teacher") {
            window.location.href = "/home";
          } else if (data.role === "superadmin") {
            window.location.href = "/TeacherSuperAdmin";
          } else {
            
          }
        });
      } else {
        swal({
          title: "Login failed",
          text: data.message,
          icon: "error",
        });
      }
    } catch (error) {
     
      console.error(error);
    }
  };

  


    /** Remove the error Message after 2 Sec */

    useEffect(() => {
      if (!errorMessage) {
        return;
      }
  
      const timeoutId = setTimeout(() => {
        setErrorMessage("");
      }, 2000);
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [errorMessage]);
  
    

    return (
        <div className="main-container-login">
            <div className="adminlogin-box-container">
           <form onSubmit={(e)=>handleSubmit(e)}>
        <h3 className="title-login">Log In</h3>

        <div>
         
          <input
            className="input-login"
            type="email"
            placeholder="Enter your email"
            onChange={handleEmailChange} value={email}
            
          />
        </div>

        <div>
         
          <input
            className="input-login"
            type="password"
            placeholder="Enter your password"
            autoComplete="off"
                  value={password}
                  onChange={handlePasswordChange}
          />
        </div>

        <div >
      
          <button className="button-login" type="submit"  >
           Log In
          </button>
          
        </div>
        </form>
        
      
      
            </div>
        </div>
    )
      }
    



export default Login;