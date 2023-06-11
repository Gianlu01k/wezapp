import React, {useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
            .then(data => setRequestPending(data.filter(friend => {
                return (friend.user2 === loggedUser) && (friend.req2 === false);
            })))
    },requestPending)
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleFriend=(e)=>{
        if(e.target.dataset.value !== undefined){
            fetch('http://localhost:3000/friends/accept', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                        idfriend: e.target.dataset.value,

                    }
                )
            }).then(obj => obj.json()).then(
                data=> setRequestPending(requestPending))
        }

    }

    function searchOne(iduser){}


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
                     </MenuItem><Button><PersonAddAltIcon data-value={el._id} color="secondary"onClick={handleFriend} /></Button></div>) : ""}

            </Menu>
        </div>
    )}