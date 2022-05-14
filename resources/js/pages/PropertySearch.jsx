import { React, useEffect, useState, useLayoutEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PropertySearchNavigation from "../components/PropertySearchNavigation";
import PropertyCardHorizontal from "../components/cards/PropertyCardHorizontal";
import PropertyCardHorizontalPlaceholder from "../components/cards/PropertyCardHorizontalPlaceholder";
import PropertySearchAsideNavigation from "../components/PropertySearchAsideNavigation";

const PropertySearch = () => {
    const [showBreadcrumb, setShowBreadcrumb] = useOutletContext();
    useLayoutEffect(() => {
        setShowBreadcrumb(true);
    });

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
                <PropertySearchAsideNavigation />
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
                                  <div key={index} style={{ width: "100%" }}>
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
