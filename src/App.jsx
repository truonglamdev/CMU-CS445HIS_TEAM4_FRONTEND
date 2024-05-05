import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from './routes';
import DefaultLayout from '~/components/layout/DefaultLayout';
import { Fragment, useEffect, useState } from 'react';
import ProtectedRoute from '~/components/ProtectedRoute';
import { AuthContext } from '~/components/AuthContext/AuthContext';

function App() {
    const [currentUser, setCurrentUser] = useState({ name: 'Taylor' });
    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <>
            <AuthContext.Provider value={currentUser}>
                <Router>
                    <Routes>
                        {routes.map((route) => {
                            const Page = route.page;
                            const Layout = route.isShowHeader ? DefaultLayout : Fragment;
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={
                                        <ProtectedRoute roles={route?.roles}>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </ProtectedRoute>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </>
    );
}

export default App;
