import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import routes from "./routes";
import DefaultLayout from "./components/layout/DefaultLayout/DefaultLayout";
import { Fragment } from "react";

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
                  <Layout>
                    <Page />
                  </Layout>
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
