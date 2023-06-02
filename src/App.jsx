import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Menu from "./components/navigation/Menu";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedHomeRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"login"} />;
    }
    return children;
  };

  const ProtectedLoginRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to={"/"} />;
    }
    return children;
  };

  return (
    <div className="App overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Menu />}>
            <Route
              index
              element={
                <ProtectedHomeRoute>
                  <Home />
                </ProtectedHomeRoute>
              }
            />
            <Route
              path={"login"}
              element={
                <ProtectedLoginRoute>
                  <Login />
                </ProtectedLoginRoute>
              }
            />
            <Route
              path={"register"}
              element={
                <ProtectedLoginRoute>
                  <Register />
                </ProtectedLoginRoute>
              }
            />
            <Route
              path={"reset-password"}
              element={
                <ProtectedLoginRoute>
                  <ResetPassword />
                </ProtectedLoginRoute>
              }
            />
            <Route path={"*"} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
