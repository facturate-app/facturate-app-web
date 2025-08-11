import { useUser } from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useUser();
  const loggedUser = user.getUser();
  const location = useLocation();

  const isLogged = user.isLogged();

  return isLogged ? (
    <Outlet />
  ) : (
    <Navigate
      to={{
        pathname: "/login",
        search: `?redirect_to=${encodeURIComponent(location.pathname + location.search)}`,
      }}
    />
  );
};

export default ProtectedRoute;
