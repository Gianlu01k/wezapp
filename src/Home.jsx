import React, {useEffect, useState} from "react";
import {Box, Container, Fab, Grid, TextField} from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';

export default function Home(props){

    const [message, setMessage] = useState("")
    function handleChange(e){
        setMessage(e.target.value)
    }

    useEffect(()=>{fetch('http://localhost:3000/chat',
        {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                    _id1: props.usr,
                    _id2: props.rec
                }
            )
        }
    ).then(data => data.json())},[])


    function handleClick(e){
        e.preventDefault()

    }

    return(
        <>
            <Container maxWidth={"x1"}>
                <Box  sx={{ bgcolor: '#cfe8fc', height: '80vh' }} ><p>{props.rec}</p></Box>

                <Grid container spacing={2} alignItems="center">
                    <Grid item>
            <TextField fullWidth id="outlined-controlled" name={"message"} value={message} onChange={handleChange} /></Grid>
            <Grid item>
                <Fab variant="extended" color="primary" aria-label="add">
            <NavigationIcon sx={{ mr: 1 }} />
            Invia
            </Fab></Grid>
                </Grid>
            </Container>
        </>
    )
}