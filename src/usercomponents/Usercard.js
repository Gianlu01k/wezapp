import React from "react";
import {Avatar, Button, Icon, ListItem, ListItemText, styled} from "@mui/material";
import {deepOrange, purple} from "@mui/material/colors";
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Cookies from "js-cookie";
import IconButton from '@mui/material/IconButton';

export default function Usercard(props) {


    const loggedUser = Cookies.get('sessionID')

    function handleClick(e) {
        props.setDest(props.user)
    }

    function handleFriend(e){
        e.preventDefault();
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
            }).then(obj => obj.json()).then(data=> console.log(data)) : alert("Amicizia già inviata"))

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
                <Button onClick={handleClick}>
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
                    <PersonAddAltIcon color="secondary" onClick={handleFriend} />
                </IconButton>
            </div>
        </ListItem>



    )
}
