import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../MenuItem/MenuItem";

const PopularItem = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) =>
      { // filter popular data from all data
        const popularItem = data.filter(item => item.category == 'popular')
        setMenu(popularItem)
      })
     
  }, []);
  console.log(menu);
  return (
    <section>
      <SectionTitle heading="from our menu" subHeading="Check it out" />
      <div className=" grid md:grid-cols-2 gap-2 justify-between">
        {
            menu.map( item => <MenuItem key={item._id} item={item}>

            </MenuItem>)
        }
      </div>
    </section>
  );
};
//multi cursor alt+d
export default PopularItem;
