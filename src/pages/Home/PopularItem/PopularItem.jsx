import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../MenuItem/MenuItem";

const PopularItem = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        // filter popular data from all data
        const popularItem = data.filter((item) => item.category == "popular");
        setMenu(popularItem);
      });
  }, []);
 
  return (
    <section>
      <SectionTitle heading="from our menu" subHeading="Check it out" />
      <div className=" grid md:grid-cols-2 gap-2 justify-between">
        {menu.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className=" flex justify-center mb-4">
        <button className="btn btn-wide px-8 py-5 border-0 border-b-4 border-gray-700">
          View Full Menu
        </button>
      </div>
    </section>
  );
};
//multi cursor alt+d
export default PopularItem;
