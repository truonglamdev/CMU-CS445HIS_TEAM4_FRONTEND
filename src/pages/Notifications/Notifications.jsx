import { Box, Button, Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useNotifications } from '~/providers/NotificationContext';
import classNames from 'classnames/bind';
import styles from './Notifications.module.scss';
import Sidebar from '~/components/layout/Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import * as request from '~/utils/axiosConfig';
import { TextField } from '@material-ui/core';
import { toast } from 'react-toastify';
import Loading from '~/components/Loading/index.js';

const cx = classNames.bind(styles);

const Notifications = () => {
    const { notifications, clearNotifications } = useNotifications();
    const [viewData, setViewData] = useState([]);
    const [exceeds, setExceeds] = useState([]);
    const [allowDays, setAllowDays] = useState(20);
    const [month, setMonth] = useState(5);
    const [isLoading, setIsLoading] = useState(false);


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

    const columnsExceeds = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'fullName', headerName: 'FULL NAME', width: 250 },
        { field: 'payRate', headerName: 'PAY RATE', width: 250 },
        { field: 'vacationDays', headerName: 'VACATION DAYS', width: 250 },
        { field: 'daysEceed', headerName: 'DAYS EXCEED', width: 200 },
        {
            field: 'actions',
            width: 250,
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
                        justifyContent: 'flexStart',
                        gap: '20px',
                    }}
                >

                    <Button
                        variant="contained"
                        color="secondary"
                        //Hiện thông báo
                        onClick={() => toast.warning('This function is under development, please try again later')}
                    >
                        Details
                    </Button>
                </Box>
            ),
        },
    ];


    const rowsData = (data) => {
        const result = data.map((obj) => ({
            id: obj?.PERSONAL_ID,
            fullName: `${obj?.CURRENT_LAST_NAME} ${obj?.CURRENT_MIDDLE_NAME} ${obj?.CURRENT_FIRST_NAME}`,
            gender: obj.CURRENT_GENDER,
            city: obj.CURRENT_CITY,
            shareholder: obj.SHAREHOLDER_STATUS === 0 ? 'No' : 'Yes',
            //Đoạn code để format lại định DateTime
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

    //Hiển thị data lên table vuowt quá ngày nghỉ
    const rowsDataExceeds = (data) => {
        const result = data.map((obj) => ({
            id: obj?.idEmployee,
            fullName: `${obj[`Last Name`]}  ${obj[`First Name`]}`,
            payRate: obj[`Pay Rate`],
            vacationDays: obj[`Vacation Days`],
            daysEceed: obj[`Vacation Days`] - allowDays,
        }));
        return result;
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                //gọi api từ backend để lâấy những nhân viên có sinh nhật vào tháng này .
                const res = await request.get('/view/employee/birthday');
                setViewData(rowsData(res?.data));
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                toast.error(error?.response?.data?.message);
            }
        };
        fetchData();
    }, []);

    const handleOnFocusMonth = async () => {
        try {
            if (month <= 0 || month > 12) {
                toast.error('Please enter the appropriate month');
                return;
            } else {
                setIsLoading(true);
                //gọi api
                const res = await request.get(`/view/employee/birthday?month=${month}`);
                setViewData(rowsData(res?.data));
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };

    //Gọi api từ backend để lấy số người vuợt quá ngày nghỉ cho phép
    const handleOnFocusAllowDays = async () => {
        try {
            if (allowDays < 0) {
                toast.error('Please enter the appropriate number of days');
                return;
            } else {
                setIsLoading(true);
                //gọi api
                const res = await request.get(`/admin/check-vacation-days/${allowDays}`);
                setExceeds(rowsDataExceeds(res?.data));
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error?.response?.data?.message);
        }
    };
    useEffect(() => {
        handleOnFocusAllowDays();
        handleOnFocusMonth();
    }, []);


    return (
        <Box className={cx('wrapper')} sx={{ display: 'flex', backgroundColor: '#eaeceb', height: '100vh' }}>
            <Sidebar />
            <div className={cx('content')}>
                {isLoading ? <Loading /> : (<Box>
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
                                        '.MuiTypography-root': {
                                            width: '800px',
                                            fontSize: '1.5rem',
                                            fontWeight: '500',
                                            marginLeft: '20px',
                                            borderBottom: '1px solid #ccc',
                                            padding: '10px',
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
                                padding: '12px 16px',
                                fontWeight: 400,
                                fontSize: '15px',
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
                            <Box sx={{ margin: '20px 0' }}>
                                <TextField id="outlined" label="Month" type="number" variant="outlined"
                                           sx={{ fontSize: '1.5rem !important' }} value={month} InputProps={{
                                    readOnly: false,
                                }}
                                           onChange={(e) => setMonth(e.target.value)}
                                           onBlur={handleOnFocusMonth} />
                            </Box>
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
                                        sx={{ fontSize: '1.5rem' }}
                                    />
                                )}
                            </div>
                        </Box>

                        <Box className={cx('list-employee')}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                Employees take leave exceeding the prescribed number of days.
                            </Typography>
                            <Box sx={{ margin: '20px 0' }}>
                                <TextField id="outlined" label="Number days allowed" type="number" variant="outlined"
                                           sx={{ fontSize: '1.5rem !important' }} value={allowDays} InputProps={{
                                    readOnly: false,
                                }}
                                           onChange={(e) => setAllowDays(e.target.value)}
                                           onBlur={handleOnFocusAllowDays} />
                            </Box>
                            <div className={cx('table')}>
                                {exceeds.length === 0 ? (
                                    <div>NO DATA</div>
                                ) : (
                                    <DataGrid
                                        rows={exceeds}
                                        columns={columnsExceeds}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 10 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                        checkboxSelection
                                        sx={{ fontSize: '1.5rem' }}
                                    />
                                )}
                            </div>
                        </Box>
                    </Paper>
                </Box>)}
            </div>
        </Box>
    );
};

export default Notifications;
