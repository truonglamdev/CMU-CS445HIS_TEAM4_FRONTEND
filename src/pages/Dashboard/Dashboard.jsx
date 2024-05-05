import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import Sidebar from '~/components/layout/Sidebar/Sidebar';
import * as request from '~/utils/axiosConfig';
import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import Loading from '~/components/Loading';
import queryString from 'query-string';
import * as XLSX from 'xlsx';
import { AuthContext } from '~/components/AuthContext/AuthContext';
import { uniqueValuesByKey } from '~/utils/algorithms';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fullName', headerName: 'FULL NAME', width: 160 },
    { field: 'department', headerName: 'DEPARTMENT', width: 180 },
    { field: 'gender', headerName: 'GENDER', width: 150 },
    { field: 'city', headerName: 'CITY', width: 150 },
    { field: 'shareholder', headerName: 'SHAREHOLDER', width: 150 },
    { field: 'jobType', headerName: 'TYPE JOB', width: 150 },
    {
        field: 'birthDay',
        headerName: 'BIRTHDAY',
        type: 'number',
        width: 130,
    },
    {
        field: 'totalAmount',
        headerName: 'TOTAL Amount',
        type: 'number',
        width: 170,
    },

    {
        field: 'totalVacationDay',
        headerName: 'TOTAL VACATION DAY',
        type: 'number',
        width: 170,
    },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
];

const cx = classNames.bind(styles);
export default function Dashboard() {
    const [viewData, setViewData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [gender, setGender] = useState('');
    const [shareholder, setShareholder] = useState('');
    const [personalData, setPersonalData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [city, setCity] = useState('');
    const [typeJob, setTypeJob] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [year, setYear] = useState('');

    const currentUser = useContext(AuthContext);

    const rowsData = (data) => {
        const result = data.map((obj) => ({
            id: obj.PERSONAL_ID,
            fullName: `${obj.CURRENT_LAST_NAME} ${obj.CURRENT_MIDDLE_NAME} ${obj.CURRENT_FIRST_NAME}`,
            department: obj.DEPARTMENT,
            gender: obj.CURRENT_GENDER,
            city: obj.CURRENT_CITY,
            jobType: obj['Pay Rate Name'],
            shareholder: obj.SHAREHOLDER_STATUS === 0 ? 'No' : 'Yes',
            birthDay: new Date(obj.BIRTH_DATE).getFullYear(),
            totalAmount: obj['Pay Amount'],
            totalVacationDay: obj['Vacation Days'],
        }));
        return result;
    };

    const handleExportToExcel = (data = [], fileName = 'dashboard', sheetName = 'Sheet1') => {
        if (data.length > 0) {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
            XLSX.writeFile(wb, `${fileName}.xlsx`);
        } else {
            toast.error('Data not found!');
        }
    };

    const handleResetData = () => {
        window.location.reload();
    };

    useEffect(() => {
        let paramsObj = {
            CURRENT_GENDER: gender,
            SHAREHOLDER_STATUS: shareholder,
            CURRENT_CITY: city,
            'Pay Rate Name': typeJob,
        };
        //Delete params empty
        const filteredParamsObject = Object.fromEntries(Object.entries(paramsObj).filter(([, value]) => value !== ''));
        const paramsString = queryString.stringify(filteredParamsObject);

        const fetchViewData = async () => {
            try {
                setIsLoading(true);
                const res = await request.get(`/view/human/employees?${paramsString}`);
                if (res && res.data) {
                    console.log(res?.data);
                    setAllData(res?.data);
                    setViewData(rowsData(res?.data?.viewData));
                    setIsLoading(false);
                }
            } catch (error) {
                setIsLoading(false);
                toast.error(error?.response?.data?.message, {
                    position: 'top-center',
                });
            }
        };

        fetchViewData();
    }, [gender, shareholder, city, typeJob]);

    useEffect(() => {
        const fetchPersonalData = async () => {
            try {
                setIsLoading(true);
                const res = await request.get('/view/personal');
                if (res && res?.data) {
                    setIsLoading(false);
                    setPersonalData(res.data);
                }
            } catch (error) {
                setIsLoading(false);
                toast.error(error?.response?.data?.message, {
                    position: 'top-center',
                });
            }
        };
        fetchPersonalData();
    }, []);

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                setIsLoading(true);
                const res = await request.get('/view/employee/department');
                if (res && res?.data) {
                    setIsLoading(false);
                    setDepartments(res.data);
                }
            } catch (error) {
                setIsLoading(false);
                toast.error(error?.response?.data?.message, {
                    position: 'top-center',
                });
            }
        };

        fetchDepartment();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <div className={cx('content')}>
                <div className={cx('menu-action')}>
                    <div className={cx('item')}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Gender"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <MenuItem value={''}>All</MenuItem>
                                <MenuItem value={'Nam'}>Male</MenuItem>
                                <MenuItem value={'Nữ'}>Female</MenuItem>
                                <MenuItem value={'Khác'}>Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={cx('item')}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Shareholder</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={shareholder}
                                label="Age"
                                onChange={(e) => setShareholder(e.target.value)}
                            >
                                <MenuItem value={''}>All</MenuItem>
                                <MenuItem value={1}>Yes</MenuItem>
                                <MenuItem value={0}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={cx('item')}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Year</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                label="Age"
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <MenuItem value={''}>All</MenuItem>
                                <MenuItem value={1}>Current Year</MenuItem>
                                <MenuItem value={0}>Last Year</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={cx('item')}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type Job</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={typeJob}
                                label="Age"
                                onChange={(e) => setTypeJob(e.target.value)}
                            >
                                <MenuItem value={''}>All</MenuItem>
                                <MenuItem value={'Full Time'}>Full Time</MenuItem>
                                <MenuItem value={'Pass Time'}>Pass Time</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={cx('item')}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={city}
                                label="Age"
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <MenuItem value={''}>All</MenuItem>
                                {personalData ? (
                                    uniqueValuesByKey(personalData, 'CURRENT_CITY').map((item) => {
                                        return (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className={cx('item-btn')}>
                    <Button
                        onClick={handleResetData}
                        variant="contained"
                        size="large"
                        sx={{
                            width: '140px',
                            height: '40px',
                            fontSize: '1.2rem',
                            backgroundColor: '#f69d4d',
                            borderRadius: '1000px',
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={() => handleExportToExcel(viewData)}
                        variant="contained"
                        size="large"
                        sx={{
                            width: '180px',
                            height: '40px',
                            fontSize: '1.2rem',
                            backgroundColor: '#f69d4d',
                            borderRadius: '1000px',
                        }}
                    >
                        Export to Excel
                    </Button>
                </div>
                <div className={cx('chart')}>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['Current Year', 'Last Year'] }]}
                        series={[
                            {
                                data: [allData.totalEarningCurrentYear, allData.totalEarningLastYear],
                                label: 'Total Earning',
                            },
                        ]}
                        width={500}
                        height={400}
                    />

                    {departments.length > 0 && (
                        <PieChart
                            series={[
                                {
                                    data: departments,
                                    innerRadius: 30,
                                    outerRadius: 130,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                    startAngle: -205,
                                    endAngle: 180,
                                    cx: 140,
                                    cy: 190,
                                    label: 'Department',
                                },
                            ]}
                            width={600}
                            height={400}
                        />
                    )}
                    <div className={cx('description')}></div>
                </div>
                <div className={cx('table')}>
                    {isLoading ? (
                        <Loading />
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
                            sx={{ fontSize: '1.2rem' }}
                        />
                    )}
                </div>
            </div>
        </Box>
    );
}
