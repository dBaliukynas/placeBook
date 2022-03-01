import React from "react";
import ReactDOM from "react-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import PropertyListing from "./pages/PropertyListing";
import PropertySearch from "./pages/PropertySearch";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Link,
} from "react-router-dom";

function Main() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="about" element={<About />}></Route>
                    <Route
                        path="property-listing"
                        element={<PropertyListing />}
                    ></Route>
                    <Route
                        path="property-search"
                        element={<PropertySearch />}
                    ></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default Main;

if (document.getElementById("main")) {
    ReactDOM.render(<Main />, document.getElementById("main"));
}
