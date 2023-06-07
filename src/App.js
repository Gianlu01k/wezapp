import './App.css';
import Homepage from "./Homepage";
import {Routes, Route} from 'react-router-dom';
import Login from "./Login";
import {useEffect, useState} from "react";
import Registrazione from "./Registrazione";

function App() {

  return (
       <Routes>
           <Route path="/" element={<Login />} />
           <Route path="/homepage" element={<Homepage/>}/>
           <Route path={"/registrazione"} element={<Registrazione />}/>
       </Routes>
  );
}

export default App;
