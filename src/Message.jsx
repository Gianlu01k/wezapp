import React from "react";
import {ListItem, ListItemText} from "@mui/material";

export default function Message(props){
    console.log(props.singleMessage.content)
    return(

           <p>{props.singleMessage.content}</p>

    )
}