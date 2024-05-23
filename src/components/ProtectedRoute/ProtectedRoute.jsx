/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ roles, redirect = '/login', children }) {
    if (!roles) {
        return children ? children : <Outlet />;
    }
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if (!user) {
        return <Navigate to={redirect} />;
    }

    const roleUser = user.isAdmin ? 'admin' : 'user';
    const userHasRequiredRole = roles.includes(roleUser);
    console.log(roleUser);
    if (!userHasRequiredRole) {
        return <div>Role not access</div>;
    }

    return children ? children : <Outlet />;
}
