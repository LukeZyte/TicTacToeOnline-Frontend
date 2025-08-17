import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Auth from "./pages/Auth";
import SignUp from "./pages/SignUp";
import Board from "./pages/Board";
import ProtectedRoute from "./components/ProtectedRoute";
import { NavigationRoutes } from "./utils/enums/navigation-routes.enum";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/${NavigationRoutes.SignIn}`} element={<Auth />} />
        <Route path={`/${NavigationRoutes.SignUp}`} element={<SignUp />} />
        <Route
          path={`/${NavigationRoutes.Board}/:boardCode`}
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${NavigationRoutes.Dashboard}`}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
