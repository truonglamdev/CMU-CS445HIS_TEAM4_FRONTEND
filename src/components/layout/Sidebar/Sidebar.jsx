import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Groups2Icon from '@mui/icons-material/Groups2';
import PaidIcon from '@mui/icons-material/Paid';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
const cx = classNames.bind(styles);

export default function Sidebar(data = []) {
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
                <PaidIcon sx={{ fontSize: '20px' }} />
                <span>Payroll</span>
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
