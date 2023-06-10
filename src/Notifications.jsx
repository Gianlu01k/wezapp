import React, {useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {Button} from "@mui/material";
import Cookies from "js-cookie";

export default function Notifications(){

    const [anchorEl, setAnchorEl] = useState(null);
    const [requestPending, setRequestPending] = useState([])
    let userpending = "";
    const loggedUser = Cookies.get('sessionID')


    useEffect(() => {
        fetch('http://localhost:3000/friends/pendingrequests')
            .then(requests => requests.json())
            .then(data => setRequestPending(data))
    },requestPending)
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleFriend=(e)=>{

    };

    function searchOne(iduser){
        fetch('http://localhost:3000/one', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                    id: iduser
                }
            )
        }).then(obj => obj.json()).then(
            data=> data.username);
    }

    return(
        <div>
            <Button onClick={handleMenuOpen}>
                <NotificationsIcon />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {requestPending.length!==0 ?  requestPending.map((el) => <div><MenuItem onClick={handleMenuClose}>
                    {userpending = el.user1 === loggedUser ?  el.user2 : el.user1}
                    {
                      searchOne(userpending)
                    }
                     </MenuItem><Button><PersonAddAltIcon color="secondary" onClick={handleFriend}/></Button></div>) : ""}

            </Menu>
        </div>
    )

}