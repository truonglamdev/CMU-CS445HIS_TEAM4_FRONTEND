import Login from '~/pages/Auth/Login';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Register from '~/pages/Auth/Register';
import Dashboard from '~/pages/Dashboard';
import EmailVerifier from '~/pages/EmailVerifier';

const routes = [
    {
        path: '/login',
        page: Login,
        isShowHeader: true,
    },
    {
        path: '/dashboard',
        page: Dashboard,
        isShowHeader: true,
        roles: ['admin'],
    },

    {
        path: '/register',
        page: Register,
        isShowHeader: true,
    },
    {
        path: '/user/verify/:id/:token',
        page: EmailVerifier,
    },
    {
        path: '/',
        page: Home,
        isShowHeader: true,
    },
    {
        path: '*',
        page: NotFound,
        isShowHeader: true,
    },
];

export default routes;
