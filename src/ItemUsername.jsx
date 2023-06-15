import React, {useEffect, useState} from 'react'
import {ListItemText} from "@mui/material";


export default function ItemUsername(props){

    const [username, setUsername] =useState("")

    useEffect(()=> {
        fetch('http://localhost:3000/one', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
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