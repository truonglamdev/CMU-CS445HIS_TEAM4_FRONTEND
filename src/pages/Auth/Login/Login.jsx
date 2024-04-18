import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormHelperText } from '@mui/material';
function Login() {
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required!')
            .email()
            .matches(
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please , enter email address!',
            ),
        password: yup.string().required('Password is required!').min(6),
    });
    const [isVerify, setIsVerify] = useState(false);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleSubmitLoginForm = () => {
        
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.isVerify) {
            setIsVerify(true);
            setIsShowMessage(true);
        }
    }, []);
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '24px 20px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(handleSubmitLoginForm)}
                    noValidate
                    sx={{ mt: 1, width: '100%' }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                    {isShowMessage && (
                        <Box sx={{ display: 'flex', mt: 1, alignItems: 'center' }}>
                            <Box sx={{ color: !isVerify ? '#ff424e' : 'green' }}>
                                <FaRegCheckCircle style={{ fontSize: '30px', alignItems: 'center' }} />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    textAlign: 'center',
                                    fontWeight: '300',
                                    ml: 1,
                                    color: !isVerify ? '#ff424e' : 'green',
                                }}
                            >
                                You need to identify your account before logging in.
                            </Typography>
                        </Box>
                    )}

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
