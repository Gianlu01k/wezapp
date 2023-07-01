import React, { useEffect, useState,useRef } from "react";
import {Avatar, Box, Container, Fab, Grid, List, TextField,Typography } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import Message from "./Message";
import { styled } from "@mui/system";
import {deepOrange} from "@mui/material/colors";
import Cookies from "js-cookie";
import Notifications from "./Notifications";
import {Dialog, DialogTitle, DialogContent } from "@mui/material";

const token = Cookies.get('token')

const ScrollableBox = styled(Box)`
  overflow-y: scroll;
  max-height: 70vh;
`;
export default function Home(props) {
    const [message, setMessage] = useState(""); //stato per gestire un nuovo messaggio
    const [listMessages, setListMessages] = useState([]); //stato per gestire tutti i messaggi della chat selezionata
    const [messagePending, setMessagePending] = useState(false); //stato per gestire l'invio del nuovo messaggio
    let [selectedChat, setSelectedChat] = useState(null);//stato per gestire la chat selezionata
    const scrollableBoxRef = useRef({ behavior: 'smooth', block: 'end' });
    const loggedUser = localStorage.getItem('sessionID');
    const token = localStorage.getItem('token')
    function handleChange(e) {
        setMessage(e.target.value);
    }
    useEffect(() => {
        //uso una useEffect in modo tale da aggiornare il componente ad ogni arrivo di un nuovo messaggio
        if (scrollableBoxRef.current) {
            scrollableBoxRef.current.scrollTop = scrollableBoxRef.current.scrollHeight;
        }
    }, [listMessages]);

    useEffect(() => {
        //richiesta per ottenere le chat dal database
        fetch("http://localhost:3000/chat", {
            method: "post",
            headers: { "Content-Type": "application/json",
                "Authorization": token,
            },
            body: JSON.stringify({}),
        })
            .then((data) => data.json())
            .then((chat) => {
                //selezione della chat tra utente loggato e utente destinatario selezionato
                selectedChat = chat.filter(
                    (el) =>
                        (el.users[0] === loggedUser && el.users[1] === props.rec) ||
                        (el.users[1] === loggedUser && el.users[0] === props.rec)
                );

                setListMessages([]);
                if (selectedChat.length !== 0) {
                    //richiesta per ottenere tutti i messaggi
                    fetch(`http://localhost:3000/chat/messages`,{
                        headers: {
                            "Authorization": token,
                        },
                    })
                        .then((data) => data.json())
                        .then((messages) => {
                            //ottengo tutti i messaggi relativi alla chat selezionata
                            const mess = messages.filter(
                                (msg) => msg.chat === selectedChat[0]._id
                            );
                            setSelectedChat(mess); //aggiorno gli stati
                            setListMessages(mess);
                        });
                }

            });
    }, [props.rec, loggedUser, messagePending]); //rieseguo le fetch ad ogni aggiornamento dei parametri

    function handleClick(e) {
        e.preventDefault();
        let selectedChat = [];

        fetch("http://localhost:3000/chat", {
            method: "post",
            headers: { "Content-Type": "application/json","Authorization": token, },
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
                        // richiesta post per ottenere il messaggio nuovo
                        fetch("http://localhost:3000/chat/newmessage", {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": token,
                            },
                            body: JSON.stringify({
                                mittente: loggedUser,
                                content: message,
                                chat: selectedChat[0]._id,
                            }),
                        }).then(() => setMessage(""));
                        // ottengo il nuovo messaggio
                        setMessagePending(!messagePending);
                    }
                }else{
                    //gestisco il caso in cui la chat tra user e destinatario non è stata iniziata
                    //richiesta post per la creazione della chat
                    fetch("http://localhost:3000/chat/newchat",{
                        method: "post",
                        headers: { "Content-Type": "application/json",
                            "Authorization": token,
                        },
                        body: JSON.stringify({
                            users: [loggedUser, props.rec]
                        }),
                    }).then(obj => obj.json()).then(
                        chat => {
                            const idnewchat = chat._id;
                            //aggiunta del nuovo messaggio alla chat appena creata
                            fetch("http://localhost:3000/chat/newmessage", {
                                method: "post",
                                headers: { "Content-Type": "application/json",
                                    "Authorization": token,
                                },
                                body: JSON.stringify({
                                    mittente: loggedUser,
                                    content: message,
                                    chat: idnewchat,
                                }),
                            });
                            setMessagePending(!messagePending);
}
                    )
                }
                setMessage("")
            });
    }

    //gestion del dialog

        const [open, setOpen] = useState(false);

        const handleClickk = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };



        return (
        <>

            <Container maxWidth="lg">
                <Box sx={{
                    bgcolor: '#c5c3c5',
                    p: 1,
                    display: "flex",
                    alignItems: "center",
                    marginTop: 5 ,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                }}>
                    <Avatar
                        sx={{
                            bgcolor: deepOrange[500],
                            display: props.rec === "" ? "none" : "flex",
                            height: "2rem",
                            width: "2rem",
                            marginRight: "1rem",
                            cursor: "pointer",
                        }}
                        alt={props.username}
                        onClick={handleClickk}
                    >
                        {props.username.charAt(0).toUpperCase()}
                    </Avatar>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{props.username}</DialogTitle>
                        <DialogContent>
                            {props.rec_fn +" " +props.rec_ln}
                        </DialogContent>
                    </Dialog>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {props.username}
                    </Typography>

                    <Box sx={{ marginLeft: 'auto' }}>
                        <Notifications />
                    </Box>
                </Box>


                    <ScrollableBox ref={scrollableBoxRef} sx={{ bgcolor: '#e7e5e8', height: '80vh',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,}}>
                        {selectedChat ? (
                        <List>
                            {listMessages.map((m) => (
                                <Message
                                    key={m._id}
                                    msg={m.content}
                                    sender={m.mittente}
                                    loggedUser={loggedUser}
                                />
                            ))}
                        </List>) : ""}
                    </ScrollableBox>


                {selectedChat &&
                <Grid container sx={{ marginTop: 1 }}>
                        <Grid item sx={{ flexGrow: 1 }}>
                            <TextField
                                fullWidth
                                label="Scrivi un messaggio"
                                id="outlined-controlled"
                                name="message"
                                value={message}
                                onChange={handleChange}
                                sx={{
                                    borderRadius: 10,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 10,
                                        height:'50px',

                                    },
                                }}
                            />

                        </Grid>
                        <Grid item sx={{ marginLeft: 2, alignSelf: 'center' }}>
                            <Fab
                                variant="extended"
                                color="primary"
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
