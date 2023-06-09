import React from "react";
import { ListItem, ListItemText } from "@mui/material";

export default function Message(props) {
    const isSender = props.loggedUser === props.sender;
    const alignRight = isSender ? { textAlign: "right" } : { textAlign: "left" };

    return (
        <ListItem style={alignRight} display={"flex"} alignItems="flex-end">
            <ListItemText
                primary={props.msg}
                primaryTypographyProps={{
                    component: "span",
                }}
            />
        </ListItem>
    );
}
