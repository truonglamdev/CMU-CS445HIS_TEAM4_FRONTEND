import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Groups2Icon from '@mui/icons-material/Groups2';
import PaidIcon from '@mui/icons-material/Paid';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useContext } from 'react';
import { AuthContext } from '~/components/AuthContext/AuthContext';

const cx = classNames.bind(styles);

export default function Sidebar(data = []) {
    const currentUser = useContext(AuthContext);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sub-title')}>Main Navigation</div>
            <NavLink
                to={'/dashboard'}
                className={cx('sidebar-item')}
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        fontWeight: isActive ? '500' : '',
                        viewTransitionName: isTransitioning ? 'slide' : '',
                        backgroundColor: isActive ? '#3e99ea' : '',
                    };
                }}
            >
                <DashboardIcon sx={{ fontSize: '20px' }} /> <span>Dashboard</span>
            </NavLink>
            <div>
                {currentUser?.isAdmin ? (
                    <>
                        <NavLink
                            to={'/human'}
                            className={cx('sidebar-item')}
                            style={({ isActive, isPending, isTransitioning }) => {
                                return {
                                    viewTransitionName: isTransitioning ? 'slide' : '',
                                    backgroundColor: isActive ? '#3e99ea' : '',
                                };
                            }}
                        >
                            <Groups2Icon sx={{ fontSize: '20px' }} /> <span>Human</span>
                        </NavLink>
                        {/* <NavLink
                            to={'/payroll'}
                            className={cx('sidebar-item')}
                            style={({ isActive, isPending, isTransitioning }) => {
                                return {
                                    viewTransitionName: isTransitioning ? 'slide' : '',
                                    backgroundColor: isActive ? '#3e99ea' : '',
                                };
                            }}
                        >
                            <PaidIcon sx={{ fontSize: '20px' }} />
                            <span>Payroll</span>
                        </NavLink> */}
                        <NavLink
                            to={'/management'}
                            className={cx('sidebar-item')}
                            style={({ isActive, isPending, isTransitioning }) => {
                                return {
                                    viewTransitionName: isTransitioning ? 'slide' : '',
                                    backgroundColor: isActive ? '#3e99ea' : '',
                                };
                            }}
                        >
                            <Groups2Icon sx={{ fontSize: '20px' }} /> <span>Management</span>
                        </NavLink>
                        <NavLink
                            to={'/payroll'}
                            className={cx('sidebar-item')}
                            style={({ isActive, isPending, isTransitioning }) => {
                                return {
                                    viewTransitionName: isTransitioning ? 'slide' : '',
                                    backgroundColor: isActive ? '#3e99ea' : '',
                                };
                            }}
                        >
                            <SupportAgentIcon sx={{ fontSize: '20px' }} />
                            <span>Customer</span>
                        </NavLink>{' '}
                    </>
                ) : (
                    <></>
                )}
            </div>
            <NavLink
                to={'/notification'}
                className={cx('sidebar-item')}
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        viewTransitionName: isTransitioning ? 'slide' : '',
                        backgroundColor: isActive ? '#3e99ea' : '',
                    };
                }}
            >
                <NotificationsActiveIcon sx={{ fontSize: '20px' }} />
                <span>Notification</span>
            </NavLink>
            <div className={cx('sub-title')}>Setting</div>
            <NavLink
                to={'/payroll'}
                className={cx('sidebar-item')}
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        viewTransitionName: isTransitioning ? 'slide' : '',
                        backgroundColor: isActive ? '#3e99ea' : '',
                    };
                }}
            >
                <SettingsIcon sx={{ fontSize: '20px' }} />
                <span>Setting</span>
            </NavLink>
        </div>
    );
}
