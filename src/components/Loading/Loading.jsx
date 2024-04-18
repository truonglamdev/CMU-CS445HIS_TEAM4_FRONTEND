import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);
function Loading() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('spin')}></div>
            <span className={cx('loading')}>Loading...</span>
        </div>
    );
}

export default Loading;
