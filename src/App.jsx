import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from './routes';
import DefaultLayout from '~/components/layout/DefaultLayout';
import { Fragment } from 'react';
import ProtectedRoute from '~/components/ProtectedRoute';

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
