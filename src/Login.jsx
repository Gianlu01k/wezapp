import React from "react";
import {useState} from "react";
import Homepage from "./Homepage";
import {redirect, Route, Routes} from "react-router-dom";

export default function Login(){
    const [testo, setTesto] = useState("")
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false)

    function handleChange(e){
        setTesto(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        fetch('http://localhost:3000/login',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: testo
                }
            )}
        )
            .then(obj => obj.json())
            .then(u => u.verified ? setUsername(u.username) : setError(true))



    }

    return (
        username === "" ? <>
            <input type={"text"} onChange={handleChange} value={testo}/>
            <input type={"submit"} onClick={handleSubmit}/>
            <p hidden={!error}>Errore</p>
        </> : <Routes>
            <Route path={"homepage"} element={<Homepage/>}/>
        </Routes>
    )
}

/*
 <form onSubmit={handleSubmit}>
<button type="submit">Invia</button>
</form>

  <form onSubmit={handleSubmit}>

<button type="submit">
    <Link to="/seconda-pagina">Apri seconda pagina</Link>
</button>
</form>
 */