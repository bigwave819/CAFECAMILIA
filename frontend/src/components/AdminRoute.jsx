import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
        return <Navigate to="/login"/>;
    }

    return user?.role === "admin" ? children : <Navigate to="/login"/>
}

export default AdminRoute