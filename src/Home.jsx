import React, { useEffect, useState } from "react";
import { Box, Container, Fab, Grid, TextField } from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';
import Chat from "./Chat";

export default function Home(props) {
    const [message, setMessage] = useState("");
    const [listMessages, setListMessages] = useState([]);

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
                const selectedChat = chat.filter(el =>
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
    }, [props.rec, props.usr]);

    function handleClick(e) {
        e.preventDefault();

    }

    return (
        <>
            <Container maxWidth={"x1"}>
                <Box sx={{ bgcolor: '#d28dd9', height: '80vh' }}>
                    <p>{props.rec}</p>
                    {listMessages && (listMessages.map((m) => (
                        <Chat key={m._id} msg={m.content} />
                    )))}
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
