import { Parallax } from "react-parallax";

// eslint-disable-next-line react/prop-types
const Cover = ({ img, title, subTitle }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      bgImageAlt="menu"
      strength={-200}
    >
      {/* hero section start here  */}
      <div className="hero min-h-[500px] ">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold uppercase font-serif">{title}</h1>
            <p className="mb-5 text-3xl">{subTitle}</p>
          </div>
        </div>
      </div>
      {/* hero section finish here  */}
    </Parallax>
  );
};

//source https://www.npmjs.com/package/react-parallax
export default Cover;
