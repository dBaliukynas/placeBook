export const usersColumns = () => {
    return [
        {
            name: "Id",
            selector: (row) => row.id,
            sortable: true,
            width: "150px",
        },
        {
            name: "Role",
            selector: (row) => row.role,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Created",
            selector: (row) => row.created,
            sortable: true,
        },
        {
            name: "Actions",
            selector: (row) => row.actions,
            center: true,
        },
    ];
};
