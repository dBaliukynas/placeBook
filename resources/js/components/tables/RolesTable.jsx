import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import VerticallyCenteredModal from "../modals/VerticallyCenteredModal";
import { rolesColumns } from "../../table/columns/rolesColumns";
import { rolesData } from "../../table/data/rolesData";
import Spinner from "../Spinner";
import defaultFetchOptions from "../fetch-options/defaultFetchOptions";
import { toast } from "react-toastify";
import RoleCreation from "./RoleCreation";

const RolesTable = (props) => {
    const handleSelectedRow = (event) => {
        setSelectedRows(event.selectedRows);
    };

    const deleteRole = (id) => {
        const toastId = toast("Deleting a role...", { isLoading: true });
        fetch(`/api/role/${roleToBeDeleted.id}`, {
            method: "DELETE",
            ...defaultFetchOptions,
        })
            .then((response) => {
                if (!response.ok) {
                } else {
                    return response.json();
                }
            })
            .then(() => {
                toast.update(toastId, {
                    render: "Role has been successfully deleted.",
                    type: "success",
                    autoClose: 5000,
                    isLoading: false,
                });
            });
    };

    const deleteRoles = () => {
        const roleIds = selectedRows.map((selectedRow) => selectedRow.id);

        const toastId = toast("Deleting roles...", { isLoading: true });
        fetch(`/api/roles`, {
            method: "DELETE",
            ...defaultFetchOptions,
            body: JSON.stringify({ roleIds }),
        })
            .then((response) => {
                if (!response.ok) {
                } else {
                    return response.json();
                }
            })
            .then(() => {
                toast.update(toastId, {
                    render: "Roles have been successfully deleted.",
                    type: "success",
                    autoClose: 5000,
                    isLoading: false,
                });
            });
    };

    const editRole = (row) => {
        if (
            rolesToBeEdited.find(
                (roleToBeEdited) => roleToBeEdited.row.id == row.id
            )
        ) {
            let newState = [...rolesToBeEdited];

            let index = rolesToBeEdited.findIndex(
                (roleToBeEdited) => roleToBeEdited.row.id == row.id
            );
            newState[index].isBeingEdited = !newState[index].isBeingEdited;

            setRolesToBeEdited(newState);
        } else {
            setRolesToBeEdited((rolesToBeEdited) => [
                ...rolesToBeEdited,
                { row, isBeingEdited: true },
            ]);
        }
    };

    const editRoles = () => {
        const rolesToBeEdited = selectedRows.map((selectedRow) => ({
            row: {
                id: selectedRow.id,
                name: selectedRow.name,
            },
            isBeingEdited: true,
        }));
        setRolesToBeEdited(rolesToBeEdited);
    };

    const saveEditedRoles = () => {
        const toastId = toast("Updating roles...", { isLoading: true });
        const rolesToBeEditedFiltered = rolesToBeEdited.map(
            (roleToBeEdited) => roleToBeEdited.row
        );

        fetch(`/api/roles`, {
            method: "PUT",
            ...defaultFetchOptions,
            body: JSON.stringify({ roles: rolesToBeEditedFiltered }),
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
                        render: "Roles have been successfully updated.",
                        type: "success",
                        autoClose: 5000,
                        isLoading: false,
                    });
                }
            })
        );
    };

    const handleNameChange = (event, roleToBeEdited) => {
        let newRolesToBeEdited = [...rolesToBeEdited];

        roleToBeEdited.row.name = event.target.value;
        newRolesToBeEdited[rolesToBeEdited.indexOf(roleToBeEdited)] =
            roleToBeEdited;
        setRolesToBeEdited(newRolesToBeEdited);
    };

    const [selectedRows, setSelectedRows] = useState(undefined);

    const [rolesToBeEdited, setRolesToBeEdited] = useState([]);
    const [roleToBeDeleted, setRoleToBeDeleted] = useState(undefined);

    return (
        <div className="card" style={{ marginTop: "20px" }}>
            <div
                className="card-body"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <h5 className="card-title">User roles</h5>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div style={{ marginTop: "20px" }}>
                        <button
                            className={`btn btn-primary ${
                                rolesToBeEdited.length == 0 && "disabled"
                            } `}
                            onClick={saveEditedRoles}
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
                                data-bs-target="#createRoleModal"
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
                                onClick={() => editRoles()}
                            >
                                Edit
                            </button>
                            <button
                                className={
                                    selectedRows && selectedRows.length != 0
                                        ? "btn btn-danger"
                                        : "btn btn-danger disabled"
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#deleteRolesModal"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                {props.roles ? (
                    <DataTable
                        columns={rolesColumns(
                            rolesToBeEdited,
                            handleNameChange,
                            setRoleToBeDeleted,
                            editRole
                        )}
                        data={rolesData(props.roles)}
                        selectableRows
                        highlightOnHover={true}
                        onSelectedRowsChange={handleSelectedRow}
                    />
                ) : (
                    <Spinner color="text-primary" />
                )}
            </div>
            <RoleCreation />
            <VerticallyCenteredModal
                id="deleteRoleModal"
                buttonText="Delete"
                title="Delete role"
                buttonType="btn-danger"
                onClick={deleteRole}
                body={
                    <>
                        <p>
                            Are you sure you want to delete role{" "}
                            <strong>{roleToBeDeleted?.name}</strong>?
                        </p>
                    </>
                }
            />
            <VerticallyCenteredModal
                id="deleteRolesModal"
                buttonText="Delete"
                title="Delete roles"
                buttonType="btn-danger"
                onClick={deleteRoles}
                body={
                    <>
                        <p>Are you sure you want to delete selected roles?</p>
                    </>
                }
            />
        </div>
    );
};
export default RolesTable;
