import React from "react";
import {useState} from "react";
import Homepage from "./Homepage";
import {Link, Redirect, Route, Routes} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const [testo, setTesto] = useState("")
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false)
    const navigate = useNavigate();

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
                <button onClick={handleSubmit}>Invia</button>
            <p hidden={!error}>Utente non registrato</p>
            <p>Non hai un account?<Link to={"/registrazione"}>Registrati ora</Link> </p>
        </> : navigate('/homepage'))


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