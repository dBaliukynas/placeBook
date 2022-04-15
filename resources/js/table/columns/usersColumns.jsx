import DateDifference from "../../components/DateDifference";

export const usersColumns = (usersToBeEdited, presentDate, roles) => {
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
            format: (row) =>
                usersToBeEdited.find(
                    (userToBeEdited) => userToBeEdited.id == row.id
                ) ? (
                    <select
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                    >
                        <option defaultValue>{row.role}</option>
                        {roles
                            .filter((role) => role.name != row.role)
                            .map((role, index) => (
                                <option key={index} value={index}>
                                    {role.name}
                                </option>
                            ))}
                    </select>
                ) : (
                    row.role
                ),
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            format: (row) =>
                usersToBeEdited.find(
                    (userToBeEdited) => userToBeEdited.id == row.id
                ) ? (
                    <input
                        className="form-control"
                        type="text"
                        value={row.name}
                        title={row.name}
                        aria-label="edit input"
                    ></input>
                ) : (
                    <span title={row.name}>{row.name}</span>
                ),
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            format: (row) =>
                usersToBeEdited.find(
                    (userToBeEdited) => userToBeEdited.id == row.id
                ) ? (
                    <input
                        className="form-control"
                        type="text"
                        value={row.email}
                        title={row.email}
                        aria-label="edit input"
                    ></input>
                ) : (
                    <span title={row.email}>{row.email}</span>
                ),
        },
        {
            name: "Created",
            selector: (row) => row.created,
            sortable: true,
            format: (row) => (
                <span
                    title={new Date(row.created).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        weekday: "long",
                        hour: "2-digit",
                        hour12: false,
                        minute: "2-digit",
                        second: "2-digit",
                    })}
                >
                    {" "}
                    <DateDifference
                        dateDifference={presentDate - new Date(row.created)}
                    />{" "}
                    ago
                </span>
            ),
        },
        {
            name: "Actions",
            selector: (row) => row.actions,
            center: true,
        },
    ];
};
