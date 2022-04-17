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
    const propertyTypes = [
        { city: "Hotel", image_path: "/images/property_type_hotel.png" },
        {
            city: "Apartment",
            image_path: "/images/property_type_apartment.jpg",
        },
        {
            city: "Homestead",
            image_path: "/images/property_type_homestead.jpeg",
        },
        { city: "Motel", image_path: "/images/property_type_motel.jpg" },
        { city: "Villa", image_path: "/images/property_type_villa.jpg" },

        { city: "SSS", image_path: "/images/property_type_hotel.png" },
        {
            city: "SSS",
            image_path: "/images/property_type_apartment.jpg",
        },
        {
            city: "SSS",
            image_path: "/images/property_type_homestead.jpeg",
        },
        { city: "SSS", image_path: "/images/property_type_motel.jpg" },
        { city: "SSS", image_path: "/images/property_type_villa.jpg" },
    ];

    const propertyCities = [
        {
            city: "Vilnius",
            image_path: "/images/property_city_vilnius.jpg",
        },
        {
            city: "Kaunas",
            image_path: "/images/property_city_kaunas.jpg",
        },
        {
            city: "Klaipėda",
            image_path: "/images/property_city_klaipeda.jpg",
        },
        {
            city: "Šiauliai",
            image_path: "/images/property_city_siauliai.jpg",
        },
        {
            city: "Panevėžys",
            image_path: "/images/property_city_panevezys.jpg",
        },

        {
            city: "Palanga",
            image_path: "/images/property_city_palanga.jpg",
        },
        {
            city: "Utena",
            image_path: "/images/property_city_utena.jpg",
        },
        {
            city: "Kėdainiai",
            image_path: "/images/property_city_kedainiai.jpg",
        },
        {
            city: "Anykščiai",
            image_path: "/images/property_city_anyksciai.jpg",
        },
        {
            city: "Marijampolė",
            image_path: "/images/property_city_marijampole.jpg",
        },
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
                <CardCarousel
                    items={propertyTypes}
                    id={0}
                    pageCount={2}
                    itemCount={5}
                />
                <h3>Select a place by your country's city</h3>
                <CardCarousel
                    items={propertyCities}
                    id={1}
                    pageCount={2}
                    itemCount={5}
                />
                <h3>Our users favorite places</h3>

                <CardCarousel
                    items={properties}
                    id={2}
                    pageCount={3}
                    itemCount={5}
                    isProperty={true}
                />
            </div>
        </>
    );
};

export default Home;
