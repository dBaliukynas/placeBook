import React, { useEffect, useState } from "react";
import "../../css/Global.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet, useLocation} from "react-router-dom";
import Breadcrumb from "../components/layout/Breadcrumb";
import { ToastContainer } from "react-toastify";

const Layout = () => {
    const [showBreadcrumb, setShowBreadcrumb] = useState(true);

    const location = useLocation();
    return (
        <>
            <Header />
            {showBreadcrumb && <Breadcrumb location={location} />}

            <main>
                <Outlet context={[showBreadcrumb, setShowBreadcrumb]} />
            </main>
            <Footer />
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
