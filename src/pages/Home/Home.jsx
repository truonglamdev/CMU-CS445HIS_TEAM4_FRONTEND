import Dashboard from '../Dashboard';
import { useContext } from 'react';
import { AuthContext } from '~/components/AuthContext/AuthContext';
import Login from '../Auth/Login';
export default function Home() {
    const currentUser = useContext(AuthContext);
    console.log(currentUser);
    return <div>{currentUser ? <Dashboard /> : <Login />}</div>;
}
