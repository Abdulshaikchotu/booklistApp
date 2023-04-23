import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./register/register";
import Login from "./login/login";
import Home from "./home/home";
import Postdata from "./postdata/postdata";
import { Updatedata } from "./updatedata/updatedata";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/postdata" element={<Postdata />} />
          <Route path="/updatedata/:id" element={<Updatedata />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
