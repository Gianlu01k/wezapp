import React, {useState} from "react";
import Usercard from "./usercomponents/Usercard";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Avatar, List} from "@mui/material";
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";
import {deepOrange} from "@mui/material/colors";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';


export default function Sidebar(props){

const [searchUt,setSearchUt]=useState("")
const loggedUsername = Cookies.get('sessionUsername')
const loggedUser = Cookies.get('sessionID')
const [isFilter, setIsFilter] = useState(false)
    const handleSearch=(e) => {
    setSearchUt(e.target.value)
    }


    let filteredFriends = []

    function handleFilter(){
        fetch('http://localhost:3000/friends/pendingrequests', {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        }).then(data => data.json())
            .then(requests => {
               return requests.filter(el => el.req2 === true)
            }).then(accepted => {

             let array = accepted.filter(el => el.user1 === loggedUser || el.user2 === loggedUser)
            props.userarray.forEach(el => {
                console.log(el)
                array.forEach(r => {
                    console.log(r.user1 + " "+ r.user2 + " "+ el._id)
                    if(r.user1 === el._id || r.user2 === el._id)
                    {filteredFriends.push(el)}
                })
            })
            setIsFilter(!isFilter)
        })
    }

    let filteredUsers;
    if (isFilter) {
        filteredUsers = filteredFriends.filter((el)=>
            el.username.toLowerCase().startsWith(searchUt.toLowerCase()));
    } else {
        filteredUsers = props.userarray.filter((el)=>
            el.username.toLowerCase().startsWith(searchUt.toLowerCase()));
    }
        let list = filteredUsers.map((el) =>
            <>
                {el.username !== loggedUsername ?
                    < Usercard user={el} key={el._id} id={el._id} setDest={props.setDest}/> : ""}
            </>
        )
    return(
        <>
            <Container sx={{ marginLeft: '3rem', width: '90%', }}>
                <Box sx={{ mx: 3, display: 'flex', alignItems: 'center', }}>
                    <h1 sx={{ flexGrow: 1 }}>Wezapp</h1>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        sx={{ bgcolor: deepOrange[500], marginRight: '1rem', mx: 3, my: 1 }}
                        alt={loggedUsername}
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
                    <IconButton
                        sx={{
                            mx:2,
                        }}
                    onClick={handleFilter}
                    >
                        <FilterListIcon />
                    </IconButton>
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
                        Cookies.remove('sessionID');
                    }}
                >
                    <LogoutIcon />
                </IconButton>
            </Container>

        </>

    )
}
//