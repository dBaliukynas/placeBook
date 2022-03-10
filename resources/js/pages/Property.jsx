import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropertyDescription from "../components/PropertyDescription";
import NotFound from "../components/NotFound";

const Property = () => {
    const { id } = useParams();
    useEffect(() => {
        fetch(`/api/property/${id}`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    setError(response);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data) {
                    setProperty(data);
                }
            });
    }, []);
    const [property, setProperty] = useState(undefined);
    const [error, setError] = useState(undefined);
    if (error?.status == 404) {
        return <NotFound status={error.status} message="Page not found" />;
    }
    return (
        <>
            <div
                className="top-main-container"
                style={{
                    justifyContent: "center",
                    height: "450px",
                    marginBottom: "50px",
                    backgroundImage:
                        "linear-gradient( to bottom, rgba(245, 246, 252, 0.52), rgb(21 19 117 / 73%) ), url(/images/palm.jpg)",
                    backgroundSize: "cover",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginTop: "30px",
                    }}
                >
                    <h1
                        style={{ wordBreak: "break-word", color: "ghostwhite" }}
                    >
                        {property?.name}
                    </h1>
                </div>
                <div
                    style={{ display: "flex", justifyContent: "center" }}
                ></div>
            </div>
            <div
                className="main-container"
                style={{
                    marginTop: "20px",
                    maxWidth: "1500px",
                    padding: "0px 50px 0px 50px",
                }}
            >
                <h1>{property?.name}</h1>
                {property ? (
                    <PropertyDescription property={property} />
                ) : (
                    <> </>
                )}
            </div>
        </>
    );
};

export default Property;
