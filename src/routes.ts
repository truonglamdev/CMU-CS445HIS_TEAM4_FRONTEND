import Login from '~/pages/Auth/Login';
import Home from '~/pages/Home';
import NotFound from '~/pages/NotFound';
import Register from '~/pages/Auth/Register';
import Dashboard from '~/pages/Dashboard';
import EmailVerifier from '~/pages/EmailVerifier';
import NotAccess from '~/pages/NotAccess';
import Human from '~/pages/Human';
import Management from '~/pages/Management';
import Notifications from '~/pages/Notifications';
import AddNewEmployee from './pages/AddNewEmployee';
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
        path: '/human',
        page: Human,
        isShowHeader: true,
        roles: ['admin'],
    },
    {
        path: '/management',
        page: Management,
        isShowHeader: true,
        roles: ['admin'],
    },
    {
        path: '/notification',
        page: Notifications,
        isShowHeader: true,
        roles: ['admin', 'user'],
    },
    {
        path: '/create-employee',
        page: AddNewEmployee,
        isShowHeader: true,
        roles: ['admin'],
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
