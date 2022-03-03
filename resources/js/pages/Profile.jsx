import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const Profile = () => {
    return (
        <div
            className="main-container"
            style={{
                marginTop: "20px",
                maxWidth: "1500px",
                padding: "0px 50px 0px 50px",
            }}
        >
            <div style={{ textAlign: "start" }}>
                <h1>{authUser.name}</h1>
                <div className="card">
                    <div className="card-body">
                        <h5>Created properties</h5>
                        <div className="card" style={{ width: "200px" }}>
                            <div className="card-body"></div>
                        </div>
                        <h5>Rated properties</h5>
                        <div className="card" style={{ width: "200px" }}>
                            <div className="card-body"></div>
                        </div>
                        <h5>Checkout history</h5>
                        <div className="card" style={{ width: "200px" }}>
                            <div className="card-body"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
