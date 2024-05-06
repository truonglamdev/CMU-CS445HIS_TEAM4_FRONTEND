import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import classNames from 'classnames/bind';
import { IoNotifications } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import logo from '~/assets/images/logo.jpg';
import styles from './Header.module.scss';
import Cookies from 'universal-cookie';
const cx = classNames.bind(styles);
const cookies = new Cookies();
export default function Header() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
        navigate('/login');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={logo} />
            </div>

            <div className={cx('menu')}>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <div className={cx('icon')}>
                        <IoNotifications />
                    </div>
                </IconButton>
                {user && user.isVerified ? (
                    <>
                        <Button
                            variant="contained"
                            size="large"
                            className={cx('btn-register')}
                            onClick={handleLogout}
                            sx={{ backgroundColor: '#3e99ea', ':hover': 'opacity : 0.8' }}
                        >
                            Log out
                        </Button>
                        <div className={cx('name')}>{`Hi! ${user.name}`}</div>
                    </>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            size="large"
                            className={cx('btn-register')}
                            onClick={() => navigate('/register')}
                            sx={{ backgroundColor: '#3e99ea', ':hover': 'opacity : 0.8' }}
                        >
                            Register
                        </Button>
                        <Button
                            className={cx('btn-login')}
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/login')}
                            sx={{ backgroundColor: '#3e99ea' }}
                        >
                            Login
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
