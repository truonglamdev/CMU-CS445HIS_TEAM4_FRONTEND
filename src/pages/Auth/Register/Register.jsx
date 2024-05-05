/* eslint-disable no-useless-escape */
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Loading from '~/components/Loading';
import * as request from '~/utils/axiosConfig';

function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup
            .string()
            .required('Email is required!')
            .email()
            .matches(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please , enter email address!',
            ),
        password: yup.string().required('Password is required!').min(6),
        confirmPassword: yup
            .string()
            .required('Confirm password is required!')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleSubmitForm = async ({ email, password, name }) => {
        try {
            setIsLoading(true);
            const response = await request.post('/user/register', { email, password, name });
            if (response && response.user) {
                setIsLoading(false);
                localStorage.setItem('user', JSON.stringify(response.user));
                toast.success(response.message, {
                    position: 'top-center',
                });
                navigate('/login');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message, {
                position: 'top-center',
            });
        }
    };
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '30px 40px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                        }}
                    >
                        <Typography component="h1" variant="h4" sx={{ color: '#407087' }}>
                            REGISTER
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleSubmit(handleSubmitForm)}
                            noValidate
                            sx={{ mt: 1, width: '100%' }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Your name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                sx={{ fontSize: '12px' }}
                                {...register('name')}
                            />
                            {errors.name && (
                                <FormHelperText error sx={{ fontSize: '12px' }}>
                                    {errors.name.message}
                                </FormHelperText>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                // autoFocus
                                {...register('email')}
                            />
                            {errors.email && (
                                <FormHelperText error sx={{ fontSize: '12px' }}>
                                    {errors.email.message}
                                </FormHelperText>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register('password')}
                            />
                            {errors.password && (
                                <FormHelperText error sx={{ fontSize: '12px' }}>
                                    {errors.password.message}
                                </FormHelperText>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-password"
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <FormHelperText error sx={{ fontSize: '12px' }}>
                                    {errors.confirmPassword.message}
                                </FormHelperText>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, p: 1.5, backgroundColor: '#f69d4d', fontSize: '1.4rem' }}
                            >
                                Register
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/login" variant="body2" sx={{ fontSize: '11px', color: '#407087' }}>
                                        {"Don't have an account? Login"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            )}
        </>
    );
}

export default Register;
