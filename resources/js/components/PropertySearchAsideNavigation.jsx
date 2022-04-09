import { useState } from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import "../../css/DoubleRange.css";

const PropertySearchAsideNavigation = (props) => {
    const handlePropertyPriceChange = (value) => {
        setMinPropertyPrice(value[0]);
        setMaxPropertyPrice(value[1]);
        console.log(value);
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

                <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </p>
                <h5 className="card-title">Country</h5>
                <h5 className="card-title">City</h5>
                <h5 className="card-title">Rating</h5>
            </div>
            <div
                className="card-footer bg-transparent"
                style={{ borderColor: "rgba(0,0,0,.125)" }}
            >
                Footer
            </div>
        </aside>
    );
};

export default PropertySearchAsideNavigation;
