import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import RecomendedItem from "./RecomendedItem";

const ChefRecomended = () => {
  const [recommendedMenu, setRecommendedMenu] = useState();
  //console.log(recommendedMenu);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const offered = data.filter((item) => item.category === "offered");
        setRecommendedMenu(offered);
      });
  }, []);
  return (
    <section>
      <SectionTitle
        heading="CHEF RECOMMENDS"
        subHeading="Should Try"
      ></SectionTitle>
      <div className="grid md:grid-cols-3 gap-2 my-4">
      {
        recommendedMenu?.map(item => <RecomendedItem key={item.id} item ={item}></RecomendedItem>)
      }
      </div>

    </section>
  );
};

export default ChefRecomended;
