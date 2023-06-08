import React from "react";
import {List, ListItem, ListItemText} from "@mui/material";
import Message from "./Message";

export default function Chat(props){
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
            }}
            subheader={<li />}
        >
                {props.list.map((msg) => <Message singleMessage={msg}/>)}
        </List>

}