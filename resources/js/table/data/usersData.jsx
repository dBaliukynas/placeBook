export const usersData = (users) => {
    return (
        users &&
        users.map((user) => ({
            id: user.id,

            role: user.role,

            name: user.name,

            email: user.email,

            created: user.created_at,

            actions: <></>,
        }))
    );
};
