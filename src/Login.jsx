import React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {Alert, Box, Button, Container, CssBaseline, TextField} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {deepOrange} from "@mui/material/colors";

const defaultTheme = createTheme();
export default function Login({func}) {
    const [testo, setTesto] = useState({username: "", password: ""}) //stato per caratteri inseriti nel form
    const [user, setUser] = useState({_id:"", fistname:"", lastname:"", username:"", password:""}); //stato per memorizzare l'utente loggato
    const [error, setError] = useState(false) //stato per gestire l'errore
    const navigate = useNavigate();
    function handleChange(e) {
        setTesto({...testo, [e.target.name]: e.target.value}) //aggiorna campi dello stato testo
    }

    function handleSubmit(e) {
        e.preventDefault()
        //richiesta post contentente username e password inseriti
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
            .then(u => {
                if (u.verified) {
                    setUser(u.user);
                    func(u.user);
                    //imposto local storage per memorizzare id utente, username utente e jwt token di sessione
                    localStorage.setItem('sessionID', u.user._id);
                    localStorage.setItem('sessionUsername', u.user.username);
                    localStorage.setItem('token', u.token);
                } else {
                    setError(true);
                }
            })

    }

    return (
        user.username === "" ? <Container component="main" maxWidth="xs"><CssBaseline/><Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: deepOrange[500]}}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                <TextField margin="normal"
                           required
                           fullWidth
                           id="outlined-controlled"
                           label="Username"
                           name={"username"}
                           value={testo.u}
                           autoFocus
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

            </Box>

                    </Box>
        </Container>
        </ThemeProvider>
        </Box>
        </Container>: navigate('/homepage'))


}