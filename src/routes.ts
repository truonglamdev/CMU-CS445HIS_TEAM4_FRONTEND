 import Login from "./pages/Login";
 import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
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
