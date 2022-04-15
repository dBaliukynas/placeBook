import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom";
import RequireAuth from "./components/guards/RequireAuth";
import Redirecting from "./pages/Redirecting";
import Layout from "./pages/Layout";
import { routes } from "./utils/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HTTPError from "./components/HTTPError";
import RequireRole from "./components/guards/RequireRole";

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="*"
                        element={
                            <HTTPError status={404} message="Page not found" />
                        }
                    />
                    {routes.map((route, index) =>
                        route.isAuthRequired ? (
                            <Route
                                key={index}
                                exact
                                path={route.path}
                                element={
                                    route.roleRequired ? (
                                        <RequireAuth>
                                            <RequireRole>
                                                <route.component />
                                            </RequireRole>
                                        </RequireAuth>
                                    ) : (
                                        <RequireAuth>
                                            <route.component />
                                        </RequireAuth>
                                    )
                                }
                            />
                        ) : (
                            <Route
                                key={index}
                                exact
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
