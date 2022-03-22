import { React, useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import defaultFetchOptions from "../components/DefaultFetchOptions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import MapGeocoderControl from "../components/MapGeocoderControl";
import MapPinIcon from "../components/svgs/MapPinIcon";
import MapPinNavigationIcon from "../components/MapPinNavigationIcon";
import "react-calendar/dist/Calendar.css";
import "../../css/Calendar.css";
import "react-toastify/dist/ReactToastify.css";
import "mapbox-gl/dist/mapbox-gl.css";

const PropertyListing = () => {
    const onSearchLocation = (event) => {
        setPropertyCountry(
            event.result.context.find((element) =>
                element.id.includes("country")
            )?.text
        );
        setPropertyCity(
            event.result.context.find((element) =>
                element.id.includes("region")
            )?.text
        );
        setPropertyRegion(
            event.result.context.find((element) => element.id.includes("place"))
                ?.text
        );
        setPropertyAddress(
            event.result.address
                ? event.result.text + " " + event.result.address
                : event.result.properties.address
                ? event.result.text + " " + event.result.properties.address
                : event.result.text
        );
        setPropertyPostcode(
            event.result.context.find((element) =>
                element.id.includes("postcode")
            )?.text
        );
    };
    const handleEditorChange = (_, editor) => {
        setEditor(editor);
    };
    const handlePropertyNameChange = (event) => {
        setPropertyName(event.target.value);
    };
    const handlePropertyTypeChange = (type) => {
        setPropertyType(type);
    };
    const handlePropertyPriceChange = (event) => {
        if (event.target.value > maxPropertyPrice) {
            setPropertyPrice(maxPropertyPrice);
            return;
        }
        if (event.target.value < 0) {
            setPropertyPrice(minPropertyPrice);
            return;
        }
        if (
            event.target.value.charAt(0) == 0 &&
            event.target.value.length != 0
        ) {
            setPropertyPrice(minPropertyPrice);
            return;
        }

        setPropertyPrice(event.target.value);
    };
    const handlePropertyAddressChange = (event) => {
        setPropertyAddress(event.target.value);
    };
    const handlePropertyCountryChange = (event) => {
        setPropertyCountry(event.target.value);
    };
    const handlePropertyCityChange = (event) => {
        setPropertyCity(event.target.value);
    };
    const handlePropertyRegionChange = (event) => {
        setPropertyRegion(event.target.value);
    };
    const handlePropertyPostcodeChange = (event) => {
        setPropertyPostcode(event.target.value);
    };
    const validateInputs = () => {
        if (!propertyName.match("^[a-zA-Z0-9]{4,10}$")) {
            setErrorPropertyName(
                "Property name cannot be empty, include special characters and its length has to be between 4 and 10 letters."
            );
        } else {
            setErrorPropertyName("");
        }
        if (!propertyType) {
            setErrorPropertyType("Property type has to be selected.");
        } else {
            setErrorPropertyType("");
        }
        if (!propertyAddress.match("^[a-zA-Z0-9]")) {
            setErrorPropertyAddress(
                "Property address cannot be empty and include special characters."
            );
        } else {
            setErrorPropertyAddress("");
        }
        if (!propertyCountry.match("^[a-zA-Z0-9]")) {
            setErrorPropertyCountry(
                "Property country cannot be empty and include special characters."
            );
        } else {
            setErrorPropertyCountry("");
        }
        if (!propertyCity.match("^$[a-zA-Z0-9]")) {
            setErrorPropertyCity(
                "Property city cannot be empty and include special characters."
            );
        } else {
            setErrorPropertyCity("");
        }
        if (!propertyRegion.match("^[$a-zA-Z0-9]?$")) {
            setErrorPropertyRegion(
                "Property region cannot include special characters."
            );
        } else {
            setErrorPropertyRegion("");
        }
        if (!propertyPostcode.match("^[$a-zA-Z0-9]?$")) {
            setErrorPropertyPostcode(
                "Property postcode cannot include special characters."
            );
        } else {
            setErrorPropertyPostcode("");
        }
        if (!propertyPrice) {
            setErrorPropertyPrice(
                "Property price has to be selected and cannot include special characters."
            );
        } else {
            setErrorPropertyPrice("");
        }
    };
    const createProperty = () => {
        const toastId = toast.loading("Listing a property...");
        validateInputs();
        const propertyDescription = editor.getData();
        setPropertyName("");
        editor.setData("");
        fetch("/api/property", {
            method: "POST",
            ...defaultFetchOptions,
            body: JSON.stringify({
                propertyName,
                propertyDescription,
                propertyAddress,
                propertyCountry,
                propertyCity,
                propertyRegion,
                propertyPostcode,
                propertyType,
                propertyPrice,
            }),
        }).then((response) =>
            response.json().then((data) => {
                if (data.errors) {
                    toast.update(toastId, {
                        render: data.errors.join(" "),
                        type: "error",
                        autoClose: 5000,
                        isLoading: false,
                    });
                }
            })
        );
    };
    const minPropertyPrice = 1;
    const maxPropertyPrice = 10001;
    const [propertyName, setPropertyName] = useState("");
    const [propertyAddress, setPropertyAddress] = useState("");
    const [propertyCountry, setPropertyCountry] = useState("");
    const [propertyCity, setPropertyCity] = useState("");
    const [propertyRegion, setPropertyRegion] = useState("");
    const [propertyPostcode, setPropertyPostcode] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [propertyPrice, setPropertyPrice] = useState(
        (maxPropertyPrice - minPropertyPrice) / 2
    );

    const [errorPropertyName, setErrorPropertyName] = useState("");
    const [errorPropertyAddress, setErrorPropertyAddress] = useState("");
    const [errorPropertyCountry, setErrorPropertyCountry] = useState("");
    const [errorPropertyCity, setErrorPropertyCity] = useState("");
    const [errorPropertyRegion, setErrorPropertyRegion] = useState("");
    const [errorPropertyPostcode, setErrorPropertyPostcode] = useState("");
    const [errorPropertyType, setErrorPropertyType] = useState("");
    const [errorPropertyPrice, setErrorPropertyPrice] = useState("");

    const [editor, setEditor] = useState("");

    const [viewState, setViewState] = useState({
        longitude: 25.2797,
        latitude: 54.6872,
        zoom: 3.5,
    });

    const [marker, setMarker] = useState({
        latitude: 54.6872,
        longitude: 25.2797,
        hidden: true,
    });

    const onMarkerDrag = useCallback((event) => {
        setMarker({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        });
    }, []);

    return (
        <>
            <div
                className="main-container center-vertically"
                style={{
                    marginTop: "20px",
                    padding: "0px 50px 0px 50px",
                    maxWidth: "1500px",
                }}
            >
                <div style={{ width: "100%", textAlign: "start" }}>
                    <div style={{ marginBottom: "15px" }}>
                        <h5>Property name</h5>
                        <input
                            className={
                                errorPropertyName
                                    ? "form-control form-control-lg input-error"
                                    : "form-control form-control-lg"
                            }
                            type="text"
                            placeholder="Property name"
                            aria-label=".form-control-lg"
                            value={propertyName}
                            onChange={handlePropertyNameChange}
                        />
                        <span className="input-error-message">
                            {errorPropertyName}
                        </span>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <div style={{ marginBottom: "15px" }}>
                            <h5>Property type</h5>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                        >
                            <button
                                type="button"
                                className={
                                    propertyType == "Hotel"
                                        ? "btn btn-primary property-type button-selected"
                                        : errorPropertyType
                                        ? "btn btn-primary property-type input-error"
                                        : "btn btn-primary property-type"
                                }
                                aria-current="true"
                                onClick={() =>
                                    handlePropertyTypeChange("Hotel")
                                }
                            >
                                Hotel
                            </button>
                            <button
                                type="button"
                                className={
                                    propertyType == "Apartment"
                                        ? "btn btn-primary property-type button-selected"
                                        : errorPropertyType
                                        ? "btn btn-primary property-type input-error"
                                        : "btn btn-primary property-type"
                                }
                                onClick={() =>
                                    handlePropertyTypeChange("Apartment")
                                }
                            >
                                Apartment
                            </button>
                            <button
                                type="button"
                                className={
                                    propertyType == "Homestead"
                                        ? "btn btn-primary property-type button-selected"
                                        : errorPropertyType
                                        ? "btn btn-primary property-type input-error"
                                        : "btn btn-primary property-type"
                                }
                                onClick={() =>
                                    handlePropertyTypeChange("Homestead")
                                }
                            >
                                Homestead
                            </button>
                            <button
                                type="button"
                                className={
                                    propertyType == "Motel"
                                        ? "btn btn-primary property-type button-selected"
                                        : errorPropertyType
                                        ? "btn btn-primary property-type input-error"
                                        : "btn btn-primary property-type"
                                }
                                onClick={() =>
                                    handlePropertyTypeChange("Motel")
                                }
                            >
                                Motel
                            </button>
                            <button
                                type="button"
                                className={
                                    propertyType == "Villa"
                                        ? "btn btn-primary property-type button-selected"
                                        : errorPropertyType
                                        ? "btn btn-primary property-type input-error"
                                        : "btn btn-primary property-type"
                                }
                                onClick={() =>
                                    handlePropertyTypeChange("Villa")
                                }
                            >
                                Villa
                            </button>
                        </div>
                        <span className="input-error-message">
                            {errorPropertyType}
                        </span>
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <h5>Property location</h5>
                        <form
                            className="row g-3"
                            style={{ marginBottom: "20px" }}
                        >
                            <div className="col-4">
                                <label
                                    htmlFor="inputAddress"
                                    className="form-label"
                                >
                                    Address
                                </label>
                                <input
                                    required
                                    type="text"
                                    className={
                                        errorPropertyAddress
                                            ? "form-control input-error"
                                            : "form-control"
                                    }
                                    id="inputAddress"
                                    defaultValue={propertyAddress}
                                    onChange={handlePropertyAddressChange}
                                />
                                <span className="input-error-message">
                                    {errorPropertyAddress}
                                </span>
                            </div>
                            <div className="col-md-4">
                                <label
                                    htmlFor="inputCity"
                                    className="form-label"
                                >
                                    Country
                                </label>
                                <input
                                    type="text"
                                    className={
                                        errorPropertyCountry
                                            ? "form-control input-error"
                                            : "form-control"
                                    }
                                    id="inputCountry"
                                    defaultValue={propertyCountry}
                                    onChange={handlePropertyCountryChange}
                                />
                                <span className="input-error-message">
                                    {errorPropertyCountry}
                                </span>
                            </div>
                            <div className="col-md-4">
                                <label
                                    htmlFor="inputCity"
                                    className="form-label"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    className={
                                        errorPropertyCity
                                            ? "form-control input-error"
                                            : "form-control"
                                    }
                                    id="inputCity"
                                    defaultValue={propertyCity}
                                    onChange={handlePropertyCityChange}
                                />
                                <span className="input-error-message">
                                    {errorPropertyCity}
                                </span>
                            </div>
                            <div className="col-md-4">
                                <label
                                    htmlFor="inputRegion"
                                    className="form-label"
                                >
                                    Region
                                </label>
                                <input
                                    type="text"
                                    className={
                                        errorPropertyRegion
                                            ? "form-control input-error"
                                            : "form-control"
                                    }
                                    id="inputRegion"
                                    defaultValue={propertyRegion}
                                    onChange={handlePropertyRegionChange}
                                />
                                <span className="input-error-message">
                                    {errorPropertyRegion}
                                </span>
                            </div>
                            <div className="col-md-4">
                                <label
                                    htmlFor="inputRegion"
                                    className="form-label"
                                >
                                    Postcode
                                </label>
                                <input
                                    type="text"
                                    className={
                                        errorPropertyPostcode
                                            ? "form-control input-error"
                                            : "form-control"
                                    }
                                    id="inputRegion"
                                    defaultValue={propertyPostcode}
                                    onChange={handlePropertyPostcodeChange}
                                />
                                <span className="input-error-message">
                                    {errorPropertyPostcode}
                                </span>
                            </div>
                        </form>
                        {/* <ReactMapGL
                            mapboxAccessToken={mapBoxApiKey}
                            {...viewState}
                            onMove={(event) => setViewState(event.viewState)}
                            style={{ width: "100%", height: "500px" }}
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                        >
                            <MapGeocoderControl
                                mapboxAccessToken={mapBoxApiKey}
                                position="top-left"
                                onResult={onSearchLocation}
                                language="en-US"
                            />
                            {!marker.hidden ? (
                                <Marker
                                    longitude={marker.longitude}
                                    latitude={marker.latitude}
                                    anchor="bottom"
                                    draggable
                                    onDrag={onMarkerDrag}
                                    style={{ zIndex: "1" }}
                                >
                                    <MapPinIcon size={20} />
                                </Marker>
                            ) : (
                                <> </>
                            )}

                            <NavigationControl />
                            <button
                                className="map-draggable-pin"
                                type="button"
                                title={
                                    marker.hidden
                                        ? "Place draggable pin"
                                        : "Hide draggable pin"
                                }
                                onClick={() =>
                                    setMarker({
                                        longitude: viewState.longitude,
                                        latitude: viewState.latitude,
                                        hidden: !marker.hidden,
                                    })
                                }
                            >
                                <MapPinNavigationIcon />
                            </button>
                        </ReactMapGL> */}
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <h5>Property price</h5>
                    </div>
                    <span className="input-error-message">
                        {errorPropertyPrice}
                    </span>
                    <div
                        className="input-group mb-3"
                        style={{ marginBottom: "15px" }}
                    >
                        <span className="input-group-text">€</span>
                        <input
                            type="number"
                            className={
                                errorPropertyPrice
                                    ? "form-control input-error"
                                    : "form-control"
                            }
                            value={propertyPrice}
                            onChange={handlePropertyPriceChange}
                        />
                    </div>
                    <input
                        type="range"
                        className="form-range"
                        min={minPropertyPrice}
                        max={maxPropertyPrice}
                        step={10}
                        value={propertyPrice}
                        onChange={handlePropertyPriceChange}
                        id="customRange2"
                    ></input>
                    <div style={{ marginBottom: "15px" }}>
                        <h5>Select property main image</h5>
                        <input
                            className="form-control"
                            type="file"
                            id="formFile"
                        />
                    </div>
                    <span></span>
                    <div style={{ marginBottom: "15px" }}>
                        <h5>Property description</h5>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <CKEditor
                            editor={ClassicEditor}
                            onChange={handleEditorChange}
                            config={{
                                ckfinder: {
                                    uploadUrl: "/api/editor",

                                    image: {
                                        upload: {
                                            types: ["png", "jpeg"],
                                        },
                                    },
                                },
                                mediaEmbed: {
                                    previewsInData: true,
                                },
                            }}
                        />
                    </div>
                    <span></span>
                </div>
                <button
                    id="submit"
                    className="btn btn-primary"
                    style={{ marginTop: "20px", width: "100%" }}
                    onClick={createProperty}
                >
                    Create property
                </button>
                <ToastContainer
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                />
            </div>
        </>
    );
};

export default PropertyListing;
