import React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {Alert, Box, Button, Container, CssBaseline, TextField} from "@mui/material";

export default function Login() {
    const [testo, setTesto] = useState({username: "", password: ""})
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    function handleChange(e) {
        setTesto({...testo, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3000/login',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                        username: testo.username,
                        password: testo.password
                    }
                )
            }
        )
            .then(obj => obj.json())
            .then(u => u.verified ? setUsername(u.username) : setError(true))

    }

    return (
        username === "" ? <Container component="main" maxWidth="xs"><CssBaseline/><Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                <TextField margin="normal"
                           required
                           fullWidth
                           id="outlined-controlled"
                           label="Username"
                           name={"username"}
                           value={testo.u}
                           onChange={handleChange}></TextField>
                <TextField margin="normal"
                           required
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           id="password"
                           autoComplete="current-password"
                           value={testo.p}
                           onChange={handleChange}></TextField>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    type={"password"}
                    onClick={handleSubmit}>Accedi</Button>
                <Box sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}><span hidden={!error}> <Alert hidden={!error} severity="error">Username o password errata</Alert></span></Box>
                <Box sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}><p>Non hai un account? <Link variant="body2" to={"/registrazione"}>Registrati ora</Link></p></Box>
            </Box></Box>
        </Container> : navigate('/homepage'))


}