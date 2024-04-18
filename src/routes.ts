import Login from './pages/Login';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import EmailVerifier from './pages/EmailConfirm/EmailVerifier';
const routes = [
    {
        path: '/login',
        page: Login,
        isShowHeader: true,
        isPrivate: true,
        roles: ['admin'],
    },
    {
        path: '/verify',
        page: EmailVerifier,
    },
    {
        path: '/register',
        page: Register,
        isShowHeader: true,
        isPrivate: true,
        roles: ['admin'],
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
