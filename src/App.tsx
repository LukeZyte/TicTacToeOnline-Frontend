import { BrowserRouter, Route, Routes } from "react-router";
import Auth from "./pages/Auth";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
