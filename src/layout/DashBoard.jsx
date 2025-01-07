import {
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="flex">
      {/* DashBoard SideBar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <h1 className=" text-3xl text-bold text-center">
          Bistro Boss <br /> Restaurant
        </h1>
        <ul className="menu">
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
            <NavLink to="/dashboard/myBooking">
              <FaList></FaList>
              My Booking
            </NavLink>
          </li>
          <div className="divider"></div>
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
