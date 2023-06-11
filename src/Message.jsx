import React from "react";
import { ListItem, ListItemText, Box } from "@mui/material";

export default function Message(props) {
    const isSender = props.loggedUser === props.sender;
    const alignRight = isSender ? "flex-end" : "flex-start";
    const textAlign = isSender ? "right" : null;
    const messageBGColor = isSender ? "#FFFFFF" : "#2c90ff";
    const messageColor = isSender ? "#545353" : "#ffffff";

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
                    backgroundColor: messageBGColor,
                    color: messageColor,
                    borderRadius: 3,
                    p: 1,
                }}
            >
                <ListItemText
                    primary={props.msg}
                    primaryTypographyProps={{
                        component: "span",
                    }}
                    sx={{
                        mx: 1.5,
                    }}
                />
            </Box>
        </ListItem>
    );
}
//