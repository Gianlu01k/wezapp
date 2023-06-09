import React, {useEffect, useState} from "react";
import Home from "./Home";
import Sidebar from "./Sidebar";
import './sidehome.css'
import {Box, CssBaseline, Grid} from "@mui/material";
export default function Homepage({loggedUser}){

    const [users, setUsers] = useState([])
    const [receiver, setReceiver] = useState({_id:"", fistname:"", lastname:"", username:"", password:""})


    useEffect(()=>{
        fetch('http://localhost:3000/all')
            .then(obj => obj.json())
            .then(data => setUsers(data))
    },[])

    return(
        <Grid container spacing={2}>
            <Grid xs={2}><Sidebar userarray={users} setDest={setReceiver}/> </Grid>
            <Grid xs={10}><Home rec={receiver._id} rec-fn={receiver.fistname} rec-ln={receiver.lastname} username={receiver.username} usr={loggedUser} /></Grid>
        </Grid>
    )
}
//