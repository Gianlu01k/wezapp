import React, {useState} from "react";
import Usercard from "./usercomponents/Usercard";
import {Avatar, List} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
export default function Sidebar({userarray}){

    const list = userarray.map((el) =>
        <>
            <Usercard username={el.username} key={el._id}/>
        </>
        )
    return(
        <List component="nav" aria-label="mailbox folders">
              {list}
        </List>

    )
}