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
                        backgroundColor: isActive ? '#f69d4d' : '',
                    };
                }}
            >
                Dashboard
            </NavLink>
            <NavLink
                to={'/about'}
                className={cx('sidebar-item')}
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        viewTransitionName: isTransitioning ? 'slide' : '',
                        backgroundColor: isActive ? '#f69d4d' : '',
                    };
                }}
            >
                Dashboard
            </NavLink>
            <NavLink
                to={'/home'}
                className={cx('sidebar-item')}
                style={({ isActive, isPending, isTransitioning }) => {
                    return {
                        viewTransitionName: isTransitioning ? 'slide' : '',
                        backgroundColor: isActive ? '#f69d4d' : '',
                    };
                }}
            >
                Dashboard
            </NavLink>
        </div>
    );
}
