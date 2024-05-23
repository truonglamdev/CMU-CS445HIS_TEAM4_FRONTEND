import classNames from 'classnames/bind';
import Sidebar from '~/components/layout/Sidebar/Sidebar';
import styles from './Human.module.scss';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import * as request from '~/utils/axiosConfig';
import { toast } from 'react-toastify';
const validationSchema = yup.object({
    planName: yup.string().max(10, 'Plan Name must be at most 10 characters').required('Plan Name is required'),
    deductable: yup.number().positive('Deductable must be a positive number').required('Deductable is required'),
    percentageCopay: yup
        .number()
        .positive('Percentage Copay must be a positive number')
        .required('Percentage Copay is required'),
});

const generateRandomId = () => Math.floor(Math.random() * 2147483647);
const cx = classNames.bind(styles);

function Human() {
    const formik = useFormik({
        initialValues: {
            planName: '',
            deductable: '',
            percentageCopay: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await request.post('/admin/benefit-plans', {
                    BENEFIT_PLANS_ID: generateRandomId(),
                    PLAN_NAME: values.planName,
                    Deductable: values.deductable,
                    Percentage_Copay: values.percentageCopay,
                });
                toast.success(response.message, {
                    position: 'top-center',
                });
            } catch (error) {
                toast.success(error?.response?.data?.message, {
                    position: 'top-center',
                });
            }
        },
    });
    return (
        <Box className={cx('wrapper')} sx={{ display: 'flex', backgroundColor: '#eaeceb' }}>
            <Sidebar />
            <div className={cx('content')}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <Paper sx={{ padding: 4, width: '100%', height: '100vh' }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Add Benefit Plan
                        </Typography>
                        <form onSubmit={formik.handleSubmit} className={cx('benefit-form')}>
                            <TextField
                                label="Plan Name"
                                variant="outlined"
                                fullWidth
                                name="planName"
                                value={formik.values.planName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ marginBottom: 2 }}
                                required
                                error={formik.touched.planName && Boolean(formik.errors.planName)}
                                helperText={formik.touched.planName && formik.errors.planName}
                            />
                            <TextField
                                label="Deductable"
                                variant="outlined"
                                fullWidth
                                name="deductable"
                                value={formik.values.deductable}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ marginBottom: 2 }}
                                type="number"
                                required
                                error={formik.touched.deductable && Boolean(formik.errors.deductable)}
                                helperText={formik.touched.deductable && formik.errors.deductable}
                            />
                            <TextField
                                label="Percentage Copay"
                                variant="outlined"
                                fullWidth
                                name="percentageCopay"
                                value={formik.values.percentageCopay}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ marginBottom: 2 }}
                                type="number"
                                required
                                error={formik.touched.percentageCopay && Boolean(formik.errors.percentageCopay)}
                                helperText={formik.touched.percentageCopay && formik.errors.percentageCopay}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                sx={{ padding: '14px 10px', fontSize: '14px' }}
                            >
                                Submit
                            </Button>
                        </form>
                    </Paper>
                </Box>
            </div>
        </Box>
    );
}

export default Human;
