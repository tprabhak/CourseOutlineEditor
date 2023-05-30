// This page just has a list of reviewable documents and you can hit review to do into review mode
import React, { useEffect, useState, ReactDOM } from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';


function ReviewHome() {
    const token = localStorage.getItem("token");
    const userInfo = decode(window.localStorage.getItem("token"));
    

    const history = useNavigate()

    const [status, setStatus] = useState([])
    var [docs, setDocs] = useState([])


    const getUsers = async() => {
        fetch(process.env.REACT_APP_API_URL + `/api/reviewer/${userInfo.username}/outlines/pending`,
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
           console.log(data);
           setDocs(data)
         }
       })
   }


    const updateStatusAccept =async (docID) =>{
        const payload = {
            status: "accepted"
        }
        fetch(process.env.REACT_APP_API_URL + `/api/reviewer/${userInfo.username}/outlines/${docID}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(payload)
 
    })
 
     .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            getUsers()
            console.log(data);
           
          }
        })

       

    }
    const updateStatusReject =async (docID) =>{
        const payload = {
            status: "rejected"
        }
        fetch(process.env.REACT_APP_API_URL + `/api/reviewer/${userInfo.username}/outlines/${docID}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(payload)
 
    })
 
     .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            
        getUsers()
            
          }
        })


    }



    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token){
          history("/")
      }

      
    const getUsers = async() => {
        fetch(process.env.REACT_APP_API_URL + `/api/reviewer/${userInfo.username}/outlines/pending`,
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
           console.log(data);
           setDocs(data)
         }
       })
   }
    
    getUsers()
    }, []);

    return (
        <>
            <NavBar></NavBar>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Course Outline</th>
                            <th>Current Status</th>
                            <th>Accept</th>
                            <th>Reject</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                       
                    {docs.map((doc)=> {
      return (        
       
      <tr>
          
          <td>Software Eng</td>
          <td>SE69</td>

          <td>{<button className='btn'><Link to={`/documents/${doc._id}`}>OPEN IN EDITOR</Link></button>}</td>
        

          <td>
            pending
          </td>

          <td><button className='btn' onClick={() => {updateStatusAccept(doc._id)}}>Accept</button></td>          
          
          <td><button className='btn' onClick={() => {updateStatusReject(doc._id)}}>Reject</button></td>
      </tr>
      )     
    })}
    
                
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ReviewHome;