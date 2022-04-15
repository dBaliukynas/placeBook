import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RolesTable from "../components/tables/RolesTable";
import EditIcon from "../components/svgs/EditIcon";
import TrashIcon from "../components/svgs/TrashIcon";
import UsersTable from "../components/tables/UsersTable";

const AdminPanel = () => {
    const handleMainContentChange = (name, component) => {
        setMainContent({ name, component });
    };

    useEffect(() => {
        fetch(`/api/users`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    // setError(response);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data) {
                    setUsers(data);
                }
            });
    }, []);
    useEffect(() => {
        fetch(`/api/roles`, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    // setError(response);
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data) {
                    setRoles(data);
                }
            });
    }, []);

    const [mainContent, setMainContent] = useState({ name: "Dashboard" });

    const presentDate = new Date();

    const [users, setUsers] = useState(undefined);
    const [roles, setRoles] = useState(undefined);

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
                            ? "list-group-item list-group-item-action button-selected top-navigation-first"
                            : "list-group-item list-group-item-action top-navigation-first"
                    }
                    onClick={() => handleMainContentChange("Dashboard")}
                >
                    Dashboard
                </button>
                <button
                    type="button"
                    className={
                        mainContent.name == "History"
                            ? "list-group-item list-group-item-action button-selected"
                            : "list-group-item list-group-item-action"
                    }
                    onClick={() => handleMainContentChange("History", History)}
                >
                    History
                </button>
                <button
                    type="button"
                    className={
                        mainContent.name == "Other"
                            ? "list-group-item list-group-item-action button-selected top-navigation-last "
                            : "list-group-item list-group-item-action top-navigation-last "
                    }
                    onClick={() => handleMainContentChange("Other", Other)}
                >
                    Other
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
                                                            marginLeft: "auto",
                                                        }}
                                                    >
                                                        <TrashIcon
                                                            role="button"
                                                            className="trash-icon-red"
                                                        />

                                                        <EditIcon
                                                            role="button"
                                                            className="edit-icon-sand"
                                                        />
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

                        <UsersTable
                            users={users}
                            roles={roles}
                            presentDate={presentDate}
                        />
                        <RolesTable roles={roles} />
                    </div>
                ) : (
                    <> </>
                )}
            </div>
        </>
    );
};

export default AdminPanel;
