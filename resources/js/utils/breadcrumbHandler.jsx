export const breadcrumbHandler = (location) => {
    if (authUser.role == "admin") {
        if (location.pathname == "/admin-panel") {
            return true;
        }
    }
    if (
        !location.pathname.match("/property/[0-9]") &&
        location.pathname != "/" &&
        location.pathname != "/admin-panel"
    ) {
        return true;
    }
};
