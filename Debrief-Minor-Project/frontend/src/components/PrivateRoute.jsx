import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("token"); // or use context

  return isAuth ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;