import React, { useEffect } from "react";
import LogoIcon from "../components/svgs/LogoIcon";
import "../../css/About.css";

const About = () => {
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
