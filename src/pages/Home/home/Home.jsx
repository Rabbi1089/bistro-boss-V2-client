import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ChefService from "../chef Service/ChefService";
import Offer from "../offer/Offer";
import PopularItem from "../PopularItem/PopularItem";

const Home = () => {
    return (
        <div>
            <Banner />
            <Category />
            <ChefService />
            <PopularItem />
            <Offer></Offer>
           
        </div>
    );
};

export default Home;