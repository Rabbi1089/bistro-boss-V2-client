import { Link } from "react-router-dom";
import MenuItem from "../../Home/MenuItem/MenuItem";
import Cover from "../../Shared/cover/Cover";

const MenuCategory = ({ item, title, coverImg }) => {
  return (
    <>
      {title && (
        <Cover
          img={coverImg}
          title={title}
          subTitle="Would you like to try a dish?"
        ></Cover>
      )}
      {/* title is not sent from first item */}
      <div className=" grid md:grid-cols-2 gap-2 justify-between my-6">
        {item.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className=" flex justify-center mb-4">
      <Link to={`/order/${title}`}>
      <button className="btn btn-wide px-4 py-5 border-0 border-b-4 border-gray-700">
          Order your Favoured food
        </button>
      </Link>

      </div>
    </>
  );
};

export default MenuCategory;
