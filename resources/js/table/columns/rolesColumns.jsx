import CloseIcon from "../../components/svgs/CloseIcon";
import EditIcon from "../../components/svgs/EditIcon";
import TrashIcon from "../../components/svgs/TrashIcon";

export const rolesColumns = (
    rolesToBeEdited,
    handleNameChange,
    setRoleToBeDeleted,
    editRole
) => {
    return [
        {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
            width: "150px",
        },

        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            grow: 4.55,
            format: (row) =>
                rolesToBeEdited.find(
                    (roleToBeEdited) =>
                        roleToBeEdited.row.id == row.id &&
                        roleToBeEdited.isBeingEdited
                ) ? (
                    rolesToBeEdited
                        .filter(
                            (roleToBeEdited) => roleToBeEdited.row.id == row.id
                        )
                        .map((roleToBeEdited) => (
                            <input
                                className="form-control"
                                type="text"
                                value={roleToBeEdited.row.name}
                                title={roleToBeEdited.row.name}
                                aria-label="edit input"
                                onChange={(event) =>
                                    handleNameChange(event, roleToBeEdited)
                                }
                                key={row.id}
                                id={row.id}
                            ></input>
                        ))
                ) : (
                    <span title={row.name}>{row.name}</span>
                ),
        },
        {
            name: "Actions",
            selector: (row) => row.actions,
            center: true,
            format: (row) => (
                <>
                    <TrashIcon
                        role="button"
                        className="trash-icon-red"
                        onClick={() =>
                            setRoleToBeDeleted({
                                id: row.id,
                                name: row.name,
                            })
                        }
                        dataBsToggle="modal"
                        dataBsTarget="#deleteRoleModal"
                    />
                    {!rolesToBeEdited.find(
                        (roleToBeEdited) =>
                            roleToBeEdited.row.id == row.id &&
                            roleToBeEdited.isBeingEdited
                    ) ? (
                        <EditIcon
                            role="button"
                            className="edit-icon-sand"
                            onClick={() =>
                                editRole({
                                    id: row.id,
                                    name: row.name,
                                })
                            }
                        />
                    ) : (
                        <CloseIcon
                            role="button"
                            className="edit-icon-sand"
                            onClick={() =>
                                editRole({
                                    id: row.id,
                                    name: row.name,
                                })
                            }
                        />
                    )}
                </>
            ),
        },
    ];
};
