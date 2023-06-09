import React, { useEffect, useState } from "react";
import {Box, Container, Fab, Grid, List, TextField} from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';
import Chat from "./Chat";
import Message from "./Message";

export default function Home(props) {
    const [message, setMessage] = useState("");
    const [listMessages, setListMessages] = useState([]);
    const [messagePending, setMessagePending] = useState(false)

    function handleChange(e) {
        setMessage(e.target.value);
    }

    useEffect(() => {
        fetch('http://localhost:3000/chat', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
            .then(data => data.json())
            .then(chat => {
                let selectedChat = chat.filter(el =>
                    (el.users[0] === props.usr && el.users[1] === props.rec) ||
                    (el.users[1] === props.usr && el.users[0] === props.rec)
                );
                setListMessages([]);
                if (selectedChat.length !== 0) {
                    fetch(`http://localhost:3000/chat/messages`)
                        .then(data => data.json())
                        .then(messages => {
                            const mess = messages.filter(msg => msg.chat === selectedChat[0]._id);
                            setListMessages(mess);
                        });
                }
            });
    }, [props.rec, props.usr, messagePending]);

    function handleClick(e) {
        e.preventDefault();
        let selectedChat = []
        fetch('http://localhost:3000/chat', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
            .then(data => data.json())
            .then(chat => {
               selectedChat = chat.filter(el =>
                    (el.users[0] === props.usr && el.users[1] === props.rec) ||
                    (el.users[1] === props.usr && el.users[0] === props.rec)
                );}).then(()=>{
            if (selectedChat.length !== 0) {
                console.log("Eiii")
        if(message !== ""){
        fetch('http://localhost:3000/chat/newmessage',{
            method: 'post',
                headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                    mittente: props.usr,
                    content: message,
                    chat: selectedChat[0]._id
                }
            )
        }).then(setMessage(""))}}
               setMessagePending(!messagePending)
                })
    }

    const listStyle = {
        backgroundColor: 'blue',
    };
    return (
        <>
            <Container maxWidth={"x1"}>
                <Box sx={{ bgcolor: '#d28dd9', height: '80vh'}}>
                    <p>{props.rec}</p>
                    <List style={listStyle}>
                        {listMessages.map((m) => (
                            <Message
                                key={m._id}
                                msg={m.content}
                                sender={m.sender}
                                loggedUser={props.usr}
                            />
                        ))}
                    </List>
                </Box>

                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <TextField fullWidth id="outlined-controlled" name={"message"} value={message} onChange={handleChange} />
                    </Grid>
                    <Grid item>
                        <Fab variant="extended" color="primary" aria-label="add" onClick={handleClick}>
                            <NavigationIcon sx={{ mr: 1 }} />
                            Invia
                        </Fab>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
