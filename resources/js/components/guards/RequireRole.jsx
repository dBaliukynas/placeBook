import HTTPError from "../HTTPError";

const RequireRole = ({ children }) => {
    if (authUser.role != "admin") {
        return <HTTPError status={403} message="Page forbidden" />;
    } else {
        return children;
    }
};

export default RequireRole;
