import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';
const cx = classNames.bind(styles);
function NotFound() {
    return (
        <div className={cx('not-found-container', 'wrapper')}>
            <h1>404</h1>
            <div>Oops ! Page not found</div>
            <p>
                <a href="/">Return Home</a>
            </p>
        </div>
    );
}

export default NotFound;
