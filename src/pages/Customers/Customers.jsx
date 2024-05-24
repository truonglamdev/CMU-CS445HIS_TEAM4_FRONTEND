import Sidebar from '~/components/layout/Sidebar';
import classNames from 'classnames/bind';
import styles from './Customers.module.scss';
import { useEffect, useState } from 'react';
import * as request from '~/utils/axiosConfig';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

export default function Customers() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'fullName', headerName: 'FULL NAME', width: 250 },
        { field: 'email', headerName: 'EMAIL', width: 250 },
        { field: 'isAdmin', headerName: 'ADMIN', width: 250 },
        { field: 'isVerified', headerName: 'IS VERIFIED', width: 250 },
        {
            field: 'actions',
            width: 230,
            renderHeader: () => (
                <div style={{ display: 'block', width: '100%', textAlign: 'center', margin: '0 auto' }}>ACTIONS</div>
            ),
            renderCell: (params) => (
                <Box
                    className={cx('actions-btn')}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => toast.warning('This function is under development, please try again later')}
                    >
                        Block
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => toast.warning('This function is under development, please try again later')}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    const [viewData, setViewData] = useState([]);

    const rowsData = (data) => {
        const result = data.map((obj) => ({
            id: obj?._id,
            fullName: obj.name,
            email: obj.email,
            isAdmin: obj.isAdmin,
            isVerified: obj.isVerified,
        }));
        return result;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await request.get('/admin/users');
                setViewData(rowsData(res?.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('content')}>
                <div className={cx('table')}>
                    <DataGrid
                        rows={viewData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ fontSize: '1.3rem' }}
                    />
                </div>
            </div>
        </div>
    );
}
