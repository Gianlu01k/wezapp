import React, {useEffect, useState} from "react";
import Home from "./Home";
import Sidebar from "./Sidebar";
import './sidehome.css'
import {Box, CssBaseline, Grid} from "@mui/material";
export default function Homepage(){

    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch('http://localhost:3000/all')
            .then(obj => obj.json())
            .then(data => setUsers(data))
    },[])

    return(
        <Grid container spacing={2}>
            <Grid xs={4}><Sidebar userarray={users}/> </Grid>
            <Grid xs={8}><Home/></Grid>
        </Grid>
    )
}