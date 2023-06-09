import React from "react";
import {List} from "@mui/material";


export default function Chat({msg}){

  return(
      <List component="nav" aria-label="mailbox folders">
        {msg}
      </List>

  )
}
//