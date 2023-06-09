import './App.css';
import Homepage from "./Homepage";
import {Routes, Route} from 'react-router-dom';
import Login from "./Login";
import {useEffect, useState} from "react";
import Registrazione from "./Registrazione";

function App() {

    const [loggedUser, setLoggedUser] = useState({_id:"648054b969a29465a5f6c408", fistname:"", lastname:"", username:"", password:""})

  return (
       <Routes>
           <Route path="/" element={<Login func={setLoggedUser}/>} />
           <Route path="/homepage" element={<Homepage loggedUser={loggedUser._id}/>}/>
           <Route path={"/registrazione"} element={<Registrazione />}/>
       </Routes>
  );
}

export default App;
