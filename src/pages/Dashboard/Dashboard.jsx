import { Box } from '@mui/material';
import { useEffect } from 'react';
import Sidebar from '~/components/layout/Sidebar/Sidebar';
import * as request from '~/utils/axiosConfig';

export default function Dashboard() {
    useEffect(() => {
        const fetchData = async () => {
            const res = await request.get('/user/6621d91ae72305bc7ae5e995');
            console.log(res);
        };
        fetchData();
    }, []);
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box>Content</Box>
        </Box>
    );
}
