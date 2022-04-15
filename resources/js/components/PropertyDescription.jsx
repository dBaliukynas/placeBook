import { React, useEffect } from "react";

const PropertyDescription = (props) => {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
            className="property-description"
            dangerouslySetInnerHTML={{
                __html: props.descriptionType
                    ? props.descriptionType.description.replaceAll('\\"', '"')
                    : "",
            }}
        ></div>
    );
};

export default PropertyDescription;
