import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Registrazione(){

    const [form, setForm] = useState({username:"", password:"", firstname:"", lastname:""})
    const [error,setError]=useState(false)
    const navigate = useNavigate();

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }

    function handleClick(e){
        e.preventDefault()

        if(form.username==="" || form.password==="" || form.firstname===""|| form.lastname==="")
            setError(true)
        else{
            setError(false)
            fetch('http://localhost:3000/registration',
                {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                            firstname: form.firstname,
                            lastname:form.lastname,
                            username: form.username,
                            password: form.password
                        }
                    )}

            )
                .then(obj => obj.json())
                .then(ver => ver.verified ? navigate('/') : console.log(ver))    //ver===null ? navigate('/' : setError(true)})
        }

    }

    return(
        <>
            <h1>REGISTRAZIONE</h1>
            <input id="firstname" name="firstname" type={"text"}   placeholder={"Nome"} onChange={handleChange} value={form.firstname}/>
            <input id="lastname" name="lastname" type={"text"}   placeholder={"Cognome"} onChange={handleChange} value={form.lastname}/>
            <input id="username " name="username" type={"text"}   placeholder={"Username"} onChange={handleChange} value={form.username}/>
            <input id="password" name="password" type={"password"} placeholder={"Password"} onChange={handleChange} value={form.password}/>
            <button onClick={handleClick}>Registrati</button>
            <p hidden={!error}>Errore. Campo vuoto</p>
            <p>Sei già registrato? <Link to={"/"}>Fai il login ora</Link> </p>
        </>
    )
}