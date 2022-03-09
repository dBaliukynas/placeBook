import React, { useEffect } from "react";
import Logo from "../components/Logo";

const Redirecting = () => {
    useEffect(() => (window.location.href = "/login"));
    return (
        <div
            className="main-container"
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div>
                <Logo />
                <h1>Redirecting...</h1>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Redirecting;
