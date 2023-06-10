import React, {useState} from "react";
import Usercard from "./usercomponents/Usercard";
import { Box, Button, Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Avatar, List} from "@mui/material";
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";
export default function Sidebar(props){


    const list = props.userarray.map((el) =>
        <>
            <Usercard user={el} key={el._id} setDest={props.setDest}/>
        </>
        )
    return(
        <>
           <Box sx={{mx:4}}><h1>Chats</h1></Box>
            <List component="nav" aria-label="mailbox folders">
              {list}
        </List>
            <Button sx={{  marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'}} onClick={()=>{
                    Cookies.remove('sessionID');
                }} > <Link variant="body2" to={"/"}>Esci</Link></Button>
        </>

    )
}