import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RequireAuth from "./components/RequireAuth";
import Redirecting from "./pages/Redirecting";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Property from "./pages/Property";
import PropertyListing from "./pages/PropertyListing";
import PropertySearch from "./pages/PropertySearch";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="about" element={<About />}></Route>

                    <Route
                        path="property-listing"
                        element={
                            <RequireAuth>
                                <PropertyListing />
                            </RequireAuth>
                        }
                    ></Route>

                    <Route
                        path="property-search"
                        element={<PropertySearch />}
                    ></Route>
                    <Route
                        path="profile"
                        element={
                            <RequireAuth>
                                <Profile />
                            </RequireAuth>
                        }
                    ></Route>
                    <Route
                        path="property/:propertyId"
                        element={
                            <RequireAuth>
                                <Property />
                            </RequireAuth>
                        }
                    ></Route>
                </Route>
                <Route path="login" element={<Redirecting />}></Route>
            </Routes>
        </Router>
    );
};

export default Main;

if (document.getElementById("main")) {
    ReactDOM.render(<Main />, document.getElementById("main"));
}
