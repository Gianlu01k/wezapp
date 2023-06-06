import './App.css';
import Homepage from "./Homepage";
import {Routes, Route} from 'react-router-dom';
import Login from "./Login";
import {useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
       <Routes>
           <Route path="*" element={<Login />} />
       </Routes>
  );
}

export default App;
