import React from "react";
import {List, ListItem, ListItemText} from "@mui/material";
import Message from "./Message";
import Usercard from "./usercomponents/Usercard";

export default function Chat({msg}){

  return(
      <List component="nav" aria-label="mailbox folders">
        {msg}
      </List>

  )
}