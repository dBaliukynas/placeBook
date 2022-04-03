import React, { useEffect } from "react";
import "../../css/Global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { ToastContainer } from "react-toastify";
import { breadcrumbHandler } from "../utils/breadcrumbHandler";

const Layout = () => {
    const location = useLocation();
    return (
        <>
            <Header></Header>
            {breadcrumbHandler(location) ? (
                <Breadcrumb location={location} />
            ) : (
                <> </>
            )}
            <main>
                <Outlet />
            </main>
            <Footer></Footer>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </>
    );
};

export default Layout;
