export const rolesData = (roles) => {
    return (
        roles &&
        roles.map((role) => ({
            id: role.id,

            name: true ? (
                role.name
            ) : (
                <input
                    className="form-control"
                    type="text"
                    value={role.name}
                    aria-label="edit input"
                ></input>
            ),
            // actions: (
            //     <>
            //         <TrashIcon
            //             role="button"
            //             className="trash-icon-red"
            //             // onClick={() => deleteUser(user.id)}
            //             dataBsToggle="modal"
            //             dataBsTarget="#deleteUserModal"
            //         />
            //         {!usersToBeEdited.find(
            //             (userToBeEdited) => userToBeEdited.id == user.id
            //         ) ? (
            //             <EditIcon
            //                 role="button"
            //                 className="edit-icon-sand"
            //                 onClick={() => editUser(user.id)}
            //             />
            //         ) : (
            //             <CloseIcon
            //                 role="button"
            //                 className="edit-icon-sand"
            //                 onClick={() => editUser(user.id)}
            //             />
            //         )}
            //     </>
            // ),
        }))
    );
};
