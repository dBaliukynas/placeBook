import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Pagination from "../Pagination";
import { usersColumns } from "../../table/columns/usersColumns";
import { usersData } from "../../table/data/usersData";
import defaultFetchOptions from "../DefaultFetchOptions";
import VerticallyCenteredModal from "../modals/VerticallyCenteredModal";
import Spinner from "../Spinner";
import UserCreation from "./UserCreation";
import { toast } from "react-toastify";

const UsersTable = (props) => {
    const handleSelectedRow = (event) => {
        // console.log(event.allSelected);
        setSelectedRows(event.selectedRows);
    };
    const deleteUser = (id) => {
        setUserToBeDeleted(props.users.find((user) => user.id == id));
    };
    const editUser = (row) => {
        if (
            usersToBeEdited.find(
                (userToBeEdited) => userToBeEdited.row.id == row.id
            )
        ) {
            let newState = [...usersToBeEdited];

            let index = usersToBeEdited.findIndex(
                (userToBeEdited) => userToBeEdited.row.id == row.id
            );
            newState[index].isBeingEdited = !newState[index].isBeingEdited;

            setUsersToBeEdited(newState);
        } else {
            setUsersToBeEdited((usersToBeEdited) => [
                ...usersToBeEdited,
                { row, isBeingEdited: true },
            ]);
        }
    };
    const editUsers = () => {
        const usersToBeEdited = selectedRows.map((selectedRow) => ({
            row: {
                id: selectedRow.id,
                role: selectedRow.role,
                name: selectedRow.name,
                email: selectedRow.email,
            },
            isBeingEdited: true,
        }));
        setUsersToBeEdited(usersToBeEdited);
    };

    const saveEditedUsers = () => {
        const toastId = toast("Updating users...", { isLoading: true });
        const usersToBeEditedFiltered = usersToBeEdited.map(
            (userToBeEdited) => userToBeEdited.row
        );

        fetch(`/api/users/edit`, {
            method: "PUT",
            ...defaultFetchOptions,
            body: JSON.stringify({ users: usersToBeEditedFiltered }),
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
                    toast.update(toastId, {
                        render: "Users have been successfully updated.",
                        type: "success",
                        autoClose: 5000,
                        isLoading: false,
                    });
                }
            })
        );
    };

    const [selectedRows, setSelectedRows] = useState(undefined);
    const [userToBeDeleted, setUserToBeDeleted] = useState(undefined);
    const [usersToBeEdited, setUsersToBeEdited] = useState([]);

    const changePage = (pageIndex) => {
        setCurrentPage(pageIndex);
        setToggleClearRows(!toggleClearRows);
    };

    const itemsPerPage = 10;
    const maxPagesShown = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentUsers = props.users?.slice(indexOfFirstItem, indexOfLastItem);

    const [toggleClearRows, setToggleClearRows] = useState(false);

    const handleUserRoleChange = (event, userToBeEdited) => {
        let newUsersToBeEdited = [...usersToBeEdited];

        userToBeEdited.row.role = event.target.value;
        newUsersToBeEdited[usersToBeEdited.indexOf(userToBeEdited)] =
            userToBeEdited;
        setUsersToBeEdited(newUsersToBeEdited);
    };

    const handleUserNameChange = (event, userToBeEdited) => {
        let newUsersToBeEdited = [...usersToBeEdited];

        userToBeEdited.row.name = event.target.value;
        newUsersToBeEdited[usersToBeEdited.indexOf(userToBeEdited)] =
            userToBeEdited;
        setUsersToBeEdited(newUsersToBeEdited);
    };

    const handleUserEmailChange = (event, userToBeEdited) => {
        let newUsersToBeEdited = [...usersToBeEdited];

        userToBeEdited.row.email = event.target.value;
        newUsersToBeEdited[usersToBeEdited.indexOf(userToBeEdited)] =
            userToBeEdited;
        setUsersToBeEdited(newUsersToBeEdited);
    };

    useEffect(() => console.log(usersToBeEdited));

    return (
        <div className="card" style={{ marginTop: "20px" }}>
            <div
                className="card-body"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <h5 className="card-title">Users</h5>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <div style={{ marginTop: "20px" }}>
                        <button
                            className={`btn btn-primary ${
                                usersToBeEdited.length == 0 && "disabled"
                            } `}
                            onClick={saveEditedUsers}
                        >
                            Save
                        </button>
                    </div>
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
                            handleUserRoleChange,
                            handleUserNameChange,
                            handleUserEmailChange,
                            deleteUser,
                            editUser
                        )}
                        data={usersData(currentUsers)}
                        selectableRows
                        onSelectedRowsChange={handleSelectedRow}
                        highlightOnHover={true}
                        clearSelectedRows={toggleClearRows}
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
