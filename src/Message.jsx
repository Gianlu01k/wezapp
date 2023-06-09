import React from "react";
import { ListItem, ListItemText, Box } from "@mui/material";

export default function Message(props) {
    const isSender = props.loggedUser === props.sender;
    const alignRight = isSender ? "flex-end" : "flex-start";
    const textAlign = isSender ? "right" : null;
    const messageColor = isSender ? "#DCF8C6" : "#FFFFFF";

    return (
        <ListItem
            sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: alignRight,
                textAlign: textAlign,
            }}
        >
            <Box
                sx={{
                    backgroundColor: messageColor,
                    borderRadius: 10,
                    maxWidth: "100%",
                }}
            >
                <ListItemText
                    primary={props.msg}
                    primaryTypographyProps={{
                        component: "span",
                    }}
                />
            </Box>
        </ListItem>
    );
}
