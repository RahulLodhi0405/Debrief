import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuth = localStorage.getItem("token"); // or use context

  return !isAuth ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;