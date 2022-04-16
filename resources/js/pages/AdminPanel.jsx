import { useState, useEffect, useLayoutEffect } from "react";
import { useOutletContext } from "react-router-dom";
import RolesTable from "../components/tables/RolesTable";
import UsersTable from "../components/tables/UsersTable";
import PropertyCardHorizontal from "../components/cards/PropertyCardHorizontal";
import PropertyCardHorizontalPlaceholder from "../components/cards/PropertyCardHorizontalPlaceholder";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import ListGroupItem from "../components/lists/ListGroupItem";
import PropertyListGroup from "../components/lists/PropertyListGroup";
import ReviewListGroup from "../components/lists/ReviewListGroup";

const AdminPanel = () => {
    const [showBreadcrumb, setShowBreadcrumb] = useOutletContext();
    useLayoutEffect(() => setShowBreadcrumb(true));

    const handleMainContentChange = (name, component) => {
        setMainContent({ name, component });
    };

    useEffect(() => {
        fetch(`/api/properties?sort=new`, {
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
                    setProperties(data);
                }
            });
    }, []);
    useEffect(() => {
        fetch(`/api/reviews?sort=new`, {
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
                    setReviews(data);
                }
            });
    }, []);
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

    const [properties, setProperties] = useState(undefined);
    const [reviews, setReviews] = useState(undefined);

    const itemsPerPage = 5;
    const maxPagesShown = 5;

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
                        <PropertyListGroup
                            properties={properties}
                            itemsPerPage={itemsPerPage}
                            maxPagesShown={maxPagesShown}
                        />
                        <ReviewListGroup
                            reviews={reviews}
                            itemsPerPage={itemsPerPage}
                            maxPagesShown={maxPagesShown}
                        />

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
