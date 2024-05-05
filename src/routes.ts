import Login from '~/pages/Auth/Login';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Register from '~/pages/Auth/Register';
import Dashboard from '~/pages/Dashboard';
import EmailVerifier from '~/pages/EmailVerifier';
import NotAccess from '~/pages/NotAccess';
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
        roles: ['admin', 'user'],
    },
    {
        path: '/not-access',
        page: NotAccess,
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
