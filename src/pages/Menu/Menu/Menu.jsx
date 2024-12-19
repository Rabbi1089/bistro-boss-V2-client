import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/cover/Cover";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../assets/hooks/useMenu";
import MenuCategory from "../menu category/MenuCategory";

import menuImg from "../../../assets/menu/banner3.jpg";
import dImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";

const Menu = () => {
  const menu = useMenu();
  const offeredItem = menu.filter((item) => item.category == "offered");
  const dessert = menu.filter((item) => item.category == "dessert");
  const pizza = menu.filter((item) => item.category == "pizza");
  const salad = menu.filter((item) => item.category == "salad");
  const soup = menu.filter((item) => item.category == "soup");
  return (
    <div>
      <Helmet>
        <title>Bistro Boss || Menu</title>
      </Helmet>

      <Cover
        img={menuImg}
        title="OUR MENU"
        subTitle="Would you like to try a dish?"
      ></Cover>
      <SectionTitle
        heading="Today's offer"
        subHeading="Don't Miss"
      ></SectionTitle>
      <MenuCategory item={offeredItem}></MenuCategory>
      <MenuCategory
        item={dessert}
        coverImg={dImg}
        title="dessert"
      ></MenuCategory>
      <MenuCategory
        item={pizza}
        coverImg={pizzaImg}
        title="pizza"
      ></MenuCategory>
      <MenuCategory
        item={salad}
        coverImg={saladImg}
        title="salad"
      ></MenuCategory>
      <MenuCategory item={soup} coverImg={soupImg} title="soup"></MenuCategory>
    </div>
  );
};

export default Menu;
