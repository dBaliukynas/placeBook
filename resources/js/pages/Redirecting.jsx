import React, { useEffect } from "react";
import LogoIcon from "../components/svgs/LogoIcon";

const Redirecting = (props) => {
    useEffect(() => (window.location.href = `/${props.pathName}`));
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
                <LogoIcon />
                <h1>Redirecting...</h1>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Redirecting;
