import React, { useEffect, useState, ReactDOM } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';


export default function InstructionHistory() {

  const [courses, setCourses] = useState([])
  const history = useNavigate()
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token){
        history("/")
    }
  }, []);





  useEffect(() => {

    const getCourses = async () => {

      fetch("/api/admin/testadmin/courses", {
        method: 'GET',
        headers: {
          'Authorization': token,
          // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImVtYWlsIjoidGVzdGFkbWluQHV3by5jYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NjQ5NTk0OH0.LIsPjSabAE6o8AMMMpgMl8zDmoV33eJYCYctXH2ZYM0',
          'Content-type': 'application/json'
        }
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();

            console.log(data);
            setCourses(data)

          }
        })
    }

    getCourses()
  }, [])
  return (
    <>
      <NavBar></NavBar>
      <div>
        <h1>Courses and Past Instructors</h1>

        <div>
          <table>
            <thead>

              <tr>

                <th>Courses: </th>
                <th>Instructors</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => {
                return (
                  <tr>
                    <td>{course.code}</td>
                    <td>{course.instructors}</td>

                  </tr>
                )

              })}

            </tbody>

          </table>
        </div>
      </div>
    </>

  )
}
