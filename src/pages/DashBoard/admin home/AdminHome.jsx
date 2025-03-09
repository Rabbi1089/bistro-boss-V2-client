import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import {
  FaBook,
  FaDollarSign,
  FaHotel,
  FaJediOrder,
  FaPlateWheat,
  FaSpoon,
} from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const AdminHome = () => {
  const { User } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div>
      <h1 className=" text-xl">Admin panel</h1>
      <h2 className=" text-3xl">
        {" "}
        Hi , welcome&nbsp;
        {User ? User.displayName : "Back"}
      </h2>
      <div className="stats shadow my-9">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign className=" text-3xl"></FaDollarSign>
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">{stats.revenues}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUser className=" text-3xl"></FaUser>
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats.users}</div>
         
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaPlateWheat className=" text-3xl"></FaPlateWheat>
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats.orders}</div>
         
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaBook className=" text-3xl"></FaBook>
          </div>
          <div className="stat-title">Menu Item</div>
          <div className="stat-value">{stats.menuItems}</div>
          
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
