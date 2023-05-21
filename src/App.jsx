import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Menu from "./components/navigation/Menu";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedHomeRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"login"} />;
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
            <Route path={"login"} element={<Login />} />
            <Route path={"register"} element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
