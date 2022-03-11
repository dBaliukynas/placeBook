import React from "react";
import PropertySearchNavigation from "../components/PropertySearchNavigation";

const PropertySearch = () => {
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
                    <div style={{ display: "flex" }}>
                        <div className="list-group" style={{ width: "100%" }}>
                            <a
                                href="#"
                                className="list-group-item list-group-item-action"
                                aria-current="true"
                                style={{ marginBottom: "20px" }}
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">
                                        List group item heading
                                    </h5>
                                    <small>3 days ago</small>
                                </div>
                                <p className="mb-1">
                                    Some placeholder content in a paragraph.
                                </p>
                                <small>And some small print.</small>
                            </a>
                            <a
                                href="#"
                                className="list-group-item list-group-item-action"
                                aria-current="true"
                                style={{ marginBottom: "20px" }}
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">
                                        List group item heading
                                    </h5>
                                    <small>3 days ago</small>
                                </div>
                                <p className="mb-1">
                                    Some placeholder content in a paragraph.
                                </p>
                                <small>And some small print.</small>
                            </a>
                            <a
                                href="#"
                                className="list-group-item list-group-item-action"
                                aria-current="true"
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">
                                        List group item heading
                                    </h5>
                                    <small>3 days ago</small>
                                </div>
                                <p className="mb-1">
                                    Some placeholder content in a paragraph.
                                </p>
                                <small>And some small print.</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertySearch;
