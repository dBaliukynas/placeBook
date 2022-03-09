import { React, useEffect } from "react";

const PropertyDescription = (props) => {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            className="property-description"
            dangerouslySetInnerHTML={{
                __html: props.property
                    ? props.property.description.replaceAll('\\"', '"')
                    : "",
            }}
        ></div>
    );
};

export default PropertyDescription;
