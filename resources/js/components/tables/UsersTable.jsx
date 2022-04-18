import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Pagination from "../Pagination";
import { usersColumns } from "../../table/columns/usersColumns";
import { usersData } from "../../table/data/usersData";
import VerticallyCenteredModal from "../modals/VerticallyCenteredModal";
import Spinner from "../Spinner";

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

    const createUser = () => {};

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

    return (
        <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body"   style={{ display: "flex", flexDirection: "column" }}>
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
                                {props.roles &&
                                    props.roles
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
        </div>
    );
};
export default UsersTable;
