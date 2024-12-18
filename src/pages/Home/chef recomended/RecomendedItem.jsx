// eslint-disable-next-line react/prop-types
const RecomendedItem = ({ item }) => {
  // eslint-disable-next-line react/prop-types
  const { image, name, recipe } = item;
  // eslint-disable-next-line react/prop-types
  const trimmedString = recipe.substring(0, 80);
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p>{trimmedString}</p>
          <div className="card-actions">
            <button className="btn btn-wide px-8 py-5 border-0 border-b-4 border-yellow-500 text-yellow-600 mt-4 uppercase">
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecomendedItem;
