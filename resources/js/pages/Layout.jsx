import React from "react";
import "./../../css/Global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header></Header>
            <main>
                <Outlet />
            </main>
            {console.log(window.location.pathname)}
            {authUser != null ||
            (window.location.pathname != "/property-listing" &&
                authUser == null) ? (
                <Footer></Footer>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default Layout;
