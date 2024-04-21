import { Button } from '@mui/material';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { BiCheckboxChecked } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as request from '~/utils/axiosConfig';
import styles from './EmailVerifier.module.scss';
const cx = classNames.bind(styles);
function EmailVerifier() {
    const navigate = useNavigate();
    const params = useParams();
    const [isVerify, setIsVerify] = useState(false);
    const handleVerify = async () => {
        const { id, token } = params;
        try {
            if (id && token) {
                const response = await request.get(`/user/verify/${id}/${token}`);
                if (response && response.user) {
                    localStorage.removeItem('user');
                    localStorage.setItem('user', JSON.stringify(response.user));
                    setIsVerify(true);
                    toast.success(response.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
            setIsVerify(false);
        }
    };
    return (
        <div className={cx('email-verifier-container', 'wrapper')}>
            <div className={cx('content')}>
                <h1>
                    Welcome
                    <i>
                        <BiCheckboxChecked />
                    </i>
                </h1>
                <div className={cx('alert')}>Your account has been verified</div>
                <p>
                    {isVerify ? (
                        <Button className={cx('btn-backlog')} onClick={() => navigate('/login')}>
                            Go to login
                        </Button>
                    ) : (
                        <Button className={cx('btn-verify')} onClick={handleVerify}>
                            Resend Verification Email
                        </Button>
                    )}
                </p>
            </div>
        </div>
    );
}

export default EmailVerifier;
