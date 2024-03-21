import { Alert, Box, Button, Container, Grid, Paper, TextField, Typography, colors } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from "axios"
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const Register = () => {
    const [formError, setFormError] = useState(null)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const isUserExists = sessionStorage.getItem('user');
    const isToken = sessionStorage.getItem("token");

    useEffect(() => {
        if (isUserExists) navigate("/../../chat", { state: JSON.parse(isUserExists) });
    }, [])


    const onSubmit = (data) => {
        axios.post("http://localhost:8000/api/auth/register", data)
            .then((res) => {
                sessionStorage.setItem("token", res.data.data.token);
                const user = jwtDecode(res.data.data.token);
                sessionStorage.setItem("user", JSON.stringify(user));
                navigate("/../../chat", { state: user });
            })
            .catch((err) => {
                setFormError(err.response.data);
            });
    }
    if (isToken) return null;
    return (
        <Container
            maxWidth="md"
            sx={{ display: "flex", alignItems: "center", height: "100vh" }}>

            <Grid container>

                <Grid item md={6}>
                    <Paper square sx={{ bgcolor: "primary.main", color: "primary.contrastText", height: "100%", display: "flex", alignItems: "center" }}>

                        <Box sx={{ p: 5, textAlign: "center" }}>
                            <Box>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="55" viewBox="0 0 36 32" fill="none" className="css-1170n61"><path fillRule="evenodd" clipRule="evenodd" d="M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7.234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z" fill="#007FFF"></path></svg>
                            </Box>

                            <Typography variant='h4' gutterBottom sx={{ fontWeight: "600", mt: 3 }}>Chat App</Typography>

                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui rerum at distinctio deserunt corrupti eligendi ullam facere tempore doloremque expedita, nobis impedit dignissimos sed necessitatibus debitis blanditiis voluptate laudantium quaerat!</p>
                        </Box>
                    </Paper>
                </Grid>


                <Grid item md={6}>
                    <Paper square sx={{ height: "100%", display: "flex", alignItems: "center" }}>

                        <Box sx={{ p: 5 }} component={"form"} onSubmit={handleSubmit(onSubmit)}>
                            {
                                formError && (<Alert severity='error' sx={{ mb: 3 }}>{formError.message}</Alert>)
                            }
                            <Typography variant='h4' sx={{ mb: 4, fontWeight: "600", textTransform: "uppercase" }}>Register Here</Typography>

                            <TextField fullWidth id='name' variant='outlined' label='Name' sx={{ mb: 3 }} {...register("name", {
                                required: "This field is required"
                            })} error={!!errors.name} helperText={errors.name && errors.name.message}></TextField>

                            <TextField fullWidth id='email' variant='outlined' label='Email' sx={{ mb: 3 }} {...register("email", {
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i,
                                    message: "Invalid email address"
                                }
                            })} error={!!errors.email} helperText={errors.email && errors.email.message}></TextField>

                            <TextField fullWidth id='password' variant='outlined' label='Password' sx={{ mb: 3 }} {...register("password", {
                                required: "This field is required"
                            })} error={!!errors.password} helperText={errors.password && errors.password.message}></TextField>

                            <Button type='submit' fullWidth variant='contained' sx={{ py: 1.5 }}>Register</Button>

                            <Box sx={{ display: "flex", pr: 1 }}>
                                <Button fullWidth sx={{ mt: 1, fontSize: "11px" }} onClick={() => navigate("/")}>Already have an account?</Button>
                            </Box>

                        </Box>
                    </Paper>
                </Grid>

            </Grid>

        </Container >
    )
}

export default Register
