import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
    if (!authUser) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
};

export default RequireAuth;
