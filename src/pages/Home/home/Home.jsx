import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import ChefRecomended from "../chef recomended/ChefRecomended";
import ChefService from "../chef Service/ChefService";
import Feature from "../feature item/Feature";
import Offer from "../offer/Offer";
import PopularItem from "../PopularItem/PopularItem";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner />
            <Category />
            <ChefService />
            <PopularItem />
            <Offer />
            <ChefRecomended />
            <Feature />
            <Testimonials />
           
        </div>
    );
};

export default Home;