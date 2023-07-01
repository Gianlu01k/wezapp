import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {deepOrange} from "@mui/material/colors";


const defaultTheme = createTheme();
export default function Registrazione(){

    const [form, setForm] = useState({username:"", password:"", firstname:"", lastname:""}) //stato gestione form
    const [error,setError]=useState(false) //stato gestione errori
    const navigate = useNavigate();

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }

    function handleClick(e){
        e.preventDefault()
        //gestione form di registrazione
        if(form.username==="" || form.password==="" || form.firstname===""|| form.lastname==="")
            setError(true)
        else{
            setError(false)
            //richiesta post per memorizzare su db l'utente registrato
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
                .then(ver => ver.verified ? navigate('/') : console.log(ver))
        }

    }

    return(

        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            my:15
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: deepOrange[500] }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Registrazione
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleClick} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="firstname"
                                        name="firstname"
                                        label="Nome"
                                        type={"text"}
                                        autoComplete="given-name"
                                        onChange={handleChange}
                                        value={form.firstname}
                                        autoFocus
                                         />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Cognome"
                                        name="lastname"
                                        type={"text"}
                                        autoComplete="family-name"
                                        onChange={handleChange}
                                        value={form.lastname}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        type={"text"}
                                        autoComplete="username"
                                        onChange={handleChange}
                                        value={form.username}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={"password"}
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                        value={form.password}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                onClick={handleClick}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrati
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                        Sei già registrato? <Link to={"/"} variant="body2">Fai il login ora
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            </>
            );
            }
            //

