import CloseIcon from "../../components/svgs/CloseIcon";
import EditIcon from "../../components/svgs/EditIcon";
import TrashIcon from "../../components/svgs/TrashIcon";

export const rolesData = (
    roles,
    rolesToBeEdited,
    editRole,
    deleteRole
) => {
    return (
        roles &&
        roles.map((role) => ({
            id: role.id,

            name: role.name,

            actions: (
                <>
                    <TrashIcon
                        role="button"
                        className="trash-icon-red"
                        onClick={() => deleteRole(role.id)}
                        dataBsToggle="modal"
                        dataBsTarget="#deleteRoleModal"
                    />
                    {!rolesToBeEdited.find(
                        (roleToBeEdited) => roleToBeEdited.id == role.id
                    ) ? (
                        <EditIcon
                            role="button"
                            className="edit-icon-sand"
                            onClick={() => editRole(role.id)}
                        />
                    ) : (
                        <CloseIcon
                            role="button"
                            className="edit-icon-sand"
                            onClick={() => editRole(role.id)}
                        />
                    )}
                </>
            ),
        }))
    );
};
