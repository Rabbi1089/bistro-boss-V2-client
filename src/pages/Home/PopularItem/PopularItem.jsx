import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularItem = () => {
  const menu = useMenu();
  const popularItem = menu.filter((item) => item.category == "popular");

  return (
    <section>
      <SectionTitle heading="from our menu" subHeading="Check it out" />
      <>
      <div className=" grid md:grid-cols-2 gap-2 justify-between">
        {popularItem.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className=" flex justify-center mb-4">
        <button className="btn btn-wide px-8 py-5 border-0 border-b-4 border-gray-700">
          View Full Menu
        </button>
      </div>
      </>

    </section>
  );
};
//multi cursor alt+d
export default PopularItem;
