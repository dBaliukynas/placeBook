import React from "react";
import "../../css/Global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { ToastContainer } from "react-toastify";

const Layout = () => {
    const location = useLocation();
    return (
        <>
            <Header></Header>
            {!location.pathname.match("/property/[0-9]") &&
            location.pathname != "/" ? (
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
