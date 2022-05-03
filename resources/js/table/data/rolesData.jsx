export const rolesData = (roles) => {
    return (
        roles &&
        roles.map((role) => ({
            id: role.id,

            name: role.name,

            actions: <></>,
        }))
    );
};
