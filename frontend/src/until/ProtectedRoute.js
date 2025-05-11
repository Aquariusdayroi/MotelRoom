import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthToken } from "../authToken";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const location = useLocation();
    const { user, role } = useContext(AuthToken);

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/home" replace />;
    }

    return children;
};
export default ProtectedRoute;
