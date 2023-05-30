import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import decode from 'jwt-decode';

const AssignInstructor = () => {
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);

  const history =useNavigate()
  const token = localStorage.getItem("token");
  const userInfo = decode(token);

  useEffect(() => {
    if (!token){
        history("/")
    }
  }, []);

  // Populate the instructors dropdown box
  // Needs to have dynamic checking of admin (change URL 'test admin' + authorizaiton + use of jwt)


  // <Link to= "/pastInstructors"> 
  //    <button style={format} onclick> View past instructors</button>
  //    </Link>
  

  useEffect(() => {
    popInstructors();
  }, []);

  useEffect(() => {
    popCourses();
  }, []);

  const popInstructors = async () => {
    fetch(process.env.REACT_APP_API_URL + `/api/admin/${userInfo.username}/users/instructors`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
        }
      })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setInstructors(data);
        }
      })
  }

  // Needs to have dynamic checking of admin (change URL 'test admin' + authorizaiton + use of jwt)
  const popCourses = async () => {
    fetch(process.env.REACT_APP_API_URL + `/api/admin/${userInfo.username}/courses`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
        }
      })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      })
  }

  const handleInstructorChange = event => {
    setSelectedInstructor(event.target.value);
  };

  const handleCourseChange = event => {
    setSelectedCourse(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // call the  saveToDB put api
    saveToDB(selectedInstructor, selectedCourse);
  };

  // saveToDB
  const saveToDB = async (instructor, course) => {
    const obj = {
      instructorUsername: instructor,
      courseCode: course
    };
    if (validAssign(instructor, course)) {
      fetch(process.env.REACT_APP_API_URL + `/api/admin/${userInfo.username}/courses/${course}/instructors`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
          // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImVtYWlsIjoidGVzdGFkbWluQHV3by5jYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NTU2NDAzN30.gaZ8CcaY_6rLyOrZ2N0zP_t8qLCACFtNb_G6HrHWwNA'
        },
        body: JSON.stringify(obj)
      })
        .then(async res => {
          if (res.ok) {
            let data = await res.json();
            alert(`Instructor: ${selectedInstructor} assigned to Course: ${selectedCourse}`);
          }
          else {
            let data = res.json();
            alert('Unsuccessful')
          }
        })
    }
    else {
      alert(`Cannot assign instructor to course. Instructor: ${selectedInstructor} is already assigned to Course: ${selectedCourse}`);
    }
  };

  const validAssign = (instructor, course) => {
    let matchingInstructor = instructors.filter(match => {
      return match.username === instructor;
    })[0];
    let matchingCourse = matchingInstructor.coursesTaught.filter(match => {
      return match === course;
    });
    if (matchingCourse.length > 0)
      return false;
    else return true;
  }

  return (
    <>
      <NavBar></NavBar>
      <form onSubmit={handleSubmit} onLoad={popInstructors} className="d-flex flex-column align-items-center">
        <br></br>
        <div className="form-group">
          <label htmlFor="instructors">Select Instructor:</label>
          <select id="instructors" onChange={handleInstructorChange} className="form-control">
            <option value="">--Select Instructor--</option>
            {instructors.map(instructor => (
              <option key={instructor.id} value={instructor.username}>
                {instructor.firstName + " " + instructor.lastName}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="courses">Select Course:</label>
          <select id="courses" onChange={handleCourseChange} className="form-control">
            <option value="">--Select Course--</option>
            {courses.map(course => (
              <option key={course._id} value={course.code}>
                {course.name + " [" + course.faculty + "]"}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <div className="form-group d-flex justify-content-between">
          <button type="submit" className="btn btn-success">Assign</button>
          <button type="submit" className="btn btn-danger">Remove</button>
        </div>
      </form>
    </>

  );
};

export default AssignInstructor;
