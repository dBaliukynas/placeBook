import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Property = () => {
    const { id } = useParams();
    useEffect(() => {
        fetch(`/api/property/${id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => setProperty(data))
            .catch(function (err) {
                alert("Fetch Error : ", err);
            });
    }, []);
    const [property, setProperty] = useState(undefined);
    return (
        <div
            className="main-container"
            style={{
                marginTop: "20px",
                maxWidth: "1500px",
                padding: "0px 50px 0px 50px",
            }}
        >
            PROPERTY
            {property?.name}
        </div>
    );
};

export default Property;
