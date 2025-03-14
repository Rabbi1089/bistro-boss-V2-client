import { useQuery } from "@tanstack/react-query";
import React, { PureComponent } from "react";
import UseAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import { FaBook, FaDollarSign, FaPlateWheat } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const AdminHome = () => {
  const { User } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");

      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  //custom shape for bar-chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const pieChartData = chartData.map((data) => {
    return {
      name: data.category,
      value: data.revenue,
    };
  });

 
  return (
    <div className="">
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
      <div className=" flex">
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            {/* legend show the name */}
           <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
