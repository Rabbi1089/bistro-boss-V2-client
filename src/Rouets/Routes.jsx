import { createBrowserRouter } from "react-router-dom";

import Main from "../layout/Main";
import Home from "../pages/Home/home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/signUp/SignUp";
import Secret from "../Secret";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../layout/DashBoard";
import Cart from "../pages/DashBoard/Cart/Cart";
import AllUser from "../pages/DashBoard/AllUser";
import AddItems from "../layout/add item/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/DashBoard/manage item/ManageItems";
import UpdateItem from "../pages/DashBoard/update item/UpdateItem";
import Payment from "../pages/DashBoard/payment/Payment";

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
  {
    path: "/dashBoard",
    element: <DashBoard />,
    children: [
      {
        path: "cart",
        element: <Cart></Cart>,
      },

      {
        path: "payment",
        element: <Payment />,
      },

      //--------------------- Admin only routes --------------
      {
        path: "user",
        element: (
          <AdminRoute>
            {" "}
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },

      {
        path: "addItem",
        element: (
          <AdminRoute>
            <AddItems />
          </AdminRoute>
        ),
      },
      {
        path: "manageItem",
        element: (
          <AdminRoute>
            {" "}
            <ManageItems />
          </AdminRoute>
        ),
      },

      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
      },
    ],
  },
]);
