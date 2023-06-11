import React, {useEffect, useState} from "react";
import {Avatar, Button, ListItem, ListItemText} from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Cookies from "js-cookie";
import IconButton from '@mui/material/IconButton';
import GroupIcon from '@mui/icons-material/Group';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export default function Usercard(props) {


    const loggedUser = Cookies.get('sessionID')
    const [isFriend, setIsFriend] = useState(0)

    function handleClick(e) {
       if(isFriend===2) {
            props.setDest(props.user)
        }else{
           if(isFriend ===0)
           alert("Non siete ancora amici. Invia una richiesta prima di chattare")
           else
               alert("Richiesta già inviata, ma non ancora accettata")
       }
    }

    useEffect(()=> {
        fetch('http://localhost:3000/friends/pendingrequests', {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        }).then(data => data.json())
            .then(requests => {
                requests.forEach((el) => {

                    if ((el.user1 === props.id && el.user2 === loggedUser) || (el.user2 === props.id && el.user1 === loggedUser)) {

                        if (el.req2 === true) {
                            setIsFriend(2)

                        }
                    }
                })
            })
    } ,isFriend)

    function handleFriend(e){
        fetch('http://localhost:3000/friends/pendingrequests')
            .then(requests => requests.json())
            .then(data => data.filter(friend => friend.user1 === loggedUser || friend.user2 === loggedUser))
            .then(myfriends => myfriends.filter(friend => friend.user1 === props.user._id || friend.user2 === props.user._id))
            .then(exfriend => exfriend.length === 0 ?  fetch('http://localhost:3000/friends', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                        user1: loggedUser,
                        user2: props.user._id
                    }
                )
            }).then(obj => obj.json()).then(data=> setIsFriend(1)) : alert("Amicizia già inviata"))

    }

    function deleteFriend(e){
        const areSure = window.confirm("Sei sicuro di rimuovere questa amicizia? \n Non potrai più interagire con lui/lei")
        if(areSure) {
            fetch('http://localhost:3000/friends/pendingrequests')
                .then(requests => requests.json())
                .then(data => data.filter(friend => friend.user1 === loggedUser || friend.user2 === loggedUser))
                .then(myfriends => myfriends.filter(friend => friend.user1 === props.user._id || friend.user2 === props.user._id))
                .then(exfriend => exfriend.length === 1 ? fetch('http://localhost:3000/friends/delete', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                            idfriend: exfriend[0]._id
                        }
                    )
                }).then(obj => obj.json()).then(data => setIsFriend(0)) : alert("Errore rimozione"))
        }
    }


    return (
        <ListItem
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #e0e0e0',
                pb: 1,
                width: '100%',
            }}
        >
            <div sx={{ flexGrow: 1 }}>
                <Button onClick={handleClick} >
                    <Avatar
                        sx={{
                            bgcolor: 'rgba(255, 165, 0, 0.2)',
                            color: 'black',
                        }}
                        alt={props.user.username}
                    >
                        {props.user.username.charAt(0).toUpperCase()}
                    </Avatar>

                    <ListItemText
                        primary={props.user.username}
                        primaryTypographyProps={{
                            sx: {
                                color: 'black',
                                mx: 2,
                            },
                        }}
                    />
                </Button>
            </div>
            <div>
                <IconButton sx={{ marginLeft: 'auto' }}>
                    {isFriend===0 ? <PersonAddAltIcon color="secondary" onClick={handleFriend}/> : isFriend === 2 ? <GroupIcon color="primary" onClick={deleteFriend}/> : <PersonSearchIcon color="success" onClick={()=>{alert("Richiesta già inviata")}}/>}
                </IconButton>
            </div>
        </ListItem>



    )
}
