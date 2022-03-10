import { React, useState, useEffect } from "react";
import Calendar from "react-calendar";
import defaultFetchOptions from "../components/DefaultFetchOptions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";
import PropertyDescription from "../components/PropertyDescription";
import "react-calendar/dist/Calendar.css";
import "../../css/Calendar.css";
import "react-toastify/dist/ReactToastify.css";

const PropertyListing = () => {
    useEffect(() => {
        fetch("/api/properties", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => setProperties(data));
    }, []);
    const handleEditorChange = (_, editor) => {
        setEditor(editor);
    };
    const handlePropertyNameChange = (event) => {
        setPropertyName(event.target.value);
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
        setPropertyPrice(event.target.value);
    };
    const createProperty = () => {
        const propertyDescription = editor.getData();
        setPropertyName("");
        editor.setData("");
        toast.promise(
            fetch("/api/property", {
                method: "POST",
                ...defaultFetchOptions,
                body: JSON.stringify({ propertyName, propertyDescription }),
            }).then((response) => {
                if (!response.ok) {
                    toast.update(toastId.current, {
                        type: toast.TYPE.WARNING,
                        autoClose: 5000,
                    });
                }
            }),
            {
                pending: "Listing a property...",
                success: "Property has been successfully listed",
                error: "Property has not been listed due to an error",
            }
        );
    };
    const minPropertyPrice = 10;
    const maxPropertyPrice = 10000;
    const [propertyName, setPropertyName] = useState("");
    const [propertyPrice, setPropertyPrice] = useState(
        (maxPropertyPrice - minPropertyPrice) / 2
    );
    const [editor, setEditor] = useState("");
    const [properties, setProperties] = useState(undefined);
    return (
        <>
            <div
                className="main-container center"
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
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Property name"
                            aria-label=".form-control-lg"
                            value={propertyName}
                            onChange={handlePropertyNameChange}
                        />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <h5>Property type</h5>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "15px",
                            flexWrap: "wrap",
                        }}
                    >
                        <button
                            type="button"
                            className="btn btn-primary property-type"
                            aria-current="true"
                        >
                            Hotel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary property-type"
                        >
                            Apartment
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary property-type"
                        >
                            Homestead
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary property-type"
                        >
                            Motel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary property-type"
                        >
                            Villa
                        </button>
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <h5>Property price</h5>
                    </div>
                    <div
                        className="input-group mb-3"
                        style={{ marginBottom: "15px" }}
                    >
                        <span className="input-group-text">€</span>
                        <input
                            type="number"
                            className="form-control"
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
