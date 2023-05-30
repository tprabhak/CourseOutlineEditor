import { useState, useEffect } from 'react';
import CommentCard from './CommentCard';
import decode from 'jwt-decode';

export default function Comments(props){
    const quill = props.quill;
    const documentID = props.documentID;

    const userInfo = decode(window.localStorage.getItem("token"));

    const [metadata,setMetadata] = useState(null);
    const [selection,setSelection] = useState('');
    const [comment,setComment] = useState('');

    useEffect(() => {
        fetchMetadata();
    },[])
    

    quill.on('selection-change', (range) => {
        if(!range) return;
        const text = quill.getText(range.index, range.length);
        setSelection(text);
    })

    const fetchMetadata = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}/comments`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem("token")
              }
        });

        const data = await response.json();
        console.log(data);
        setMetadata(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            username:userInfo.username,
            userRole:userInfo.role,
            commentText:comment,
            selectedText:selection,
        }

        const response = await fetch(process.env.REACT_APP_API_URL + `/api/documents/${documentID}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(payload)
        })

        if(!response.ok){
            console.log(response);
        } else {
            const data = await response.json();
            setMetadata(data);
            saveToHistory();
        }
    }

    const saveToHistory = async () => {
        const now = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});

        const payload = {
            username:userInfo.username,
            activity:'commented',
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

    return <>
        <div>
            <form>
                <label>
                    Comment:
                    <textarea rows="4" cols="50" name="comment" onChange = {(e) => setComment(e.target.value)}></textarea>
                </label>
                <br/>
                <button onClick = {handleSubmit}>Submit Comment</button>
            </form>
        </div>
        <div>
            <div>
                <h2>Instructor Justifications</h2>
                {
                    metadata &&
                    metadata.instructorJustifications.map(comment => (
                        <CommentCard key = {comment._id} comment = {comment} />
                    ))
                }
            </div>
            <div>
                <h2>Reviewer Comments</h2>
                {
                    metadata &&
                    metadata.reviewerComments.map(comment => (
                        <CommentCard key = {comment._id} comment = {comment} />
                    ))
                }
            </div>
        </div>
    </>
}
