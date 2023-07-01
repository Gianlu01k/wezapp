import React, {useEffect, useState} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {Badge, Button, Fab, List, ListItem,} from "@mui/material";
import ItemUsername from "./ItemUsername";
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';

const token = localStorage.getItem('token')
export default function Notifications(){

    const [anchorEl, setAnchorEl] = useState(null); // stato per gestire il menu delle notifiche
    const [requestPending, setRequestPending] = useState([]) //stato per gestire le richieste di amicizia in arrivo
    let userpending = "";
    const loggedUser = localStorage.getItem('sessionID');
    const token = localStorage.getItem('token')



    useEffect(() => {
        //richiesta per otttentere tutte le richiesta ricevute
        fetch('http://localhost:3000/friends/pendingrequests',{
            headers: {
                "Authorization": token,
            },
        })
            .then(requests => requests.json())
            //seleziono le richieste non ancora accettate inviate all'utente loggato
            .then(data => setRequestPending(data.filter(friend => {
                return (friend.user2 === loggedUser) && (friend.req2 === false);
            })))
    },requestPending)

    //gestione del menù delle richieste di amicizia
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleFriend=(e)=>{

        if(e.target.dataset.value !== undefined){
            fetch('http://localhost:3000/friends/accept', {
                //richiesta post per accettare una richiesta di amicizia
                method: 'post',
                headers: {'Content-Type': 'application/json',
                    "Authorization": token,
                },
                body: JSON.stringify({
                        idfriend: e.target.dataset.value,
                    }
                )
            }).then(obj => obj.json()).then(
                data=> setRequestPending(requestPending)).then(()=> window.location.reload())
        }

    }


    return(
        <div >
            <Fab onClick={handleMenuOpen} variant="contained"
                    sx={{
                        height: '50px',
                        width: '50px'
                    }}>
                <Badge color="secondary" badgeContent={requestPending.length}>
                    <NotificationsIcon color={'primary'}/>
                </Badge>

            </Fab>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{mx: -4}}
            ><List>
                {requestPending.length!==0 ?  requestPending.map((el) =>
                    <div><ListItem onClick={handleMenuClose} >
                        <ItemUsername userid={el.user1 === loggedUser ? el.user2 : el.user1}/><Button><PersonAddAltIcon data-value={el._id} color="success" onClick={handleFriend}/></Button><Button><PersonAddDisabledIcon data-value={el._id} color="error" onClick={handleDeleteFriend}/></Button>
                    </ListItem>
                    </div>
                ) : <MenuItem>Non ci sono richieste</MenuItem>}
            </List>
            </Menu>
        </div>
    )}