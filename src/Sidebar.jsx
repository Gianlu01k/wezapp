import React, {useState} from "react";
import Usercard from "./usercomponents/Usercard";
import {Box, Button, Container, DialogTitle, TextField, Typography} from "@mui/material";
import {Avatar, List} from "@mui/material";
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";
import {deepOrange} from "@mui/material/colors";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import logo from "./logo.png";


export default function Sidebar(props){

const [searchUt,setSearchUt]=useState("") //stato per la ricerca utente
const loggedUsername = localStorage.getItem('sessionUsername') //username utente loggato
const loggedUser = localStorage.getItem('sessionID')
const token = localStorage.getItem('token')
const [isFilter, setIsFilter] = useState(false) //stato per selezione del filtraggio
    const [filteredFriends, setFilteredFriends] = useState([]); //stato per gestione amici
    const handleSearch=(e) => {
    setSearchUt(e.target.value)
    }

    function handleFilter() {
        fetch('http://localhost:3000/friends/pendingrequests', {
            method: 'get',
            headers: {'Content-Type': 'application/json',
                "Authorization": token},
        })
            .then(data => data.json())
            .then(requests => {
                return requests.filter(el => el.req2 === true);
            })
            .then(accepted => {
                let array = accepted.filter(el => el.user1 === loggedUser || el.user2 === loggedUser);
                const filteredFriendsArray = [];
                props.userarray.forEach(el => {
                    array.forEach(r => {
                        if (r.user1 === el._id || r.user2 === el._id) {
                            filteredFriendsArray.push(el);
                        }
                    });
                });
                setFilteredFriends(filteredFriendsArray);
                setIsFilter(!isFilter);
            });
    }

    //gestione filtro amici
    let filteredUsers;
    if (isFilter) {
        filteredUsers = filteredFriends.filter(el =>
            el.username.toLowerCase().startsWith(searchUt.toLowerCase())
        );
    } else {
        filteredUsers = props.userarray.filter(el =>
            el.username.toLowerCase().startsWith(searchUt.toLowerCase())
        );
    }

    let list = filteredUsers.map(el =>
        <>
            {el.username !== loggedUsername ? <Usercard user={el} key={el._id} id={el._id} setDest={props.setDest} /> : ""}
        </>
    );

    const [isOpen, setIsOpen] = useState(false)

    function handleProfile(){
        setIsOpen(!isOpen)
    }
    return(
        <>
            <Container sx={{ marginLeft: '3rem', width: '90%', }}>
                <Box sx={{ mx: 3, display: 'flex', alignItems: 'center', }}>
                       <Avatar src={logo}   /><h1 sx={{ flexGrow: 1 }}>Wezapp</h1>

                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                    <Avatar
                        sx={{ bgcolor: "#004CFF", marginRight: '1rem', mx: 3, my: 1 }}
                        alt={loggedUsername} onClick={handleProfile}
                    >
                        {loggedUsername.charAt(0).toUpperCase()}
                    </Avatar>
                    <TextField
                        label="Cerca"
                        variant="outlined"
                        value={searchUt}
                        onChange={handleSearch}
                        sx={{
                            borderRadius: 10,
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 10,
                                height: '50px',
                                width: '100%',
                            },
                        }}
                    />
                    {!isFilter ?
                        <Tooltip title="Amici">
                            <IconButton
                        sx={{
                            mx:2,
                        }}
                    onClick={handleFilter}
                    >
                        <FilterListIcon />
                    </IconButton>
                        </Tooltip>
                        :<IconButton
                        sx={{
                        mx:2,
                    }}
                        onClick={handleFilter}
                >
                    <FilterListOffIcon />
                </IconButton> }
                </Box>

                <List component="nav" aria-label="mailbox folders">
                    {list}
                </List>

                <IconButton
                    component={Link}
                    to="/"
                    sx={{
                        mx: 3,
                        fontSize: '1rem',
                    }}
                    onClick={() => {
                        localStorage.clear();
                    }}
                >
                    <LogoutIcon />
                </IconButton>
            </Container>

        </>

    )
}
//