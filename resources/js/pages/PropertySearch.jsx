import { React, useEffect, useState } from "react";
import PropertySearchNavigation from "../components/PropertySearchNavigation";
import PropertyCardHorizontal from "../components/PropertyCardHorizontal";
import PropertyCardHorizontalPlaceholder from "../components/PropertyCardHorizontalPlaceholder";
import Range from "rc-slider";
import "rc-slider/assets/index.css";

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
    const handleMinPropertyPriceChange = (event) => {
        setMinPropertyPrice(event.target.value);
    };
    const handleMaxPropertyPriceChange = (event) => {
        setMaxPropertyPrice(event.target.value);
    };
    const [properties, setProperties] = useState(undefined);
    const [minPropertyPrice, setMinPropertyPrice] = useState(300);
    const [maxPropertyPrice, setMaxPropertyPrice] = useState(1000);
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
                        <div className="d-flex">
                            <div style={{ width: "40%", marginRight: "auto" }}>
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text">€</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Amount (to the nearest euro)"
                                        // value={minPropertyPrice}
                                    />
                                </div>
                                <span>Min</span>
                            </div>
                            <div style={{ width: "40%" }}>
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text">€</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="Amount (to the nearest euro)"
                                        // value={maxPropertyPrice}
                                    />
                                </div>
                                <span>Max</span>
                            </div>
                        </div>
                        <div className="double-range-wrapper">
                            <Range
                                range
                                allowCross={false}
                                defaultValue={[0, 20]}
                                draggableTrack={true}
                            />
                        </div>
                        {/* <div className="property-price-range-wrapper">
                            <div
                                style={{
                                    height: "8px",
                                    left: "25%",
                                    right: "25%",
                                    position: "absolute",
                                    borderRadius: "5px",
                                    backgroundColor: "#4892ff",
                                    pointerEvents: "none",
                                }}
                            >
                                {" "}
                            </div>
                            <input
                                type="range"
                                className="form-range"
                                min={0}
                                max={1000}
                                step={1}
                                value={minPropertyPrice}
                                onChange={handleMinPropertyPriceChange}
                            ></input>
                            <input
                                style={{ position: "absolute" }}
                                type="range"
                                className="form-range"
                                min={0}
                                max={1000}
                                step={1}
                                value={maxPropertyPrice}
                                onChange={handleMaxPropertyPriceChange}
                            ></input>
                        </div> */}
                        <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </p>
                        <h5 className="card-title">Country</h5>
                        <h5 className="card-title">City</h5>
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
                                  <PropertyCardHorizontalPlaceholder
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
