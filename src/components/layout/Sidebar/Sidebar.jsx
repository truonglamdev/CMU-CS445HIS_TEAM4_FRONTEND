import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
export default function Sidebar(data = []) {
    return (
        <div className={cx('wrapper')}>
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
                Dashboard
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
                Human
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
                Payroll
            </NavLink>
        </div>
    );
}
