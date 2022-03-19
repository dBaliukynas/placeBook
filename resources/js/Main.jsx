import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RequireAuth from "./components/RequireAuth";
import Redirecting from "./pages/Redirecting";
import Layout from "./pages/Layout";
import NotFound from "./components/NotFound";
import RoutesForBreadcrumb from "./components/RoutesForBreadcrumb";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="*"
                        element={
                            <NotFound status={404} message="Page not found" />
                        }
                    />
                    {RoutesForBreadcrumb().map((route, index) =>
                        route.isAuthRequired ? (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <RequireAuth>{<route.component />}</RequireAuth>
                                }
                            />
                        ) : (
                            <Route
                            key={index}
                                path={route.path}
                                element={<route.component />}
                            />
                        )
                    )}
                </Route>
                <Route
                    path="login"
                    element={<Redirecting pathName="login" />}
                ></Route>
                <Route
                    path="register"
                    element={<Redirecting pathName="register" />}
                ></Route>
            </Routes>
        </Router>
    );
};

export default Main;

if (document.getElementById("main")) {
    ReactDOM.render(<Main />, document.getElementById("main"));
}
