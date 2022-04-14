import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import EditIcon from "../components/svgs/EditIcon";
import TrashIcon from "../components/svgs/TrashIcon";
import VerticallyCenteredModal from "../components/VerticallyCenteredModal";
import { usersColumns } from "../table/columns/usersColumns";
import { usersData } from "../table/data/usersData";
import { rolesColumns } from "../table/columns/rolesColumns";
import { rolesData } from "../table/data/rolesData";
import Pagination from "../components/Pagination";

const AdminPanel = () => {
    const [usersToBeEdited, setUsersToBeEdited] = useState([]);
    // useEffect(() => console.log(usersToBeEdited));
    // useEffect(() => console.log(selectedRows));
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
    const handleMainContentChange = (name, component) => {
        setMainContent({ name, component });
    };
    const handleSelectedRow = (event) => {
        setSelectedRows(event.selectedRows);
    };
    const deleteUser = (id) => {
        setUserToBeDeleted(users.find((user) => user.id == id));
    };
    const editUser = (id) => {
        if (usersToBeEdited.find((user) => user.id == id)) {
            setUsersToBeEdited(
                usersToBeEdited.filter(
                    (userToBeEdited) => userToBeEdited.id != id
                )
            );
        } else {
            setUsersToBeEdited((usersToBeEdited) => [
                ...usersToBeEdited,
                users.find((user) => user.id == id),
            ]);
        }
    };
    const editUsers = () => {
        setUsersToBeEdited(users);
    };

    const createUser = () => {};

    const [mainContent, setMainContent] = useState({ name: "Dashboard" });

    const presentDate = new Date();

    const [users, setUsers] = useState(undefined);
    const [roles, setRoles] = useState(undefined);
    const [selectedRows, setSelectedRows] = useState(undefined);
    const [userToBeDeleted, setUserToBeDeleted] = useState(undefined);

    const changePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const itemsPerPage = 20;
    const maxPagesShown = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentUsers = users?.slice(indexOfFirstItem, indexOfLastItem);

    const columns = [
        {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
            width: "150px",
        },
        {
            name: "Role",
            selector: (row) => row.role,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Created",
            selector: (row) => row.created,
            sortable: true,
        },
        {
            name: "Actions",
            selector: (row) => row.actions,
            center: true,
        },
    ];

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

                        <div className="card" style={{ marginTop: "20px" }}>
                            <div className="card-body">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h5 className="card-title">Users</h5>
                                    <div
                                        className="card"
                                        style={{ marginTop: "20px" }}
                                    >
                                        <div
                                            className="card-body"
                                            style={{ padding: "0.4rem 0.4rem" }}
                                        >
                                            {" "}
                                            <button
                                                className="btn btn-primary"
                                                style={{ marginRight: "10px" }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#createUserModal"
                                            >
                                                Create
                                            </button>
                                            <button
                                                className={
                                                    selectedRows &&
                                                    selectedRows.length != 0
                                                        ? "btn btn-warning"
                                                        : "btn btn-warning disabled"
                                                }
                                                style={{ marginRight: "10px" }}
                                                onClick={() => editUsers()}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={
                                                    selectedRows &&
                                                    selectedRows.length != 0
                                                        ? "btn btn-danger"
                                                        : "btn btn-danger disabled"
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {users ? (
                                    <DataTable
                                        columns={usersColumns( usersToBeEdited, presentDate)}
                                        data={usersData(
                                            currentUsers,
                                            usersToBeEdited,
                                            presentDate,
                                            editUser,
                                            deleteUser
                                        )}
                                        selectableRows
                                        highlightOnHover={true}
                                        onSelectedRowsChange={handleSelectedRow}
                                    />
                                ) : (
                                    <></>
                                )}

                                {users ? (
                                    <Pagination
                                        itemsLength={users.length}
                                        itemsPerPage={itemsPerPage}
                                        changePage={changePage}
                                        currentPage={currentPage}
                                        maxPagesShown={maxPagesShown}
                                        className="admin-panel-users-table"
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        <div className="card" style={{ marginTop: "20px" }}>
                            <div className="card-body">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h5 className="card-title">User roles</h5>
                                    <div
                                        className="card"
                                        style={{ marginTop: "20px" }}
                                    >
                                        <div
                                            className="card-body"
                                            style={{ padding: "0.4rem 0.4rem" }}
                                        >
                                            {" "}
                                            <button
                                                className="btn btn-primary"
                                                style={{ marginRight: "10px" }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#createRoleModal"
                                            >
                                                Create
                                            </button>
                                            <button
                                                className={
                                                    selectedRows &&
                                                    selectedRows.length != 0
                                                        ? "btn btn-warning"
                                                        : "btn btn-warning disabled"
                                                }
                                                style={{ marginRight: "10px" }}
                                                onClick={() => editUsers()}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={
                                                    selectedRows &&
                                                    selectedRows.length != 0
                                                        ? "btn btn-danger"
                                                        : "btn btn-danger disabled"
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {roles ? (
                                    <DataTable
                                        columns={rolesColumns()}
                                        data={rolesData(roles)}
                                        selectableRows
                                        highlightOnHover={true}
                                        onSelectedRowsChange={handleSelectedRow}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <> </>
                )}
                <VerticallyCenteredModal
                    id="deleteUserModal"
                    buttonText="Delete"
                    title="Delete user"
                    buttonType="btn-danger"
                    onClick={deleteUser}
                    body={
                        <>
                            <p>
                                Are you sure you want to delete user{" "}
                                <strong>{userToBeDeleted?.name}</strong>?
                            </p>
                        </>
                    }
                />
                <VerticallyCenteredModal
                    id="createUserModal"
                    buttonText="Create"
                    title="Create user"
                    buttonType="btn-primary"
                    onClick={createUser}
                    // disabled={propertyDeleteName != property?.name}
                    body={
                        <>
                            <form>
                                <label
                                    className="form-label"
                                    htmlFor="userNameInput"
                                >
                                    Name
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    aria-label="user name"
                                    id="userNameInput"
                                    style={{ marginBottom: "10px" }}
                                />
                                <label
                                    className="form-label"
                                    htmlFor="userEmailInput"
                                >
                                    Email
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    aria-label="user email"
                                    id="userEmailInput"
                                    style={{ marginBottom: "10px" }}
                                />
                                <label
                                    className="form-label"
                                    htmlFor="userRoleInput"
                                >
                                    Role
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="User role select"
                                >
                                    <option defaultValue>regular</option>
                                    {roles &&
                                        roles
                                            .filter(
                                                (role) => role.name != "regular"
                                            )
                                            .map((role, index) => (
                                                <option key={index} value="1">
                                                    {role.name}
                                                </option>
                                            ))}
                                </select>
                            </form>
                        </>
                    }
                />
                <VerticallyCenteredModal
                    id="createRoleModal"
                    buttonText="Create"
                    title="Create user role"
                    buttonType="btn-primary"
                    onClick={createUser}
                    // disabled={propertyDeleteName != property?.name}
                    body={
                        <>
                            <form>
                                <label
                                    className="form-label"
                                    htmlFor="userRoleNameInput"
                                >
                                    Name
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    aria-label="user role"
                                    id="userRoleNameInput"
                                />
                            </form>
                        </>
                    }
                />
            </div>
        </>
    );
};

export default AdminPanel;
