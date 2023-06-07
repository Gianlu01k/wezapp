import React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function Login(){
    const [testo, setTesto] = useState({username:"", password:""})
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    function handleChange(e){
        setTesto({...testo, [e.target.name] : e.target.value})
    }
    function handleSubmit(e){
        e.preventDefault()
        fetch('http://localhost:3000/login',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: testo.username,
                    password: testo.password
                }
            )}
        )
            .then(obj => obj.json())
            .then(u => u.verified ? setUsername(u.username) : setError(true))

    }

    return (
        username === "" ? <>
            <input name="username" placeholder={"Username"} type={"text"} onChange={handleChange} value={testo.u}/>
            <input id="password" name="password" type={"password"} placeholder={"Password"} onChange={handleChange} value={testo.p}/>
            <button onClick={handleSubmit}>Accedi</button>
            <p hidden={!error}>Username o password errata</p>
            <p>Non hai un account? <Link to={"/registrazione"}>Registrati ora</Link> </p>
        </> : navigate('/homepage'))


}