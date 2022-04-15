import React, { useEffect } from "react";
import "../../css/Global.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumb from "../components/layout/Breadcrumb";
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
