import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Pagination from "../Pagination";
import { usersColumns } from "../../table/columns/usersColumns";
import { usersData } from "../../table/data/usersData";
import VerticallyCenteredModal from "../modals/VerticallyCenteredModal";
import Spinner from "../Spinner";
import UserCreation from "./UserCreation";

const UsersTable = (props) => {
    const handleSelectedRow = (event) => {
        console.log(event.allSelected);
        setSelectedRows(event.selectedRows);
    };
    const deleteUser = (id) => {
        setUserToBeDeleted(props.users.find((user) => user.id == id));
    };
    const editUser = (id) => {
        if (usersToBeEdited.find((userToBeEdited) => userToBeEdited.id == id)) {
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
        setUsersToBeEdited(selectedRows);
    };

    const [selectedRows, setSelectedRows] = useState(undefined);
    const [userToBeDeleted, setUserToBeDeleted] = useState(undefined);
    const [usersToBeEdited, setUsersToBeEdited] = useState([]);

    const changePage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const itemsPerPage = 10;
    const maxPagesShown = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentUsers = props.users?.slice(indexOfFirstItem, indexOfLastItem);

    const handleUserNameChange = (event, userToBeEdited) => {
        let newUsersToBeEdited = [...usersToBeEdited];
        // let newUserToBeEdited = [...userToBeEdited];
        // let newUserToBeEdited = { ...newUsersToBeEdited[index] };

        userToBeEdited.name = event.target.value;
        newUsersToBeEdited[usersToBeEdited.indexOf(userToBeEdited)] =
            userToBeEdited;
        setUsersToBeEdited(newUsersToBeEdited);
    };

    console.log(usersToBeEdited);

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
                            props.roles,
                            handleUserNameChange,
                            deleteUser,
                            editUser
                        )}
                        data={usersData(currentUsers)}
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
            <UserCreation roles={props.roles} />
        </div>
    );
};
export default UsersTable;
