import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import PropertyDescription from "../components/PropertyDescription";
import NotFound from "../components/NotFound";
import StarIcon from "../components/svgs/StarIcon";
import { useMediaQuery } from "react-responsive";
import HouseIcon from "../components/svgs/HouseIcon";
import EuroBanknoteIcon from "../components/svgs/EuroBanknoteIcon";
import LetterIcon from "../components/svgs/LetterIcon";
import PinIcon from "../components/svgs/PinIcon";
import CountryIcon from "../components/svgs/CountryIcon";
import CityIcon from "../components/svgs/CityIcon";
import RegionIcon from "../components/svgs/RegionIcon";
import NumbersIcon from "../components/svgs/NumbersIcon";
import Breadcrumb from "../components/Breadcrumb";

const Property = (props) => {
    const { id } = useParams();
    const location = useLocation();
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
                                <h2 style={{ color: "ghostwhite" }}>
                                    {property?.city}
                                </h2>
                            </div>
                            <div className="property-vertical-line"></div>
                            <div style={{ marginRight: "20px" }}>
                                <h3 style={{ color: "ghostwhite" }}>Type</h3>
                                <h2 style={{ color: "ghostwhite" }}>
                                    {property?.type}
                                </h2>
                            </div>
                            <div className="property-vertical-line"></div>
                            <div style={{ marginRight: "20px" }}>
                                <StarIcon />
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
                                <h2 style={{ color: "ghostwhite" }}>
                                    {property?.price}€
                                </h2>
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
            <Breadcrumb location={location} />
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
                    <>
                        <div className="card">
                            <div className="card-body">
                                <h1>{property.name}</h1>
                                <PropertyDescription property={property} />
                            </div>
                        </div>
                        <div className="card">
                            <div
                                className="card-body"
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                }}
                            >
                                <div className="property-info-bottom">
                                    <LetterIcon />
                                    <strong>Name</strong> {property.name}
                                </div>
                                <div className="property-info-bottom">
                                    <EuroBanknoteIcon />
                                    <strong>Price starting from</strong>
                                    {property.price}€
                                </div>
                                <div className="property-info-bottom">
                                    <HouseIcon />
                                    <strong>Type</strong> {property.type}
                                </div>
                                <div className="property-info-bottom">
                                    <PinIcon />
                                    <strong>Address</strong> {property.address}
                                </div>
                                <div className="property-info-bottom">
                                    <CountryIcon />
                                    <strong>Country</strong> {property.country}
                                </div>
                                <div className="property-info-bottom">
                                    <CityIcon />
                                    <strong>City</strong> {property.city}
                                </div>

                                {property.region ? (
                                    <div className="property-info-bottom">
                                        <RegionIcon />
                                        <strong>Region</strong>{" "}
                                        {property.region}
                                    </div>
                                ) : (
                                    <> </>
                                )}

                                {property.postcode ? (
                                    <div className="property-info-bottom">
                                        <NumbersIcon />
                                        <strong>Postcode</strong>{" "}
                                        {property.postcode}
                                    </div>
                                ) : (
                                    <> </>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <> </>
                )}
            </div>
        </>
    );
};

export default Property;
