import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Sidebar from "./Sidebar";
import {Routes, Route} from 'react-router-dom';
import Login from "./Login";

function App() {

    const user ="pippo"
  return (
   <>
       <Routes>
           <Route path="/" element={<Login loggeduser={user}/>} />
           <Route path=":user" element={
               <>
                   <Sidebar/>
                   <div className={App}>
                       <Home/>
                   </div>
               </> }/>
       </Routes>

   </>
  );
}

export default App;
