<<<<<<< HEAD
import Login from './pages/Login';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import EmailVerifier from './pages/EmailConfirm/EmailVerifier';
=======
import Login from '~/pages/Auth/Login';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Register from '~/pages/Auth/Register';
import EmailVerifier from '~/pages/EmailVerifier';
>>>>>>> 28f34bfc70a1cdc78500396e13255be0b99496f4
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
<<<<<<< HEAD
=======
        path: '/user/verify/:id/:token',
        page: EmailVerifier,
    },
    {
>>>>>>> 28f34bfc70a1cdc78500396e13255be0b99496f4
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
