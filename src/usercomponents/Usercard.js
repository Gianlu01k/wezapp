import React from "react";
import {Avatar, ListItem, ListItemText} from "@mui/material";
import {deepOrange} from "@mui/material/colors";

export default function Usercard(props){
    return(
        <ListItem button>
            <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt={props.username}
            >{props.username.charAt(0).toUpperCase()}</Avatar>
            <ListItemText primary={props.username} />
        </ListItem>

    )
}