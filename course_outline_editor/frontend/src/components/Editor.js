import React from 'react'
import { useCallback, useEffect, useState, useRef, } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { Quill } from "react-quill";
import "quill/dist/quill.snow.css"
import Comments from './Comments';
import NavBar from './NavBar';
import Print from './Print';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';



export default function Editor() {
  const userInfo = decode(window.localStorage.getItem("token"));

  const quillRef = useRef(null);
  const { id: documentID } = useParams();

  const [quill, setQuill] = useState(null);
  const [loaded,setLoaded] = useState(false);
  const location = useLocation();
  const view = location.state;

  useEffect(() => {
    if (quill == null) return;
    fetchAndSetDocument();
    
    // a piece of logic to make it an editor or a viewer
    quill.enable();
  }, [quill])

  const fetchAndSetDocument = async () => {
    const document = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}`,{
      method: 'GET',
      headers:{
          'Content-Type': 'application/json',
          'Authorization': window.localStorage.getItem("token")
        }
  });
    const data = await document.json();
    quill.setContents(data);
    setLoaded(true);
  }

  const saveDocument = async () => {
    const contents = quill.getContents();
    contents.author = userInfo.username;
    contents.status = 'draft';
    console.log(JSON.stringify(contents));
    const response = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contents)
    })

    if (response.status != 200) {
      console.log(response.error);
    } else {
      const now = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
      
      const payload = {
        username:userInfo.username,
        activity:'edited',
        documentID:documentID,
        timeStamp:now
      }

      const res = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}/activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await res.json();
      console.log(data);
    }
  }

  const submitForReview = async () => {
    const contents = quill.getContents();
    contents.author = userInfo.username;
    contents.status = 'pending';
    const response = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contents)
    })
    console.log(response);
  }

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return

    wrapper.innerHTML = ' '
    const editor = document.createElement('div')
    wrapper.append(editor)

    const q = new Quill(editor, {
      ref: { quillRef }, theme: "snow",
      modules: {
        toolbar:
        {
          container: [

            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ align: [] }],
            ["image", "blockquote", "code-block"],
            ["clean"],
          ],
        }
      }
    })

    q.disable();
    q.setText("Loading...")
    setQuill(q)
  }, [])

  return (
    <>
      <NavBar></NavBar>
      <div className="nav-buttons">
        <Link className="my-link" to="/instructor/courses"><button className='btn btn-danger'>Discard</button></Link>
        <button className='btn btn-success' onClick = {submitForReview}>  Submit  </button>
      </div>            
      <button onClick={saveDocument}>Save</button>
      <div className="container" ref={wrapperRef}>
      </div>
      {
        loaded &&
        <Comments documentID={documentID} quill={quill} quillRef = {quillRef}/>
      }
            <Print></Print>

    </>
  );
};
