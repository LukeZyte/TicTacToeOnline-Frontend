import { BrowserRouter, Route, Routes } from "react-router";
import Auth from "./pages/Auth";
import SignUp from "./pages/SignUp";
import Board from "./pages/Board";
import ProtectedRoute from "./components/ProtectedRoute";
import { NavigationRoutes } from "./utils/enums/navigation-routes.enum";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/${NavigationRoutes.SignIn}`} element={<Auth />} />
        <Route path={`/${NavigationRoutes.SignUp}`} element={<SignUp />} />
        <Route
          path={`/${NavigationRoutes.Board}`}
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
