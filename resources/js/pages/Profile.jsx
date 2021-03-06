import React, { useEffect, useState, useLayoutEffect } from "react";
import { useOutletContext } from "react-router";
import Pagination from "../components/Pagination";
import PropertyCard from "../components/cards/PropertyCard";
import Spinner from "../components/Spinner";

const Profile = () => {
    const [showBreadcrumb, setShowBreadcrumb] = useOutletContext();
    useLayoutEffect(() => setShowBreadcrumb(true));
    useEffect(() => {
        fetch(`/api/properties`, {
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
                    setProperties(
                        data.filter(
                            (property) => property.author_id == authUser.id
                        )
                    );
                }
            });
    }, []);

    const changePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const [properties, setProperties] = useState(undefined);

    const itemsPerPage = 5;
    const maxPagesShown = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentProperties = properties?.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    return (
        <div
            className="main-container"
            style={{
                marginTop: "20px",
                maxWidth: "1700px",
                padding: "0px 50px 0px 50px",
            }}
        >
            <div style={{ textAlign: "start" }}>
                <h1>{authUser.name}</h1>
                <div className="card">
                    <div className="card-body">
                        <h5>Created properties</h5>

                        <div className="card">
                            <div
                                className="card-body"
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                }}
                            >
                                {properties ? (
                                    currentProperties.map((property, index) => (
                                        <PropertyCard
                                            key={index}
                                            isProperty={true}
                                            item={property}
                                        />
                                    ))
                                ) : (
                                    <Spinner color="text-primary" />
                                )}
                            </div>
                            {properties ? (
                                properties.length != 0 ? (
                                    <Pagination
                                        itemsLength={properties.length}
                                        itemsPerPage={itemsPerPage}
                                        changePage={changePage}
                                        currentPage={currentPage}
                                        maxPagesShown={maxPagesShown}
                                    />
                                ) : (
                                    <span
                                        style={{
                                            padding: "0px 0px 32px 0px",
                                            margin: "auto",
                                        }}
                                    >
                                        You have not created any properties yet.
                                    </span>
                                )
                            ) : (
                                <></>
                            )}
                        </div>

                        {/* <h5>Rated properties</h5>
                        <div className="card">
                            <div className="card-body"></div>
                        </div>
                        <h5>Checkout history</h5>
                        <div className="card">
                            <div className="card-body"></div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
