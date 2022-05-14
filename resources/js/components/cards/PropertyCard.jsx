import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import PropertyRatingValue from "../PropertyRatingValue";
import PropertyReviewCount from "../PropertyReviewCount";

const PropertyCard = (props) => {
    const isMobileScreen = useMediaQuery({ query: "(max-width: 650px)" });

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            <div
                className={
                    !isMobileScreen
                        ? "card property"
                        : "card property no-margin-right"
                }
                style={{ width: "18rem" }}
            >
                <img
                    src={
                        props.isProperty
                            ? props.item.image_path
                                ? `/storage/images/${props.item.image_path}`
                                : "/images/property_image_placeholder.jpg"
                            : props.image_path
                    }
                    className="card-img-top"
                    alt="..."
                />
                <div className="card-body" style={{ textAlign: "center" }}>
                    {props.isProperty ? (
                        <>
                            <h5 className="card-title">{props.item.name}</h5>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span>{props.item.city}</span>

                                <PropertyRatingValue property={props.item} />

                                <PropertyReviewCount property={props.item} />
                            </div>
                        </>
                    ) : (
                        <h5 className="card-title">{props.item.city}</h5>
                    )}
                    <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    {props.isProperty ? (
                        <Link to={`/property/${props.item.id}`}>
                            <button className="btn btn-primary">Visit</button>
                        </Link>
                    ) : (
                        <Link to="#">
                            <button className="btn btn-primary">Visit</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
