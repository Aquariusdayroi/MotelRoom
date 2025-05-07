import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthToken } from "../authToken";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthToken);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
