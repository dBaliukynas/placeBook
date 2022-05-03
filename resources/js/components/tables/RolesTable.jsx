import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import VerticallyCenteredModal from "../modals/VerticallyCenteredModal";
import { rolesColumns } from "../../table/columns/rolesColumns";
import { rolesData } from "../../table/data/rolesData";
import Spinner from "../Spinner";
import defaultFetchOptions from "../DefaultFetchOptions";
import { toast } from "react-toastify";

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

    const validateName = (name) => {
        if (!name.match("^.{0,30}$") || !name) {
            setErrorName(
                "Name cannot be empty and contain more than 30 characters."
            );
        } else {
            setErrorName("");
        }
    };

    const handleNameChange = (event) => {
        const name = event.target.value;
        validateName(name);
        setName(event.target.value);
    };

    const createRole = () => {
        if (name != "") {
            const toastId = toast("Creating a role...", { isLoading: true });

            fetch("/api/role", {
                method: "POST",
                ...defaultFetchOptions,
                body: JSON.stringify({
                    name: name.toLowerCase(),
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
                        toast.update(toastId, {
                            render: "Role has been successfully created.",
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

    const [rolesToBeEdited, setRolesToBeEdited] = useState([]);
    const [roleToBeDeleted, setRoleToBeDeleted] = useState(undefined);

    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState("");

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
                            className={`btn btn-primary ${true && "disabled"} `}
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
                    <Spinner color="text-primary" />
                )}
            </div>

            <VerticallyCenteredModal
                id="createRoleModal"
                buttonText="Create"
                title="Create user role"
                buttonType="btn-primary"
                onClick={createRole}
                disabled={!(name != "" && errorName == "")}
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
                                className={
                                    errorName
                                        ? "form-control input-error"
                                        : "form-control"
                                }
                                type="text"
                                aria-label="user role"
                                id="userRoleNameInput"
                                onChange={handleNameChange}
                                value={name}
                            />
                            <span className="input-error-message">
                                {errorName}
                            </span>
                        </form>
                    </>
                }
            />
            <VerticallyCenteredModal
                id="deleteRoleModal"
                buttonText="Delete"
                title="Delete role"
                buttonType="btn-danger"
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
