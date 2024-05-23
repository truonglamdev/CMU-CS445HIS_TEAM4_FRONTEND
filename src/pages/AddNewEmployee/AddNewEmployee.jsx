import Sidebar from '~/components/layout/Sidebar';
import classNames from 'classnames/bind';
import styles from './AddNewEmployee.module.scss';
import { TextField, Button, Grid, Container, Typography, InputLabel, Select } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormControl, FormHelperText, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import * as request from '~/utils/axiosConfig';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
const generateRandomId = () => Math.floor(Math.random() * 2147483647);
export default function AddNewEmployee() {
    const [allBenefitPlan, setAllBenefitPlan] = useState([]);
    const [allPayRate, setAllPayRate] = useState([]);
    const validationSchema = Yup.object({
        // PERSONAL_ID: Yup.number().required('Required').integer(),
        CURRENT_FIRST_NAME: Yup.string().max(50).required('Required'),
        CURRENT_LAST_NAME: Yup.string().required('Required'),
        CURRENT_MIDDLE_NAME: Yup.string().max(50),
        BIRTH_DATE: Yup.date().required('Required'),
        SOCIAL_SECURITY_NUMBER: Yup.string().max(20).required('Required'),
        DRIVERS_LICENSE: Yup.string().max(50).required('Required'),
        CURRENT_ADDRESS_1: Yup.string().max(255).required('Required'),
        CURRENT_ADDRESS_2: Yup.string().max(255),
        CURRENT_CITY: Yup.string().max(100).required('Required'),
        CURRENT_COUNTRY: Yup.string().max(100).required('Required'),
        CURRENT_ZIP: Yup.number().required('Required').integer(),
        CURRENT_GENDER: Yup.string().max(20).required('Required'),
        CURRENT_PHONE_NUMBER: Yup.string().max(15).required('Required'),
        CURRENT_PERSONAL_EMAIL: Yup.string().email('Invalid email').max(50).required('Required'),
        CURRENT_MARITAL_STATUS: Yup.string().max(50).required('Required'),
        ETHNICITY: Yup.string().max(10).required('Required'),
        SHAREHOLDER_STATUS: Yup.number().required('Required').integer(),
        BENEFIT_PLAN_ID: Yup.number().required('Required').integer(),
        PAY_RATE_ID: Yup.number().required('Required').integer(),
        VACATION_DAYS: Yup.number().required('Required').integer(),
        PAID_TO_DATE: Yup.number().required('Required'),
        PAID_LAST_YEAR: Yup.number().required('Required'),
        SNN: Yup.number().required('Required'),
        PAY_RATE: Yup.number().required('Required').integer(),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await request.get('/view/benefit-plans');
                setAllBenefitPlan(res?.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await request.get('/view/pay-rates');
                setAllPayRate(res?.data);
                console.log(allPayRate[0]['idPay Rates']);
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
                <Container className={cx('container')}>
                    <Typography variant="h4" gutterBottom>
                        Add New Employee
                    </Typography>
                    <Formik
                        initialValues={{
                            PERSONAL_ID: generateRandomId(),
                            CURRENT_FIRST_NAME: '',
                            CURRENT_LAST_NAME: '',
                            CURRENT_MIDDLE_NAME: '',
                            BIRTH_DATE: '',
                            SOCIAL_SECURITY_NUMBER: '',
                            DRIVERS_LICENSE: '',
                            CURRENT_ADDRESS_1: '',
                            CURRENT_ADDRESS_2: '',
                            CURRENT_CITY: '',
                            CURRENT_COUNTRY: '',
                            CURRENT_ZIP: '',
                            CURRENT_GENDER: '',
                            CURRENT_PHONE_NUMBER: '',
                            CURRENT_PERSONAL_EMAIL: '',
                            CURRENT_MARITAL_STATUS: '',
                            ETHNICITY: '',
                            SHAREHOLDER_STATUS: '',
                            BENEFIT_PLAN_ID: '',
                            PAY_RATE_ID: '',
                            VACATION_DAYS: '',
                            PAID_TO_DATE: '',
                            PAID_LAST_YEAR: '',
                            SNN: '',
                            PAY_RATE: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            // Handle form submission
                            try {
                                console.log(values);
                                const response = await request.post('/admin/create-employee', {
                                    ...values,
                                });
                                console.log('check res', response);
                                toast.success(response.message, {
                                    position: 'top-center',
                                });
                            } catch (error) {
                                toast.success(error?.response?.data?.message, {
                                    position: 'top-center',
                                });
                            }
                        }}
                    >
                        {({ errors, touched, handleChange, values }) => (
                            <Form>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6} disable>
                                        <Field
                                            disabled
                                            name="PERSONAL_ID"
                                            as={TextField}
                                            label="Personal ID"
                                            fullWidth
                                            error={touched.PERSONAL_ID && !!errors.PERSONAL_ID}
                                            helperText={touched.PERSONAL_ID && errors.PERSONAL_ID}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="CURRENT_FIRST_NAME"
                                            as={TextField}
                                            label="First Name"
                                            fullWidth
                                            error={touched.CURRENT_FIRST_NAME && !!errors.CURRENT_FIRST_NAME}
                                            helperText={touched.CURRENT_FIRST_NAME && errors.CURRENT_FIRST_NAME}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="CURRENT_LAST_NAME"
                                            as={TextField}
                                            label="Last Name"
                                            fullWidth
                                            error={touched.CURRENT_LAST_NAME && !!errors.CURRENT_LAST_NAME}
                                            helperText={touched.CURRENT_LAST_NAME && errors.CURRENT_LAST_NAME}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="CURRENT_MIDDLE_NAME"
                                            as={TextField}
                                            label="Middle Name"
                                            fullWidth
                                            error={touched.CURRENT_MIDDLE_NAME && !!errors.CURRENT_MIDDLE_NAME}
                                            helperText={touched.CURRENT_MIDDLE_NAME && errors.CURRENT_MIDDLE_NAME}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="BIRTH_DATE"
                                            as={TextField}
                                            label="Birth Date"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            fullWidth
                                            error={touched.BIRTH_DATE && !!errors.BIRTH_DATE}
                                            helperText={touched.BIRTH_DATE && errors.BIRTH_DATE}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="SOCIAL_SECURITY_NUMBER"
                                            as={TextField}
                                            label="Social Security Number"
                                            fullWidth
                                            error={touched.SOCIAL_SECURITY_NUMBER && !!errors.SOCIAL_SECURITY_NUMBER}
                                            helperText={touched.SOCIAL_SECURITY_NUMBER && errors.SOCIAL_SECURITY_NUMBER}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="DRIVERS_LICENSE"
                                            as={TextField}
                                            label="Driver's License"
                                            fullWidth
                                            error={touched.DRIVERS_LICENSE && !!errors.DRIVERS_LICENSE}
                                            helperText={touched.DRIVERS_LICENSE && errors.DRIVERS_LICENSE}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="CURRENT_ADDRESS_1"
                                            as={TextField}
                                            label="Address 1"
                                            fullWidth
                                            error={touched.CURRENT_ADDRESS_1 && !!errors.CURRENT_ADDRESS_1}
                                            helperText={touched.CURRENT_ADDRESS_1 && errors.CURRENT_ADDRESS_1}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="CURRENT_ADDRESS_2"
                                            as={TextField}
                                            label="Address 2"
                                            fullWidth
                                            error={touched.CURRENT_ADDRESS_2 && !!errors.CURRENT_ADDRESS_2}
                                            helperText={touched.CURRENT_ADDRESS_2 && errors.CURRENT_ADDRESS_2}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="CURRENT_CITY"
                                            as={TextField}
                                            label="City"
                                            fullWidth
                                            error={touched.CURRENT_CITY && !!errors.CURRENT_CITY}
                                            helperText={touched.CURRENT_CITY && errors.CURRENT_CITY}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="CURRENT_COUNTRY"
                                            as={TextField}
                                            label="Country"
                                            fullWidth
                                            error={touched.CURRENT_COUNTRY && !!errors.CURRENT_COUNTRY}
                                            helperText={touched.CURRENT_COUNTRY && errors.CURRENT_COUNTRY}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="CURRENT_ZIP"
                                            as={TextField}
                                            label="ZIP Code"
                                            fullWidth
                                            error={touched.CURRENT_ZIP && !!errors.CURRENT_ZIP}
                                            helperText={touched.CURRENT_ZIP && errors.CURRENT_ZIP}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl
                                            fullWidth
                                            error={touched.BENEFIT_PLAN_ID && !!errors.BENEFIT_PLAN_ID}
                                        >
                                            <InputLabel>CURRENT_GENDER</InputLabel>
                                            <Select
                                                name="CURRENT_GENDER"
                                                value={values.CURRENT_GENDER}
                                                onChange={handleChange}
                                                sx={{ display: 'flex', gap: '40px' }}
                                            >
                                                <MenuItem key={'Nam'} value={'Nam'}>
                                                    NAM
                                                </MenuItem>
                                                <MenuItem key={'Nữ'} value={'Nữ'}>
                                                    NỮ
                                                </MenuItem>
                                                <MenuItem key={'Khác'} value={'Khác'}>
                                                    KHÁC
                                                </MenuItem>
                                                {touched.CURRENT_GENDER && errors.CURRENT_GENDER && (
                                                    <FormHelperText>{errors.CURRENT_GENDER}</FormHelperText>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="CURRENT_PHONE_NUMBER"
                                            as={TextField}
                                            label="Phone Number"
                                            fullWidth
                                            error={touched.CURRENT_PHONE_NUMBER && !!errors.CURRENT_PHONE_NUMBER}
                                            helperText={touched.CURRENT_PHONE_NUMBER && errors.CURRENT_PHONE_NUMBER}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="CURRENT_PERSONAL_EMAIL"
                                            as={TextField}
                                            label="Personal Email"
                                            fullWidth
                                            error={touched.CURRENT_PERSONAL_EMAIL && !!errors.CURRENT_PERSONAL_EMAIL}
                                            helperText={touched.CURRENT_PERSONAL_EMAIL && errors.CURRENT_PERSONAL_EMAIL}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="CURRENT_MARITAL_STATUS"
                                            as={TextField}
                                            label="Marital Status"
                                            fullWidth
                                            error={touched.CURRENT_MARITAL_STATUS && !!errors.CURRENT_MARITAL_STATUS}
                                            helperText={touched.CURRENT_MARITAL_STATUS && errors.CURRENT_MARITAL_STATUS}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="ETHNICITY"
                                            as={TextField}
                                            label="Ethnicity"
                                            fullWidth
                                            error={touched.ETHNICITY && !!errors.ETHNICITY}
                                            helperText={touched.ETHNICITY && errors.ETHNICITY}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl
                                            fullWidth
                                            error={touched.BENEFIT_PLAN_ID && !!errors.BENEFIT_PLAN_ID}
                                        >
                                            <InputLabel>Shareholder status</InputLabel>
                                            <Select
                                                name="SHAREHOLDER_STATUS"
                                                value={values.SHAREHOLDER_STATUS}
                                                onChange={handleChange}
                                                sx={{ display: 'flex', gap: '40px' }}
                                            >
                                                <MenuItem key={0} value={0}>
                                                    NO
                                                </MenuItem>
                                                <MenuItem key={1} value={1}>
                                                    YES
                                                </MenuItem>
                                                {touched.BENEFIT_PLAN_ID && errors.SHAREHOLDER_STATUS && (
                                                    <FormHelperText>{errors.SHAREHOLDER_STATUS}</FormHelperText>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl
                                            fullWidth
                                            error={touched.BENEFIT_PLAN_ID && !!errors.BENEFIT_PLAN_ID}
                                        >
                                            <InputLabel>Benefit Plan ID</InputLabel>
                                            <Select
                                                name="BENEFIT_PLAN_ID"
                                                value={values.BENEFIT_PLAN_ID}
                                                onChange={handleChange}
                                                sx={{ display: 'flex', gap: '40px' }}
                                            >
                                                {allBenefitPlan.map((option) => (
                                                    <MenuItem
                                                        key={option.BENEFIT_PLANS_ID}
                                                        value={option.BENEFIT_PLANS_ID}
                                                    >
                                                        {option.PLAN_NAME}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {touched.BENEFIT_PLAN_ID && errors.BENEFIT_PLAN_ID && (
                                                <FormHelperText>{errors.BENEFIT_PLAN_ID}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth error={touched.PAY_RATE_ID && !!errors.PAY_RATE_ID}>
                                            <InputLabel>Pay Rate ID</InputLabel>
                                            <Select
                                                name="PAY_RATE_ID"
                                                value={values.PAY_RATE_ID}
                                                onChange={handleChange}
                                                sx={{ display: 'flex', gap: '40px' }}
                                            >
                                                {allPayRate.map((option) => (
                                                    <MenuItem key={option['idPay Rates']} value={option['idPay Rates']}>
                                                        {option[`Pay Rate Name`]}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {touched.BENEFIT_PLAN_ID && errors.PAY_RATE_ID && (
                                                <FormHelperText>{errors.PAY_RATE_ID}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="VACATION_DAYS"
                                            as={TextField}
                                            label="Vacation Days"
                                            fullWidth
                                            error={touched.VACATION_DAYS && !!errors.VACATION_DAYS}
                                            helperText={touched.VACATION_DAYS && errors.VACATION_DAYS}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="SNN"
                                            as={TextField}
                                            label="SNN"
                                            fullWidth
                                            error={touched.SNN && !!errors.SNN}
                                            helperText={touched.SNN && errors.SNN}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="PAY_RATE"
                                            as={TextField}
                                            label="PAY_RATE"
                                            fullWidth
                                            error={touched.PAY_RATE && !!errors.PAY_RATE}
                                            helperText={touched.PAY_RATE && errors.PAY_RATE}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="PAID_TO_DATE"
                                            as={TextField}
                                            label="Paid To Date"
                                            fullWidth
                                            error={touched.PAID_TO_DATE && !!errors.PAID_TO_DATE}
                                            helperText={touched.PAID_TO_DATE && errors.PAID_TO_DATE}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="PAID_LAST_YEAR"
                                            as={TextField}
                                            label="Paid Last Year"
                                            fullWidth
                                            error={touched.PAID_LAST_YEAR && !!errors.PAID_LAST_YEAR}
                                            helperText={touched.PAID_LAST_YEAR && errors.PAID_LAST_YEAR}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ marginTop: '20px' }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            sx={{ padding: '6px 14px' }}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </div>
        </div>
    );
}
