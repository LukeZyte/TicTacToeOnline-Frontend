import { Navigate } from "react-router";
import { NavigationRoutes } from "../utils/enums/navigation-routes.enum";
import { useAuth } from "../hooks/useAuth.hook";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    console.log("isAuth");
    console.log(isAuthenticated);
    return <Navigate to={`/${NavigationRoutes.SignIn}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
