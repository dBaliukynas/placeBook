import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import PropertyRating from "./PropertyRating";
import PropertyReviewCount from "./PropertyReviewCount";
import StarIcon from "./svgs/StarIcon";

const PropertyCard = (props) => {
    const isMobileScreen = useMediaQuery({ query: "(min-width: 650px)" });

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {props.propertyTypes.map((propertyType, index) => (
                <div
                    key={index}
                    className={
                        isMobileScreen
                            ? "card property"
                            : "card property no-margin-right"
                    }
                    style={{ width: "18rem" }}
                >
                    <img
                        src={propertyType.imagePath}
                        className="card-img-top"
                        alt="..."
                    />
                    <div className="card-body" style={{ textAlign: "center" }}>
                        {props.isProperty ? (
                            <>
                                <h5 className="card-title">
                                    {propertyType.name}
                                </h5>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <span>{propertyType.cityName}</span>

                                    <PropertyRating property={props.property} />

                                   <PropertyReviewCount property={props.property} />
                                </div>
                            </>
                        ) : (
                            <h5 className="card-title">
                                {propertyType.cityName}
                            </h5>
                        )}
                        <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </p>
                        {props.isProperty ? (
                            <Link to={`/property/${props.property.id}`}>
                                <button className="btn btn-primary">
                                    Visit
                                </button>
                            </Link>
                        ) : (
                            <Link to="#">
                                <button className="btn btn-primary">
                                    Visit
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PropertyCard;
