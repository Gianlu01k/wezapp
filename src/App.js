import './App.css';
import Homepage from "./Homepage";
import {Routes, Route} from 'react-router-dom';
import Login from "./Login";
import {useEffect, useState} from "react";
import Registrazione from "./Registrazione";

function App() {
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/all')
            .then(obj => obj.json())
            .then(data => setUsers(data))
    },[])

  return (
       <Routes>
           <Route path="/" element={<Login />} />
           <Route path="/homepage" element={<Homepage users={users}/>}/>
           <Route path={"/registrazione"} element={<Registrazione />}/>
       </Routes>
  );
}

export default App;
