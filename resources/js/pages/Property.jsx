import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropertyDescription from "../components/PropertyDescription";
import NotFound from "../components/NotFound";
import Star from "../components/Star";
import { unset } from "lodash-es";

const Property = () => {
    const { id } = useParams();
    useEffect(() => {
        fetch(`/api/property/${id}`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    setError(response);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data) {
                    setProperty(data);
                }
            });
    }, []);
    const [property, setProperty] = useState(undefined);
    const [error, setError] = useState(undefined);
    if (error?.status == 404) {
        return <NotFound status={error.status} message="Page not found" />;
    }
    return (
        <>
            <div
                className="top-main-container"
                style={{
                    justifyContent: "center",
                    height: "450px",
                    marginBottom: "unset",
                    backgroundImage:
                        "linear-gradient( to bottom, rgba(245, 246, 252, 0.52), rgb(21 19 117 / 73%) ), url(/images/palm.jpg)",
                    backgroundSize: "cover",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginTop: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        textShadow: "black 2px 0px 5px",
                    }}
                >
                    <h1
                        style={{
                            wordBreak: "break-word",
                            color: "ghostwhite",
                            marginBottom: "50px",
                        }}
                    >
                        {property?.name}
                    </h1>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ marginRight: "20px" }}>
                            <h3 style={{ color: "ghostwhite" }}>City</h3>
                            <h2 style={{ color: "ghostwhite" }}>Vilnius</h2>
                        </div>
                        <div className="property-vertical-line"></div>
                        <div style={{ marginRight: "20px" }}>
                            <h3 style={{ color: "ghostwhite" }}>Type</h3>
                            <h2 style={{ color: "ghostwhite" }}>Hotel</h2>
                        </div>
                        <div className="property-vertical-line"></div>
                        <div style={{ marginRight: "20px" }}>
                            <Star />
                            <h2
                                style={{
                                    color: "ghostwhite",
                                }}
                            >
                                10 / 10
                            </h2>
                            <h5 style={{ color: "ghostwhite" }}>154 voters</h5>
                        </div>
                        <div className="property-vertical-line"></div>
                        <div style={{ marginRight: "20px" }}>
                            <h3
                                style={{
                                    color: "ghostwhite",
                                }}
                            >
                                Price starting from
                            </h3>
                            <h2 style={{ color: "ghostwhite" }}>300€</h2>
                        </div>
                        <div className="property-vertical-line"></div>
                        <div style={{ marginRight: "20px" }}>
                            <h3 style={{ color: "ghostwhite" }}>
                                Currently available rooms
                            </h3>
                            <h2 style={{ color: "ghostwhite" }}>6</h2>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="breadcrumb" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Property
                    </li>
                </ol>
            </nav>
            <div
                className="main-container"
                style={{
                    marginTop: "20px",
                    maxWidth: "1500px",
                    padding: "0px 50px 0px 50px",
                }}
            >
                <h1>{property?.name}</h1>
                {property ? (
                    <PropertyDescription property={property} />
                ) : (
                    <> </>
                )}
            </div>
        </>
    );
};

export default Property;
