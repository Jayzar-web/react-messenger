import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedHomeRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };

  const ProtectedRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to={"/"} />;
    }
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"}>
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
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path={"register"}
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
