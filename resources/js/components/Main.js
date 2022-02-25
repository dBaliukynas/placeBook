import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import PropertyListing from "./PropertyListing";

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
                </Route>
            </Routes>
        </Router>
    );
}

export default Main;

if (document.getElementById("main")) {
    ReactDOM.render(<Main />, document.getElementById("main"));
}
