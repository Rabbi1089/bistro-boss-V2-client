// eslint-disable-next-line react/prop-types
const MenuItem = ({ item }) => {
  // eslint-disable-next-line react/prop-types
  const { image, name, price, recipe } = item;
  return (
    <div className="flex space-x-2 p-3 text-gray-600">
      <img
        style={{ borderRadius: "0 200px 200px 200px" }}
        className="mb-12 w-[118px] h-[104px] "
        src={image}
        alt=""
      />
      <div className="">
        <h1 className="text-2xl">{name}</h1>
        <h3 className="font-semibold text-xl">{recipe}</h3>
      </div>
      <p className=" text-xl text-yellow-500"> ${price}</p>
    </div>
  );
};

export default MenuItem;
