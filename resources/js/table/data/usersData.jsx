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

            role: true ? (
                user.role
            ) : (
                <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                >
                    <option defaultValue>{user.role}</option>
                    {/* <option value="1">One</option> */}
                </select>
            ),
            name: true ? (
                user.name
            ) : (
                <input
                    className="form-control"
                    type="text"
                    value={user.name}
                    aria-label="edit input"
                ></input>
            ),
            email: true ? (
                user.email
            ) : (
                <input
                    className="form-control"
                    type="text"
                    value={user.email}
                    aria-label="edit input"
                ></input>
            ),
            created: true ? (
                // <span
                //     title={new Date(user.created_at).toLocaleDateString(
                //         "en-CA",
                //         {
                //             year: "numeric",
                //             month: "2-digit",
                //             day: "2-digit",
                //             weekday: "long",
                //             hour: "2-digit",
                //             hour12: false,
                //             minute: "2-digit",
                //             second: "2-digit",
                //         }
                //     )}
                // >
                //     {" "}
                //     <DateDifference
                //         dateDifference={presentDate - new Date(user.created_at)}
                //     />{" "}
                //     ago
                // </span>
                user.created_at
            ) : (
                <input
                    className="form-control"
                    type="text"
                    value={user.created_at}
                    aria-label="edit input"
                ></input>
            ),
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
