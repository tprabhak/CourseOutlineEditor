import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import Print from '../components/Print';

function Drafts() {
    const token = window.localStorage.getItem("token");
    const location = useLocation();

    const course = location.state;
    // couldn't get use state to work
    let decodedToken = {};
    const [idData, setIdData] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        verifyInstructor(token);
        popTable();
    }, []);

    const verifyInstructor = (token) => {
        // can add an API to make this secure
        decodedToken = jwt(token);
    }

    const popTable = async () => {
        
        fetch(process.env.REACT_APP_API_URL + `/api/instructor/${decodedToken.username}/draft-outlines/${course.code}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': token
                }
            })
            .then(async (res) => {
                if (res.ok) {
                    let obj = await res.json();
                    let myArr = Object.values(obj);
                    setIdData(myArr);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <div className="nav-buttons">
                <Link className="my-link" to="/instructor/courses"><button className='btn btn-danger'>Discard</button></Link>
                <Link className="my-link" to="/instructor/courses/outline/create/new"><button className='btn btn-success'>New</button></Link>
            </div>

            
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Doc ID</th>
                            <th>Author</th>
                            <th></th>
                            <th>Review Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {idData.map((doc, index) => (
                            <tr key={doc}>
                                <td>Draft {index+1}</td>
                                <td>{doc.name}</td>

                                <td><Link state={doc} className="my-link" to="/instructor/courses/outline/create/ga-indicators"><button id="blank" className='btn btn-primary'>Edit</button></Link></td>

                                <td>{doc.status}</td>

                                <td><Print></Print></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Drafts;