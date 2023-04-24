import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"
import "./home.css"


const Home = () => {
    let navigate=useNavigate()
   
  let token=window.localStorage.getItem("token")
  let[data,setdata]=useState([])
  let[loading,setloading]=useState(false)
useEffect(()=>{
    async function Data(){
         let url = "https://booklist-backend-7a7u.onrender.com/afterlogin/getdata";
        await axios.get(url,{
            headers:{
                Authorization:token
            }
        })
        .then((data)=>{
         console.log(data.data.data)
         setloading(false)
          setdata(data.data.data)  
        })
    }
    Data()
},[token])


let handlepost=(e)=>{
     e.preventDefault()
     console.log("ok");
     navigate("/postdata")
}
let handlelogout=(e)=>{
     e.preventDefault()
     console.log("ok");
     window.localStorage.clear("token")
     navigate("/login")   
}
let handledelete=(id)=>{
  console.log("ok");
     let url=`https://booklist-backend-7a7u.onrender.com/afterlogin/updatedata/${id}`
     axios.delete(url,{
      headers:{
        Authorization:token
      }
     })
     .then(()=>{
           let deleteddata=data.filter((ele)=>ele._id!==id)
           setdata(deleteddata)
     })
      .finally(() => {
          setloading(false);
        })
      .catch((error) => {
        console.log(error);
      });
 
}

let handleupdate=(id)=>{
      navigate(`/updatedata/${id}`)
}
  return (
    <div id="home" >
        <div >
            <button onClick={(e)=>handlelogout(e)} id="logout">LogOut</button>
        </div>
      <div id="heading">
        <h1>Book List</h1>
      </div>
      <div >
       <button onClick={(e)=>handlepost(e)} id="addbtn">+ Add New Book</button>
      </div>
      {loading?<h1>Loading....</h1>:<div >
        { data.map((ele,i)=>{
         return<div key={i} id="fetchingdata">
         
          <h4>Title:{ele.Title}</h4>
           <h4>AuthorName:{ele.AuthorName}</h4>
          <h4>ISBN:{ele.isbn}</h4>
          <h4>Publisher:{ele.publisher}</h4>
          <h4>PublishedDate:{ele.publisheddate}</h4>
          <h4>Description:{ele.description}</h4>
          <h4>Genre:{ele.Genre}</h4>
          <button id="deletebtn" onClick={()=>handledelete(ele._id)}>Delete</button>
          <button id="updatebtn" onClick={()=>handleupdate(ele._id)}>Update</button>
         </div>
        })}
      </div>}
    </div>
  )
}

export default Home