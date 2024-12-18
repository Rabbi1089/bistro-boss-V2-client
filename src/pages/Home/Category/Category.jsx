import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";

import image1 from "../../../assets/home/slide1.jpg";
import image2 from "../../../assets/home/slide2.jpg";
import image3 from "../../../assets/home/slide3.jpg";
import image4 from "../../../assets/home/slide4.jpg";
import image5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <>
    <section>
    <SectionTitle heading="from our menu" subHeading="From 11:00am to 10:00pm"></SectionTitle>
    <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="relative">
          <img src={image1} alt="Slider" className="w-full h-auto" />
          <h3 className="absolute inset-0 flex items-end py-4 justify-center text-4xl font-sans uppercase text-white">
            salad
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} alt="Slider" />
          <h3 className="absolute inset-0 flex items-end py-4 justify-center text-4xl font-sans uppercase text-white">
            pizza
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={image3} alt="Slider" />
          <h3 className="absolute inset-0 flex items-end py-4 justify-center text-4xl font-sans uppercase text-white">
            soup
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={image4} alt="Slider" />
          <h3 className="absolute inset-0 flex items-end py-4 justify-center text-4xl font-sans uppercase text-white">
            dessert
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={image5} alt="Slider" />
          <h3 className="absolute inset-0 flex items-end py-4 justify-center text-4xl font-sans uppercase text-white">
            Salad
          </h3>
        </SwiperSlide>
      </Swiper>
    </section>

    </>
  );
};
//parents relative and child absolute
export default Category;
