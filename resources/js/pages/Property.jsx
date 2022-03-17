import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropertyDescription from "../components/PropertyDescription";
import NotFound from "../components/NotFound";
import Star from "../components/Star";
import { useMediaQuery } from "react-responsive";

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
    const isMobileScreen = useMediaQuery({ query: "(min-width: 650px)" });
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
                        "linear-gradient( to bottom, rgba(245, 246, 252, 0.52), rgb(21 19 117 / 73%) ), url(/images/hotel.jpg)",
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

                    {isMobileScreen ? (
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
                                <h5 style={{ color: "ghostwhite" }}>
                                    154 voters
                                </h5>
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
                    ) : (
                        <> </>
                    )}
                    <div>
                        <button className="btn btn-outline-light rent-button">
                            Rent this place
                        </button>
                    </div>
                </div>
            </div>
            <nav
                className="breadcrumb breadcrumb-property"
                aria-label="breadcrumb"
            >
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Property
                    </li>
                </ol>
            </nav>
            <ul
                className="list-group list-group-horizontal"
                style={{
                    height: "70px",
                    textAlign: "center",
                    fontSize: "18px",
                }}
            >
                <button
                    type="button"
                    className="list-group-item list-group-item-action"
                >
                    Property
                </button>
                <button
                    type="button"
                    className="list-group-item list-group-item-action"
                >
                    Rent
                </button>
                <button
                    type="button"
                    className="list-group-item list-group-item-action"
                >
                    Reviews
                </button>
            </ul>
            <div
                className="main-container"
                style={{
                    marginTop: "20px",
                    maxWidth: "1500px",
                    padding: "0px 50px 0px 50px",
                }}
            >
                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                    style={{ marginBottom: "50px" }}
                >
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="/images/hotel.jpg"
                                className="d-block w-100 property-photo"
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="/images/hotel.jpg"
                                className="d-block w-100 property-photo"
                                alt="..."
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                src="/images/hotel.jpg"
                                className="d-block w-100 property-photo"
                                alt="..."
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {property ? (
                    <div className="card">
                        <div className="card-body">
                            <h1>{property.name}</h1>
                            <PropertyDescription property={property} />
                        </div>
                    </div>
                ) : (
                    <> </>
                )}
            </div>
        </>
    );
};

export default Property;
