import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import Profile from "./components/Profile/Profile";
import { useContext, useEffect } from "react";
import { tokenContext } from "./context/tokenContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },

      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  let { setToken } = useContext(tokenContext);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
