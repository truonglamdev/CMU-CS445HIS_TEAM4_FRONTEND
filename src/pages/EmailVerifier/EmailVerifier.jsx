import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as request from '~/utils/axiosConfig';
import { toast } from 'react-toastify';
function EmailVerifier() {
    const params = useParams();
    const handleVerify = async () => {
        const { id, token } = params;
        try {
            if (id && token) {
                const response = await request.get(`/user/verify/${id}/${token}`);
                if (response && response.user) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    toast.success(response.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div>
            <Button variant="contained" onClick={handleVerify}>
                Verify
            </Button>
        </div>
    );
}

export default EmailVerifier;
