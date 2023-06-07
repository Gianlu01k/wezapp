import React, {useEffect, useState} from "react";
import Home from "./Home";
import Sidebar from "./Sidebar";
import './sidehome.css'
export default function Homepage(){

    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/all')
            .then(obj => obj.json())
            .then(data => setUsers(data))
    },[])

    return <Sidebar userarray={users}/>

}