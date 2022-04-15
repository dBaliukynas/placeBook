export const rolesColumns = (rolesToBeEdited) => {
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
            format: (row) =>
                rolesToBeEdited.find(
                    (roleToBeEdited) => roleToBeEdited.id == row.id
                ) ? (
                    <input
                        className="form-control"
                        type="text"
                        value={row.name}
                        aria-label="edit input"
                    ></input>
                ) : (
                    row.name
                ),
        },
        { name: "Actions", selector: (row) => row.actions, center: true },
    ];
};
