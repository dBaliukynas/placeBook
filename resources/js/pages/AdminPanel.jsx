import { useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../components/svgs/EditIcon";
import TrashIcon from "../components/svgs/TrashIcon";

const AdminPanel = () => {
    const handleMainContentChange = (name, component) => {
        setMainContent({ name, component });
    };

    const [mainContent, setMainContent] = useState({ name: "Dashboard" });

    return (
        <>
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
                        mainContent.name == "Dashboard"
                            ? "list-group-item list-group-item-action button-selected"
                            : "list-group-item list-group-item-action"
                    }
                    onClick={() => handleMainContentChange("Dashboard")}
                >
                    Dashboard
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
                        mainContent.name == "Reviews"
                            ? "list-group-item list-group-item-action button-selected"
                            : "list-group-item list-group-item-action"
                    }
                    onClick={() => handleMainContentChange("Reviews", Reviews)}
                >
                    Reviews <span style={{ fontSize: "16px" }}>(0)</span>
                </button>
            </ul>

            <div className="container" style={{ marginTop: "20px" }}>
                {mainContent.name == "Dashboard" ? (
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Newest properties
                                    </h5>
                                    <div className="card-text">
                                        <div
                                            className="list-group"
                                            style={{
                                                width: "100%",
                                                borderTopWidth: "1px",
                                            }}
                                        >
                                            <div
                                                className="list-group-item"
                                                aria-current="true"
                                                style={{ marginBottom: "20px" }}
                                            >
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">
                                                        List group item heading
                                                    </h5>
                                                    <small>3 days ago</small>
                                                </div>
                                                <p className="mb-1">
                                                    Some placeholder content in
                                                    a paragraph.
                                                </p>
                                                <small>
                                                    And some small print.
                                                </small>
                                            </div>
                                            <div
                                                to="#"
                                                href="#"
                                                className="list-group-item"
                                                aria-current="true"
                                                style={{
                                                    marginBottom: "20px",
                                                    borderTopWidth: "1px",
                                                }}
                                            >
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">
                                                        List group item heading
                                                    </h5>
                                                    <small>3 days ago</small>
                                                </div>
                                                <p className="mb-1">
                                                    Some placeholder content in
                                                    a paragraph.
                                                </p>
                                                <small>
                                                    And some small print.
                                                </small>
                                            </div>
                                            <div
                                                to="#"
                                                className="list-group-item"
                                                aria-current="true"
                                                style={{
                                                    marginBottom: "20px",
                                                    borderTopWidth: "1px",
                                                }}
                                            >
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">
                                                        List group item heading
                                                    </h5>

                                                    <small>3 days ago</small>
                                                </div>
                                                <p className="mb-1">
                                                    Some placeholder content in
                                                    a paragraph.
                                                </p>
                                                <small>
                                                    And some small print.
                                                </small>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                    }}
                                                >
                                                    <Link
                                                        to="#"
                                                        className="btn btn-primary"
                                                    >
                                                        Visit
                                                    </Link>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            marginLeft: "auto"
                                                        }}
                                                    >
                                                        <button
                                                            className="btn btn-danger"
                                                            style={{
                                                                padding:
                                                                    "4px 4px 4px 4px",
                                                            }}
                                                        >
                                                            <TrashIcon />
                                                        </button>
                                                        <button
                                                            className="btn btn-light"
                                                            style={{
                                                                padding:
                                                                    "4px 4px 4px 4px",
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Newest ratings
                                    </h5>
                                    <div className="card-text">
                                        <div
                                            className="list-group"
                                            style={{ width: "100%" }}
                                        >
                                            <div
                                                to="#"
                                                href="#"
                                                className="list-group-item"
                                                aria-current="true"
                                                style={{
                                                    marginBottom: "20px",
                                                    borderTopWidth: "1px",
                                                }}
                                            >
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">
                                                        List group item heading
                                                    </h5>
                                                    <small>3 days ago</small>
                                                </div>
                                                <p className="mb-1">
                                                    Some placeholder content in
                                                    a paragraph.
                                                </p>
                                                <small>
                                                    And some small print.
                                                </small>
                                            </div>
                                            <div
                                                to="#"
                                                href="#"
                                                className="list-group-item"
                                                aria-current="true"
                                                style={{
                                                    marginBottom: "20px",
                                                    borderTopWidth: "1px",
                                                }}
                                            >
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">
                                                        List group item heading
                                                    </h5>
                                                    <small>3 days ago</small>
                                                </div>
                                                <p className="mb-1">
                                                    Some placeholder content in
                                                    a paragraph.
                                                </p>
                                                <small>
                                                    And some small print.
                                                </small>
                                            </div>
                                            <div
                                                to="#"
                                                href="#"
                                                className="list-group-item"
                                                aria-current="true"
                                                style={{
                                                    marginBottom: "20px",
                                                    borderTopWidth: "1px",
                                                }}
                                            >
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">
                                                        List group item heading
                                                    </h5>
                                                    <small>3 days ago</small>
                                                </div>
                                                <p className="mb-1">
                                                    Some placeholder content in
                                                    a paragraph.
                                                </p>
                                                <small>
                                                    And some small print.
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <> </>
                )}
            </div>
        </>
    );
};

export default AdminPanel;
