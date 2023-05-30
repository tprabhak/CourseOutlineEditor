import { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";

export default function MyOutlines(){
    const token = window.localStorage.getItem("token");
    const decodedToken = decode(token);
    const navigate = useNavigate();

    const [outlines,setOutlines] = useState([]);
    const [navID,setNavID] = useState('');

    useEffect(() => {
        fetchInstructorOutlines();
    },[])

    useEffect(()=>{
        if(!navID) return;
        const path = `/documents/${navID}`;
        navigate(path); 
    },[navID])

    const fetchInstructorOutlines = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/instructor/${decodedToken.username}/outlines`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        
        setOutlines(data);
        console.log(data);
    }

    return (
        <>
            <NavBar></NavBar>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Outline ID</th>
                            <th>Status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {outlines.map(outline => (
                            <tr key={outline._id}>
                                <td>{outline._id}</td>
                                <td>{outline.status}</td>
                                
                                <td><button id="blank" className='btn btn-primary' onClick = {() => setNavID(outline._id)}>Edit</button></td>
                                 {/* //changed this /instructor/courses/outline/create/drafts in create/drafts */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
