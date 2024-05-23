import { Box, Paper, Typography, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import { useNotifications } from '~/providers/NotificationContext';
import classNames from 'classnames/bind';
import styles from './Notifications.module.scss';
import Sidebar from '~/components/layout/Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import * as request from '~/utils/axiosConfig';

const cx = classNames.bind(styles);

const Notifications = () => {
    const { notifications, clearNotifications } = useNotifications();
    const [viewData, setViewData] = useState([]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fullName', headerName: 'FULL NAME', width: 160 },
        { field: 'phone', headerName: 'PHONE', width: 150 },
        { field: 'email', headerName: 'EMAIL', width: 250 },
        { field: 'gender', headerName: 'GENDER', width: 150 },
        { field: 'city', headerName: 'CITY', width: 150 },
        {
            field: 'birthDay',
            headerName: 'BIRTHDAY',
            type: 'number',
            width: 190,
        },
    ];

    const rowsData = (data) => {
        const result = data.map((obj) => ({
            id: obj?.PERSONAL_ID,
            fullName: `${obj?.CURRENT_LAST_NAME} ${obj?.CURRENT_MIDDLE_NAME} ${obj?.CURRENT_FIRST_NAME}`,
            gender: obj.CURRENT_GENDER,
            city: obj.CURRENT_CITY,
            shareholder: obj.SHAREHOLDER_STATUS === 0 ? 'No' : 'Yes',
            birthDay:
                new Date(obj.BIRTH_DATE).getDate() +
                '/' +
                (new Date(obj.BIRTH_DATE).getMonth() + 1) +
                '/' +
                new Date(obj.BIRTH_DATE).getFullYear(),
            phone: obj.CURRENT_PHONE_NUMBER,
            email: obj.CURRENT_PERSONAL_EMAIL,
        }));
        return result;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await request.get('/view/employee/birthday');
                setViewData(rowsData(res?.data));
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Box className={cx('wrapper')} sx={{ display: 'flex', backgroundColor: '#eaeceb', height: '100vh' }}>
            <Sidebar />
            <div className={cx('content')}>
                <Box>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Notifications
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
                        <List>
                            {notifications.length === 0 ? <div>NO NOTIFICATION</div> : <></>}
                            {notifications.map((notification, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        paddingLeft: 0,
                                        '&:hover': {
                                            backgroundColor: '#f0f0f0',
                                        },
                                    }}
                                >
                                    <ListItemText primary={notification} />
                                </ListItem>
                            ))}
                        </List>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={clearNotifications}
                            sx={{
                                marginTop: 2,
                                '&:hover': {
                                    backgroundColor: '#303f9f',
                                },
                            }}
                        >
                            Clear Notifications
                        </Button>
                        <Box className={cx('list-employee')}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                Employee birthday in current month
                            </Typography>
                            <div className={cx('table')}>
                                {viewData.length === 0 ? (
                                    <div>NO EMPLOYEE BIRTH DAY</div>
                                ) : (
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
                                )}
                            </div>
                        </Box>
                    </Paper>
                </Box>
            </div>
        </Box>
    );
};

export default Notifications;
