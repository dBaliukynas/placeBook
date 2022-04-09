import React, { useEffect, useState } from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import "../../css/DoubleRange.css";
import Search from "./Search";

const PropertySearchAsideNavigation = (props) => {
    const handlePropertyPriceChange = (value) => {
        setMinPropertyPrice(value[0]);
        setMaxPropertyPrice(value[1]);
    };
    const handleMinPropertyPriceChange = (event) => {
        setMinPropertyPrice(event.target.value);
    };
    const handleMaxPropertyPriceChange = (event) => {
        setMaxPropertyPrice(event.target.value);
    };
    const [minPropertyPrice, setMinPropertyPrice] = useState(100);
    const [maxPropertyPrice, setMaxPropertyPrice] = useState(300);
    return (
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
                <h5 className="card-title">Property price</h5>
                <div className="d-flex">
                    <div style={{ width: "40%", marginRight: "auto" }}>
                        <div className="input-group input-group-sm">
                            <span className="input-group-text">€</span>
                            <input
                                type="text"
                                className="form-control"
                                aria-label="Amount (to the nearest euro)"
                                onChange={handleMinPropertyPriceChange}
                                value={minPropertyPrice}
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
                                onChange={handleMaxPropertyPriceChange}
                                value={maxPropertyPrice}
                            />
                        </div>
                        <span>Max</span>
                    </div>
                </div>
                <div className="double-range-wrapper">
                    <Range
                        range
                        allowCross={false}
                        value={[minPropertyPrice, maxPropertyPrice]}
                        min={1}
                        max={1000}
                        step={1}
                        draggableTrack={true}
                        onChange={handlePropertyPriceChange}
                    />
                </div>
                <h5 className="card-title">Country</h5>
                <div className="position-relative">
                    <Search
                        itemType="countries"
                        route="/api/countries"
                        className="form-control form-control-sm property-search-aside-small-input"
                        listClassName="property-search-aside-search-list"
                        type="search"
                        placeholder="Country's name"
                        ariaLabel="Search"
                        localApi={false}
                        mapBoxType="country"
                    />
                </div>

                <h5 className="card-title">City</h5>
                <Search
                    itemType="cities"
                    route="/api/cities"
                    className="form-control form-control-sm property-search-aside-small-input"
                    listClassName="property-search-aside-search-list property-search-aside-small-input"
                    type="search"
                    placeholder="City's name"
                    ariaLabel="Search"
                    localApi={false}
                    mapBoxType="place"
                />

                <h5 className="card-title">Rating</h5>
                <div>
                    {Array.from({ length: 10 }, (_, index) => (
                        <div className="form-check" key={index}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                            >
                                {index + 1}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default PropertySearchAsideNavigation;
