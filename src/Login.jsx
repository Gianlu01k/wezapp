import React, {useEffect} from "react";
import {useState} from "react";
import {useParams} from "react-router-dom";

export default function Login(loggedUser){
    const [username, setUsername] = useState("");
    /*function handleChange(e){
        setUsername(e.target.value)
    }*/
    function handleSubmit(e){
         fetch('/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username
            })}).then(res => {
            if (res.ok) return res.json();
            else throw new Error('Si è verificato un errore nella comunicazione con il server');
        }).then(obj => {
            console.log(obj)
        })
    }

    return(
        <>
            <input type={"text"} />
            <input type={"submit"} onClick={handleSubmit}/>

        </>
    )
}