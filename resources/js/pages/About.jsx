import React, { useEffect, useLayoutEffect } from "react";
import { useOutletContext } from "react-router";
import LogoIcon from "../components/svgs/LogoIcon";
import "../../css/About.css";

const About = () => {
    const [showBreadcrumb, setShowBreadcrumb] = useOutletContext();
    useLayoutEffect(() => setShowBreadcrumb(true));
 
    return (
        <div className="container about" style={{ marginTop: "20px" }}>
            <div>
                <LogoIcon />
                <h1>placeBook</h1>
                <p>A simple and intuitive booking website.</p>
            </div>
        </div>
    );
};

export default About;
