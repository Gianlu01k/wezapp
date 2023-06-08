import React from "react";
import {ListItem, ListItemText} from "@mui/material";

export default function Message(props){
    return(
        <ListItem>
            <ListItemText primary={props.singleMessage.content}/>
        </ListItem>
    )
}