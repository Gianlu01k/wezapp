import React, { useEffect, useState,useRef } from "react";
import {Avatar, Box, Container, Fab, Grid, List, TextField,Typography } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import Message from "./Message";
import { styled } from "@mui/system";
import {deepOrange} from "@mui/material/colors";
import Cookies from "js-cookie";

const ScrollableBox = styled(Box)`
  overflow-y: scroll;
  max-height: 70vh;
`;
export default function Home(props) {
    const [message, setMessage] = useState("");
    const [listMessages, setListMessages] = useState([]);
    const [messagePending, setMessagePending] = useState(false);
    const scrollableBoxRef = useRef({ behavior: 'smooth', block: 'end' });
    const loggedUser = Cookies.get('sessionID')
    function handleChange(e) {
        setMessage(e.target.value);
    }
useEffect(() => {
        if (scrollableBoxRef.current) {
            scrollableBoxRef.current.scrollTop = scrollableBoxRef.current.scrollHeight;
        }
    }, [listMessages]);

    useEffect(() => {
        fetch("http://localhost:3000/chat", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        })
            .then((data) => data.json())
            .then((chat) => {
                let selectedChat = chat.filter(
                    (el) =>
                        (el.users[0] === loggedUser && el.users[1] === props.rec) ||
                        (el.users[1] === loggedUser && el.users[0] === props.rec)
                );
                setListMessages([]);
                if (selectedChat.length !== 0) {
                    fetch(`http://localhost:3000/chat/messages`)
                        .then((data) => data.json())
                        .then((messages) => {
                            const mess = messages.filter(
                                (msg) => msg.chat === selectedChat[0]._id
                            );
                            setListMessages(mess);
                        });
                }
            });
    }, [props.rec, loggedUser, messagePending]);

    function handleClick(e) {
        e.preventDefault();
        let selectedChat = [];
        fetch("http://localhost:3000/chat", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        })
            .then((data) => data.json())
            .then((chat) => {
                selectedChat = chat.filter(
                    (el) =>
                        (el.users[0] === loggedUser && el.users[1] === props.rec) ||
                        (el.users[1] === loggedUser && el.users[0] === props.rec)
                );
            })
            .then(() => {
                if (selectedChat.length !== 0) {
                    if (message !== "") {
                        fetch("http://localhost:3000/chat/newmessage", {
                            method: "post",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                mittente: loggedUser,
                                content: message,
                                chat: selectedChat[0]._id,
                            }),
                        }).then(() => setMessage(""));
                    }
                }else{
                    fetch("http://localhost:3000/chat/newchat",{
                        method: "post",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            users: [loggedUser, props.rec]
                        }),
                    }).then(obj => obj.json()).then(
                        chat => {
                            const idnewchat = chat._id;
                            fetch("http://localhost:3000/chat/newmessage", {
                                method: "post",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    mittente: loggedUser,
                                    content: message,
                                    chat: idnewchat,
                                }),
                            })
                        }
                    )
                }
                setMessagePending(!messagePending);
                setMessage("")
            });
    }


    return (
        <>

        <Container maxWidth="x1">
            <Box sx={{
                bgcolor: '#FFFFF',
                p: 1,
                display: 'flex',
                alignItems: "center",
                my: 2
            }}>
                <Avatar
                    sx={{
                        bgcolor: deepOrange[500],
                        display: props.rec === "" ? "none" : "flex",
                        height: "2rem",
                        width: "2rem",
                        marginRight: "1rem",
                    }}
                    alt={props.username}
                >
                    {props.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {props.username}
                </Typography>
            </Box>
            <ScrollableBox ref={scrollableBoxRef} sx={{ bgcolor: '#e7e5e8', height: '80vh',
                '&::-webkit-scrollbar': {
                    display: 'none',
                }, }}>

                <List>
                    {listMessages.map((m) => (
                        <Message
                            key={m._id}
                            msg={m.content}
                            sender={m.mittente}
                            loggedUser={loggedUser}
                        />
                    ))}
                </List>
            </ScrollableBox>


                <Grid container sx={{
                    marginTop: 1,

                }} >
                    <Grid item sx={{
                       width: 0.75,
                    }}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            name="message"
                            value={message}
                            onChange={handleChange}
                            sx={{
                                borderRadius: 5,
                            }}
                        />
                    </Grid>
                    <Grid item sx={{width: 0.2,
                    marginLeft:2}}>
                        <Fab
                            variant="extended"
                            color="primary"
                            aria-label="add"
                            onClick={handleClick}
                        >
                            <NavigationIcon sx={{ mr: 0.5 }} />
                            Invia
                        </Fab>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
//
