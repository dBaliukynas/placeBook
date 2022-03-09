import React, { useEffect } from "react";
import Logo from "../components/Logo";
import "../../css/About.css";

const About = () => {
    return (
        <div className="container about" style={{ marginTop: "20px" }}>
            <div>
                <Logo />
                <h1>placeBook</h1>
                <p>A simple and intuitive booking website.</p>
            </div>
        </div>
    );
};

export default About;
