
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./updatedata.css"
export const Updatedata = () => {
   let token=window.localStorage.getItem("token")
   let {id}=useParams()
  const [Title, setTitle] = useState('');
  const [isbn, setisbn] = useState('');
  const [AuthorName, setAuthorName] = useState("");
  const [description, setdescription] = useState("");
  const [ publisher, setpublisher] = useState('');
  const [ Genre, setGenre] = useState('');
   let navigate=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
     let url=`https://booklist-backend-7a7u.onrender.com/afterlogin/putdata/${id}`
    axios.put(url, {
      Title: Title,
      isbn: isbn,
      AuthorName: AuthorName,
      description: description,
      publisher: publisher,
      Genre:Genre
    },{
        headers:{
            Authorization:token
        }
    })
      .then(response => {
        console.log(response);
        if(response.data.status==="success"){
           navigate("/home")
        }
        else{
            alert("error")
        }
        // do something with successful response, e.g. clear form
      })
      .catch(error => {
        console.log(error);
        // do something with error response, e.g. show error message
      });
  };

  return (
    <div id="update">
         <form onSubmit={handleSubmit} id="updateitems">
            <h1>EDITBOOK</h1>
            <p>updatebookinfo</p>
      <label>
        TitleofTheBook:<br></br>
        <input type="text" value={Title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <br />
      <label>
        ISBN:<br></br>
        <input type="text" value={isbn} onChange={(event) => setisbn(event.target.value)} />
      </label>
      <br />
      <label>
        Author:<br></br>
        <input type="text" value={AuthorName} onChange={(event) => setAuthorName(event.target.value)} />
      </label>
      <br />
      <label>
        Describe:<br></br>
        <input type="text" value={description} onChange={(event) => setdescription(event.target.value)} />
      </label>
      <br></br><label style={{marginTop:"2px"}}>
        PublisherOfThisBook:
        <br></br><input type="text" checked={publisher} onChange={(event) => setpublisher(event.target.value)}/>
      </label>
      <br />
      <br />
      <label style={{marginTop:"2px"}}>
        Genre:
        <br></br><input type="text" checked={Genre} onChange={(event) => setGenre(event.target.value)}/>
      </label>
      <br />
      <br />
      <button type="submit" style={{width:"500px",height:"40px",borderRadius:"20px",backgroundColor:"blue",color:"white"}}>UpdateBook</button>
    </form>
    </div>
  )
}
