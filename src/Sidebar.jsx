import React, {useState} from "react";
import Usercard from "./usercomponents/Usercard";
import {Avatar, List} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
export default function Sidebar(props){


    const list = props.userarray.map((el) =>
        <>
            <Usercard user={el} key={el._id} setDest={props.setDest}/>
        </>
        )
    return(
        <List component="nav" aria-label="mailbox folders">
              {list}
        </List>

    )
}