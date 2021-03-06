import {
    React,
    useState,
    useEffect,
    useCallback,
    useLayoutEffect,
} from "react";
import { useParams, useOutletContext } from "react-router-dom";
import defaultFetchOptions from "../components/fetch-options/defaultFetchOptions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import MapGeocoderControl from "../components/map/MapGeocoderControl";
import MapPinIcon from "../components/svgs/MapPinIcon";
import MapPinNavigationIcon from "../components/map/MapPinNavigationIcon";
import "react-calendar/dist/Calendar.css";
import "../../css/Calendar.css";
import "react-toastify/dist/ReactToastify.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Spinner from "../components/Spinner";
import HTTPError from "../components/HTTPError";
import formDataFetchOptions from "../components/fetch-options/formDataFetchOptions";

const PropertyListing = (isPropertyEdit) => {
    const [showBreadcrumb, setShowBreadcrumb] = useOutletContext();

    useLayoutEffect(() => {
        if (
            isPropertyEdit &&
            authUser.role != "admin" &&
            property?.author_id != authUser.id
        ) {
            setShowBreadcrumb(false);
        } else {
            setShowBreadcrumb(true);
        }
    });

    const { id } = useParams();
    useEffect(() => {
        if (isPropertyEdit) {
            fetch(`/api/property/${id}`, {
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
                        setProperty(data);
                    }
                });
        }
    }, []);
    const [property, setProperty] = useState(undefined);
    useEffect(() => {
        if (property) {
            setPropertyName(property.name);
            setPropertyType(property.type);
            setPropertyAddress(property.address);
            setPropertyCountry(property.country);
            setPropertyCity(property.city);
            property.region && setPropertyRegion(property.region);
            property.postcode && setPropertyPostcode(property.postcode);
            setPropertyPrice(property.price);
            setPropertyDescription(property.description);
        }
    }, [property]);

    const onSearchLocation = (event) => {
        if (
            event.result.context.find((element) =>
                element.id.includes("country")
            )
        ) {
            setPropertyCountry(
                event.result.context.find((element) =>
                    element.id.includes("country")
                ).text
            );
        }

        if (
            event.result.context.find((element) =>
                element.id.includes("region")
            )
        ) {
            setPropertyCity(
                event.result.context.find((element) =>
                    element.id.includes("region")
                ).text
            );
        }

        if (
            event.result.context.find((element) => element.id.includes("place"))
        ) {
            setPropertyRegion(
                event.result.context.find((element) =>
                    element.id.includes("place")
                ).text
            );
        }

        setPropertyAddress(
            event.result.address
                ? event.result.text + " " + event.result.address
                : event.result.properties.address
                ? event.result.text + " " + event.result.properties.address
                : event.result.text
        );
        if (
            event.result.context.find((element) =>
                element.id.includes("postcode")
            )
        ) {
            setPropertyPostcode(
                event.result.context.find((element) =>
                    element.id.includes("postcode")
                )?.text
            );
        }
    };
    const handlePropertyDescriptionChange = (_, editor) => {
        setPropertyDescription(editor.getData());
        handlePropertyError(
            editor.getData(),
            "Property description",
            "nonEmpty"
        );
    };
    const handlePropertyNameChange = (event) => {
        setPropertyName(event.target.value);
        handlePropertyError(
            event.target.value,
            "Property name",
            "nonEmptyLimited60Chars"
        );
    };
    const handlePropertyTypeChange = (type) => {
        setPropertyType(type);
        handlePropertyError(type, "Property type", "nonEmpty");
    };
    const handlePropertyPriceChange = (event) => {
        handlePropertyError(event.target.value, "Property price", "nonEmpty");
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
        handlePropertyError(
            event.target.value,
            "Property address",
            "nonEmptyLimited100Chars"
        );
    };

    const handlePropertyCountryChange = (event) => {
        setPropertyCountry(event.target.value);
        handlePropertyError(
            event.target.value,
            "Property country",
            "nonEmptyLimited100Chars"
        );
    };
    const handlePropertyCityChange = (event) => {
        setPropertyCity(event.target.value);
        handlePropertyError(
            event.target.value,
            "Property city",
            "nonEmptyLimited100Chars"
        );
    };
    const handlePropertyRegionChange = (event) => {
        setPropertyRegion(event.target.value);
        handlePropertyError(
            event.target.value,
            "Property region",
            "limited100Chars"
        );
    };
    const handlePropertyPostcodeChange = (event) => {
        setPropertyPostcode(event.target.value);
        handlePropertyError(
            event.target.value,
            "Property postcode",
            "limited100Chars"
        );
    };
    const handlePropertyImageChange = (event) => {
        setPropertyImage(event.target.files[0]);
    };

    const handlePropertyErrorCases = (propertyFieldName, errorMessage) => {
        switch (propertyFieldName) {
            case "Property name":
                setErrorPropertyName(errorMessage);
                break;
            case "Property type":
                setErrorPropertyType(errorMessage);
                break;
            case "Property address":
                setErrorPropertyAddress(errorMessage);
                break;
            case "Property country":
                setErrorPropertyCountry(errorMessage);
                break;
            case "Property city":
                setErrorPropertyCity(errorMessage);
                break;
            case "Property region":
                setErrorPropertyRegion(errorMessage);
                break;
            case "Property postcode":
                setErrorPropertyPostcode(errorMessage);
                break;
            case "Property price":
                setErrorPropertyPrice(errorMessage);
                break;
            case "Property description":
                setErrorPropertyDescription(errorMessage);
                break;
        }
    };
    const handlePropertyError = (propertyField, propertyFieldName, group) => {
        if (group == "nonEmptyLimited100Chars") {
            if (propertyField.match("^.{0,100}$") && propertyField) {
                handlePropertyErrorCases(propertyFieldName, "");
            } else if (!propertyField.match("^.{0,100}$") || !propertyField) {
                handlePropertyErrorCases(
                    propertyFieldName,
                    `${propertyFieldName} cannot be empty and contain more than 100 characters.`
                );
            }
        } else if (group == "limited100Chars") {
            if (propertyField.match("^.{0,100}$")) {
                handlePropertyErrorCases(propertyFieldName, "");
            } else if (!propertyField.match("^.{0,100}$")) {
                handlePropertyErrorCases(
                    propertyFieldName,
                    `${propertyFieldName} cannot contain more than 100 characters.`
                );
            }
        } else if (group == "nonEmptyLimited60Chars") {
            if (propertyField.match("^[a-zA-Z0-9]{2,60}$")) {
                handlePropertyErrorCases(propertyFieldName, "");
            } else if (!propertyField.match("^[a-zA-Z0-9]{2,60}$")) {
                handlePropertyErrorCases(
                    propertyFieldName,
                    `${propertyFieldName} cannot be empty, 
                    include special characters and its length has to be between 2 and 60 characters.`
                );
            }
        } else if (group == "nonEmpty") {
            if (
                propertyFieldName == "Property Price"
                    ? propertyField &&
                      propertyFieldName == "Property price" &&
                      !isNaN(propertyField)
                    : propertyField
            ) {
                handlePropertyErrorCases(propertyFieldName, "");
            } else {
                handlePropertyErrorCases(
                    propertyFieldName,
                    propertyFieldName == "Property price"
                        ? `${propertyFieldName} cannot be empty and contain special characters.`
                        : propertyFieldName == "Property type"
                        ? `${propertyFieldName} has to be selected.`
                        : `${propertyFieldName} cannot be empty.`
                );
            }
        }
    };
    const createProperty = () => {
        if (propertyFields.every((propertyField) => propertyField != "")) {
            const toastId = toast("Listing a property...", { isLoading: true });

            let formData = new FormData();
            formData.append("propertyImage", propertyImage);

            fetch(`/api/property`, {
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
                        const errorsArray = Object.values(data.errors);
                        toast.update(toastId, {
                            render: (
                                <>
                                    {errorsArray.map((dataError, index) => (
                                        <span key={index}>
                                            {index != 0 && "\n"}??? {dataError[0]}{" "}
                                        </span>
                                    ))}
                                </>
                            ),
                            type: "error",
                            autoClose:
                                errorsArray.length == 1
                                    ? 5000
                                    : 4000 * errorsArray.length,
                            isLoading: false,
                            className: "toastify-error",
                        });
                    } else if (propertyImage != "") {
                        let formData = new FormData();

                        formData.append(
                            "propertyImage",
                            propertyImage != null ? propertyImage : ""
                        );
                        fetch(`/api/property/${data.id}/add-image`, {
                            method: "POST",
                            ...formDataFetchOptions,
                            body: formData,
                        }).then((response) =>
                            response.json().then((data) => {
                                if (data?.errors) {
                                    const errorsArray = Object.values(
                                        data?.errors
                                    );
                                    toast.update(toastId, {
                                        render: (
                                            <>
                                                {errorsArray.map(
                                                    (dataError, index) => (
                                                        <span key={index}>
                                                            {index != 0 && "\n"}
                                                            ??? {dataError[0]}{" "}
                                                        </span>
                                                    )
                                                )}
                                            </>
                                        ),
                                        type: "error",
                                        autoClose:
                                            errorsArray.length == 1
                                                ? 5000
                                                : 4000 * errorsArray.length,
                                        isLoading: false,
                                        className: "toastify-error",
                                    });
                                } else {
                                    toast.update(toastId, {
                                        render: "Property has been successfully listed.",
                                        type: "success",
                                        autoClose: 5000,
                                        isLoading: false,
                                    });
                                }
                            })
                        );
                    } else {
                        setPropertyName("");
                        setPropertyType("");
                        setPropertyAddress("");
                        setPropertyCountry("");
                        setPropertyCity("");
                        setPropertyRegion("");
                        setPropertyPostcode("");
                        setPropertyPrice("");
                        setPropertyDescription("");
                        setTimeout(() => {
                            setErrorPropertyDescription("");
                        }, 0);
                        toast.update(toastId, {
                            render: "Property has been successfully listed.",
                            type: "success",
                            autoClose: 5000,
                            isLoading: false,
                        });
                    }
                })
            );
        }
    };
    const updateProperty = () => {
        if (propertyFields.every((propertyField) => propertyField != "")) {
            const toastId = toast("Updating a property...", {
                isLoading: true,
            });

            fetch(`/api/property/${id}`, {
                method: "PUT",
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
                        const errorsArray = Object.values(data.errors);
                        toast.update(toastId, {
                            render: (
                                <>
                                    {errorsArray.map((dataError, index) => (
                                        <span key={index}>
                                            {index != 0 && "\n"}??? {dataError[0]}{" "}
                                        </span>
                                    ))}
                                </>
                            ),
                            type: "error",
                            autoClose:
                                errorsArray.length == 1
                                    ? 5000
                                    : 4000 * errorsArray.length,
                            isLoading: false,
                            className: "toastify-error",
                        });
                    } else if (propertyImage != "") {
                        let formData = new FormData();

                        formData.append(
                            "propertyImage",
                            propertyImage != null ? propertyImage : ""
                        );
                        fetch(`/api/property/${id}/add-image`, {
                            method: "POST",
                            ...formDataFetchOptions,
                            body: formData,
                        }).then((response) =>
                            response.json().then((data) => {
                                if (data?.errors) {
                                    const errorsArray = Object.values(
                                        data?.errors
                                    );
                                    toast.update(toastId, {
                                        render: (
                                            <>
                                                {errorsArray.map(
                                                    (dataError, index) => (
                                                        <span key={index}>
                                                            {index != 0 && "\n"}
                                                            ??? {dataError[0]}{" "}
                                                        </span>
                                                    )
                                                )}
                                            </>
                                        ),
                                        type: "error",
                                        autoClose:
                                            errorsArray.length == 1
                                                ? 5000
                                                : 4000 * errorsArray.length,
                                        isLoading: false,
                                        className: "toastify-error",
                                    });
                                } else {
                                    toast.update(toastId, {
                                        render: "Property has been successfully updated.",
                                        type: "success",
                                        autoClose: 5000,
                                        isLoading: false,
                                    });
                                }
                            })
                        );
                    } else {
                        toast.update(toastId, {
                            render: "Property has been successfully updated.",
                            type: "success",
                            autoClose: 5000,
                            isLoading: false,
                        });
                    }
                })
            );
        }
    };
    const minPropertyPrice = 1;
    const maxPropertyPrice = 10001;
    const [propertyName, setPropertyName] = useState("");
    const [propertyDescription, setPropertyDescription] = useState("");
    const [propertyAddress, setPropertyAddress] = useState("");
    const [propertyCountry, setPropertyCountry] = useState("");
    const [propertyCity, setPropertyCity] = useState("");
    const [propertyRegion, setPropertyRegion] = useState("");
    const [propertyPostcode, setPropertyPostcode] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [propertyPrice, setPropertyPrice] = useState("");
    const [propertyImage, setPropertyImage] = useState("");

    const [errorPropertyName, setErrorPropertyName] = useState("");
    const [errorPropertyDescription, setErrorPropertyDescription] =
        useState("");
    const [errorPropertyAddress, setErrorPropertyAddress] = useState("");
    const [errorPropertyCountry, setErrorPropertyCountry] = useState("");
    const [errorPropertyCity, setErrorPropertyCity] = useState("");
    const [errorPropertyRegion, setErrorPropertyRegion] = useState("");
    const [errorPropertyPostcode, setErrorPropertyPostcode] = useState("");
    const [errorPropertyType, setErrorPropertyType] = useState("");
    const [errorPropertyPrice, setErrorPropertyPrice] = useState("");
    const propertyFields = [
        propertyName,
        propertyDescription,
        propertyAddress,
        propertyCountry,
        propertyCity,
        propertyType,
        propertyPrice,
    ];
    const errors = [
        errorPropertyName,
        errorPropertyDescription,
        errorPropertyAddress,
        errorPropertyCountry,
        errorPropertyCity,
        errorPropertyRegion,
        errorPropertyPostcode,
        errorPropertyType,
        errorPropertyPrice,
    ];

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
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    {!isPropertyEdit ||
                    (property && authUser.role == "admin") ||
                    (property && property.author_id == authUser?.id) ? (
                        <div style={{ textAlign: "start" }}>
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
                                            handlePropertyTypeChange(
                                                "Apartment"
                                            )
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
                                            handlePropertyTypeChange(
                                                "Homestead"
                                            )
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
                                            type="text"
                                            className={
                                                errorPropertyAddress
                                                    ? "form-control input-error"
                                                    : "form-control"
                                            }
                                            id="inputAddress"
                                            value={propertyAddress}
                                            onChange={
                                                handlePropertyAddressChange
                                            }
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
                                            value={propertyCountry}
                                            onChange={
                                                handlePropertyCountryChange
                                            }
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
                                            value={propertyCity}
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
                                            value={propertyRegion}
                                            onChange={
                                                handlePropertyRegionChange
                                            }
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
                                            value={propertyPostcode}
                                            onChange={
                                                handlePropertyPostcodeChange
                                            }
                                        />
                                        <span className="input-error-message">
                                            {errorPropertyPostcode}
                                        </span>
                                    </div>
                                </form>
                                <ReactMapGL
                                    mapboxAccessToken={mapBoxApiKey}
                                    {...viewState}
                                    onMove={(event) =>
                                        setViewState(event.viewState)
                                    }
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
                                </ReactMapGL>
                            </div>
                            <div style={{ marginBottom: "15px" }}>
                                <h5>Property price</h5>
                            </div>

                            <div className="input-group">
                                <span className="input-group-text">???</span>
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
                            <span className="input-error-message">
                                {errorPropertyPrice}
                            </span>
                            <input
                                type="range"
                                className="form-range"
                                min={minPropertyPrice}
                                max={maxPropertyPrice}
                                step={10}
                                value={propertyPrice}
                                onChange={handlePropertyPriceChange}
                                id="customRange2"
                                style={{ marginTop: "15px" }}
                            ></input>
                            <div style={{ marginBottom: "15px" }}>
                                <h5>Select property main image</h5>
                                <form encType="multipart/form-data">
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="formFile"
                                        onChange={handlePropertyImageChange}
                                    />
                                </form>
                                {isPropertyEdit && (
                                    <>
                                        {property?.image_path &&
                                        propertyImage != null ? (
                                            <>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    <span>Current image:</span>
                                                    <button
                                                        className="btn btn-danger"
                                                        style={{
                                                            marginBottom:
                                                                "10px",
                                                        }}
                                                        onClick={() =>
                                                            setPropertyImage(
                                                                null
                                                            )
                                                        }
                                                    >
                                                        Remove image
                                                    </button>
                                                </div>

                                                <img
                                                    src={
                                                        property?.image_path
                                                            ? `/storage/images/${property?.image_path}`
                                                            : "/images/property_image_placeholder.jpg"
                                                    }
                                                    className="d-block w-100 property-photo"
                                                    alt="Property image"
                                                    style={{
                                                        maxHeight: "500px",
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            <span>Property has no image.</span>
                                        )}
                                    </>
                                )}
                            </div>
                            <span></span>
                            <div style={{ marginBottom: "15px" }}>
                                <h5>Property description</h5>
                            </div>
                            <div
                                className={
                                    errorPropertyDescription
                                        ? "ckeditor-wrapper error"
                                        : "ckeditor-wrapper"
                                }
                                style={{ position: "relative" }}
                            >
                                <CKEditor
                                    editor={ClassicEditor}
                                    onChange={handlePropertyDescriptionChange}
                                    data={propertyDescription}
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

                            <span className="input-error-message">
                                {errorPropertyDescription}
                            </span>

                            <button
                                id="submit"
                                className={
                                    propertyFields.every(
                                        (propertyField) => propertyField != ""
                                    ) && errors.every((error) => error == "")
                                        ? "btn btn-primary"
                                        : "btn btn-primary disabled"
                                }
                                style={{ width: "100%", marginTop: "20px" }}
                                onClick={
                                    !property ? createProperty : updateProperty
                                }
                            >
                                {!property ? (
                                    <span>Create property</span>
                                ) : (
                                    <span>Save</span>
                                )}
                            </button>
                        </div>
                    ) : property ? (
                        <HTTPError status={403} message="Page forbidden" />
                    ) : (
                        <Spinner color="text-primary" />
                    )}
                </div>
            </div>
        </>
    );
};

export default PropertyListing;
