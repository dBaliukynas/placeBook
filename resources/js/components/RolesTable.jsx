import { useState } from "react";
import DataTable from "react-data-table-component";
import VerticallyCenteredModal from "./VerticallyCenteredModal";
import { rolesColumns } from "../table/columns/rolesColumns";
import { rolesData } from "../table/data/rolesData";

const RolesTable = (props) => {
    const handleSelectedRow = (event) => {
        setSelectedRows(event.selectedRows);
    };
    const deleteRole = (id) => {
        setRoleToBeDeleted(props.roles.find((role) => role.id == id));
    };
    const editRole = (id) => {
        if (rolesToBeEdited.find((role) => role.id == id)) {
            setRolesToBeEdited(
                rolesToBeEdited.filter(
                    (roleToBeEdited) => roleToBeEdited.id != id
                )
            );
        } else {
            setRolesToBeEdited((rolesToBeEdited) => [
                ...rolesToBeEdited,
                props.roles.find((role) => role.id == id),
            ]);
        }
    };
    const editRoles = () => {
        setRolesToBeEdited(props.roles);
    };

    const createRole = () => {};

    const [selectedRows, setSelectedRows] = useState(undefined);

    const [rolesToBeEdited, setRolesToBeEdited] = useState([]);
    const [roleToBeDeleted, setRoleToBeDeleted] = useState(undefined);

    return (
        <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <h5 className="card-title">User roles</h5>
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
                {props.roles ? (
                    <DataTable
                        columns={rolesColumns(rolesToBeEdited)}
                        data={rolesData(
                            props.roles,
                            rolesToBeEdited,
                            editRole,
                            deleteRole
                        )}
                        selectableRows
                        highlightOnHover={true}
                        onSelectedRowsChange={handleSelectedRow}
                    />
                ) : (
                    <></>
                )}
            </div>

            <VerticallyCenteredModal
                id="createRoleModal"
                buttonText="Create"
                title="Create user role"
                buttonType="btn-primary"
                onClick={createRole}
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
        </div>
    );
};
export default RolesTable;
