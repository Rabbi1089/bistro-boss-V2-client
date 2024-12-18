import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featureImag from "../../../assets/home/featured.jpg";
import './style.css'

const Feature = () => {
  return (
    <section className="feature-item p-3 bg-fixed">
    {/* fixed used parallax */}
      <SectionTitle
        heading="FROM OUR MENU"
        subHeading="Check It Out"
      ></SectionTitle>
      <div className=" flex justify-center items-center py-8 px-6 gap-6">
        <div>
          <img src={featureImag} alt="" />
        </div>
        <div className=" text-slate-50 bg-slate-600 opacity-70 p-5 rounded-md">
          <p className=" text-xl">20, dec 2024</p>
          <h1 className=" text-2xl uppercase">Where can i go for it</h1>
          <p className=" text-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis,
            magnam fuga aspernatur blanditiis voluptatibus laudantium. Commodi
            laboriosam, ducimus ab non cum blanditiis et alias aliquam
            reprehenderit vel delectus eius dicta!
          </p>
          <button className="btn  px-3 py-2 border-0 border-b-4 bg-slate-600 border-white text-white mt-4 uppercase">
              read more
            </button>
        </div>
      </div>
    </section>
  );
};

export default Feature;
