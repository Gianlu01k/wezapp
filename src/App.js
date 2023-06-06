import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Sidebar from "./Sidebar";
import {Routes, Route} from 'react-router-dom';
import {Link} from "react-router-dom";
import Login from "./Login";
import {useState} from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const user ="pippo"
  return (
       <Routes>
           <Route path="/">
               {isLoggedIn ? <Link to="/homepage" /> : <Login fun={setIsLoggedIn(true)}/>}
           </Route>
           <Route path="/homepage" exact>
               {isLoggedIn ?
                <>
                <Home/>
               </> : <Link to="/" />}
           </Route>
       </Routes>
  );
}

export default App;
