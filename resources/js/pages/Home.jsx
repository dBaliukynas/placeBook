import React from "react";
import { Link } from "react-router-dom";
import CardCarousel from "../components/CardCarousel";

const Home = () => {
    const propertyTypesMatrix = [
        [
            { cityName: "Hotel", imagePath: "/images/property_type_hotel.png" },
            {
                cityName: "Apartment",
                imagePath: "/images/property_type_apartment.jpg",
            },
            {
                cityName: "Homestead",
                imagePath: "/images/property_type_homestead.jpeg",
            },
            { cityName: "Motel", imagePath: "/images/property_type_motel.jpg" },
            { cityName: "Villa", imagePath: "/images/property_type_villa.jpg" },
        ],
        [
            { cityName: "SSS", imagePath: "/images/property_type_hotel.png" },
            {
                cityName: "SSS",
                imagePath: "/images/property_type_apartment.jpg",
            },
            {
                cityName: "SSS",
                imagePath: "/images/property_type_homestead.jpeg",
            },
            { cityName: "SSS", imagePath: "/images/property_type_motel.jpg" },
            { cityName: "SSS", imagePath: "/images/property_type_villa.jpg" },
        ],
    ];
    return (
        <>
            <div className="top-main-container">
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <h1 className="top-main-container-text1">
                        Browse places to rent...
                    </h1>
                    <h2 className="top-main-container-text2">or lease them </h2>
                </div>
                <div className="top-card-wrapper">
                    <div
                        className="card"
                        style={{
                            borderTopRightRadius: "unset",
                            borderBottomRightRadius: "unset",
                        }}
                    >
                        <div
                            className="card-body"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            <div>
                                <h5 className="card-title">Search property</h5>
                                <p className="card-text">
                                    Search a property to rent!
                                </p>
                                <Link
                                    to="/property-search"
                                    className="btn btn-primary"
                                    style={{ marginTop: "12px" }}
                                >
                                    Search
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div
                        className="card"
                        style={{
                            borderLeft: "unset",
                            borderTopLeftRadius: "unset",
                            borderBottomLeftRadius: "unset",
                        }}
                    >
                        <div
                            className="card-body"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            <div>
                                <h5 className="card-title">Lease property</h5>
                                <p className="card-text">
                                    List a property that you want to lease!
                                </p>
                                <Link
                                    to="/property-listing"
                                    className="btn btn-primary"
                                    style={{ marginTop: "12px" }}
                                >
                                    Create listing
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-container">
                <h3>Select a place by group</h3>
                <CardCarousel propertyTypesMatrix={propertyTypesMatrix} id={0} />
                <h3>Select a place by your country's city</h3>
                <CardCarousel propertyTypesMatrix={propertyTypesMatrix} id={1} />
                <h3>Our users favorite places</h3>
                <CardCarousel propertyTypesMatrix={propertyTypesMatrix} id={2} />
            </div>
        </>
    );
};

export default Home;
