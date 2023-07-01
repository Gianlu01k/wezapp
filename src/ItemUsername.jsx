import React, {useEffect, useState} from 'react'
import {ListItemText} from "@mui/material";

const sessionID = localStorage.getItem('sessionID');
const token = localStorage.getItem('token')

export default function ItemUsername(props){

    const [username, setUsername] =useState("") //stato per gestire l'username
    useEffect(()=> {
        //richiesto le info di un utente dato l'id
        fetch('http://localhost:3000/one', {
            method: 'post',
            headers: {'Content-Type': 'application/json',
                "Authorization": token,
            },
            body: JSON.stringify({
                    id: props.userid
                }
            )
        }).then(obj => obj.json())
            .then(user => setUsername(user.username))
    },[])


    return(
        <ListItemText>
            {username}
        </ListItemText>
    )
}