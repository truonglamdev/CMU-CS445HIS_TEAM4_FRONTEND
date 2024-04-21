import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Loading from '~/components/Loading';
import * as request from '~/utils/axiosConfig';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const cookies = new Cookies(null, { path: '/' });
    const schema = yup.object().shape({
        email: yup
            .string()
            .required('Email is required!')
            .email('Email must be a valid email')
            .matches(
                // eslint-disable-next-line no-useless-escape
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please , enter email address!',
            ),
        password: yup.string().required('Password is required!').min(6),
    });
    const [isVerify, setIsVerify] = useState(false);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleSubmitLoginForm = async (data) => {
        try {
            const response = await request.post('/user/login', data);
            setIsLoading(true);

            if (response && response.user) {
                setIsLoading(false);
                //setCookies
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(response.user));
                cookies.set('accessToken', response.user.accessToken);
                cookies.set('refreshToken', response.user.refreshToken);
                navigate('/dashboard');
                toast.success(response.message, {
                    position: 'top-center',
                });
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.message, {
                position: 'top-center',
            });
        }
    };

    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if (user && user.isVerified) {
            setIsVerify(true);
            setIsShowMessage(true);
        }
    }, []);
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
                            padding: '24px 20px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                        }}
                    >
                        <Typography component="h1" variant="h4" sx={{ color: '#407087' }}>
                            LOGIN
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
                                        {!isVerify
                                            ? 'You need to identify your account before logging in.'
                                            : 'Your account is verified!'}
                                    </Typography>
                                </Box>
                            )}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, p: 1, backgroundColor: '#f69d4d', fontSize: '1.4rem' }}
                            >
                                Login
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="#" variant="body2" sx={{ fontSize: '12px', color: '#407087' }}>
                                        Forgot password?
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

export default Login;
