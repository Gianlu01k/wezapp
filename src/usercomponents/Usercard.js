import React from "react";
import {Avatar, Button, Icon, ListItem, ListItemText, styled} from "@mui/material";
import {deepOrange, purple} from "@mui/material/colors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Usercard(props) {

    function handleClick(e) {
        props.setDest(props.user)
    }


    return (
        <ListItem>
            <Button onClick={handleClick}>
                <Avatar
                    sx={{bgcolor: deepOrange[500]}}
                    alt={props.user.username}
                >{props.user.username.charAt(0).toUpperCase()}</Avatar>
                <ListItemText primary={props.user.username}/>
                <FontAwesomeIcon icon="fa-solid fa-user-group" />
            </Button>
        </ListItem>

    )
}
