import React from "react";

export default function Registrazione(){
    return(
        <>
            <h1>REGISTRAZIONE</h1>
            <input id="firstname" name="firstname" type={"text"}   placeholder={"Nome"}/>
            <input id="lastname" name="lastname" type="text"   placeholder={"Cognome"}/>
                <input id="password" name="password" type="password" placeholder={"Password"}/>
            <button>Registrati</button>
        </>
    )
}