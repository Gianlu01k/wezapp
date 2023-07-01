import React, {useEffect, useState} from "react";
import Home from "./Home";
import Sidebar from "./Sidebar";
import {Grid} from "@mui/material";

const sessionID = localStorage.getItem('sessionID');
const token = localStorage.getItem('token')

export default function Homepage({loggedUser}){

    const [users, setUsers] = useState([]) //stato per gestire gli utenti esistenti
    const [receiver, setReceiver] = useState({_id:"", firstname:"", lastname:"", username:"", password:""})
    //stato per gestire l'utente selezionato



    useEffect(()=>{
        //richiesta get di tutti gli utenti esistenti, registrati nella piattaforma
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
            <Grid xs={3}><Sidebar userarray={users} setDest={setReceiver} ln={receiver.firstname} fn={receiver.lastname} /> </Grid>
            <Grid xs={9}><Home rec={receiver._id} rec_fn={receiver.firstname} rec_ln={receiver.lastname} username={receiver.username} usr={sessionID} /></Grid>
        </Grid>
    )
}
//