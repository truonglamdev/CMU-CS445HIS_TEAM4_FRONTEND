import { Box, Button, Modal } from '@mui/material';
import Sidebar from '~/components/layout/Sidebar/Sidebar';
import styles from './Management.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as request from '~/utils/axiosConfig.js';
import { countFields } from '~/utils/algorithms.js';
import { PieChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

function Management() {
    const navigate = useNavigate();
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [deleteChecked, setDeleteChecked] = useState(false);
    const [deleteId, setDeleteId] = useState(-1);
    const [isLoading, setLoading] = useState(false);
    const [editId, setEditId] = useState(-1);
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
            width: 130,
        },
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
                        startIcon={<EditIcon />}
                        onClick={() => handleEditClick(params.row.id)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteClick(params.row.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    const [allGender, setAllGender] = useState([]);
    const [viewData, setViewData] = useState([]);
    const handleDeleteClick = (id) => {
        setOpenModalDelete(true);
        setDeleteId(id);
        setDeleteChecked(false);
    };

    const handleDelete = async () => {
        if (deleteId < 0) {
            toast.warning('Please select the human you want to delete ');
        } else {
            try {
                setLoading(true);
                const res = await request.post(`/admin/employee/${deleteId}`);
                setOpenModalDelete(false);
                setLoading(false);
                toast.success(res.message, {
                    position: 'top-center',
                });
            } catch (error) {
                setLoading(false);
                toast.error(error?.response?.data?.message, {
                    position: 'top-center',
                });
            }
        }
    };

    const handleEdit = () => {};

    const handleEditClick = (id) => {
        setOpenModalEdit(true);
        setEditId(id);
    };
    const rowsData = (data) => {
        const result = data.map((obj) => ({
            id: obj?.PERSONAL_ID,
            fullName: `${obj?.CURRENT_LAST_NAME} ${obj?.CURRENT_MIDDLE_NAME} ${obj?.CURRENT_FIRST_NAME}`,
            gender: obj.CURRENT_GENDER,
            city: obj.CURRENT_CITY,
            shareholder: obj.SHAREHOLDER_STATUS === 0 ? 'No' : 'Yes',
            birthDay: new Date(obj.BIRTH_DATE).getFullYear(),
            phone: obj.CURRENT_PHONE_NUMBER,
            email: obj.CURRENT_PERSONAL_EMAIL,
        }));
        return result;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await request.get('/view/personal');
                setAllGender(countFields(res?.data, 'CURRENT_GENDER'));
                setViewData(rowsData(res?.data));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <Box className={cx('wrapper')} sx={{ display: 'flex', backgroundColor: '#eaeceb' }}>
            <Sidebar />
            <div className={cx('content')}>
                <div className={cx('action')}>
                    <Button
                        onClick={() => navigate('/create-employee')}
                        variant="contained"
                        size="large"
                        sx={{
                            minWidth: '140px',
                            height: '40px',
                            fontSize: '1.2rem',
                            backgroundColor: '#f69d4d',
                            borderRadius: '1000px',
                        }}
                    >
                        Add New Employee
                    </Button>
                    {/* <Button
                        // onClick={handleResetData}
                        variant="contained"
                        size="large"
                        sx={{
                            minWidth: '140px',
                            height: '40px',
                            fontSize: '1.2rem',
                            backgroundColor: '#f69d4d',
                            borderRadius: '1000px',
                        }}
                    >
                        Import From Excel
                    </Button> */}
                    <Button
                        onClick={() => toast.warning('This feature is under development, please try again later')}
                        variant="contained"
                        size="large"
                        sx={{
                            minWidth: '140px',
                            height: '40px',
                            fontSize: '1.2rem',
                            backgroundColor: '#f69d4d',
                            borderRadius: '1000px',
                        }}
                    >
                        Export To Excel
                    </Button>
                </div>
                <div className={cx('content')}>
                    <div className={cx('chart')}>
                        <PieChart
                            series={[
                                {
                                    data: allGender.length > 0 ? allGender : [],
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                },
                            ]}
                            height={300}
                            width={300}
                        />
                    </div>
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
            <Modal open={openModalDelete}>
                <Box sx={style} className={cx('modal')}>
                    <div className={cx('header-modal')}>
                        <span>Delete Employee</span>
                        <CloseIcon onClick={() => setOpenModalDelete(false)} />
                    </div>
                    <div className={cx('header-des')}>
                        Are you sure you want to delete this Employee?
                        <div>
                            <input type="checkbox" onChange={(e) => setDeleteChecked(e.target.checked)} />
                            <span>
                                When you delete yourself here, the deleted data will be synchronized to both human and
                                payroll
                            </span>
                        </div>
                    </div>
                    <div className={cx('header-footer')}>
                        <Button variant="outlined" onClick={() => setOpenModalDelete(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            disabled={deleteChecked ? false : true}
                            style={{ backgroundColor: '#d9534f' }}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Modal open={openModalEdit}>
                <Box sx={style} className={cx('modal')}>
                    <div className={cx('header-modal')}>
                        <span>Edit Employee</span>
                        <CloseIcon onClick={() => setOpenModalEdit(false)} />
                    </div>
                    <div className={cx('header-des')}>
                        Are you sure you want to delete this Employee?
                        <div>
                            <span>
                                When you delete yourself here, the deleted data will be synchronized to both human and
                                payroll
                            </span>
                        </div>
                    </div>
                    <div className={cx('header-footer')}>
                        <Button variant="outlined" onClick={() => setOpenModalEdit(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            disabled={deleteChecked ? false : true}
                            style={{ backgroundColor: '#d9534f' }}
                            onClick={handleEdit}
                        >
                            Delete
                        </Button>
                    </div>
                </Box>
            </Modal>
        </Box>
    );
}

export default Management;
