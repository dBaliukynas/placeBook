import DateDifference from "../../components/DateDifference";
import CloseIcon from "../../components/svgs/CloseIcon";
import EditIcon from "../../components/svgs/EditIcon";
import TrashIcon from "../../components/svgs/TrashIcon";

export const usersData = (
    users,
    usersToBeEdited,
    presentDate,
    editUser,
    deleteUser
) => {
    return (
        users &&
        users.map((user) => ({
            id: user.id,

            role: user.role,

            name: user.name,

            email: user.email,

            created: user.created_at,

            actions: (
                <>
                    <TrashIcon
                        role="button"
                        className="trash-icon-red"
                        onClick={() => deleteUser(user.id)}
                        dataBsToggle="modal"
                        dataBsTarget="#deleteUserModal"
                    />
                    {!usersToBeEdited.find(
                        (userToBeEdited) => userToBeEdited.id == user.id
                    ) ? (
                        <EditIcon
                            role="button"
                            className="edit-icon-sand"
                            onClick={() => editUser(user.id)}
                        />
                    ) : (
                        <CloseIcon
                            role="button"
                            className="edit-icon-sand"
                            onClick={() => editUser(user.id)}
                        />
                    )}
                </>
            ),
        }))
    );
};
