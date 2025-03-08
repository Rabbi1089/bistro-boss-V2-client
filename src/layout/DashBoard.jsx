import {
  FaBook,
  FaCalendar,
  FaEdit,
  FaEnvelope,
  FaHome,
  FaList,
  FaShoppingCart,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { FaBagShopping, FaSpoon } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

//todo get admin value from database

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  console.log([isAdmin]);
  return (
    <div className="flex">
      {/* DashBoard SideBar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <h1 className=" text-3xl text-bold text-center">
          Bistro Boss <br /> Restaurant
        </h1>
        <ul className="menu">
          {isAdmin ? (
            <>
              {" "}
              <li>
                <NavLink to="/dashboard/home">
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItem">
                  <FaSpoon></FaSpoon>
                  Add item
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItem">
                  <FaEdit></FaEdit>
                  Manage items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review">
                  <FaBook></FaBook>
                  Manage bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/user">
                  <FaUser></FaUser>
                  All users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/home">
                  <FaHome />
                  My Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendar />
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart />
                  My cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review">
                  <FaStar></FaStar>
                  Add review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history">
                  <FaList></FaList>
                  Payment history
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          {/* shared navbar */}
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <FaList></FaList>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaBagShopping></FaBagShopping>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaEnvelope></FaEnvelope>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* DashBoard SideBar */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
