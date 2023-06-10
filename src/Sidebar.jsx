import React, {useState} from "react";
import Usercard from "./usercomponents/Usercard";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Avatar, List} from "@mui/material";
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";
import {deepOrange} from "@mui/material/colors";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';


export default function Sidebar(props){


    const list = props.userarray.map((el) =>
        <>
            <Usercard user={el} key={el._id} setDest={props.setDest}/>
        </>
        )
    return(
        <>
        <Container sx={{ marginLeft: '5rem' }} >
                <Box sx={{ mx: 3, display: 'flex', alignItems: 'center' }}>
                <h1 sx={{ flexGrow: 1 }}>Chats</h1> </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        sx={{ bgcolor: deepOrange[500], marginRight: '1rem', mx: 3, my: 1 }}
                        alt={loggedUsername}
                    >
                        {loggedUsername.charAt(0).toUpperCase()}
                    </Avatar>
                    <TextField label="Cerca" variant="outlined" value={searchUt} onChange={handleSearch}  sx={{
                        borderRadius: '10px', width:'100%'
                    }} />

            </Box>

            <List component="nav" aria-label="mailbox folders">
              {list}
        </List>

             <IconButton
             component={Link}
             to="/"
             sx={{
                 mx: 3,
                 fontSize: '1rem'

             }}
             onClick={() => {
                 Cookies.remove('sessionID');
             }}
         >
             <LogoutIcon />
             </IconButton>
        </Container>
        </>

    )
}
