export const rolesColumns = () => {
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
        },
    ];
};
