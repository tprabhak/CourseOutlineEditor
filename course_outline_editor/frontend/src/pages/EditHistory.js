import React, { useEffect, useState, ReactDOM } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
import jwt from "jwt-decode";


export default function InstructionHistory() {

  const [editHistory, seteditHistory] = useState([])
  const history = useNavigate()
  const token = localStorage.getItem("token");

  let decodedToken = {};

  const verifyInstructor = (token) => {
    // can add an API to make this secure
    decodedToken = jwt(token);
    console.log(decodedToken)
}

  useEffect(() => {
    if (!token) {
      history("/")
    }
  }, []);

  
  console.log(token);
  useEffect(() => {
    verifyInstructor(token);

    const geteditHistorys = async () => {

      fetch(`/api/admin/${decodedToken.username}/activity/all`, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-type': 'application/json'
        }
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();

            console.log(data);
            seteditHistory(data)


          }
        })
    }

    geteditHistorys()
  }, [])
  return (
    <>
      <NavBar></NavBar>
      <div>
        <h1>Activity History</h1>
        <div>
        <table className="table">
            <thead>
              <tr>
                <th>User </th>
                <th>Activity </th>
                <th>Document </th>
                <th>Time Stamp </th>
              </tr>
            </thead>

            <tbody>
              {editHistory.map((edits, index) => {
                return (
                  <tr>
                    <td>{edits.username}</td>
                    <td>{edits.activity}</td>
                    <td>{edits.documentID}</td>
                    <td>{edits.timeStamp}</td>
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
