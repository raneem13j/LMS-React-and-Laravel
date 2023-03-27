import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Navbar, MenuBar } from "../components/NavBar/Navbar";
import { useNavigate } from "react-router-dom";

function Course() {
  const [menubar, setMenuBar] = useState(false);
  const [course, setCourse] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token") && window.location.pathname !== "/") {
      navigate("/");
    }
  }, []);

  const CourseFetch = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/course");
      const data = await response.data;
      console.log(data);
      setCourse(data);
      // setDescription(data);
    } catch (err) {
      console.log(err);
    }
  };

  const courseDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/course/${id}`
      );
      setCourse(response.data);
      // setDescription(response.data);
    } catch (error) {
      console.log("error ", error);
    }
  };

  const coursePost = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/course", {
        subject,
        description,
      });
      if (response.statusText == "Created") {
        const newCourse = [...course, subject, description];
        setCourse(newCourse);
        setShowModal(false);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    coursePost();
  };

  useEffect(() => {
    CourseFetch();
  }, [course.length]); // this is the dependency array

  return (
    <>
      <div>
        <Header />
        <div className="app-body">
          <Navbar setMenuBar={setMenuBar} menubar={menubar} />
          <MenuBar menubar={menubar} />

          <div className="class-body-c">
            <h2 className="class-headline-c">Courses</h2>

            <div>
              <Container>
                <Button
                  onClick={(e) => setShowModal(true)}
                  sx={{ backgroundColor: "#2599BD" }}
                  variant="contained"
                  disableElevation
                >
                  Add Course
                </Button>

                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {course &&
                    course.map((item, index) => {
                      return (
                        <Grid item key={course.id}>
                          <Card
                            key={index}
                            sx={{
                              width: "300px",
                              height: "30px",
                              minHeight: "200px",
                              backgroundColor: "white",
                              border: "1px solid #ccc",
                              marginTop: "70px",
                              padding: "16px",
                            }}
                          >
                            <CardContent>
                              <Typography
                                sx={{ color: "#2599BD", maxHeight: "35px" }}
                                alignSelf="center"
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {item.subject}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#2599BD",
                                  maxHeight: "35px",
                                  overflow: "hidden",
                                }}
                                variant="body2"
                                color="text.secondary"
                              >
                                {item.description}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              {/* style={{position:'fixed',
    marginTop:'15vh' }}  */}
                              <Button
                                variant="outlined"
                                startIcon={<Delete />}
                                sx={{ color: "#2599BD" }}
                                size="small"
                                value={item.id}
                                style={{ marginTop: "30px" }}
                                onClick={(event) =>
                                  courseDelete(event.target.value)
                                }
                              >
                                Delete
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    })}
                </Grid>
              </Container>

              <Modal
                open={showModal}
                onClose={() => {
                  setShowModal(false);
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <form
                  style={{
                    backgroundColor: "white",
                    width: "45%",
                    height: "30%",
                    minHeight: 300,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 20,
                    borderRadius: 10,
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                  id="post-form"
                >
                  <div className="placeholder-description">
                    <TextField
                      helperText="Please enter Course Description "
                      id="demo-helper-text-misaligned"
                      label="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="placeholder-subject">
                    <TextField
                      helperText="Please enter Course Name "
                      id="demo-helper-text-misaligned"
                      label="Subject"
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div
                    className="form-btns"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "30%",
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={submitHandler}
                      margin={5}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>

    // className="form-btns" style={{display :"flex", flexDirection:"column" , justifyContent:"space-between" }}
  );
}

export default Course;
