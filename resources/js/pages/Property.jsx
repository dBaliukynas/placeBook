import React, { useState, useEffect, useLayoutEffect } from "react";
import {
    useParams,
    useNavigate,
    useLocation,
    Link,
    useOutletContext,
} from "react-router-dom";
import { toast } from "react-toastify";
import defaultFetchOptions from "../components/fetch-options/defaultFetchOptions";
import PropertyDescription from "../components/PropertyDescription";
import StarIcon from "../components/svgs/StarIcon";
import { useMediaQuery } from "react-responsive";
import HouseIcon from "../components/svgs/HouseIcon";
import EuroBanknoteIcon from "../components/svgs/EuroBanknoteIcon";
import LetterIcon from "../components/svgs/LetterIcon";
import PinIcon from "../components/svgs/PinIcon";
import CountryIcon from "../components/svgs/CountryIcon";
import CityIcon from "../components/svgs/CityIcon";
import RegionIcon from "../components/svgs/RegionIcon";
import NumbersIcon from "../components/svgs/NumbersIcon";
import Breadcrumb from "../components/layout/Breadcrumb";
import Spinner from "../components/Spinner";
import Rent from "../components/Rent";
import ReviewsContainer from "../components/ReviewsContainer";
import HTTPError from "../components/HTTPError";
import VerticallyCenteredModal from "../components/modals/VerticallyCenteredModal";

const Property = (props) => {
    const navigate = useNavigate();
    const [showBreadcrumb, setShowBreadcrumb] = useOutletContext();
    useLayoutEffect(() => setShowBreadcrumb(false));
    const { id } = useParams();
    const location = useLocation();
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
    }, [id]);
    const isMobileScreen = useMediaQuery({ query: "(max-width: 650px)" });
    const [property, setProperty] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [mainContent, setMainContent] = useState({ name: "Property" });
    const [propertyDeleteName, setPropertyDeleteName] = useState("");
    const [isBeingDeleted, setIsBeingDeleted] = useState(false);
    if (error?.status == 404) {
        return <HTTPError status={error.status} message="Page not found" />;
    }
    const handleMainContentChange = (name, component) => {
        setMainContent({ name, component });
    };
    const handlePropertyDeleteNameChange = (event) => {
        setPropertyDeleteName(event.target.value);
    };
    const deleteProperty = () => {
        setIsBeingDeleted(true);
        const toastId = toast("Deleting a property...", { isLoading: true });
        fetch(`/api/property/${id}`, {
            method: "DELETE",
            ...defaultFetchOptions,
        })
            .then((response) => {
                if (!response.ok) {
                } else {
                    return response.json();
                }
            })
            .then(() => {
                toast.update(toastId, {
                    render: "Property has been successfully deleted.",
                    type: "success",
                    autoClose: 5000,
                    isLoading: false,
                });
                navigate("/property-search");
            });
    };
    return (
        <>
            <div
                className="top-main-container"
                style={{
                    textAlign: "center",
                    justifyContent: "center",
                    height: "450px",
                    marginBottom: "unset",
                    backgroundImage: `linear-gradient( to bottom, rgba(245, 246, 252, 0.52), rgb(21 19 117 / 73%) ), url(${
                        property?.image_path
                            ? `/storage/images/${property?.image_path}`
                            : "/images/property_image_placeholder.jpg"
                    } )`,
                    backgroundSize: "cover",
                }}
            >
                {property ? (
                    <div
                        style={{
                            marginTop: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            textShadow: "black 2px 0px 5px",
                        }}
                    >
                        <h1
                            style={{
                                wordBreak: "break-word",
                                color: "ghostwhite",
                                marginBottom: "50px",
                            }}
                        >
                            {property?.name}
                        </h1>

                        {!isMobileScreen ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                }}
                            >
                                <div style={{ marginRight: "20px" }}>
                                    <h3 style={{ color: "ghostwhite" }}>
                                        City
                                    </h3>

                                    <h2 style={{ color: "ghostwhite" }}>
                                        {property?.city}
                                    </h2>
                                </div>
                                <div className="property-vertical-line"></div>
                                <div style={{ marginRight: "20px" }}>
                                    <h3 style={{ color: "ghostwhite" }}>
                                        Type
                                    </h3>
                                    <h2 style={{ color: "ghostwhite" }}>
                                        {property?.type}
                                    </h2>
                                </div>
                                <div className="property-vertical-line"></div>
                                <div style={{ marginRight: "20px" }}>
                                    <StarIcon
                                        stroke="#f8f8ff"
                                        width="50"
                                        height="50"
                                    />
                                    <h2
                                        style={{
                                            color: "ghostwhite",
                                        }}
                                    >
                                        {property.rating ? (
                                            <>
                                                <span>
                                                    {property.rating}/10{" "}
                                                </span>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </h2>
                                    <h5 style={{ color: "ghostwhite" }}>
                                        {property.review_count ? (
                                            <>
                                                <span>
                                                    {property.review_count}{" "}
                                                    reviews
                                                </span>
                                            </>
                                        ) : (
                                            <span>Not rated yet</span>
                                        )}
                                    </h5>
                                </div>
                                <div className="property-vertical-line"></div>
                                <div style={{ marginRight: "20px" }}>
                                    <h3
                                        style={{
                                            color: "ghostwhite",
                                        }}
                                    >
                                        Price starting from
                                    </h3>
                                    <h2 style={{ color: "ghostwhite" }}>
                                        {property?.price}???
                                    </h2>
                                </div>
                                <div className="property-vertical-line"></div>
                                <div style={{ marginRight: "20px" }}>
                                    <h3 style={{ color: "ghostwhite" }}>
                                        Currently available rooms
                                    </h3>
                                    <h2 style={{ color: "ghostwhite" }}>6</h2>
                                </div>
                            </div>
                        ) : (
                            <button className="btn btn-outline-light rent-button">
                                Property information
                            </button>
                        )}
                        <div>
                            <button className="btn btn-outline-light rent-button">
                                Rent this place
                            </button>
                            {authUser?.role == "admin" ||
                            authUser?.id == property?.author_id ? (
                                <>
                                    <Link to={`/property/${property.id}/edit`}>
                                        <button
                                            className="btn btn-outline-light rent-button"
                                            type="button"
                                            style={{ marginLeft: "20px" }}
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className={
                                            isBeingDeleted
                                                ? "btn btn-outline-light rent-button disabled"
                                                : "btn btn-outline-light rent-button"
                                        }
                                        style={{ marginLeft: "20px" }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#deletePropertyModal"
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <> </>
                            )}
                            {authUser?.id != property?.author_id ? (
                                <button
                                    className="btn btn-outline-light rent-button"
                                    style={{ marginLeft: "20px" }}
                                    onClick={() =>
                                        handleMainContentChange(
                                            "ReviewsContainer",
                                            ReviewsContainer
                                        )
                                    }
                                >
                                    Leave a review
                                </button>
                            ) : (
                                <> </>
                            )}
                        </div>
                    </div>
                ) : (
                    <Spinner color="text-light" />
                )}
            </div>
            <Breadcrumb location={location} />
            <ul
                className="list-group list-group-horizontal"
                style={{
                    height: "70px",
                    textAlign: "center",
                    fontSize: "18px",
                }}
            >
                <button
                    type="button"
                    className={
                        mainContent.name == "Property"
                            ? "list-group-item list-group-item-action button-selected"
                            : "list-group-item list-group-item-action"
                    }
                    onClick={() => handleMainContentChange("Property")}
                >
                    Property
                </button>
                <button
                    type="button"
                    className={
                        mainContent.name == "Rent"
                            ? "list-group-item list-group-item-action button-selected"
                            : "list-group-item list-group-item-action"
                    }
                    onClick={() => handleMainContentChange("Rent", Rent)}
                >
                    Rent
                </button>
                <button
                    type="button"
                    className={
                        mainContent.name == "ReviewsContainer"
                            ? "list-group-item list-group-item-action button-selected"
                            : "list-group-item list-group-item-action"
                    }
                    onClick={() =>
                        handleMainContentChange(
                            "ReviewsContainer",
                            ReviewsContainer
                        )
                    }
                >
                    Reviews{" "}
                    <span style={{ fontSize: "16px" }}>
                        ({property?.review_count ? property.review_count : 0})
                    </span>
                </button>
            </ul>
            {
                <div
                    className="main-container"
                    style={{
                        marginTop: "20px",
                        maxWidth: "1500px",
                        padding: "0px 50px 0px 50px",
                    }}
                >
                    {mainContent.name == "Property" ? (
                        property ? (
                            <div>
                                <div
                                    id="carouselIndicators"
                                    className="carousel slide"
                                    data-bs-ride="carousel"
                                    style={{ marginBottom: "50px" }}
                                >
                                    <div className="carousel-indicators">
                                        <button
                                            type="button"
                                            data-bs-target="#carouselIndicators"
                                            data-bs-slide-to="0"
                                            className="active"
                                            aria-current="true"
                                            aria-label="Slide 1"
                                        ></button>
                                        <button
                                            type="button"
                                            data-bs-target="#carouselIndicators"
                                            data-bs-slide-to="1"
                                            aria-label="Slide 2"
                                        ></button>
                                        <button
                                            type="button"
                                            data-bs-target="#carouselIndicators"
                                            data-bs-slide-to="2"
                                            aria-label="Slide 3"
                                        ></button>
                                    </div>
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img
                                                src={
                                                    property?.image_path
                                                        ? `/storage/images/${property.image_path}`
                                                        : "/images/property_image_placeholder.jpg"
                                                }
                                                className="d-block w-100 property-photo"
                                                alt="..."
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src={
                                                    property?.image_path
                                                        ? `/storage/images/${property.image_path}`
                                                        : "/images/property_image_placeholder.jpg"
                                                }
                                                className="d-block w-100 property-photo"
                                                alt="..."
                                            />
                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src={
                                                    property?.image_path
                                                        ? `/storage/images/${property.image_path}`
                                                        : "/images/property_image_placeholder.jpg"
                                                }
                                                className="d-block w-100 property-photo"
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                    <button
                                        className="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselIndicators"
                                        data-bs-slide="prev"
                                    >
                                        <span
                                            className="carousel-control-prev-icon"
                                            aria-hidden="true"
                                        ></span>
                                        <span className="visually-hidden">
                                            Previous
                                        </span>
                                    </button>
                                    <button
                                        className="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselIndicators"
                                        data-bs-slide="next"
                                    >
                                        <span
                                            className="carousel-control-next-icon"
                                            aria-hidden="true"
                                        ></span>
                                        <span className="visually-hidden">
                                            Next
                                        </span>
                                    </button>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <h1>{property.name}</h1>
                                        <PropertyDescription
                                            descriptionType={property}
                                        />
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body property-info-bottom">
                                        <div className="property-info-bottom-item">
                                            <LetterIcon />
                                            <strong>Name</strong>
                                            {property.name}
                                        </div>
                                        <div className="property-info-bottom-item">
                                            <EuroBanknoteIcon />
                                            <strong>Price starting from</strong>
                                            {property.price}???
                                        </div>
                                        <div className="property-info-bottom-item">
                                            <HouseIcon />
                                            <strong>Type</strong>
                                            {property.type}
                                        </div>
                                        <div className="property-info-bottom-item">
                                            <PinIcon />
                                            <strong>Address</strong>
                                            {property.address}
                                        </div>
                                        <div className="property-info-bottom-item">
                                            <CountryIcon />
                                            <strong>Country</strong>
                                            {property.country}
                                        </div>
                                        <div className="property-info-bottom-item">
                                            <CityIcon />
                                            <strong>City</strong>
                                            {property.city}
                                        </div>

                                        {property.region ? (
                                            <div className="property-info-bottom-item">
                                                <RegionIcon />
                                                <strong>Region</strong>{" "}
                                                {property.region}
                                            </div>
                                        ) : (
                                            <> </>
                                        )}

                                        {property.postcode ? (
                                            <div className="property-info-bottom-item">
                                                <NumbersIcon />
                                                <strong>Postcode</strong>{" "}
                                                {property.postcode}
                                            </div>
                                        ) : (
                                            <> </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Spinner color="text-primary" />
                        )
                    ) : (
                        <mainContent.component property={property} />
                    )}
                    <VerticallyCenteredModal
                        id="deletePropertyModal"
                        buttonText="Delete"
                        title="Delete property"
                        buttonType="btn-danger"
                        onClick={deleteProperty}
                        disabled={propertyDeleteName != property?.name}
                        body={
                            <>
                                <p>
                                    If you want to delete this property type{" "}
                                    <strong>{property?.name}</strong> in this
                                    field.
                                </p>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Type your property name"
                                    aria-label="delete input"
                                    onChange={handlePropertyDeleteNameChange}
                                    value={propertyDeleteName}
                                ></input>
                            </>
                        }
                    />
                </div>
            }
        </>
    );
};

export default Property;
