import React from "react";
import {Avatar, Button, ListItem, ListItemText, styled} from "@mui/material";
import {deepOrange, purple} from "@mui/material/colors";

export default function Usercard(props){

    function handleClick(e){
        props.setDest(props.user)
    }


    return(
        <ListItem>
            <Button onClick={handleClick}>
            <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt={props.user.username}
            >{props.user.username.charAt(0).toUpperCase()}</Avatar>
            <ListItemText primary={props.user.username} />
            </Button>
        </ListItem>

    )
}
