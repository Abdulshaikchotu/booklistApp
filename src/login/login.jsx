import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "./login.css"
let url="https://booklist-backend-7a7u.onrender.com/login"
let Login=()=>{ 
 const form_data = useRef();
 let navigate = useNavigate();
 async function Login_user(e){
        e.preventDefault()
        
        const data={
            username:form_data.current.username.value,
            password:form_data.current.password.value,    
        }
        console.log(data);
        if(data.username && data.password){
             const response = await axios.post(url,data)
            console.log(response);
            if(response.data.status==="successfully login"){
                let token=response.data.token
                console.log(token);
                window.localStorage.setItem("token",token)
                navigate("/home")
            }
            else{
                alert("user is not persent please register ")
            }
        }else{
            alert("both fileds required")
        }
       
    }
    return(<>
          <div id="register">
            <form className="form-data" ref={form_data}>
                <div id="inputs">
                   <h1>Login</h1>
                  <input type="text" placeholder="username" id="username"/>
                  <input type="text" placeholder="password" id="password"/>
                  <button style={{marginLeft:"100px"}} onClick={Login_user} id="btn-reg">Login</button>
                </div>
            </form>
          </div>
    </>
    )
}
export default Login
