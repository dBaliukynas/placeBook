import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import PropertyCard from "../components/PropertyCard";

const Profile = () => {
    const changePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const itemsPerPage = 2;
    const maxPagesShown = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentProperties = authUser.properties.slice(
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

                        <div
                            className="card"
                            style={
                                !authUser.properties ? { width: "200px" } : {}
                            }
                        >
                            <div
                                className="card-body"
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                }}
                            >
                                {currentProperties.map((property, index) => (
                                    <PropertyCard
                                        key={index}
                                        propertyTypes={[
                                            {
                                                imagePath: "/images/hotel.jpg",
                                                cityName: property.city,
                                                name: property.name,
                                            },
                                        ]}
                                        isProperty={true}
                                        propertyId={property.id}
                                    />
                                ))}
                            </div>
                            {authUser.properties.length != 0 ? (
                                <Pagination
                                    itemsLength={authUser.properties.length}
                                    itemsPerPage={itemsPerPage}
                                    changePage={changePage}
                                    currentPage={currentPage}
                                    maxPagesShown={maxPagesShown}
                                />
                            ) : (
                                <span>You have not created any properties yet.</span>
                            )}
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
