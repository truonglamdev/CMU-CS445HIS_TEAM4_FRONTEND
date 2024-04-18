import Login from '~/pages/Auth/Login';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Register from '~/pages/Auth/Register';
import EmailVerifier from '~/pages/EmailVerifier';
const routes = [
    {
        path: '/login',
        page: Login,
        isShowHeader: true,
        isPrivate: true,
        roles: ['admin'],
    },
    {
        path: '/register',
        page: Register,
        isShowHeader: true,
        isPrivate: true,
        roles: ['admin'],
    },
    {
        path: '/user/verify/:id/:token',
        page: EmailVerifier,
    },
    {
        path: '/',
        page: Home,
        isShowHeader: true,
        isPrivate: true,
        roles: ['admin'],
    },

    {
        path: '*',
        page: NotFound,
        isShowHeader: true,
        isPrivate: false,
    },
];

export default routes;
