import { createBrowserRouter } from "react-router-dom";

import Main from "../layout/Main";
import Home from "../pages/Home/home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/signUp/SignUp";
import Secret from "../Secret";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order/:category",
        element: <Order />,
        //this category used in menu category
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/SignUp",
        element: <SignUp />,
      },
      {
        path: "/secrete",
        element: (
          <PrivateRoute>
            <Secret />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
