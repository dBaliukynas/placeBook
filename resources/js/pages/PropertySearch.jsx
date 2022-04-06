import { React, useEffect, useState } from "react";
import PropertyCardHorizontal from "../components/PropertyCardHorizonal";
import PropertyCardHorizontalPlaceHolder from "../components/PropertyCardHorizontalPlaceholder";
import PropertySearchNavigation from "../components/PropertySearchNavigation";
import Spinner from "../components/Spinner";

const PropertySearch = () => {
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
                    setProperties(data);
                }
            });
    }, []);
    const [properties, setProperties] = useState(undefined);
    return (
        <>
            <div style={{ margin: "auto 50px 50px" }}>
                <aside
                    className="card"
                    style={{
                        maxWidth: "18rem",
                        borderColor: "rgba(0,0,0,.125)",
                        marginRight: "20px",
                        marginTop: "20px",
                        float: "left",
                    }}
                >
                    <div
                        className="card-header bg-transparent"
                        style={{ borderColor: "rgba(0,0,0,.125)" }}
                    >
                        Filters
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Budget</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </p>
                    </div>
                    <div
                        className="card-footer bg-transparent"
                        style={{ borderColor: "rgba(0,0,0,.125)" }}
                    >
                        Footer
                    </div>
                </aside>
                <div
                    className="main-container"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <PropertySearchNavigation />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        {properties
                            ? properties.map((property, index) => (
                                  <div key={index}>
                                      <PropertyCardHorizontal
                                          property={property}
                                      />
                                  </div>
                              ))
                            : Array.from({ length: 10 }, (_, index) => (
                                  <PropertyCardHorizontalPlaceHolder
                                      key={index}
                                  />
                              ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertySearch;
