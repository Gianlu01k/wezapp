import React, {useEffect, useState} from "react";
import Home from "./Home";
import Sidebar from "./Sidebar";
import './sidehome.css'
import {Box, CssBaseline, Grid} from "@mui/material";
import Cookies from 'js-cookie';

const sessionID = localStorage.getItem('sessionID');
const token = localStorage.getItem('token')

export default function Homepage({loggedUser}){

    const [users, setUsers] = useState([])
    const [receiver, setReceiver] = useState({_id:"", firstname:"", lastname:"", username:"", password:""})



    useEffect(()=>{
        fetch('http://localhost:3000/all',{
            headers: {
                "Authorization": token,
            },
        })
            .then(obj => obj.json())
            .then(data => setUsers(data))
    },[])

    return(
        <Grid container spacing={2}>
            <Grid xs={3}><Sidebar userarray={users} setDest={setReceiver}/> </Grid>
            <Grid xs={9}><Home rec={receiver._id} rec_fn={receiver.firstname} rec_ln={receiver.lastname} username={receiver.username} usr={sessionID} /></Grid>
        </Grid>
    )
}
//