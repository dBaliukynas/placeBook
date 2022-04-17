import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import CardCarousel from "../components/cards/CardCarousel";

const Home = () => {
    const [showBreadcrumb, setShowBreadcrumb] = useOutletContext();
    useLayoutEffect(() => setShowBreadcrumb(false));

    const [properties, setProperties] = useState(undefined);
    useEffect(() => {
        fetch(`/api/properties?sort=favorite`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data) {
                    setProperties(data);
                }
            });
    }, []);
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
    const propertyCitiesMatrix = [
        [
            {
                cityName: "Vilnius",
                imagePath: "/images/property_city_vilnius.jpg",
            },
            {
                cityName: "Kaunas",
                imagePath: "/images/property_city_kaunas.jpg",
            },
            {
                cityName: "Klaipėda",
                imagePath: "/images/property_city_klaipeda.jpg",
            },
            {
                cityName: "Šiauliai",
                imagePath: "/images/property_city_siauliai.jpg",
            },
            {
                cityName: "Panevėžys",
                imagePath: "/images/property_city_panevezys.jpg",
            },
        ],
        [
            {
                cityName: "Palanga",
                imagePath: "/images/property_city_palanga.jpg",
            },
            {
                cityName: "Utena",
                imagePath: "/images/property_city_utena.jpg",
            },
            {
                cityName: "Kėdainiai",
                imagePath: "/images/property_city_kedainiai.jpg",
            },
            {
                cityName: "Anykščiai",
                imagePath: "/images/property_city_anyksciai.jpg",
            },
            {
                cityName: "Marijampolė",
                imagePath: "/images/property_city_marijampole.jpg",
            },
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
                {/* <CardCarousel
                    propertyTypesMatrix={propertyTypesMatrix}
                    id={0}
                />
                <h3>Select a place by your country's city</h3>
                <CardCarousel
                    propertyTypesMatrix={propertyCitiesMatrix}
                   id={1}
                /> */}
                <h3>Our users favorite places</h3>
                {properties && <CardCarousel items={properties} id={2} pageCount={3} />}
            </div>
        </>
    );
};

export default Home;
