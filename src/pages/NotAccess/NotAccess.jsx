/* eslint-disable react/no-unescaped-entities */
import classNames from 'classnames/bind';
import styles from './NotAccess.module.scss';
import { SiPrivateinternetaccess } from 'react-icons/si';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function NotAccess() {
    return (
        <div className={cx('wrapper')}>
            <i>
                <SiPrivateinternetaccess />
            </i>
            <h1>No Access</h1>
            <p>Sorry you're not allowed to see this.</p>
            <Link to="/">Go back</Link>
        </div>
    );
}
export default NotAccess;
