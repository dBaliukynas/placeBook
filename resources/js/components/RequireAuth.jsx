import { useLocation, Navigate } from "react-router-dom";
import Redirecting from "../pages/Redirecting";
import PropertyListing from "../pages/PropertyListing";

const RequireAuth = ({ children }) => {
    const location = useLocation();
    console.log(location);
    if (authUser == null) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
};

export default RequireAuth;
