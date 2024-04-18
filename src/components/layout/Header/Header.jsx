import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { IoNotifications } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
export default function Header() {
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
              <img/>
            </div>
            <div className={cx('menu')}>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <div className={cx('icon')}>
                        <IoNotifications />
                    </div>
                </IconButton>
                <Button
                    variant="contained"
                    size="medium"
                    className={cx('btn-register')}
                    onClick={() => navigate('/register')}
                >
                    Register
                </Button>

                <Button variant="contained" size="medium" onClick={() => navigate('/login')}>
                    Login
                </Button>
            </div>
        </div>
    );
}
