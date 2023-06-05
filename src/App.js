import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Sidebar from "./Sidebar";

function App() {
  return (
   <>
     <Sidebar/>
    <div className={App}>
      <Home/>
    </div>
   </>
  );
}

export default App;
