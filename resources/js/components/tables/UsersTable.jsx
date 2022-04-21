import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Pagination from "../Pagination";
import { usersColumns } from "../../table/columns/usersColumns";
import { usersData } from "../../table/data/usersData";
import VerticallyCenteredModal from "../modals/VerticallyCenteredModal";
import defaultFetchOptions from "../DefaultFetchOptions";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

const UsersTable = (props) => {
    const handleSelectedRow = (event) => {
        setSelectedRows(event.selectedRows);
    };
    const deleteUser = (id) => {
        setUserToBeDeleted(props.users.find((user) => user.id == id));
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
                props.users.find((user) => user.id == id),
            ]);
        }
    };
    const editUsers = () => {
        setUsersToBeEdited(props.users);
    };

    const handleNameChange = (event) => {
        const name = event.target.value;
        validateName(name);
        setName(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        validateEmail(email);
        setEmail(event.target.value);
    };

    const validateName = (name) => {
        if (!name.match("^.{0,100}$") || !name) {
            setErrorName(
                "Name cannot be empty and contain more than 100 characters."
            );
        } else {
            setErrorName("");
        }
    };
    const validateEmail = (email) => {
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            setErrorEmail("Email is not correct.");
        } else {
            setErrorEmail("");
        }
    };

    const createUser = () => {
        if (userFields.every((userField) => userField != "")) {
            const toastId = toast("Creating a user...", { isLoading: true });

            fetch("/api/user", {
                method: "POST",
                ...defaultFetchOptions,
                body: JSON.stringify({
                    name,
                    email,
                    role,
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
                                            {index != 0 && "\n"}• {dataError[0]}{" "}
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
                    } else {
                        setName("");
                        setEmail("");
                        setRole("regular");
                        toast.update(toastId, {
                            render: "User has been successfully created.",
                            type: "success",
                            autoClose: 5000,
                            isLoading: false,
                        });
                    }
                })
            );
        }
    };

    const [selectedRows, setSelectedRows] = useState(undefined);
    const [userToBeDeleted, setUserToBeDeleted] = useState(undefined);
    const [usersToBeEdited, setUsersToBeEdited] = useState([]);

    const changePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const itemsPerPage = 20;
    const maxPagesShown = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentUsers = props.users?.slice(indexOfFirstItem, indexOfLastItem);

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState("");
    const [role, setRole] = useState("regular");
    const [errorRole, setErrorRole] = useState("");

    const userFields = [name, email, role];
    const errors = [errorEmail, errorName, errorRole];

    return (
        <div className="card" style={{ marginTop: "20px" }}>
            <div
                className="card-body"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <h5 className="card-title">Users</h5>
                    <div className="card" style={{ marginTop: "20px" }}>
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
                                    selectedRows && selectedRows.length != 0
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
                                    selectedRows && selectedRows.length != 0
                                        ? "btn btn-danger"
                                        : "btn btn-danger disabled"
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                {props.users ? (
                    <DataTable
                        columns={usersColumns(
                            usersToBeEdited,
                            props.presentDate,
                            props.roles
                        )}
                        data={usersData(
                            currentUsers,
                            usersToBeEdited,
                            props.presentDate,
                            editUser,
                            deleteUser
                        )}
                        selectableRows
                        highlightOnHover={true}
                        onSelectedRowsChange={handleSelectedRow}
                    />
                ) : (
                    <Spinner color="text-primary" />
                )}

                {props.users ? (
                    <Pagination
                        itemsLength={props.users.length}
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
            <VerticallyCenteredModal
                id="deleteUserModal"
                buttonText="Delete"
                title="Delete user"
                buttonType="btn-danger"
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
                disabled={
                    !(
                        userFields.every((userField) => userField != "") &&
                        errors.every((error) => error == "")
                    )
                }
                body={
                    <>
                        <form className="user-create-form">
                            <label
                                className="form-label"
                                htmlFor="userNameInput"
                            >
                                Name
                            </label>
                            <input
                                className={
                                    errorName
                                        ? "form-control input-error"
                                        : "form-control"
                                }
                                type="text"
                                aria-label="user name"
                                id="userNameInput"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <span className="input-error-message">
                                {errorName}
                            </span>
                            <label
                                className="form-label"
                                htmlFor="userEmailInput"
                                style={{ marginTop: "10px" }}
                            >
                                Email
                            </label>
                            <input
                                className={
                                    errorEmail
                                        ? "form-control input-error"
                                        : "form-control"
                                }
                                type="email"
                                aria-label="user email"
                                id="userEmailInput"
                              
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <span className="input-error-message">
                                {errorEmail}
                            </span>
                            <label
                                className="form-label"
                                htmlFor="userRoleInput"
                                style={{ marginTop: "10px" }}
                            >
                                Role
                            </label>
                            <select
                                className="form-select"
                                aria-label="User role select"
                                onChange={handleRoleChange}
                                value={role}
                            >
                                <option defaultValue>regular</option>
                                {props.roles &&
                                    props.roles
                                        .filter(
                                            (role) => role.name != "regular"
                                        )
                                        .map((role, index) => (
                                            <option key={index} value={role.name}>
                                                {role.name}
                                            </option>
                                        ))}
                            </select>
                        </form>
                    </>
                }
            />
        </div>
    );
};
export default UsersTable;
